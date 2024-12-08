import { Provider } from "@nestjs/common";
import { RepositorioClientes } from "./cliente.repositorio";

export const repositoryProviders: Provider[] = [
  {
    provide: "IRepositorioClientes",
    useClass: RepositorioClientes,
  },
];
