import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
} from "sequelize-typescript";
import { IAparelho } from "../../dominio/interfaces/aparelho.interface";

export interface AparelhoCreationAttributes extends Omit<IAparelho, "id"> {}

@Table({
  tableName: "aparelhos",
  timestamps: false,
})
export class AparelhoModel
  extends Model<IAparelho, AparelhoCreationAttributes>
  implements IAparelho
{
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare tipo: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare marca: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare modelo: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare id_cliente: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare serial: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare defeito_acusado: string;

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column(DataType.DATE)
  declare data_entrada: Date;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare defeito_detectado: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare data_saida: Date | null;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  declare garantia: boolean;
}
