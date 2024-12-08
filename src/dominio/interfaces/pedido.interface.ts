export interface IItemPedido {
  pecaId: string;
  quantidade: number;
}

export interface IPedido {
  id: string;
  data: Date;
  fornecedorId: string;
  itens: IItemPedido[];
}
