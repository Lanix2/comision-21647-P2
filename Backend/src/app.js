require('dotenv').config();

const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser')

const conectMongoDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const commentRouter = require('./routes/commentRoutes');
const authRouter = require('./routes/authRoutes');


const app = express();

const port = 2000;

app.use(cors());
app.use(bodyParser.json());

app.use(userRouter)
app.use(postRouter)
app.use(commentRouter)
app.use(authRouter)

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    conectMongoDB()
    
});