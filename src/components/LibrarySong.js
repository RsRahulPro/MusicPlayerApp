import React, { useState, useEffect } from "react";

let LibrarySong = ({ Song,currentSong,setCurrentSong,isPlaying,setIsPlaying,audioRef,songs,setSongs,id}) => {

  let librarySongClickHandler = async (event)=>{

    const newSongs = songs.map((song)=>{

      if(song.id === id){

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

    await setSongs(newSongs);
    let currentSongUpdated = newSongs.filter(song=>song.active);
    await setCurrentSong(currentSongUpdated[0]);
    console.log(songs);


    if(isPlaying){
      //this is to wait for the song to load first, .play() returns a promise, when it is resolved the next line can run
      await audioRef.current.play();
      audioRef.current.play();

    }

  }
  let selectedSongHandler = ()=>{

    if(currentSong.id === id ){
      return "selected-song";
    }else{
      return "";
    }

  }

  return (
    <div className={`library-song ${selectedSongHandler()}`} onClick={librarySongClickHandler}>
      <img src={Song.cover} alt={Song.cover} />
      <div className="song-description">
        <h3>{Song.name}</h3>
        <h4>{Song.artist}</h4>
      </div>
      
    </div>
  );
};

export default LibrarySong;
