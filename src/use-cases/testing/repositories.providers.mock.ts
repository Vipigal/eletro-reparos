import { LocalRepositorioAparelhos } from "./aparelho.repositorio.mock";
import { LocalRepositorioClientes } from "./cliente.repositorio.mock";
import { LocalRepositorioOrcamentos } from "./orcamento.repositorio.mock";

export const provedoresRepositoriosMock: Record<string, any>[] = [
  {
    provide: "IRepositorioClientes",
    useClass: LocalRepositorioClientes,
  },
  {
    provide: "IRepositorioAparelhos",
    useClass: LocalRepositorioAparelhos,
  },
  {
    provide: "IRepositorioOrcamentos",
    useClass: LocalRepositorioOrcamentos,
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
