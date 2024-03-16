import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import bodyParser from "body-parser";
import connectToDatabase from "./config/db.js";
import router from "./routes/index.js";
import shopRoutes from "./routes/shopRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cookieParser from "cookie-parser";

connectToDatabase();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 3600000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set("trust proxy", 1);
app.use(passport.authenticate("session"));

app.use("/", router);

app.use("/uploads", express.static("uploads"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/api/shops", shopRoutes);
app.use("/api/shops", productRoutes);

app.get("/", (req, res) => res.render("welcome.ejs"));

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
