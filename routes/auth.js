import jwt from "jsonwebtoken";

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(400).json({ message: "Credenciales incorrectas" });

    // Comparar contraseña
    const match = await bcrypt.compare(password, usuario.password);
    if (!match) return res.status(400).json({ message: "Credenciales incorrectas" });

    // Generar token JWT
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ success: true, token, usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});
