import express from "express";
import bookController from "../controllers/bookController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", bookController.getAllBooks);
router.get("/add", bookController.getAddBook);
router.post("/add", upload.single("coverImage"), bookController.addBook);
router.get("/edit/:id", bookController.getEditBook);
router.post(
  "/edit/:id",
  upload.single("coverImage"),
  bookController.updateBook
);
router.post("/delete/:id", bookController.deleteBook);

export default router;
