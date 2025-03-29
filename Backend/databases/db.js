const mongoose = require('mongoose');
const connectToDB = () => { mongoose.connect(process.env.DATABASE_CONN, {
    useNewURLParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(`connect to DB`))
.catch( error =>console.log(error) )
}

module.exports = connectToDB;