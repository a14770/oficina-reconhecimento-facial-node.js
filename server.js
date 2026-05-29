const express = require("express");

const cors = require("cors");

const multer = require("multer");


const app = express();

// o cors permite a ligação local entre o mesmo sistema

app.use(cors());

app.use(express.static("public"));


const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/");

  },

  filename: (req, file, cb) => {

    cb(null, Date.now() + ".jpg");

  }

});


const upload = multer({ storage });


// endpoint para guardar um ficheiro/foto no local que foi designado na criação de 'storage' e depois como upload através de multer

app.post("/upload", upload.single("photo"), (req, res) => {

  console.log("Foto recebida:", req.file.filename);

  res.json({

    message: "Foto guardada",

    file: req.file.filename

  });


});


app.listen(3000, () => {

  console.log("Servidor a correr em http://localhost:3000");

});