const mongoose = require("mongoose");
const { User } = require("../db/models/UsersMailrelay");

const validateUserData = (data) => {
  const errors = [];

  if (data.level && !["30", "31"].includes(data.level)) {
    errors.push("El campo 'level' solo puede ser '30' o '31'.");
  }
  if (
    data.status_trigger &&
    !["PENDING", "COMPLETED"].includes(data.status_trigger)
  ) {
    errors.push(
      "El campo 'status_trigger' solo puede ser 'PENDING' o 'COMPLETED'."
    );
  }
  if (
    data.trigger &&
    ![
      "companyUpdate",
      "operationSigned",
      "userRegister",
      "userUpdate",
      "userUpdatePromo",
    ].includes(data.trigger)
  ) {
    errors.push(
      "El campo 'trigger' solo puede ser 'companyUpdate', 'operationSigned', 'userRegister', 'userUpdate' o 'userUpdatePromo'."
    );
  }

  return errors;
};

exports.createUser = async (req, res) => {
  try {
    const errors = validateUserData(req.body);
    if (errors.length) {
      return res.status(400).json({ message: "Datos inválidos", errors });
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json({
      message: "Usuario creado exitosamente",
      data: newUser,
    });
  } catch (error) {
    console.error("🚨 Error al crear usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "ID de usuario inválido o faltante" });
    }

    const errors = validateUserData ? validateUserData(req.body) : [];
    if (errors.length > 0) {
      return res.status(400).json({ message: "Datos inválidos", errors });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({
      message: "Usuario actualizado correctamente",
      user: updatedUser,
    });
  } catch (error) {
    console.error("🚨 Error al actualizar usuario:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};
