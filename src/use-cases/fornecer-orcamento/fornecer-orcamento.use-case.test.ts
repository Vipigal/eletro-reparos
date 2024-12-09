import { Provider } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import {
  MARGEM_DE_LUCRO,
  VALOR_MAO_DE_OBRA_TECNICO_POR_HORA,
} from "../../dominio/constantes/valores";
import { LocalRepositorioClientes } from "../testing/cliente.repositorio.mock";
import { LocalRepositorioOrcamentos } from "../testing/orcamento.repositorio.mock";
import { LocalRepositorioPecas } from "../testing/pecas.repositorio.mock";
import { provedoresRepositoriosMock } from "../testing/repositories.providers.mock";
import { FornecerOrcamentoInput } from "./fornecer-orcamento.input";
import { FornecerOrcamentoOutput } from "./fornecer-orcamento.output";
import { FornecerOrcamentoUseCase } from "./fornecer-orcamento.use-case";
import { StatusOrcamentoEnum } from "../../dominio/entidades/orcamento.entidade";

let useCase: FornecerOrcamentoUseCase;
let repositorioClientes: LocalRepositorioClientes;
let repositorioOrcamentos: LocalRepositorioOrcamentos;
let repositorioPecas: LocalRepositorioPecas;

beforeEach(async () => {
  const moduleRef = await Test.createTestingModule({
    providers: [
      FornecerOrcamentoUseCase,
      ...(provedoresRepositoriosMock as Provider[]),
      {
        provide: "IEmailService",
        useValue: {
          sendEmail: jest.fn(),
        },
      },
    ],
  }).compile();

  useCase = moduleRef.get(FornecerOrcamentoUseCase);
  repositorioClientes = await moduleRef.resolve("IRepositorioClientes");
  repositorioOrcamentos = await moduleRef.resolve("IRepositorioOrcamentos");
  repositorioPecas = await moduleRef.resolve("IRepositorioPecas");

  await popularBanco();
});

async function popularBanco() {
  await repositorioClientes.criarMockClientes();
  await repositorioOrcamentos.criarMockOrcamentos();
  await repositorioPecas.criarMockPecas();
}

describe("FornecerOrcamentoUseCase", () => {
  test("Deve receber as pecas necessarias para completar um serviço mais uma estimativa de horas e calcular preço estimado.", async () => {
    const input: FornecerOrcamentoInput = {
      orcamentoId: "1",
      pecasNecessarias: [
        {
          pecaId: "1",
          quantidade: 1,
        },
      ],
      tempoEstimadoHoras: 1,
      clienteId: "1",
    };

    const output: FornecerOrcamentoOutput = await useCase.input(input);

    expect(output.orcamentoId).toBeDefined();
    expect(output.orcamentoId).toEqual("1");
    expect(output.valorTotal).toBeGreaterThan(0);
  });

  test("Deve calcular o valor total considerando a hora/trabalho do técnico, os valores das peças e adicionar a margem de lucro", async () => {
    const input: FornecerOrcamentoInput = {
      orcamentoId: "1",
      pecasNecessarias: [
        {
          pecaId: "1",
          quantidade: 1,
        },
      ],
      tempoEstimadoHoras: 1,
      clienteId: "1",
    };

    const peca = await repositorioPecas.buscarPorId("1");
    const valorPecas =
      (peca?.preco ?? 0) * input.pecasNecessarias[0].quantidade;

    const valorTotalEstimado =
      (valorPecas +
        VALOR_MAO_DE_OBRA_TECNICO_POR_HORA * input.tempoEstimadoHoras) *
      (1 + MARGEM_DE_LUCRO);

    const output: FornecerOrcamentoOutput = await useCase.input(input);

    expect(output.valorTotal).toBe(valorTotalEstimado);
  });

  test("Deve deixar o status do orçamento como falso pois só será aprovado a partir de ação do cliente", async () => {
    const input: FornecerOrcamentoInput = {
      orcamentoId: "1",
      pecasNecessarias: [
        {
          pecaId: "1",
          quantidade: 1,
        },
      ],
      tempoEstimadoHoras: 1,
      clienteId: "1",
    };

    const output: FornecerOrcamentoOutput = await useCase.input(input);

    const orcamento = await repositorioOrcamentos.buscarPorId(
      output.orcamentoId
    );

    expect(orcamento?.status).toBe(StatusOrcamentoEnum.FORNECIDO);
    expect(orcamento?.valorTotal).toBeGreaterThan(0);
  });
});
