import React, {useState, useEffect, useRef} from "react";
import "./stylesheets/app.scss";

//Adding all components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
//importing util
import data from "./data.js";

function App() {
  let [songs, setSongs] = useState(data());
  let [isPlaying, setIsPlaying] = useState(false);
  let [currentSong, setCurrentSong] = useState(songs.filter((song) => song.active)[0]);
  let audioRef = useRef("");
  let [libraryStatus,setLibraryStatus] = useState(false);

  

  let [songTimeInfo,setSongTimeInfo] = useState({currentTime:0,completeDuration:0});

  let timeUpdateHandler = (event)=>{
    
  // why doesnt this work?
  //   setSongTimeInfo(songTimeInfo=>{
  //     songTimeInfo.currentTime = event.target.currentTime;
  //     songTimeInfo.completeDuration = event.target.duration;
  //     return songTimeInfo; 
  // })
    setSongTimeInfo({...songTimeInfo,currentTime:event.target.currentTime,completeDuration:event.target.duration});

  }

  let initialTimeUpdateHandler = (event)=>{
    

    setSongTimeInfo({...songTimeInfo,completeDuration:event.target.duration})

  }

  return (
    
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song 
        currentSong={currentSong}
      />

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
        src={currentSong.audio}>
      </audio>
    </div>
  );
}

export default App;
