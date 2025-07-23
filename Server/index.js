import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';


// Routes
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

// to serve images for public (public folder)
app.use(express.static('public'));
app.use('/images', express.static('images'));


// MiddleWare
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const dbUri = process.env.MONGO_DB;

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log('MongoDB Connected!');
    }
    catch (error) {
        console.log("MongoDB Connection Error:", error);
    }
}
connect()
// uses of routes

app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload', UploadRoute);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

import path from 'path';  // nếu đang dùng ES6
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
