import React, {useState, useEffect, useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons";

let Player = ({currentSong, songs, setCurrentSong, setSongs, songState, setSongState, firstRender}) => {

  // all the required functions

  let audioRef = useRef();

  let playSongHandler = (event) => {
    audioRef.current.play();
    setSongState(songState ? false : true);
  };

  let pauseSongHandler = (event) => {
    audioRef.current.pause();
    setSongState(songState ? false : true);
  };


  // returning the component

  return (
    <div className="player">
      <div className="time-control">
        <p>Start Time</p>
        <input type="range" />
        <p>End Time</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />

        {songState ? (
          <FontAwesomeIcon onClick={pauseSongHandler} className="pause" size="2x" icon={faPause} />
        ) : (
          <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={faPlay} />
        )}

        <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />

        <audio ref={audioRef} src={currentSong.audio}></audio>
      </div>
    </div>
  );
};

export default Player;
