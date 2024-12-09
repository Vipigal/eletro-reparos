import { Test } from "@nestjs/testing";
import { SolicitarOrcamentoUseCase } from "./solicitar-orcamento.use-case";
import { SolicitarOrcamentoInput } from "./solicitar-orcamento.input";
import { LocalRepositorioClientes } from "../../testing/cliente.repositorio.mock";
import { LocalRepositorioAparelhos } from "../../testing/aparelho.repositorio.mock";
import { LocalRepositorioOrcamentos } from "../../testing/orcamento.repositorio.mock";
import { provedoresRepositoriosMock } from "../../testing/repositories.providers.mock";
import { Provider } from "@nestjs/common";

let useCase: SolicitarOrcamentoUseCase;
let repositorioAparelhos: LocalRepositorioAparelhos;
let repositorioClientes: LocalRepositorioClientes;
let repositorioOrcamentos: LocalRepositorioOrcamentos;

beforeEach(async () => {
  const moduleRef = await Test.createTestingModule({
    providers: [
      SolicitarOrcamentoUseCase,
      ...(provedoresRepositoriosMock as Provider[]),
    ],
  }).compile();

  useCase = moduleRef.get(SolicitarOrcamentoUseCase);
  repositorioAparelhos = await moduleRef.resolve("IRepositorioAparelhos");
  repositorioClientes = await moduleRef.resolve("IRepositorioClientes");
  repositorioOrcamentos = await moduleRef.resolve("IRepositorioOrcamentos");
});

describe("SolicitarOrcamentoUseCase", () => {
  test("Deve receber dados de um cliente e de um aparelho defeituoso e criar um orçamento não aprovado", async () => {
    const input: SolicitarOrcamentoInput = {
      cpfCliente: "123.456.789-00",
      nomeCliente: "João",
      emailCliente: "joao@gmail.com",
      enderecoCliente: "Rua 1 - SP",
      marcaAparelho: "Apple",
      defeitoAparelho: "Tela quebrada",
      modeloAparelho: "iPhone 12",
      serieAparelho: "123456",
      telefoneCliente: "11 99999-9999",
      tipoAparelho: "Smartphone",
    };

    const output = await useCase.input(input);

    expect(output.orcamentoId).toBeDefined();
    expect(output.protocolo).toBeDefined();
    expect(output.prazoEstimado).toBeDefined();
    expect(output.aparelhoId).toBeDefined();
  });

  test("Deve criar um novo cliente se o CPF não existir no sistema", async () => {
    const input: SolicitarOrcamentoInput = {
      cpfCliente: "123.456.789-00",
      nomeCliente: "João",
      emailCliente: "joao@gmail.com",
      enderecoCliente: "Rua 1 - SP",
      marcaAparelho: "Apple",
      defeitoAparelho: "Tela quebrada",
      modeloAparelho: "iPhone 12",
      serieAparelho: "123456",
      telefoneCliente: "11 99999-9999",
      tipoAparelho: "Smartphone",
    };

    const createClienteSpy = jest.spyOn(repositorioClientes, "salvar");
    await useCase.input(input);

    const cliente = await repositorioClientes.buscarPorCPF("123.456.789-00");

    expect(cliente).toBeDefined();
    expect(createClienteSpy).toHaveBeenCalledTimes(1);
  });

  test("Deve criar um novo aparelho e um novo orçamento", async () => {
    const input: SolicitarOrcamentoInput = {
      cpfCliente: "123.456.789-00",
      nomeCliente: "João",
      emailCliente: "joao@gmail.com",
      enderecoCliente: "Rua 1 - SP",
      marcaAparelho: "Apple",
      defeitoAparelho: "Tela quebrada",
      modeloAparelho: "iPhone 12",
      serieAparelho: "123456",
      telefoneCliente: "11 99999-9999",
      tipoAparelho: "Smartphone",
    };

    const createAparelhoSpy = jest.spyOn(repositorioAparelhos, "salvar");
    const createOrcamentoSpy = jest.spyOn(repositorioOrcamentos, "salvar");

    const output = await useCase.input(input);

    const aparelhoCriado = await repositorioAparelhos.buscarPorSerial(
      "123456",
      output.clienteId
    );

    const orcamentoCriado = await repositorioOrcamentos.buscarTodos();

    expect(createAparelhoSpy).toHaveBeenCalledTimes(1);
    expect(createOrcamentoSpy).toHaveBeenCalledTimes(1);
    expect(output.aparelhoId).toEqual(aparelhoCriado?.id);
    expect(output.orcamentoId).toEqual(orcamentoCriado[0].id);
  });
});
