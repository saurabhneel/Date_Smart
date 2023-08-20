const env = require("../../env");
const mongoose = require("mongoose");
const message = require("../helper/message");

async function connect() {
  try {
    const connect = await mongoose.connect(env.URI);
    if (connect) {
      console.log(message.databaseConnected);
    }
  } catch (error) {
    console.log(message.databaseNotConnected);
  }
}

connect();
