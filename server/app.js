// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./middlewares/auth");
const app = express();
const port = process.env.PORT;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// database connection
mongoose
  .connect(process.env.DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("Connected to the database !"))
  .catch((err) => console.log(err));

app.use("/api/post", auth, require("./routes/routes"))
app.use(require("./routes/userAuth"))

// start server
app.listen(port, () => console.log(`server running at http://localhost:${port}`));