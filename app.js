const express = require("express");
const app = express();
const path = require("path");
const IndexRouter = require("./routers/indexRouter");
const UserRouter = require("./routers/userRouter");
const CartRouter = require("./routers/cartRouter");
const CategoryRouter = require("./routers/categoryRouter");
const CodeProductRouter = require("./routers/codeProductRouter");
const ProductRouter = require("./routers/productRouter");
const OrderRouter = require("./routers/orderRouter");
const cookieParser = require("cookie-parser");

app.use("/public", express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");

app.use("/user", UserRouter);
app.use("/cart", CartRouter);
app.use("/category", CategoryRouter);
app.use("/codeProduct", CodeProductRouter);
app.use("/product", ProductRouter);
app.use("/order", OrderRouter);
app.use("/", IndexRouter);

app.listen(process.env.PORT || 3000);
