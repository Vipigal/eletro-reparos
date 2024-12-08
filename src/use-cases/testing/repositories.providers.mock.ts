import { LocalRepositorioAparelhos } from "./aparelho.repositorio.mock";
import { LocalRepositorioClientes } from "./cliente.repositorio.mock";
import { LocalRepositorioOrcamentos } from "./orcamento.repositorio.mock";
import { LocalRepositorioPecas } from "./pecas.repositorio.mock";

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
  {
    provide: "IRepositorioPecas",
    useClass: LocalRepositorioPecas,
  },
  // {
  //   provide: "IRepositorioPedidos",
  //   useClass: RepositorioPedidos,
  // },
  // {
  //   provide: "IRepositorioReparos",
  //   useClass: RepositorioReparos,
  // }
];
