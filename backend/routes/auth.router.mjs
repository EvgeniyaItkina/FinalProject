// backend/routes/auth.router.mjs
import { Router } from 'express';
import jwt from 'jsonwebtoken';

const authRouter = Router();
const adminEmail = 'admin@gmail.com';
const adminPassword = '123';

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== adminEmail || password !== adminPassword) {
      return res.status(401).json({ status: 'error', message: 'Email or password are not correct' });
    }

    // Создаем JWT с полем isAdmin
    const token = jwt.sign(
      {
        email: adminEmail,
        isAdmin: true
      },
      process.env.JWT_SECRET,
      /* { expiresIn: '1h' } */
    );

    res.json({ token });
  } catch (error) {
    res.status(500).send({ message: "Error logging in", error });
  }
});

export default authRouter;
