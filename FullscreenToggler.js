import { useState, useEffect } from 'react';

const FullscreenToggler = () => {

  // Initialize fullscreen mode toggler
  const togglerExpand   = <svg height="20" viewBox="0 0 32 32" style={{fill: '#000000'}} xmlns="http://www.w3.org/2000/svg"><path d="m 0,0 c 0,4 0,8 0,12 1.3333333,0 2.6666667,0 4,0 C 4,9.3333333 4,6.6666667 4,4 6.6666667,4 9.3333333,4 12,4 12,2.6666667 12,1.3333333 12,0 8,0 4,0 0,0 Z m 20,0 c 0,1.3333333 0,2.6666667 0,4 2.666667,0 5.333333,0 8,0 0,2.6666667 0,5.3333333 0,8 1.333333,0 2.666667,0 4,0 C 32,8 32,4 32,0 28,0 24,0 20,0 Z M 0,20 c 0,4 0,8 0,12 4,0 8,0 12,0 0,-1.333333 0,-2.666667 0,-4 -2.6666667,0 -5.3333333,0 -8,0 0,-2.666667 0,-5.333333 0,-8 -1.3333333,0 -2.6666667,0 -4,0 z m 28,0 c 0,2.666667 0,5.333333 0,8 -2.666667,0 -5.333333,0 -8,0 0,1.333333 0,2.666667 0,4 4,0 8,0 12,0 0,-4 0,-8 0,-12 -1.333333,0 -2.666667,0 -4,0 z" /></svg>
  const togglerCompress = <svg height="20" viewBox="0 0 32 32" style={{fill: '#000000'}} xmlns="http://www.w3.org/2000/svg"><path d="M 8,0 C 8,2.6666667 8,5.3333333 8,8 5.3333333,8 2.6666667,8 0,8 c 0,1.3333333 0,2.666667 0,4 4,0 8,0 12,0 C 12,8 12,4 12,0 10.666667,0 9.3333333,0 8,0 Z m 12,0 c 0,4 0,8 0,12 4,0 8,0 12,0 0,-1.333333 0,-2.6666667 0,-4 -2.666667,0 -5.333333,0 -8,0 0,-2.6666667 0,-5.3333333 0,-8 -1.333333,0 -2.666667,0 -4,0 z M 0,20 c 0,1.333333 0,2.666667 0,4 2.6666667,0 5.3333333,0 8,0 0,2.666667 0,5.333333 0,8 1.3333333,0 2.666667,0 4,0 0,-4 0,-8 0,-12 -4,0 -8,0 -12,0 z m 20,0 c 0,4 0,8 0,12 1.333333,0 2.666667,0 4,0 0,-2.666667 0,-5.333333 0,-8 2.666667,0 5.333333,0 8,0 0,-1.333333 0,-2.666667 0,-4 -4,0 -8,0 -12,0 z" /></svg>;
  const [ togglerFullscreen, setTogglerFullscreen ] = useState( togglerExpand );

  // Function to enter fullscreen mode
  const enterFullscreenMode = () => {
    let elem = document.documentElement;
    if ( elem.requestFullscreen ) {
      elem.requestFullscreen();
    }
  }
  
  // Function to exit fullscreen mode
  const exitFullscreenMode = () => {
    let elem = document;
    if( elem.fullscreenElement === elem.documentElement ) {
      elem.exitFullscreen();
    } else if ( window.innerHeight === window.screen.height ) {
      //elem.exitFullscreen();
      console.error("User has entered fullscreen mode through F11 browser feature." 
                    + "\nIn that specific case, it is not possible to exit fullscreen mode with the fullscreen toggler!"
                    + "\nPlease use the F11 key to exit fullscreen mode...");
    }
  }
  
  // Function to toggle fullscreen mode
  const toggleFullscreen = () => {
    if ( window.innerHeight === window.screen.height ) {
      exitFullscreenMode();
    } else { 
      enterFullscreenMode();
    }
  }

  // Function to handle fullscreen mode change event
  const handleFullscreenChange = () => {
    if ( window.innerHeight === window.screen.height ) {   
      setTogglerFullscreen( togglerCompress );
    } else {  
      setTogglerFullscreen( togglerExpand );
    }
  }

  useEffect( () => {

    // Setup "resize" event listener
    window.addEventListener( "resize", handleFullscreenChange );

    // Destroy existing event listeners when component unmount
    return () => {
      window.removeEventListener( "resize",  handleFullscreenChange );
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  return (
    <button type="button" onClick={toggleFullscreen}>
      { togglerFullscreen }
    </button>
  )
  
}

export default FullscreenToggler;