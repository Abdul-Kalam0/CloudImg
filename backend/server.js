import server from "./index.js";
import { dbConnection } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = 3000 || process.env.PORT;

const startServer = async () => {
  try {
    await dbConnection();
    server.listen(PORT, () => {
      console.log(`✅ Server is listening on port ${PORT}.`);
    });
  } catch (error) {
    console.error("Error in starting server", error);
  }
};

startServer();
