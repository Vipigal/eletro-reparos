import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
} from "sequelize-typescript";
import {
  CargoUsuarioEnum,
  IUsuario,
} from "../../dominio/interfaces/usuario.interface";

export interface UsuarioCreationAttributes extends Omit<IUsuario, "id"> {}

@Table({
  tableName: "usuarios",
  timestamps: false,
})
export class UsuarioModel
  extends Model<IUsuario, UsuarioCreationAttributes>
  implements IUsuario
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
  declare cpf: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare telefone: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare endereco?: string | null;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare senha: string;

  @AllowNull(false)
  @Column(DataType.ENUM("cliente", "tecnico", "administrador"))
  declare cargo: CargoUsuarioEnum;
}
