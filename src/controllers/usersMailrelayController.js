const { UsersMailrelay } = require("../db/models/UsersMailrelay");

exports.createUser = async (req, res) => {
    console.log(req.body);

  try {
    const userData = req.body;

    console.log(req.body);
    const existingUser = await UsersMailrelay.findOne({
      email: userData.email,
    });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const newUser = new UsersMailrelay(userData);
    await newUser.save();

    res
      .status(201)
      .json({ message: "Usuario creado exitosamente", user: newUser });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.updateUser = async (req, res) => {
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
