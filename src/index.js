const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const dbconnect= require('./config/db')
const courierRouter = require('./routes/courier')
dotenv.config()
dbconnect()
const port = process.env.PORT;
const app = express()

app.use(express.json())
app.get('/', (req, res) => {
    res.redirect('/couriers')
})
app.use(courierRouter)


app.get('*', (req, res) => {
    res.send('404')
})



app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})