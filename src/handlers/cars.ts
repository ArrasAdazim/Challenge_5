import { Request, Response } from "express";
import { DefaultResponse } from "../models/dto/default";
import { Cars } from "../models/entity/cars";
import { CarsRequest } from "../models/dto/cars";
import CarsService from "../services/cars";
import cloudinary from "../utils/cloudinary";

class CarsHandler {
  async createCars(req: Request, res: Response) {
    try {
      const payload: CarsRequest = req.body;
      if (req.file && req.file.buffer) {
        const fileBase64 = req.file.buffer.toString("base64");
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;
        const uploadedImage = await cloudinary.uploader.upload(file);
        payload.foto = uploadedImage.secure_url;
      }

      // Validasi tidak boleh kosong
      if (!payload.nama && !payload.sewa && !payload.ukuran) {
        const response: DefaultResponse = {
          status: "BAD_REQUEST",
          message: "Tidak boleh kosong",
          data: {
            created_cars: null,
          },
        };
        return res.status(400).send(response);
      }

      const createdCars: Cars = await CarsService.createCars(payload);

      const response: DefaultResponse = {
        status: "CREATED",
        message: "Data berhasil dibuat",
        data: {
          created_cars: createdCars,
        },
      };

      console.log(createdCars);
      res.status(201).send(response);
    } catch (error) {
      console.error(error);
      const response: DefaultResponse = {
        status: "INTERNAL_SERVER_ERROR",
        message: "Error creating car",
        data: {
          created_cars: null,
        },
      };

      res.status(500).send(response);
    }
  }
  async updateCarById(req: Request, res: Response) {
    const cars_id: number = parseInt(req.params.id);
    const payload: CarsRequest = req.body;
    if (req.file && req.file.buffer) {
      const fileBase64 = req.file.buffer.toString("base64");
      const file = `data:${req.file.mimetype};base64,${fileBase64}`;
      const uploadedImage = await cloudinary.uploader.upload(file);
      payload.foto = uploadedImage.secure_url;
    }
    // Payload validation
    if (payload.nama && payload.sewa && payload.ukuran && payload.foto) {
      const response: DefaultResponse = {
        status: "BAD_REQUEST",
        message: "fiedls cannot be empty",
        data: {
          updated_car: null,
        },
      };
      res.status(400).send(response);
    }
    const updatedCar: Cars | null = await CarsService.updateCarById(
      cars_id,
      payload
    );

    if (!updatedCar) {
      const Response: DefaultResponse = {
        status: "ERROR",
        message: "Mobil tidak ditemukan",
        data: null,
      };
      return res.status(404).send(Response);
    }
    const response: DefaultResponse = {
      status: "UPDATED",
      message: "Berhasil update",
      data: {
        updated_car: updatedCar,
      },
    };
    res.status(200).send(response);
  }

  async getAllCars(req: Request, res: Response) {
    const allCars: Cars[] = await CarsService.getAllCars();

    const response: DefaultResponse = {
      status: "OK",
      message: "Semua Data",
      data: allCars,
    };
    res.status(200).send(response);
  }

  async getCarsUkuran(req: Request, res: Response) {
    const queryName: string = req.query.ukuran as string;

    const carsList: Cars[] = await CarsService.getCarsUkuran(queryName);

    const response: DefaultResponse = {
      status: "OK",
      message: "Data yang dicari",
      data: {
        cars: carsList,
      },
    };

    res.status(200).send(response);
  }

  async getCarsNama(req: Request, res: Response) {
    const queryName: string = req.query.nama as string;

    const carsList: Cars[] = await CarsService.getCarsNama(queryName);

    const response: DefaultResponse = {
      status: "OK",
      message: "Data yang dicari",
      data: {
        cars: carsList,
      },
    };

    res.status(200).send(response);
  }

  async getCarsById(req: Request, res: Response) {
    const cars_id: number = parseInt(req.params.id);

    const cars: Cars | undefined = await CarsService.getCarsByid(cars_id);

    if (!cars) {
      const notFoundResponse: DefaultResponse = {
        status: "NOT_FOUND",
        message: "Mobil tidak ditemukan",
        data: null,
      };
      res.status(404).send(notFoundResponse);
      return;
    }

    const response: DefaultResponse = {
      status: "OK",
      message: "Data berdasarkan ID",
      data: cars,
    };

    res.status(200).send(response);
  }

  async deleteCars(req: Request, res: Response) {
    const cars_id: number = parseInt(req.params.id);

    const deleteCars = await CarsService.deleteCars(cars_id);

    if (!deleteCars) {
      const errorResponse: DefaultResponse = {
        status: "NOT_FOUND",
        message: "Mobil tidak ditemukan",
        data: null,
      };
      res.status(404).send(errorResponse);
      return;
    }

    const response: DefaultResponse = {
      status: "OK",
      message: "Mobil berhasil dihapus",
      data: [deleteCars],
    };

    console.log(deleteCars);
    res.status(200).send(response);
  }
}

export default CarsHandler;
