import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// Load env before any other imports using dynamic import trick
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

// Dynamic imports ensure child modules see process.env populated by dotenv above
const { default: connectDB } = await import("./src/db/index.js");
const { app } = await import("./app.js");

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️  WanderLens server running on port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err);
    process.exit(1);
  });
