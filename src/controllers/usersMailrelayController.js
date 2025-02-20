const { UsersMailrelay } = require("../db/models/UsersMailrelay");

exports.createUser = async (req, res) => {
  console.log(req.body);
  try {
    if (!UsersMailrelay || !UsersMailrelay.findOne) {
      throw new Error("Modelo UsersMailrelay no está definido correctamente");
    }

    if (!req.body.email) {
      return res.status(400).json({ message: "El campo email es requerido" });
    }

    const existingUser = await UsersMailrelay.findOne({
      email: req.body.email,
    });

    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const newUser = new UsersMailrelay(req.body);
    await newUser.save();

    res
      .status(201)
      .json({ message: "Usuario creado exitosamente", data: newUser });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.updateUser = async (req, res) => {
  console.log(req);
  try {
    const { email } = req.params;
    const updateData = req.body;

    const updatedUser = await UsersMailrelay.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({
      message: "Usuario actualizado correctamente",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
