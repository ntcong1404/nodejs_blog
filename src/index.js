const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const SortMiddleware = require("./app/middleware/sortMiddleware");

const app = express();
const port = 3000;

const route = require("./routes");
const db = require("./config/db");

// connect to DB
db.connect();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

// custom middleware
app.use(SortMiddleware);

//Http logger
// app.use(morgan("combined"));

//template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: require("./helper/handlebars"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//routes init
route(app);

app.listen(port, () => console.log(`App listening on port ${port}`));

// POST method : ngc lai vs GET, gửi dữ liệu từ client lên sever
// submit vs get : gui duoi dang query parameter dinh tren URL
// submit vs post : an di tren URL, KO PHAI query parameter

// mô hình MVC : model(sql), view, controller
//
