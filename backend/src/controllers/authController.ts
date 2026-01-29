import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET_Key = process.env.JWT_SECRET_key || 'myjwtsecret123';

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    
    let { email, password } = req.body;

email = email.trim().toLowerCase();
password = password.trim();


    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const passwordHashed=await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: passwordHashed,
    });

    res.status(201).json({ message: ' user Registered successfully' });
  } catch {
    res.status(500).json({ message: 'Registation failed' });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;

    // Clean inputs
    email = email.trim().toLowerCase();
    password = password.trim();

    console.log('Login:', email);

    const userId = await User.findOne({ email });

    if (!userId) {
      console.log('User not found');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const Match = await bcrypt.compare(password, userId.password);

    console.log('Password match:', Match);

    if (!Match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: userId._id },
      JWT_SECRET_Key,
      { expiresIn: '7d' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Login error' });
  }
};
