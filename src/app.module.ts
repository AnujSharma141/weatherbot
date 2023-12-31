import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserService } from './service/user.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build'),
    }),
  ],
  controllers: [AppController],
  providers: [UserService],
})
export class AppModule {}
