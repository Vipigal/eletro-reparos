import { configDotenv } from "dotenv";
import { bootstrap } from "./infraestrutura/bootstrap/server";

async function main() {
  configDotenv();
  await bootstrap();
}

main();

/**
 * Entidades:
 * - Clientes ok
 * - Aparelho ok
 * - Reparo
 * - Orçamento
 * - Estoque
 * - Peças
 * - Fornecedor
 * - Técnicos
 * - Pedidos de peças
 * -
 *
 *
 *
 */
