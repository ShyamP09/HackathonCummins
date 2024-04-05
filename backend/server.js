const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/Hackcummins", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB: ", err));

const musicLibrary = new Map();
musicLibrary.set("1", {
  title: "Tere Naal",
  artist: "Arijit Singh",
  genre: "Love",
});
musicLibrary.set("2", {
  title: "Tere Liye",
  artist: "Arijit Singh",
  genre: "Love",
});
musicLibrary.set("3", {
  title: "Kaccha Badam",
  artist: "Arijit Singh",
  genre: "Rock",
});
musicLibrary.set("4", {
  title: "Thunderstruck",
  artist: "Taylor Swift",
  genre: "Rock",
});
musicLibrary.set("5", {
  title: "Blank Space",
  artist: "Taylor Swift",
  genre: "Pop",
});
musicLibrary.set("6", {
  title: "Shake It Off",
  artist: "Taylor Swift",
  genre: "Pop",
});
musicLibrary.set("7", {
  title: "Love Story",
  artist: "Taylor Swift",
  genre: "Love",
});
musicLibrary.set("8", {
  title: "Bad Blood",
  artist: "Taylor Swift",
  genre: "Pop",
});
musicLibrary.set("9", {
  title: "Style",
  artist: "Taylor Swift",
  genre: "Pop",
});
musicLibrary.set("10", {
  title: "Wildest Dreams",
  artist: "Taylor Swift",
  genre: "Pop",
});
musicLibrary.set("11", {
  title: "Lover",
  artist: "Taylor Swift",
  genre: "Love",
});
musicLibrary.set("12", {
  title: "In the End",
  artist: "Atif Aslam",
  genre: "Rock",
});
musicLibrary.set("13", {
  title: "Tera Hone Laga Hoon",
  artist: "Atif Aslam",
  genre: "Love",
});
musicLibrary.set("14", {
  title: "Jeene Laga Hoon",
  artist: "Atif Aslam",
  genre: "Love",
});
musicLibrary.set("15", {
  title: "Tum Hi Ho",
  artist: "Arijit Singh",
  genre: "Love",
});
musicLibrary.set("16", {
  title: "Channa Mereya",
  artist: "Arijit Singh",
  genre: "Love",
});
musicLibrary.set("17", {
  title: "Raabta",
  artist: "Arijit Singh",
  genre: "Love",
});
musicLibrary.set("18", {
  title: "Phir Le Aaya Dil",
  artist: "Arijit Singh",
  genre: "Love",
});
musicLibrary.set("19", {
  title: "Darkhaast",
  artist: "Arijit Singh",
  genre: "Love",
});
musicLibrary.set("20", {
  title: "Nashe Si Chadh Gayi",
  artist: "Arijit Singh",
  genre: "Pop",
});
musicLibrary.set("21", {
  title: "Love Dose",
  artist: "Arijit Singh",
  genre: "Hip Hop",
});
musicLibrary.set("22", {
  title: "Sadda Haq",
  artist: "Arijit Singh",
  genre: "Rock",
});
musicLibrary.set("23", {
  title: "Shape of You",
  artist: "Taylor Swift",
  genre: "Pop",
});
musicLibrary.set("24", {
  title: "Wrecking Ball",
  artist: "Taylor Swift",
  genre: "Pop",
});
musicLibrary.set("25", {
  title: "Umbrella",
  artist: "Taylor Swift",
  genre: "Pop",
});
musicLibrary.set("26", {
  title: "Sorry",
  artist: "Taylor Swift",
  genre: "Pop",
});
musicLibrary.set("27", {
  title: "Hips Don't Lie",
  artist: "Taylor Swift",
  genre: "Hip Hop",
});
musicLibrary.set("28", {
  title: "California Gurls",
  artist: "Taylor Swift",
  genre: "Pop",
});
musicLibrary.set("29", {
  title: "Smells Like Teen Spirit",
  artist: "Taylor Swift",
  genre: "Rock",
});
musicLibrary.set("30", {
  title: "Can't Stop the Feeling!",
  artist: "Taylor Swift",
  genre: "Pop",
});

const generateRecommendations = (userPrefs, musicLibrary) => {
  if (!userPrefs.favoriteGenre || !userPrefs.favoriteArtist) {
    return [];
  }

  const favoriteGenre = userPrefs.favoriteGenre;
  const favoriteArtist = userPrefs.favoriteArtist;

  const recommendations = Array.from(musicLibrary.values()).filter((song) => {
    return (
      song.genre.toLowerCase() === favoriteGenre.toLowerCase() &&
      song.artist.toLowerCase() === favoriteArtist.toLowerCase()
    );
  });

  return recommendations;
};

app.post("/register", async (req, res) => {
  try {
    const { email, username, password, favoriteGenre, favoriteArtist } =
      req.body;

    const existingUser = await User.findOne({ email, username });

    if (existingUser) {
      return res
        .status(200)
        .json({ message: "User already exists!", existingUser });
    } else {
      const newUser = new User({
        email,
        username,
        password,
        preferences: { favoriteGenre, favoriteArtist },
      });
      await newUser.save();

      return res.status(200).json({ message: "User registered successfully!" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Error in user registration" });
  }
});

app.post("/recommendations", (req, res) => {
  const { favoriteGenre, favoriteArtist } = req.body;

  if (favoriteGenre && favoriteArtist) {
    const userPrefs = { favoriteGenre, favoriteArtist };
    const recommendations = generateRecommendations(userPrefs, musicLibrary);
    console.log(recommendations);
    return res.json({ recommendations });
  } else {
    return res.status(400).json({ error: "Invalid user preferences format" });
  }
});

app.get("/", (req, res) => {
  return res.send("Music system");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
