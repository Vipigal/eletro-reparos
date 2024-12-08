import { RepositorioClientes } from "./cliente.repositorio";
import { RepositorioAparelhos } from "./aparelho.repositorio";
import { RepositorioOrcamentos } from "./orcamento.repositorio";

export const repositoryProviders: Record<string, any>[] = [
  {
    provide: "IRepositorioClientes",
    useClass: RepositorioClientes,
  },
  {
    provide: "IRepositorioAparelhos",
    useClass: RepositorioAparelhos,
  },
  {
    provide: "IRepositorioOrcamentos",
    useClass: RepositorioOrcamentos,
  },
  // {
  //   provide: "IRepositorioPedidos",
  //   useClass: RepositorioPedidos,
  // },
  // {
  //   provide: "IRepositorioPecas",
  //   useClass: RepositorioPecas,
  // },
  // {
  //   provide: "IRepositorioReparos",
  //   useClass: RepositorioReparos,
  // }
];
