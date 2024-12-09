import { Provider } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import {
  Orcamento,
  StatusOrcamentoEnum,
} from "../../../dominio/entidades/orcamento.entidade";
import { LocalRepositorioOrcamentos } from "../../testing/orcamento.repositorio.mock";
import { provedoresRepositoriosMock } from "../../testing/repositories.providers.mock";
import { AprovarOrcamentoInput } from "./aprovar-orcamento.input";
import { AprovarOrcamentoUseCase } from "./aprovar-orcamento.use-case";

let useCase: AprovarOrcamentoUseCase;
let repositorioOrcamentos: LocalRepositorioOrcamentos;

beforeEach(async () => {
  const moduleRef = await Test.createTestingModule({
    providers: [
      AprovarOrcamentoUseCase,
      ...(provedoresRepositoriosMock as Provider[]),
    ],
  }).compile();

  useCase = moduleRef.get(AprovarOrcamentoUseCase);
  repositorioOrcamentos = await moduleRef.resolve("IRepositorioOrcamentos");

  await popularBanco();
});

async function popularBanco() {
  await repositorioOrcamentos.criarMockOrcamentos();
}

describe("AprovarOrcamentoUseCase", () => {
  test("Deve mudar o status do orçamento para aprovado caso o usuário o tenha aprovado", async () => {
    const input: AprovarOrcamentoInput = {
      orcamentoId: "1",
      clienteId: "1",
      aprovado: true,
    };
    await repositorioOrcamentos.atualizar("1", {
      status: StatusOrcamentoEnum.FORNECIDO,
    });

    const output: Orcamento = await useCase.input(input);

    expect(output).toBeDefined();
    expect(output.status).toEqual(StatusOrcamentoEnum.APROVADO);
  });

  test("Deve mudar o status do orçamento para reprovado caso o usuário o tenha reprovado", async () => {
    const input: AprovarOrcamentoInput = {
      orcamentoId: "1",
      clienteId: "1",
      aprovado: false,
    };
    await repositorioOrcamentos.atualizar("1", {
      status: StatusOrcamentoEnum.FORNECIDO,
    });

    const output: Orcamento = await useCase.input(input);

    expect(output).toBeDefined();
    expect(output.status).toEqual(StatusOrcamentoEnum.REPROVADO);
  });

  test("Deve lançar uma exceção caso o orçamento ainda não tenha sido fornecido", async () => {
    const input: AprovarOrcamentoInput = {
      orcamentoId: "1",
      clienteId: "1",
      aprovado: true,
    };
    await repositorioOrcamentos.atualizar("1", {
      status: StatusOrcamentoEnum.SOLICITADO,
    });

    await expect(useCase.input(input)).rejects.toThrow(
      "Não é possível autorizar um orçamento que ainda não foi fornecido."
    );
  });
});
