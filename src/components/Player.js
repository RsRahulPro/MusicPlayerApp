import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

let Player = ({
  currentSong,
  songs,
  setCurrentSong,
  setSongs,
  songState,
  setSongState,
  firstRender,
}) => {
  let previousSongRef = useRef(songState);
  let audioRef = useRef();
  let playSongHandler = (event) => {
    audioRef.current.play();
    setSongState(songState ? false : true);
    firstRender.current = true;
  };
  let pauseSongHandler = (event) => {
    audioRef.current.pause();
    setSongState(songState ? false : true);
    firstRender.current = true;
  };
  let nextSongHandler = (event) => {
    setSongs((previousSongsState) => {
      for (let i = 0; i < previousSongsState.length; i++) {
        if (previousSongsState[i].active === true) {
          previousSongsState[i].active = false;
          previousSongsState[i + 1].active = true;
          console.log(previousSongsState);
          break;
        }
      }

      return previousSongsState;
    });
    setCurrentSong(songs.filter((song) => song.active)[0]);
    previousSongRef = songState;
    pauseSongHandler();
    if (previousSongRef == true) {
      firstRender.current = false;
    }
  };
  let previousSongHandler = (event) => {
    console.log(event.target);
    setSongs((previousSongsState) => {
      for (let i = 0; i < previousSongsState.length; i++) {
        if (previousSongsState[i].active === true) {
          previousSongsState[i].active = false;
          previousSongsState[i - 1].active = true;
          console.log(previousSongsState);
          break;
        }
      }

      return previousSongsState;
    });
    setCurrentSong(songs.filter((song) => song.active)[0]);
    pauseSongHandler();
    firstRender.current = false;
  };
  useEffect(() => {
    console.log(`value of first render is ${firstRender.current}`);
    if (firstRender.current == false) {
      playSongHandler();
    }
  });

  return (
    <div className="player">
      <div className="time-control">
        <p>Start Time</p>
        <input type="range" />
        <p>End Time</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
          onClick={previousSongHandler}
        />
        {songState ? (
          <FontAwesomeIcon
            onClick={pauseSongHandler}
            className="pause"
            size="2x"
            icon={faPause}
          />
        ) : (
          <FontAwesomeIcon
            onClick={playSongHandler}
            className="play"
            size="2x"
            icon={faPlay}
          />
        )}

        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={nextSongHandler}
        />

        <audio ref={audioRef} src={currentSong.audio}></audio>
      </div>
    </div>
  );
};

export default Player;
