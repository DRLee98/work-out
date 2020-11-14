import "@babel/polyfill";
import dotenv from "dotenv";
import "./db";
import app from "./app";

dotenv.config();

import "./models/User";
import "./models/Day";
import "./models/WorkOut";

const PORT = process.env.PORT || 4000;

const handleListening = () => console.log(`✅  Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
