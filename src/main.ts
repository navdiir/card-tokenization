import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // Create a logger instance
  const logger = new Logger('Main');

  // Get environment variables
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);
  const port = configService.get('port');
  const host = configService.get('host');

  // Instance the app
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(port, host);
  logger.log(`Starting app at port ${port} ...`);
}
bootstrap();
