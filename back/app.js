import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import user from "./schema/users.js";
import profile from "./schema/profile.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.mongod_url) 
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.error("MongoDB connection error:", err));

function generateAuthToken(user) {
    const payload = { username: user.uname }; // Ensure username is included in the payload
    const secret = 'qnjpserbidxg923bbls'; 
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, secret, options);
}

const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).send('Unauthorized');

    try {
        const secret = 'qnjpserbidxg923bbls';
        const decoded = jwt.verify(token, secret);
        req.user = decoded; // Assign the decoded payload to req.user
        next();
    } catch (error) {
        res.status(403).send('Invalid token');
    }
};

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const users = await user.find({ uname: username, password: password });
    if (users.length === 1) {
        const token = generateAuthToken(users[0]);
        res.status(200).json({ message: "User logged in", token });
    } else {
        res.status(401).json({ message: "Invalid username or password" });
    }
});

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        await user.create({ uname: username, email: email, password: password });
        res.status(200).json({ message: "User signed up successfully" });
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ message: "Username already exists" });
        } else {
            console.error("Error signing up:", err);
            res.status(500).json({ message: "Server error" });
        }
    }
});

app.post('/addwl', verifyJWT, async (req, res) => {
    const { id, action } = req.body; // Assuming `action` indicates whether to add or delete
    const username = req.user.username;

    try {
        if (action === "del") {
            await profile.deleteOne({ uname: username, watch: id });
            res.status(200).json({ message: 'Removed from watchlist successfully' });
        } else {
            await profile.create({ uname: username, watch: id });
            res.status(200).json({ message: 'Added to watchlist successfully' });
        }
    } catch (error) {
        console.error("Error updating watchlist:", error);
        res.status(500).json({ message: 'Server error' });
    }
});
app.get('/wl',verifyJWT,async(req,res)=>{
    const malid=await profile.find({uname:req.user.username})
    res.send(malid)
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server listening on port", port));
