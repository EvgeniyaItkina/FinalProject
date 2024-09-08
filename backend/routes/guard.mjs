import jwt from 'jsonwebtoken';

export const guard = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Проверяем, был ли предоставлен токен
  if (!authHeader) {
    return res.status(401).send({ message: 'No token provided' });
  }

  // Проверяем токен с использованием секретного ключа
  jwt.verify(authHeader, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      return res.status(403).send({ message: 'Invalid token' });
    }

    // Проверка на обязательные поля в токене
    if (data._id == undefined && data.isBusiness == undefined && data.isAdmin == undefined) {
      return res.status(403).send({ message: 'Invalid token' });
    }

    // Сохраняем данные пользователя в `req.user` для дальнейшего использования
    req.user = data;
    next();
  });
};
