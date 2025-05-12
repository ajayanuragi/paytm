import app from "./app.js";
import { PORT } from "./config.js";

app.listen(PORT, () => {
  console.log(`backend is running on Port:${PORT}`);
});
