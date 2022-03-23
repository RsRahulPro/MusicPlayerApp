import React, {useState, useEffect, useRef} from "react";
import "./stylesheets/app.scss";

//Adding all components
import Player from "./components/Player";
import Song from "./components/Song";

//importing util
import data from "./util.js";

function App() {
  let [songs, setSongs] = useState(data());
  let [isPlaying, setIsPlaying] = useState(false);
  let [currentSong, setCurrentSong] = useState(songs.filter((song) => song.active)[0]);

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
}

export default App;
