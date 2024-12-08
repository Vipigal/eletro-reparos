import { IAparelho } from "../../interfaces/aparelho.interface";
import { uuid } from "../../types/genericos";

export class Aparelho implements IAparelho {
  public readonly id: uuid;
  public readonly modelo: string;
  public readonly tipo: string;
  public readonly marca: string;
  public readonly serial: string;
  public readonly id_cliente: uuid;
  public readonly defeito_acusado: string;
  public defeito_detectado: string | null = null;
  public observacoes: string | null = null;
  public data_entrada: Date;
  public data_saida: Date | null = null;
  public garantia: boolean = false;
  //implementar logica de garantia -> Implementar Aparelho que retorna para conserto

  constructor(entity: Partial<Aparelho>) {
    Object.assign(this, entity);
  }
}
