const mongoose = require('mongoose');
const dbconnection = () => {
    const db_uri = process.env.DB_URI;
    console.log(db_uri)
    mongoose.set('strictQuery', false);
    try {
        mongoose.connect(db_uri);
        console.log('DB connected');
    } catch (error) {
        console.err('DB connection failed');
    }
    mongoose.connection.on("connect", () => console.log("DB connected"));
}
module.exports = dbconnection;