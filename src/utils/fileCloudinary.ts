import multer from "multer";

const storage = multer.memoryStorage();

const uploadFileUtil = multer({ storage });

export default uploadFileUtil;
