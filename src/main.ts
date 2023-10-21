import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as TelegramBot from 'node-telegram-bot-api';
import { WeatherService } from './service/weather.service';
import * as schedule from 'node-schedule';
import * as dotenv from 'dotenv';
import { UserService } from './service/user.service';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const BOT_TOKEN: string = process.env.TELEGRAM_BOT_TOKEN;
  const bot = new TelegramBot(BOT_TOKEN, { polling: true });
  const user = new UserService();

  bot.on('message', async (msg) => {
    const chatId: number = msg.chat.id;
    const messageText: string = msg.text;
    if (messageText === '/subscribe') {
      user.subscribe(
        msg.from.first_name + ' ' + msg.from.last_name,
        msg.from.id,
      );
      bot.sendMessage(chatId, 'Please enter city for weather alerts.');
    }

    if (messageText === '/unsubscribe') {
      bot.sendMessage(chatId, 'Unsubscribed to weather alerts!');
      user.usubscribe(msg.from.id);
      schedule.gracefulShutdown();
    }

    bot.once('text', async (msg) => {
      if (
        msg.text !== '/subscribe' &&
        msg.text !== '/unsubscribe' &&
        msg.text !== '/start'
      ) {
        const city: string = msg.text;
        bot.sendMessage(
          chatId,
          `You are now subscribed to weather alerts for ${city}.`,
        );
        schedule.scheduleJob('*/30 * * * *', async () => {
          const weather = new WeatherService();
          bot.sendMessage(
            chatId,
            // eslint-disable-next-line prettier/prettier
            await weather.getWeather(city).then((data) => {
                // eslint-disable-next-line prettier/prettier
              return data.name + ': ' + data.weather[0].main + ', ' + data.main.temp + 'F' ;
              })
              .catch(() => {
                schedule.gracefulShutdown();
                return 'something went wrong try again!';
              }),
          );
        });
      }
    });
  });
  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
