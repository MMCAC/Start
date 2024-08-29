import "reflect-metadata";
import { DataSource } from "typeorm";
import { Autor } from "./entity/Autor";
import { Trabalho } from "./entity/Trabalho";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "feciaqtest",
  synchronize: true,
  logging: false,
  entities: [Autor, Trabalho],
  migrations: [],
  subscribers: [],
});
