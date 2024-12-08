import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
} from "sequelize-typescript";
import { IPeca } from "../../dominio/interfaces/peca.interface";

export interface PecaCreationAttributes extends Omit<IPeca, "id"> {}

@Table({
  tableName: "pecas",
  timestamps: false,
})
export class PecaModel
  extends Model<IPeca, PecaCreationAttributes>
  implements IPeca
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
  declare codigo: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare categoria: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare fabricante: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare tamanho: string;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  declare peso: number;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  declare preco: number;
}
