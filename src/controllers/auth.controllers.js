import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js';

// Registro
export const register = async (req, res) => {
  const { email, password, username, role } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json({ message: ['El usuario ya existe xd'] });

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      role: role || "user" // Soporta roles, por defecto "user"
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id, role: userSaved.role });
    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      role: userSaved.role,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "usuario no reconocido  gil xd" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: "contraseña incorrecta xdxdxd" });

    const token = await createAccessToken({ id: userFound._id, role: userFound.role });
    res.cookie("token", token);

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Logout
export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

// Profile
export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(404).json({ message: "Usuario no encontrado xd" });
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    role: userFound.role,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
}

// Delete
export const deleteAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Cuenta eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};