// app.js

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const checkAuth = require("./checkAuth");
const Cookies = require("js-cookie");

// secret token
const secret = "mysecretsshhh";

// routes
const stations = require("./routes/api/stations");
const User = require("./models/User.js");

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// cookie parser
app.use(cookieParser());

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Hello world!"));

// use Routes
app.use("/api/stations", stations);

// POST route to register a user
app.post("/api/register", (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save((err) => {
    if (err) {
      res.status(500).send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

app.get("/api/secret", checkAuth, function (req, res) {
  res.send("The password is potato");
});

app.get("/checkToken", checkAuth, function (req, res) {
  res.sendStatus(200);
});

app.post("/api/authenticate", function (req, res) {
  console.log("authenticating");

  const { email, password } = req.body;
  User.findOne({ email }, function (err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again",
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect email or password",
      });
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again",
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect email or password",
          });
        } else {
          console.log("issuing token");
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: "1h",
          });

          res.cookie("__session", token).sendStatus(200);
        }
      });
    }
  });
});

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
