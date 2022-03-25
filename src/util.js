export const runAudioCorrectly = async(isPlaying,audioRef)=>{
    if(isPlaying){
        //this is to wait for the song to load first, .play() returns a promise, when it is resolved the next line can run
        await audioRef.current.play();
        audioRef.current.play();
  
      }
  
}