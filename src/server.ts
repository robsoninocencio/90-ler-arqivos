import express from "express";
import { router } from "./router";

const port = 3000;
const app = express();

app.use(router);

app.listen(port, () => console.log(`Server is running on port ${port}`));
