import { Inject, Injectable } from "@nestjs/common";
import { SolicitarOrcamentoInput } from "./solicitar-orcamento.input";
import { IRepositorioClientes } from "../interfaces/cliente-repositorio.interface";
import { Cliente } from "../../dominio/cliente/cliente.entidade";
import { Aparelho } from "../../dominio/aparelho/aparelho.entidade";
import { Orcamento } from "../../dominio/orcamento/orcamento.entidade";
import { IRepositorioAparelho } from "../interfaces/aparelho-repositorio.interface";
import { IRepositorioOrcamento } from "../interfaces/orcamento-repositorio.interface";
import { SolicitarOrcamentoOutput } from "./solicitar-orcamento.output";

@Injectable()
export class SolicitarOrcamentoUseCase {
  constructor(
    @Inject("IRepositorioClientes")
    private readonly repositorioClientes: IRepositorioClientes,
    @Inject("IRepositorioAparelhos")
    private readonly repositorioAparelhos: IRepositorioAparelho,
    @Inject("IRepositorioOrcamentos")
    private readonly repositorioOrcamentos: IRepositorioOrcamento
  ) {}

  public async input(
    input: SolicitarOrcamentoInput
  ): Promise<SolicitarOrcamentoOutput> {
    // 1. Verificar se o cliente existe ou criar um novo
    let cliente = await this.repositorioClientes.buscarPorCPF(input.cpfCliente);
    if (!cliente) {
      cliente = await this.repositorioClientes.salvar(
        new Cliente({
          nome: input.nomeCliente,
          cpf: input.cpfCliente,
          email: input.emailCliente,
          telefone: input.telefoneCliente,
          endereco: input.enderecoCliente ?? null,
        })
      );
    }

    // 2. Criar o Aparelho no sistema
    const aparelho = await this.repositorioAparelhos.salvar(
      new Aparelho({
        marca: input.marcaAparelho,
        modelo: input.modeloAparelho,
        serial: input.serieAparelho,
        tipo: input.tipoAparelho,
        data_entrada: new Date(),
        id_cliente: cliente.id,
        defeito_acusado: input.defeitoAparelho,
        garantia: true,
      })
    );

    // 3. Criar um orçamento inicial
    // Não temos ainda valores, pois o gerente da oficina irá avaliar depois
    const orcamento = await this.repositorioOrcamentos.salvar(
      new Orcamento({
        aparelhoId: aparelho.id,
        valorPecas: 0,
        valorMaoDeObra: 0,
        valorTotal: 0,
        aprovado: false,
      })
    );

    // 4. Gerar protocolo e prazo estimado
    // Aqui, o protocolo pode ser simplesmente o ID do orçamento ou um código gerado.
    const protocolo = orcamento.id;
    // Prazo estimado para fornecimento do orçamento (ex: "24 horas", "48 horas")
    const prazoEstimado = "48 horas";

    return {
      protocolo,
      prazoEstimado,
      clienteId: cliente.id,
      aparelhoId: aparelho.id,
      orcamentoId: orcamento.id,
    };
  }
}
