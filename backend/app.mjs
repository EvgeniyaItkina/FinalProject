import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import chalk from 'chalk';
import dotenv from 'dotenv';
import { setupLogging } from './utils/morgan_chalk_logger.mjs';
import { guard } from './routes/guard.mjs';
import adminRouter from './routes/admin.router.mjs';
import clientRouter from './routes/client.router.mjs';
import authRouter from './routes/auth.router.mjs';

// Инициализация переменных окружения
dotenv.config();

// Инициализация приложения Express
export const app = express();

// Подключение к базе данных MongoDB
// backend/app.mjs
async function main() {
  try {
    const db = process.env.NODE_ENV === 'development' ? process.env.MONGO_DB_URL : process.env.ATLAS_URL;
    await mongoose.connect(db);
    console.log(chalk.green('MongoDB connected'));
  } catch (err) {
    console.log(chalk.red('Failed to connect to MongoDB:', err));
  }
}
main();

// Настройка CORS
app.use(cors({
  origin: true,
  methods: 'GET,PUT,POST,PATCH,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: 'Content-Type, Accept, Authorization',
}));

// Включение JSON в запросах
app.use(express.json());

// Логгер запросов через Morgan и Chalk
setupLogging(app);

// Подключение статических файлов
app.use(express.static("public"));


// Маршруты аутентификации
app.use('/auth', authRouter);

// Подключение маршрутов с защитой
app.use('/admin', guard, adminRouter); // Маршруты администратора защищены
app.use('/client', guard, clientRouter); // Маршруты клиента также защищены

// Запуск сервера
app.listen(process.env.PORT, () => {
  console.log(chalk.blue(`Server is running on port ${process.env.PORT}`));
});
