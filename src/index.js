const express = require('express');
const app = express()
const { ServerConfig, Logger } = require('./config')
const apiRoutes = require('./routes')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', apiRoutes)

app.listen(ServerConfig.PORT, () => {
    console.log("listening on port", ServerConfig.PORT);
    // Logger.info(`Successfully Started the Server ${ServerConfig.PORT}`, { error: "Error Starting the server" })
})