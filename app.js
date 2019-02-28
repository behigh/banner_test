

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const getAddRouter = require('./routes/getadd')
const testJsRouter = require('./routes/test')

const app = express()

// Tell express to use the webpack-dev-middleware in dev mode
if (process.env.NODE_ENV === 'dev') {
	const webpack = require('webpack')
	const webpackDevMiddleware = require('webpack-dev-middleware')
	const config = require('./webpack.config.dev.js')
	const compiler = webpack(config)

	app.use(webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath
	}))
}

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/getAdd', getAddRouter)
app.use('/js/test.js', testJsRouter)

module.exports = app

