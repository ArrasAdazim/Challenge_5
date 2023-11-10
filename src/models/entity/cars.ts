import { Model, ModelObject } from "objection";
import knexInstance from "../../../config/postgresql";

export class CarsEntity extends Model {
  id?: number;
  nama!: string;
  sewa!: string;
  ukuran!: string;
  foto!: string;

  static get tableName() {
    return "cars";
  }
}

Model.knex(knexInstance);

export type Cars = ModelObject<CarsEntity>;
