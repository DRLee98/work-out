import "@babel/polyfill";
import dotenv from "dotenv";
import moment from "moment-timezone";
import "./db";
import app from "./app";

dotenv.config();

moment.tz.setDefault(moment.tz.guess());

import "./models/User";
import "./models/Day";
import "./models/WorkOut";
import "./models/Post";
import "./models/Comment";
import "./models/Reply";

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅  Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
