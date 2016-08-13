require "rubygems"
require "bundler/setup"
require "stringex"


posts_dir       = "content/post/"    # directory for blog files
new_post_ext    = "markdown"  # default new post file extension when using the new_post task

desc "deploy_to_sakura"
task :deploy_to_sakura do
  sh 'rm -r public'
  sh 'hugo -t hugo-zen'
  sh 'mv public/category public/blog'
  sh 'mv public/tags public/blog'
  sh 'rsync --iconv=UTF-8-MAC,UTF-8 -e "ssh -p 10022" -avz --delete public/ web@49.212.138.148:/home/web/www/meganii.com'
end

desc "deploy_to_vagrant"
task :deploy_to_vagrant do
  sh 'rm -r public'
  sh 'hugo -t hugo-zen'
  sh 'mv public/category public/blog'
  sh 'mv public/tags public/blog'
  sh 'rsync --iconv=UTF-8-MAC,UTF-8 -e "ssh -p 10022" -avz --delete public/ web@192.168.33.33:/home/web/www/meganii.com'
end

desc "Begin a new post in #{posts_dir}"
task :new_post, :title do |t, args|
  if args.title
    title = args.title
  else
    title = get_stdin("Enter a title for your post: ")
  end

  filename = "#{posts_dir}/#{Time.now.strftime('%Y-%m-%d')}-#{title.to_url}.#{new_post_ext}"
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end
  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "title: \"#{title.gsub(/&/,'&amp;')}\""
    post.puts "date: #{Time.now.strftime('%Y-%m-%dT%H:%M:%S+09:00')}"
    post.puts "comments: true"
    post.puts "category: ['']"
    post.puts "tags: ['']"
    post.puts "published: false"
    post.puts "slug: #{title.to_url}"
    post.puts "img: "
    post.puts "---"
    post.puts
    post.puts "<!--more-->"
    post.puts '{{% googleadsense %}}'
  end
  sh "atom #{filename}"
end


def get_stdin(message)
  print message
  STDIN.gets.chomp
end
