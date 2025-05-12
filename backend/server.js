import app from "./app.js";
import { PORT } from "./config.js";
import connectToDB from "./db/db.js";

(async () => {
  const connected = await connectToDB();
  if (connected) {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } else {
    console.error("❌ Server not started. MongoDB connection failed.");
    process.exit(1);
  }
})();
