import multer from "multer";

// Configure storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/temp"); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save file with its original name
  },
});

// Create the upload middleware
export const upload = multer({ storage });
