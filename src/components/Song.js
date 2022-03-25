import React, {useState, useEffect} from "react";

let Song = ({currentSong, isPlaying}) => {
  return (
    <div className="song-container">
      <img className={`${isPlaying ? "rotating" : ""}`} src={currentSong.cover} alt="currentSongCover" />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
