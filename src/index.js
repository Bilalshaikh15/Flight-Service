const express = require('express')

const app = express();
const PORT = 3000;

const apiRoutes = require('./routes')
// const { PORT } = require('./config/index.js')
const { Logger } = require('./config')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRoutes)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
    // Logger.info("Successfully started the server", { error: "Error Occured" })
})