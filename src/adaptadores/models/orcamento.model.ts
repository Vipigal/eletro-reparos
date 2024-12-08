import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
} from "sequelize-typescript";
import { IOrcamento } from "../../dominio/interfaces/orcamento.interface";

export interface OrcamentoCreationAttributes extends Omit<IOrcamento, "id"> {}

@Table({
  tableName: "orcamentos",
  timestamps: false,
})
export class OrcamentoModel
  extends Model<IOrcamento, OrcamentoCreationAttributes>
  implements IOrcamento
{
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  declare aparelhoId: string;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  declare valorPecas: number;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  declare valorMaoDeObra: number;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  declare valorTotal: number;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  declare aprovado: boolean;
}
