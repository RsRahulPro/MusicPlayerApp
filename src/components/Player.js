import React, {useState, useEffect, useRef} from "react";
import {runAudioCorrectly} from "../util";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons";

let Player = ({currentSong, songs, setCurrentSong, setSongs, isPlaying, setIsPlaying, audioRef,songTimeInfo,setSongTimeInfo}) => {

  // all the states, refs etc

 
  useEffect(()=>{

    const newSongs = songs.map((song)=>{

      if(song.id === currentSong.id){

        return{
          ...song,
          active:true,

        }
      }else{

        return{
          ...song,
          active:false,
        }

      }

    })

    setSongs(newSongs);
    


  },[currentSong])

  // all functions related to the player controls
  let playSongHandler = (event) => {

    audioRef.current.play();
    setIsPlaying(isPlaying ? false : true);

  };

  let pauseSongHandler = (event) => {
    audioRef.current.pause();
    setIsPlaying(isPlaying ? false : true);
  };

  // all functions related to the time and time control of the song


  let dragHandler = (event)=>{
    
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
  
  const skipTrackHandler = async(direction)=>{

    let currentIndex = songs.findIndex((song)=>song.id === currentSong.id);
    if(direction === "skip-forward"){
      setCurrentSong(songs[(currentIndex+1)%songs.length]);
      runAudioCorrectly(isPlaying,audioRef);
    }

    if(direction === "skip-back"){
      if((currentIndex-1)%songs.length === -1){
        setCurrentSong(songs[songs.length-1]);
        runAudioCorrectly(isPlaying,audioRef);
        return;
      }
      setCurrentSong(songs[(currentIndex-1)%songs.length]);
      runAudioCorrectly(isPlaying,audioRef);
    }
  }


  // returning the component

  return (
    <div className="player">
      
       {/* div for controlling the time of the music */}

      <div className="time-control">

        <p>{formatTime(songTimeInfo.currentTime)}</p>

        <input type="range" min={0} max={isNaN(songTimeInfo.completeDuration)?0:songTimeInfo.completeDuration} value={songTimeInfo.currentTime} onChange={dragHandler}/>

        <p>{songTimeInfo.completeDuration?formatTime(songTimeInfo.completeDuration):"0:00"}</p>

      </div>

      {/* div for controlling the play-pause-next of the music */}

      <div className="play-control">

        <FontAwesomeIcon 
          className="skip-back"
          size="2x"
          icon={faAngleLeft} 
          onClick={()=>skipTrackHandler("skip-back")}  
        />

        {isPlaying ? (
          <FontAwesomeIcon onClick={pauseSongHandler} className="pause" size="2x" icon={faPause} />
        ) : (
          <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={faPlay} />
        )}

        <FontAwesomeIcon 
          className="skip-forward" 
          size="2x" 
          icon={faAngleRight} 
          onClick={()=>skipTrackHandler("skip-forward")}  
        />
        

        
      </div>


    </div>
  );
};

export default Player;
