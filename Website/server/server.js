import express from "express";
import cors from "cors";
import documentRoutes from "./routes/documentRoutes.js"
import imageRoutes from "./routes/imageRoutes.js"
import moduleRoutes from "./routes/moduleRoutes.js"
import quizRoutes from "./routes/quizRoutes.js"
import quizQuestionRoutes from "./routes/quizQuestionRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import quizAttemptRoutes from "./routes/quizAttemptRoutes.js"
import quizAnswerRoutes from "./routes/quizAnswerRoutes.js"


const app = express();
const port = 5000; 

app.use(cors());


app.use(express.json());

// API routes
app.use("/api/documents", documentRoutes); 

app.use("/api/images", imageRoutes);

app.use("/api/modules", moduleRoutes); 

app.use("/api/users", userRoutes); 

app.use("/api/quizzes", quizRoutes); 

app.use("/api/quizQuestions", quizQuestionRoutes); 

app.use("/api/quizAttempts", quizAttemptRoutes); 

app.use("/api/quizAnswers", quizAnswerRoutes); 




// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
