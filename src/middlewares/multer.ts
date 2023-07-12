import fs from "fs";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdir(`${String(process.env.UPLOAD_PATH)}`, (err) => {
      cb(null, `${String(process.env.UPLOAD_PATH)}`);
    });
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const uploadMiddleware = multer({ storage: storage });

export default uploadMiddleware;
