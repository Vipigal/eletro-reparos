import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication } from "@nestjs/common";

export async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix("api");
  await app.listen(3000);
}
