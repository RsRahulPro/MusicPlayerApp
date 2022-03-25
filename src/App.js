import React, {useState, useEffect, useRef} from "react";
import "./stylesheets/app.scss";

//Adding all components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
//importing util
import data from "./data.js";
import {runAudioCorrectly} from "./util";

function App() {
  useEffect(() => {
    console.log(window);
    window.addEventListener("keydown", (event) => {
      console.log(event);
      if (event.key === "ArrowUp") {
        if (audioRef.current.volume + 0.05 < 1) {
          console.log("before updating" + audioRef.current.volume);
          audioRef.current.volume += 0.05;
          console.log("after updating" + audioRef.current.volume);
        } else if (audioRef.current.volume + 0.05 >= 1) {
          audioRef.current.volume = 1;
        }
      } else if (event.key === "ArrowDown") {
        if (audioRef.current.volume > 0.05) {
          console.log("before updating" + audioRef.current.volume);
          audioRef.current.volume -= 0.05;
          console.log("after updating" + audioRef.current.volume);
        } else if (audioRef.current.volume - 0.05 <= 0) {
          audioRef.current.volume = 0;
        }
      }
    });
  }, []);

  let [songs, setSongs] = useState(data());
  let [isPlaying, setIsPlaying] = useState(false);
  let [currentSong, setCurrentSong] = useState(songs.filter((song) => song.active)[0]);
  let audioRef = useRef("");
  let [libraryStatus, setLibraryStatus] = useState(false);

  let [songTimeInfo, setSongTimeInfo] = useState({currentTime: 0, completeDuration: 0, animationPercentage: 0});

  let timeUpdateHandler = (event) => {
    // why doesnt this work?
    //   setSongTimeInfo(songTimeInfo=>{
    //     songTimeInfo.currentTime = event.target.currentTime;
    //     songTimeInfo.completeDuration = event.target.duration;
    //     return songTimeInfo;
    // })
    let current = event.target.currentTime;
    let duration = event.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongTimeInfo({...songTimeInfo, currentTime: current, completeDuration: duration, animationPercentage: animation});
  };

  let initialTimeUpdateHandler = (event) => {
    setSongTimeInfo({...songTimeInfo, completeDuration: event.target.duration});
  };
  let onEndedHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    runAudioCorrectly(isPlaying, audioRef);
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} isPlaying={isPlaying} />

      <Player
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songTimeInfo={songTimeInfo}
        setSongTimeInfo={setSongTimeInfo}
      />

      <Library
        songs={songs}
        setSongs={setSongs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        libraryStatus={libraryStatus}
      />

      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={initialTimeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={onEndedHandler}
      ></audio>
    </div>
  );
}

export default App;
