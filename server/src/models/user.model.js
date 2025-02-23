const {Schema, model} = require("mongoose");

const userSchema = new Schema({
username : {type : String, required : true},
email : {type : String, required : true},
password : {type : String, required : true, min : 3},
savedRecipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
createdAt: { type: Date, default: Date.now },
});

const User = model("User", userSchema);
module.exports = User;