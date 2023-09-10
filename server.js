const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 8000;

// body parser
app.use(express.json());

// CORS allowed origins
let allowedOrigins = ["https://sayeem.com", "closet.sayeem.com"];

const containsAny = (string, array) => {
  return array.some((substring) => string.includes(substring));
};

// CORS options
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || containsAny(origin, allowedOrigins)) {
      callback(null, true);
    } else {
      console.log("The disallowed origin is: " + origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  allowedHeaders: ["Content-Type"],
  methods: ["GET", "POST", "OPTIONS", "HEAD"],
  credentials: true,
  exposedHeaders: ["Content-Type"],
};

// allow preflights
app.options("*", cors(corsOptions));

// CORS
app.use(cors(corsOptions));

// homepage & docs
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "CORS playground",
  });
});

app.get("/complex", (req, res) => {
  const expectedContentType = "application/json";
  const requestedContentType = req.get("Content-Type");
  if (requestedContentType !== expectedContentType) {
    return res.status(415).send("415 - Unsupported Media Type");
  }
  return res.status(200).json({
    message: "Complex GET endpoint",
  });
});

app.post("/simple-post", (req, res) => {
  return res.status(200).json({
    message: "Simple POST endpoint",
  });
});

app.post("/complex-post", (req, res) => {
  return res.status(200).json({
    message: "Complex POST endpoint",
  });
});

// catch all route
app.get("*", (req, res) => {
  return res.status(404).send("404 Not Found");
});

// start server
app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});
