import express from 'express'
import ImageKit from 'imagekit'
import cors from 'cors'
import 'dotenv/config'

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:5173', // Vite's default development server
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const imagekit = new ImageKit({
    urlEndpoint: process.env.VITE_IMAGEKIT_URL_ENDPOINT,
    publicKey: process.env.VITE_IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.VITE_IMAGEKIT_PRIVATE_KEY
})

app.get("/auth", function (req, res) {
    var result = imagekit.getAuthenticationParameters();
    res.send(result);
});

app.listen(3001, function () {
    console.log("Live at Port 3001");
});