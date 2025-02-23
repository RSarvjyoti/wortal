const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {config} = require("dotenv");
config();

const JWT_SECRET = process.env.JWT_SECRET

const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send({
                message: "User already registered, try to login",
            });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashpassword,
        });

        return res.status(201).send({
            message: "User Created",
            user,
        });
    } catch (err) {
        console.error(err); 
        return res.status(500).send({
            message: "Internal Server Error",
            error: err.message,
        });
    }
};

const signin = async(req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});

        if(!user) {
            res.status(400).send({
                message : "User not register, please register first"
            })
        }

        const match = await bcrypt.compare(password, user.password);

        if(!match) {
            res.status(400).send({
                message : "Invailid cradencial"
            })
        }

        var token = jwt.sign({ userId: user._id, email: user.email  }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).send({ message: "Login successful", token });

    }catch(err) {
        res.status(500).send({
            message : err
        })
    }
}

module.exports = {signin, signup};