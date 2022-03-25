import React,{useState,useEffect,useRed} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMusic} from '@fortawesome/free-solid-svg-icons';

const Nav = ({libraryStatus,setLibraryStatus})=>{

    const libraryStatusHandler = (event)=>{
        setLibraryStatus(!libraryStatus);

    }

    return(
       <nav>

           <h1>Waves</h1>
           <button onClick={libraryStatusHandler}>
               Library
               <FontAwesomeIcon icon={faMusic} />
           </button>
       </nav>
    );



}


export default Nav;