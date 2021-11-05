import { Router } from "express";
import multer from "multer";

import DiplomaDigitalController from "./controllers/DiplomaDigitalController";

const multerConfig = multer();
const router = Router();

router.post("/login", DiplomaDigitalController.login);

router.post(
  "/attach2",
  // multerConfig.single("file"),
  DiplomaDigitalController.attachNew
);

router.get("/", (req, res) => {
  return res.send("Hello World!!!");
});

export { router };
