// backend/routes/auth.router.mjs
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.mjs';
import bcrypt from 'bcrypt';

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

authRouter.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, telephone, password } = req.body;

    // Check if user already registered with this email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ firstName, lastName, email, telephone, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default authRouter;
