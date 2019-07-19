module.exports = {
	modules: [ '@nuxtjs/axios', '@nuxtjs/vuetify'],
	mode: 'spa',
	head: {
		title: 'GamesCatalog',
		meta: [{
			charset: 'utf-8'
		  },
		  {
			name: 'viewport',
			content: 'width=device-width, initial-scale=1'
		  },
		  {
			hid: 'description',
			name: 'description',
			content: 'Nuxt.js + Vuetify.js project'
		  }
		  ],
		  link: [{
			rel: 'icon',
			type: 'image/x-icon',
			href: '/favicon.ico'
		  }
		 
		  ],
}, // Headers of the page
	loading: {color:'primary',height:'5px'}, // Disable default loading bar
	loadingIndicator: {
		name: 'folding-cube',
		color: 'rgba(125,125,125,1)',
	background:'rgba(0,0,0,0)'},
	build: {
		extend (config, { isDev, isClient }) {
			if (isDev && isClient) {
				// Run ESLint on save
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				})
			}
			// Extend only webpack config for client-bundle
			if (isClient) { config.target = 'electron-renderer' }
		}
	},
	dev: process.env.NODE_ENV === 'DEV',
	css: [
		'@/assets/css/global.css',
		'@/assets/css/material.css',
		'@/assets/css/font/css/materialdesignicons.css'
	]
}
