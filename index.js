import express from "express";
import FileUpload from "express-fileupload";
import GajiRoute from "./routes/GajiRoute.js"
import KaryawanRoute from "./routes/KaryawanRoute.js"
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(GajiRoute)
app.use(KaryawanRoute)

app.listen(6000, () =>
  console.log("Server running in http://localhost:6000")
);