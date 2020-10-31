const themeDir = __dirname + '/../../';

module.exports = {    
    plugins: [        
        require('postcss-import')({path: [themeDir]}), 
        require('tailwindcss')(themeDir + 'assets/css/tailwind.config.js'), 
        require('autoprefixer')({
            'browsers': [
                'last 2 versions',
            ],
        }),
        require('postcss-reporter'),
    ]
}
