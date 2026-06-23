import { app } from "./app.js";
import { PORT } from "./config/env.config.js";

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
