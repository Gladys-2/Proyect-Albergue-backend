import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Usuario ya existe" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ nombre, email, password: hashedPassword, rol: rol || "usuario" });
    res.status(201).json({ message: "Usuario registrado correctamente", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Error al registrarse" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ message: "Login exitoso", token });
  } catch (err) {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["id", "nombre", "email", "rol"] });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};
