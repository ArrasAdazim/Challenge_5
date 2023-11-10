import { raw } from "objection";
import { Cars, CarsEntity } from "../models/entity/cars";
import { CarsRequest } from "../models/dto/cars";

class CarsRepository {
  static async createCars(cars: Cars): Promise<Cars> {
    const createCars = await CarsEntity.query().insert({
      nama: cars.nama,
      sewa: cars.sewa,
      ukuran: cars.ukuran,
      foto: cars.foto,
    });

    return createCars;
  }

  static async getAllData(): Promise<Cars[]> {
    const allCars = await CarsEntity.query();
    return allCars;
  }

  static async getCarsUkuran(queryName: string): Promise<Cars[]> {
    const listCars = await CarsEntity.query().where(
      raw('lower("ukuran")'),
      "like",
      `%${queryName}%`
    );
    return listCars;
  }

  static async getCarsNama(queryName: string): Promise<Cars[]> {
    const listCars = await CarsEntity.query().where(
      raw('lower("nama")'),
      "like",
      `%${queryName}%`
    );
    return listCars;
  }

  static async getCarsById(cars_id: number): Promise<Cars | undefined> {
    const cars = await CarsEntity.query().where("id", cars_id).first();
    return cars;
  }

  static async deleteCars(cars_id: number): Promise<boolean> {
    const carsDelete = await CarsEntity.query().deleteById(cars_id);
    return carsDelete === 1;
  }

  static async updateCarById(
    cars_id: number,
    car: CarsRequest
  ): Promise<Cars | null> {
    const updateCar = await CarsEntity.query().findById(cars_id);

    if (updateCar) {
      await CarsEntity.query().findById(cars_id).patch({
        nama: car.nama,
        sewa: car.sewa,
        ukuran: car.ukuran,
        foto: car.foto,
      });
      return updateCar;
    } else {
      return null;
    }
  }
}

export default CarsRepository;
