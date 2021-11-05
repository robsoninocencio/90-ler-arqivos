// import * as cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { router } from "./router";

const port = 8080;
const app = express();

// parse application/json
app.use(bodyParser.json());

app.use(router);

app.listen(port, () => console.log(`Server is running on port ${port}`));
