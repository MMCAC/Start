import { defineConfig } from "cypress";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { AppDataSource } from "./src/data-source";
import { Autor } from "./src/entity/Autor";
import { Trabalho } from "./src/entity/Trabalho";
import Genero from "./src/entity/Genero";
import Area from "./src/entity/Area";

(async () => {
  await AppDataSource.initialize();
})();

const autorRepo = AppDataSource.getRepository(Autor);
const trabalhoRepo = AppDataSource.getRepository(Trabalho);

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",

    setupNodeEvents(on, config) {
      on("task", {
        async limparBancoDeDados() {
          let trabalhos = await trabalhoRepo.find();
          await trabalhoRepo.remove(trabalhos);
          trabalhos = await trabalhoRepo.find();
          console.log(trabalhos);

          let autores = await autorRepo.find();
          autores = await autorRepo.find();
          console.log(autores);

          return null;
        },

        async popularBancoDeDados() {
          const QTD_AUTORES = 10;
          const QTD_TRABALHOS = 100;

          const autores: Autor[] = [];

          for (let i = 0; i < QTD_AUTORES; i++) {
            const autor = new Autor();
            autor.nome = faker.person.fullName();
            autor.genero =
              Math.ceil(Math.random() % 2) === 0 ? Genero.F : Genero.M;
            autor.cpf = "99999999999";

            const autorSalvo = await autorRepo.save(autor);
            autores.push(autorSalvo);
          }

          for (let i = 0; i < QTD_TRABALHOS; i++) {
            const trabalho = new Trabalho();
            trabalho.titulo = faker.lorem.sentence();

            if (i < 20) {
              trabalho.area = Area.CAE;
              trabalho.autores = autores.slice(0, 2);
            } else if (i >= 20 && i < 40) {
              trabalho.area = Area.CBS;
              trabalho.autores = autores.slice(2, 4);
            } else if (i >= 40 && i < 60) {
              trabalho.area = Area.CET;
              trabalho.autores = autores.slice(4, 6);
            } else if (i >= 60 && i < 80) {
              trabalho.area = Area.CHCSA;
              trabalho.autores = autores.slice(6, 8);
            } else {
              trabalho.area = Area.MDIS;
              trabalho.autores = autores.slice(8);
            }

            await trabalhoRepo.save(trabalho);
          }
        },
      });
    },
  },
});
