import React, { useState, useRef } from 'react'
import styles from '../app/game/game.module.css'
const BtnPlayMusik = () => {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <>
      <div className="">

        <audio ref={audioRef} src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' autoPlay={true} loop />
        <button styles={styles.btnMusik} onClick={togglePlay} className='position-absolute bottom-0 btn bg-primary text-white btn-musik left-50 mt-5'>
          {isPlaying ? "Play Musik" : "Pause"}
        </button>
      </div>
    </>
  )
}

export default BtnPlayMusik