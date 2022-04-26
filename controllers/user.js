import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

import User from '../models/user.js';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if(!existingUser) return res.status(404).json({ message: "Identifiants incorrects" });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if(!isPasswordCorrect) return res.status(400).json({ message: "Identifiants incorrects" });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ result: existingUser, token });
  } catch (e) {
    res.status(500).json({ message: "Quelque chose n'a pas fonctionné." });
  }
}

export const signup = async (req, res) => {
  const { email, password, confirmPassword, name } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).json({ message: 'Cette adresse mail a déjà un compte inscrit.' });

    if ( password !== confirmPassword ) return res.status(400).json({ message: "Les mots de passe ne sont pas identiques." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, name });

    const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ result, token });
  } catch (e) {
    res.status(500).json({ message: "Quelque chose n'a pas fonctionné." });
  }
}
