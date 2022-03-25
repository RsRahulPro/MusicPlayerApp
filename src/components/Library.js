import React,{useEffect,useRef,useState} from 'react';
import LibrarySong from './LibrarySong';

const Library = (
    {songs,currentSong,setCurrentSong,isPlaying,setIsPlaying,audioRef,setSongs,libraryStatus}
    )=>{

    let activeClassHandler = ()=>{

        if(libraryStatus){
            return "active-library";
        }else{
            return "";
        }

    }
    return(

        <div className={`library ${activeClassHandler()}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {
                   songs.map(Song=>

                    <LibrarySong 
                        Song={Song} 
                        key={Song.id} 
                        currentSong={currentSong} 
                        setCurrentSong={setCurrentSong} 
                        isPlaying={isPlaying} 
                        setIsPlaying={setIsPlaying}
                        audioRef={audioRef}
                        songs={songs}
                        setSongs={setSongs}
                        id={Song.id}
                    />
                    ) 

                }
            </div>

        </div>

    );




}

export default Library;