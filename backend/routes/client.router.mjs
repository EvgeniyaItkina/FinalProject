// backend/routes/client.router.mjs
import { Router } from 'express';
const clientRouter = Router();

// Пример маршрута для клиента
clientRouter.get('/profile', (req, res) => {
  res.json({ message: 'Client Profile' });
});

export default clientRouter;
