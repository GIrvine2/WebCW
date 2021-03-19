import config from './../config/config.js'
import app from './express'
import mongoose from 'mongoose'

// Connection URL
mongoose.Promise = global.Promise
//Connect to database
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true,
useUnifiedTopology: true, dbName: "WebCW" })
//Error Warning
mongoose.connection.on('error', () => {
 throw new Error(`unable to connect to database: ${config.mongoUri}`)
})

//Listen on port set in config.js
app.listen(config.port, (err) => {
 if (err) {
 console.log(err)
 }
 console.info('Server started on port %s.', config.port)
})