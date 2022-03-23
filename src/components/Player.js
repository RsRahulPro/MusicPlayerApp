import React, {useState, useEffect, useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons";

let Player = ({currentSong, songs, setCurrentSong, setSongs, isPlaying, setIsPlaying, firstRender}) => {

  // all the states, refs etc

  let [songTimeInfo,setSongTimeInfo] = useState({currentTime:0,completeDuration:0});
  let audioRef = useRef();

  // all functions related to the player controls
  let playSongHandler = (event) => {

    audioRef.current.play();

    setIsPlaying(isPlaying ? false : true);

    console.dir(audioRef.current);

   
  };

  let pauseSongHandler = (event) => {
    audioRef.current.pause();
    setIsPlaying(isPlaying ? false : true);
  };

  // all functions related to the time and time control of the song

  let timeUpdateHandler = (event)=>{
    console.log(event.target.currentTime)
  // why doesnt this work?
  //   setSongTimeInfo(songTimeInfo=>{
  //     songTimeInfo.currentTime = event.target.currentTime;
  //     songTimeInfo.completeDuration = event.target.duration;
  //     return songTimeInfo; 
  // })
  setSongTimeInfo({...songTimeInfo,currentTime:event.target.currentTime,completeDuration:event.target.duration});

  }
  let dragHandler = (event)=>{
    console.dir(event.target);
    audioRef.current.currentTime = event.target.value;
    setSongTimeInfo({...songTimeInfo,currentTime:event.target.value});
  }

  let formatTime = (seconds) =>{
    let minutes = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }
  let initialTimeUpdateHandler = (event)=>{

    setSongTimeInfo({...songTimeInfo,completeDuration:event.target.duration})

  }


  // returning the component

  return (
    <div className="player">
      
       {/* div for controlling the time of the music */}

      <div className="time-control">

        <p>{formatTime(songTimeInfo.currentTime)}</p>

        <input type="range" min={0} max={songTimeInfo.completeDuration} value={songTimeInfo.currentTime} onChange={dragHandler}/>

        <p>{formatTime(songTimeInfo.completeDuration)}</p>

      </div>

      {/* div for controlling the play-pause-next of the music */}

      <div className="play-control">

        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />

        {isPlaying ? (
          <FontAwesomeIcon onClick={pauseSongHandler} className="pause" size="2x" icon={faPause} />
        ) : (
          <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={faPlay} />
        )}

        <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
        

        <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={initialTimeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
      </div>


    </div>
  );
};

export default Player;
