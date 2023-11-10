import express, { Application } from "express";
import uploadFileUtil from "./utils/uploadFile";
import cloudinary from "./utils/cloudinary";
import CarsHandler from "./handlers/cars";
import fileCloudinary from "./utils/fileCloudinary";

const app: Application = express();
const PORT: number = 8081;

app.use(express.json());

// Init handlers

const carsHandler = new CarsHandler();

//Cars
app.post("/api/cars", fileCloudinary.single("foto"), carsHandler.createCars);

app.get("/api/cars/", carsHandler.getAllCars);
app.get("/api/cars/ukuran", carsHandler.getCarsUkuran);
app.get("/api/cars/", carsHandler.getCarsNama);
app.get("/api/cars/:id", carsHandler.getCarsById);
app.delete("/api/cars/:id", carsHandler.deleteCars);
app.put(
  "/api/cars/:id",
  fileCloudinary.single("foto"),
  carsHandler.updateCarById
);

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
