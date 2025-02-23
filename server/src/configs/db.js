const {connect} =  require("mongoose");
const connectDB = async(url) => {
    try{
        await connect(url);
        console.log("Databse connected");
        
    }catch(err) {
        console.log("Database connection error", err);
    }
}

module.exports = connectDB;