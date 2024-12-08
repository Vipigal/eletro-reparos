import { RepositorioClientes } from "./cliente.repositorio";
import { RepositorioAparelhos } from "./aparelho.repositorio";
import { RepositorioOrcamentos } from "./orcamento.repositorio";
import { RepositorioTecnicos } from "./tecnico.repositorio";
import { RepositorioAdministradores } from "./administrador.repositorio";
import { RepositorioPecas } from "./peca.repositorio";

export const repositoryProviders: Record<string, any>[] = [
  {
    provide: "IRepositorioClientes",
    useClass: RepositorioClientes,
  },
  {
    provide: "IRepositorioTecnicos",
    useClass: RepositorioTecnicos,
  },
  {
    provide: "IRepositorioAdministradores",
    useClass: RepositorioAdministradores,
  },
  {
    provide: "IRepositorioAparelhos",
    useClass: RepositorioAparelhos,
  },
  {
    provide: "IRepositorioOrcamentos",
    useClass: RepositorioOrcamentos,
  },
  {
    provide: "IRepositorioPecas",
    useClass: RepositorioPecas,
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
