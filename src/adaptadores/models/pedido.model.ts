import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
} from "sequelize-typescript";
import { IPedido } from "../../dominio/interfaces/pedido.interface";

export interface PedidoCreationAttributes extends Omit<IPedido, "id"> {}

@Table({
  tableName: "pedidos",
  timestamps: false,
})
export class PedidoModel
  extends Model<IPedido, PedidoCreationAttributes>
  implements IPedido
{
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  declare data: Date;

  @AllowNull(false)
  @Column(DataType.UUID)
  declare fornecedorId: string;

  // Armazenando itens como JSON
  @AllowNull(false)
  @Column(DataType.JSON)
  declare itens: { pecaId: string; quantidade: number }[];
}
