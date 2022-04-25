import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

import User from '../models/user.js';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if(!existingUser) return res.status(404).json({ message: "L'utilisateur n'existe pas" });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if(!isPasswordCorrect) return res.status(400).json({ message: "Identifiants incorrects" });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ result: existingUser, token });
  } catch (e) {
    res.status(500).json({ message: "Quelque chose n'a pas fonctionné." });
  }
}

export const signup = async (req, res) => {

}
