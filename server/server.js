import express from "express";
import dotenv from "dotenv/config";
import connectDB from "./configs/db.js"
import cors from "cors";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
const app=express();

// dotenv.config();

await connectDB();

const allowedOrigins = [
  "https://quick-blog-five-olive.vercel.app", // frontend (vercel)
  "http://localhost:5173"                     // local dev (vite/react)
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.get('/',(req,res)=>{
      res.send("API is Working");
});

app.use('/api/admin',adminRouter);
app.use('/api/blog',blogRouter);
const PORT=process.env.PORT || 3000;

// app.use("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });

app.listen(PORT,()=>{
    console.log(`Server started running at http://localhost:${PORT}`)
})

export default app;