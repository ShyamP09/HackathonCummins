const express = require("express");
const router = express.Router();
const MusicGraph = require("./musicGraph");

// Create a new instance of MusicGraph
const musicGraph = new MusicGraph();

// Define routes

// Endpoint to add user-song relationships
router.post("/addUserSongRelationship", (req, res) => {
  const relationships = req.body;
  relationships.forEach(relationship => {
    const { userId, songId } = relationship;
    musicGraph.addUserSongRelationship(userId, songId);
  });
  res.send("User-song relationships added successfully.");
});

// Endpoint to add song-genre relationships
router.post("/addSongGenreRelationship", (req, res) => {
  const relationships = req.body;
  relationships.forEach(relationship => {
    const { songId, genreId } = relationship;
    musicGraph.addSongGenreRelationship(songId, genreId);
  });
  res.send("Song-genre relationships added successfully.");
});

// Endpoint to add user-genre relationships
router.post("/addUserGenreRelationship", (req, res) => {
  const relationships = req.body;
  relationships.forEach(relationship => {
    const { userId, genreId } = relationship;
    musicGraph.addUserGenreRelationship(userId, genreId);
  });
  res.send("User-genre relationships added successfully.");
});

// Endpoint to print the graph
router.get("/printGraph", (req, res) => {
  musicGraph.printGraph();
  musicGraph.getGenre();
  res.send("Graph printed successfully.");
});

module.exports = router;
