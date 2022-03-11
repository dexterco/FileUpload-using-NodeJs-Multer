const express = require("express")
const multer = require("multer")
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

var upload = multer({ storage: storage })
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set("views", "views")
app.set("view engine", "ejs")
app.use("/uploads/", express.static("./uploads/"))
app.get("/", (req, res) => {
  res.render("home")
})

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file)
  res.render("thanks", { pharmacy: req.body.pharmacy, myimg: req.file.originalname })
})

app.listen(3000)
