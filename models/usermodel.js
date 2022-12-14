const conn = require("./mongooseConnection");
const userModel = conn.model("usermodel", {
  username: {
    type: String,
    required: true,
  },
});
module.exports = userModel;
