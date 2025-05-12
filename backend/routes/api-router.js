import express from "express";
import userRouter from "./user-router.js";
import accountRouter from "./account-router.js";
const apiRouter = express.Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/account", accountRouter);

export default apiRouter;
