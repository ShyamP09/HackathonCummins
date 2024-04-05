class MusicGraph {
  constructor() {
    this.userToSongEdges = new Map(); // Edges connecting users to songs
    this.songToGenreEdges = new Map(); // Edges connecting songs to genres
    this.userToGenreEdges = new Map(); // Edges connecting users to genres
  }

  // Add a user-song relationship to the graph
  addUserSongRelationship(userId, songId) {
    if (!this.userToSongEdges.has(userId)) {
      this.userToSongEdges.set(userId, new Set());
    }
    this.userToSongEdges.get(userId).add(songId);
  }

  // Add a song-genre relationship to the graph
  addSongGenreRelationship(songId, genreId) {
    if (!this.songToGenreEdges.has(songId)) {
      this.songToGenreEdges.set(songId, new Set());
    }
    this.songToGenreEdges.get(songId).add(genreId);
  }

  // Add a user-genre relationship to the graph
  addUserGenreRelationship(userId, genreId) {
    if (!this.userToGenreEdges.has(userId)) {
      this.userToGenreEdges.set(userId, new Set());
    }
    this.userToGenreEdges.get(userId).add(genreId);
  }

  // Print the graph
  printGraph() {
    console.log("User-Song Relationships:");
    this.printEdges(this.userToSongEdges);
    console.log("Song-Genre Relationships:");
    this.printEdges(this.songToGenreEdges);
    console.log("User-Genre Relationships:");
    this.printEdges(this.userToGenreEdges);
  }

  // Helper function to print edges for a given relationship type
  printEdges(edges) {
    for (const [key, value] of edges) {
      console.log(`Node ${key}: ${[...value].join(" ")}`);
    }
  }

  // Get genre based on user-song relationships
  getGenre() {
    for (const [user, songs] of this.userToSongEdges) {
      for (const song of songs) {
        if (this.songToGenreEdges.has(song)) {
          for (const genre of this.songToGenreEdges.get(song)) {
            if (!this.userToGenreEdges.has(user)) {
              this.userToGenreEdges.set(user, new Set());
            }
            this.userToGenreEdges.get(user).add(genre);
          }
        }
      }
    }
    this.printGraph();
  }
}

module.exports = MusicGraph;
