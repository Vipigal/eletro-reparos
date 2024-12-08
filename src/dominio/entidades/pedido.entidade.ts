import { IPedido } from "../interfaces/pedido.interface";
import { uuid } from "../types/genericos";

export class Pedido implements IPedido {
  public readonly id!: uuid;
  public readonly data!: Date;
  public readonly fornecedorId!: uuid;
  public readonly itens!: { pecaId: uuid; quantidade: number }[];

  constructor(entity: Partial<IPedido>) {
    Object.assign(this, entity);
  }
}
