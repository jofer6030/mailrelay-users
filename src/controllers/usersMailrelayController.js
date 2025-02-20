const { User } = require("../db/models/UsersMailrelay");

exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
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
  try {
    const { email } = req.params;
    const updateData = req.body;

    console.log("🔹 Email recibido en params:", email);
    console.log("🔹 Datos a actualizar:", updateData);

    if (!email) {
      return res.status(400).json({ message: "Falta el email en la URL" });
    }

    if (
      updateData.status_trigger &&
      !["PENDING", "COMPLETED"].includes(updateData.status_trigger)
    ) {
      return res.status(400).json({
        message:
          "El campo status_trigger solo puede ser 'PENDING' o 'COMPLETED'",
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: updateData },
      { new: true }
    );

    console.log("🔹 Resultado de la actualización:", updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({
      message: "Usuario actualizado correctamente",
      user: updatedUser,
    });
  } catch (error) {
    console.error("🚨 Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
