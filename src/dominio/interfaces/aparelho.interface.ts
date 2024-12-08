export interface IAparelho {
  id: string;
  marca: string;
  modelo: string;
  tipo: string;
  serial: string;
  defeito_acusado: string;
  observacoes?: string | null;
  data_entrada: Date;
  data_saida: Date | null;
  garantia: boolean;
  id_cliente: string;
}
