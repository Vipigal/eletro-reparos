import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
} from "sequelize-typescript";
import { IReparo } from "../../dominio/interfaces/reparo.interface";

export interface ReparoCreationAttributes extends Omit<IReparo, "id"> {}

@Table({
  tableName: "reparos",
  timestamps: false,
})
export class ReparoModel
  extends Model<IReparo, ReparoCreationAttributes>
  implements IReparo
{
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  declare orcamentoId: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  declare tecnicoId: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare status: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare descricao: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  declare dataInicio: Date;

  @AllowNull(true)
  @Column(DataType.DATE)
  declare dataFimPrevista?: Date | null;

  @AllowNull(true)
  @Column(DataType.DATE)
  declare dataFimReal?: Date | null;
}
