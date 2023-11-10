import { CarsRequest } from "../models/dto/cars";
import { Cars, CarsEntity } from "../models/entity/cars";
import CarsRepository from "../repositories/cars";

class CarsService {
  static async createCars(cars: CarsRequest): Promise<Cars> {
    const carsCreate: Cars = {
      nama: cars.nama,
      sewa: cars.sewa,
      ukuran: cars.ukuran,
      foto: cars.foto,
    };
    const createdCars = await CarsRepository.createCars(carsCreate);

    return createdCars;
  }

  static async updateCarById(
    queryId: number,
    car: CarsRequest
  ): Promise<Cars | null> {
    const carToUpdate: Cars = {
      nama: car.nama,
      sewa: car.sewa,
      ukuran: car.ukuran,
      foto: car.foto,
    };
    const updatedCar = await CarsRepository.updateCarById(queryId, carToUpdate);
    return updatedCar;
  }
  static async getAllCars(): Promise<Cars[]> {
    const listCars = await CarsRepository.getAllData();

    return listCars;
  }
  static async getCarsUkuran(queryName: string): Promise<Cars[]> {
    const listCars = await CarsRepository.getCarsUkuran(queryName);

    return listCars;
  }
  static async getCarsNama(queryName: string): Promise<Cars[]> {
    const listCars = await CarsRepository.getCarsNama(queryName);

    return listCars;
  }

  static async getCarsByid(cars_id: number): Promise<Cars | undefined> {
    const cars = await CarsRepository.getCarsById(cars_id);
    return cars;
  }

  static async deleteCars(cars_id: number): Promise<boolean> {
    const deleteCars = await CarsRepository.deleteCars(cars_id);
    return deleteCars;
  }
}

export default CarsService;
