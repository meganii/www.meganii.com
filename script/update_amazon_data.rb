require "rubygems"
require "amazon/ecs"
require 'rapa'
require 'json'
require 'active_support'
require 'active_support/core_ext'
require 'date'
require 'dotenv/load'
require 'open-uri'
require 'JSON'

Amazon::Ecs.configure do |options|
  options[:AWS_access_key_id] = ENV['AWS_ACCESS_KEY']
  options[:AWS_secret_key] = ENV['AWS_SECRET_KEY']
  options[:associate_tag] = 'meganii-22'
  options[:country] = 'jp'
end

RAKUTEN_ENDPOINT = "https://app.rakuten.co.jp/services/api/Product/Search/20170426?format=json&applicationId=#{ENV['RAKUTEN_APP_ID']}"
YAHOO_ENDPOINT = "https://shopping.yahooapis.jp/ShoppingWebService/V1/json/itemSearch?appid=#{ENV['YAHOO_APP_ID']}"

# extract amazon shortcode
def extract_amazon_itemid_from_shortcode
  list = []
  Dir.glob("content/*/*.markdown") do |file|
    File.open(file) do |f|
      m = f.read.scan(%r{\{\{\% amazon.* \%\}\}})
      if !m.empty?
        m.each do |a|
          id = a.match(%r{([A-Z]|[0-9]){10}})[0]
          list << id
        end
      end
    end
  end
  list.uniq
end

def get_amazon_jsondata (item_id)
  res = Amazon::Ecs.item_lookup(item_id, {'ResponseGroup': 'Images,ItemAttributes,Offers'})
  item = res.get_element('Item')

  hash = Hash.from_xml(item.to_s)
  hash['Lastmod'] = Time.now
  hash
end

def cache_expired?(id)
  return true unless File.exists?("data/amazon/#{id}.json")

  content = File.open("data/amazon/#{id}.json", 'r').read
  return true if content.empty?

  json = JSON.parse(content)
  return true if json['Lastmod'] == nil

  lastmod = DateTime.parse(json['Lastmod'])
  diff = ((DateTime.now - lastmod) * 24 * 60 * 60).to_i
  if (86_400 < diff )
    return true
  else
    return false
  end
end

def get_rakuten_url_from(jan_list)
  return '' if jan_list.empty?

  list = []
  if jan_list.instance_of?(String)
    list << jan_list
  else
    list = jan_list
  end

  list.each do |jan_code|
    sleep(1)
    url = "#{RAKUTEN_ENDPOINT}&keyword=#{jan_code}"
    open(url) do |res|
      json = JSON.parse(res.read)
      next if json['count'] == 0

      product = json['Products'][0]['Product']

      data = {
        'productUrlPC' => product['productUrlPC'],
        'productUrlMobile' => product['productUrlMobile']
      }
      return data
    end
  end

  ''
end

def get_yahoo_url_from(jan_list)
  return '' if jan_list.empty?

  list = []
  if jan_list.instance_of?(String)
    list << jan_list
  else
    list = jan_list
  end


  list.each do |jan_code|
    sleep(1)
    open("#{YAHOO_ENDPOINT}&jan=#{jan_code}") do |res|
      json = JSON.parse(res.read)
      puts json
      next if json['ResultSet']['totalResultsAvailable'] == "0"

      data = {
        "productUrl": "https://shopping.yahoo.co.jp/search?p=#{jan_code}"
      }
      return data
    end
  end

  ''
end

# main
id_list = extract_amazon_itemid_from_shortcode
id_list.each do |id|
  puts id
  puts 'sleep for 2s'

  if cache_expired?(id)
    puts "cache expired"
    File.open("data/amazon/#{id}.json", 'w') do |f|
      begin
        data = get_amazon_jsondata(id)
        eanlist_elem = data['Item']['ItemAttributes']['EANList'] || ''
        p eanlist_elem
        jan_list = eanlist_elem.empty? ? '' : eanlist_elem['EANListElement']

        result_rakuten = get_rakuten_url_from(jan_list)
        if !result_rakuten.empty?
          data['Rakuten'] = result_rakuten
        end

        result_yahoo = get_yahoo_url_from(jan_list)
        if !result_yahoo.empty?
          data['Yahoo'] = result_yahoo
        end

        f.write(JSON.pretty_generate(data))
      rescue Amazon::RequestError
        sleep(2)
        retry
      end
    end
    sleep(2)
  else
    puts "still cache"
  end
end

# puts get_rakuten_url_from('9784152092670') #TEST
# puts get_yahoo_url_from(["4960833503153", "4960833525773"])
