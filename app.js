const express = require("express");
const app = express();
const cors = require("cors")

require("./startup/routes")(app);
require("./startup/db")();

app.use(cors())


const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
