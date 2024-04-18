import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connectDB";
import { Media } from "./models";
import multer from "multer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // if found use port number else 3000
app.use("/uploads", express.static("uploads"));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for uploads
  },
  filename: function (req, file, cb) {
    // Generate a unique filename using the current timestamp and the original filename
    const uniqueFilename = file.originalname;
    cb(null, uniqueFilename);
  },
});
const upload = multer({ storage: storage });
// Middleware
app.use(bodyParser.json());
//cross origin resource sharing for integrating applications 3001 for react, 8081 for react-natives
app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "http://localhost:8081",
      "http://localhost:19006",
    ],
  })
);

// Connect to MongoDB
connectDB();

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Media Sharing Platform API");
});

//CREATE
app.post(
  "/api/media",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      const media = new Media({
        image: req.file?.path, // chaining for safer handling (if undefined)
        description: req.body.description || "",
        isliked: false,
      });
      await media.save();
      res.status(201).json("Image created successfully");
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
);

//READ
app.get("/api/media", async (req: Request, res: Response) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

//UPDATE
app.put("/api/media/:id", async (req: Request, res: Response) => {
  try {
    //assuming you can't update the image itself
    // const { description, isLiked } = req.body;

    const updatedMedia = await Media.findByIdAndUpdate(
      req.params.id,
      { description: req.body.description, isliked: req.body.isliked },
      { new: true }
    );
    if (!updatedMedia) {
      return res.status(404).json({ message: "Media not found" });
    }
    await updatedMedia.save();

    res.status(200).json(updatedMedia);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

//DELETE
app.delete("/api/media/:id", async (req: Request, res: Response) => {
  try {
    const deletedMedia = await Media.findByIdAndDelete(req.params.id);
    if (!deletedMedia) {
      return res.status(404).json({ message: "Media not found" });
    }
    res.status(200).json({ message: "Media deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
