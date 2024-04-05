const express = require("express");
const app = express();
app.use(express.json());
const musicGraphRoutes=require("./music_route");
// Routes

// Routes for interacting with MusicGraph
app.use("/api/musicGraph", musicGraphRoutes); 
// Home route
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
