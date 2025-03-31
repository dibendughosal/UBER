const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`✅ Connected to MongoDB: ${conn.connection.db.databaseName}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectToDB;
