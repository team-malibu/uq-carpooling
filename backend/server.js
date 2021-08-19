
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("hi");
})

const port = 2000;
app.listen(port, () => console.log('listening on port', port))