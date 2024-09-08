// backend/routes/admin.router.mjs
import { Router } from 'express';
const adminRouter = Router();

// Пример маршрута для админа
adminRouter.get('/dashboard', (req, res) => {
  res.json({ message: 'Admin Dashboard' });
});

export default adminRouter;
