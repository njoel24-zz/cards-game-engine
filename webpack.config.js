module.exports = {
    entry: "./src/index.js",
    output: {
        path: "./public/dist/",
        filename: "bundle.js"
    },
    devServer: {
    	inline: true,
    	port: 3333
    },
    module: {
        loaders: [
            { 
            	test: /\.js$/,
              	exclude: /node_modules/,
             	loader: "babel",
             	query: {
             		presets: ['es2015', 'react', 'stage-2']
             	} 
         	}
        ]
    }
};