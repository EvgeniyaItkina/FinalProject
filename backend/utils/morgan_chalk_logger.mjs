import morgan from 'morgan';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { createStream } from 'rotating-file-stream';
import moment from 'moment';
import { fileURLToPath } from 'url';

// Получение пути до текущей директории для работы с файлами
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Проверка, существует ли директория для логов
const logDirectory = path.join(__dirname, 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory, { recursive: true });

// Создание потока для доступа к логам
const accessLogStream = createStream('access.log', {
  interval: '1d', // Ротация каждый день
  path: logDirectory
});

// Создание потока для логов ошибок с ротацией по дате
const errorLogStream = createStream(() => {
  return `${moment().format('YYYY_MM_DD')}-errors.log`;
}, {
  interval: '1d', // Ротация каждый день
  path: logDirectory
});

// Настройка кастомного формата `morgan`
morgan.format('custom', (tokens, req, res) => {
  return [
    `Entry Time: ${moment().format('DD/MM/YYYY HH:mm:ss')}`,
    `Method: ${tokens.method(req, res)}`,
    `URL: ${tokens.url(req, res)}`,
    `Response Time: ${tokens['response-time'](req, res)} ms`,
    `Status: ${tokens.status(req, res)}`
  ].join('\n');
});

// Цветной формат для консоли
const consoleFormat = (tokens, req, res) => [
  chalk.white(`Entry Time: ${moment().format('DD/MM/YYYY HH:mm:ss')}`),
  chalk.cyan(`Method: ${tokens.method(req, res)}`),
  chalk.magenta(`URL: ${tokens.url(req, res)}`),
  chalk.green(`Status: ${tokens.status(req, res)}`),
  chalk.yellow(`Response Time: ${tokens['response-time'](req, res)} ms`)
].join('\n');

// Функция настройки логирования
export const setupLogging = (app) => {
  // Логирование всех запросов в консоль и файл с доступом
  app.use(morgan(consoleFormat));
  app.use(morgan('custom', { stream: accessLogStream }));

  // Логирование ошибок (статус >= 400) в отдельный файл с ротацией по дате
  app.use(morgan('custom', {
    stream: errorLogStream,
    skip: (req, res) => res.statusCode < 400
  }));
};
