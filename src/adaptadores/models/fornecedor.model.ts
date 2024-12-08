import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
} from "sequelize-typescript";
import { IFornecedor } from "../../dominio/interfaces/fornecedor.interface";

export interface FornecedorCreationAttributes extends Omit<IFornecedor, "id"> {}

@Table({
  tableName: "fornecedores",
  timestamps: false,
})
export class FornecedorModel
  extends Model<IFornecedor, FornecedorCreationAttributes>
  implements IFornecedor
{
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare nome: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare cnpj: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare contato: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare endereco: string;
}
