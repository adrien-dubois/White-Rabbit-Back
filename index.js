import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config'

import postRoutes from './routes/posts.js';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use('/posts', postRoutes);

const CONNECTION_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.sawlf.mongodb.net/whiteRabbit?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Connected to White Rabbit Server on port ${PORT}`)))
  .catch((error) => console.log(error))
