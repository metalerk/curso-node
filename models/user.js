const mongoose = require('mongoose');


let user_schema = new mongoose.Schema({
  name : String,
  nockname : String,
  password : String,
  age : Number,
  email : String,
  birthday : Date
});
