
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3001;
import authRoute from './routes/UserRoutes.js';
import authRoutes from "./routes/auth.js";
import cookieParser from 'cookie-parser';

await connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

app.use("/api/auth",authRoute);
app.use("/api/auth", authRoutes);

// app.listen(PORT, async () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//     
// });


export default app;