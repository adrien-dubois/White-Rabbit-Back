import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config'

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT;

mongoose.connect(process.env.DB_CONNECT)
  .then(() => app.listen(PORT, () => console.log(`Connected to White Rabbit Server on port ${PORT}`)))
  .catch((error) => console.log(error))
