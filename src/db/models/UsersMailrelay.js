const mongoose = require("mongoose");

const UsersMailrelaySchema = new mongoose.Schema({
  name: String,
  email: String,
  lname_p: String,
  lname_m: String,
  nacimiento: Date,
  level: {
    type: String,
    enum: ["30", "31"],
  },
  cellphone: String,
  department: String,
  is_active: Boolean,
  content_promo: Boolean,
  company: {
    commercial_name: String,
    cellphone: String,
    constitucion: Date,
    department: String,
    economic_activity: String,
  },
  operation: {
    special_service: {
      sp_compra: Number,
      sp_venta: Number,
    },
    transac_contraparte: {
      origin_bank: String,
      destiny_bank: String,
      type_operation: String,
    },
    created_at: Date,
    updated_at: Date,
  },
  trigger: {
    type: String,
    enum: [
      "companyUpdate",
      "operationSigned",
      "userRegister",
      "userUpdate",
      "userUpdatePromo",
    ],
    required: true,
  },
  status_trigger: {
    type: String,
    enum: ["PENDING", "COMPLETED"],
    default: "PENDING",
  },
  created_at_trigger: {
    type: Date,
    default: Date.now,
  },
  updated_at_status_trigger: {
    type: Date,
    default: Date.now,
  },
});

exports.UsersMailrelay = mongoose.model("UsersMailrelay", UsersMailrelaySchema);
