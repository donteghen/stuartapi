const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();
const mongoString = process.env.MONGO_SRC


const dbconnect = () =>  {
    mongoose.connect(mongoString)
   .then(() => console.log('db is ready'))
   .catch((error) => console.log(error))
}

module.exports = dbconnect;