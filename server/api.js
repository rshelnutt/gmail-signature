import express from 'express'
import ImageKit from 'imagekit'
import serverless from 'serverless-http'
import cors from 'cors'
import 'dotenv/config'

const app = express();
const imagekit = new ImageKit({
    urlEndpoint: process.env.VITE_IMAGEKIT_URL_ENDPOINT,
    publicKey: process.env.VITE_IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.VITE_IMAGEKIT_PRIVATE_KEY
})

// Middleware
app.use(cors({
    origin: process.env.VITE_AUTH_API_URL, // Dynamic origin based on environment
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get("/auth", function (req, res) {
    var result = imagekit.getAuthenticationParameters();
    res.send(result);
});

// Add other routes from your original Express server

// Export the serverless function
module.exports.handler = serverless(app);