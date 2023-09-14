"use client";

import React, { useEffect, useState } from 'react'
// import axios from "../../lib/axios";
import Image from 'next/image';
import gambarBatu from '../../../public/images/batu.png'
import gambarGunting from '../../../public/images/gunting.png'
import gambarKertas from '../../../public/images/kertas.png'
import gambarRefresh from '../../../public/images/refresh.png'
import styles from './game.module.css';


function Game(){
    const [isRock, setIsRock] = useState(false)
    const [isScissor, setIsScissor] = useState(false)
    const [isPaper, setIsPaper] = useState(false)

    const [isComRock, setIsComRock] = useState(false)
    const [isComScissor, setIsComScissor] = useState(false)
    const [isComPaper, setIsComPaper] = useState(false)

    const [isInteractive, setIsInteractive] = useState(true)

    const [gameStatus, setGameStatus] = useState('default')

    // const refId = useRef();
    // const refTotalScore = useRef();

    // function addPoint(e) {
    //     e.preventDefault();
    //     const id = refId.current.value;
    //     const dataPlayer = {
    //         total_score: refTotalScore.current.value
    //     };

    //     axios
    //         .put(`/player/${id}/add-point`, dataPlayer)
    //         .then((data) => {
    //             if (data.status != 200) {
    //               alert("failed to save data");
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // };


    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    
    function comChoose(){
        let result = getRandomArbitrary(1,4)
        if (result == 1){
            setIsComRock(true)
        } else if (result == 2){
            setIsComScissor(true)
        } else{
            setIsComPaper(true)
        }
    }

    function refreshBoard(){
        setGameStatus('default');
        setIsInteractive(true);

        setIsRock(false);
        setIsPaper(false);
        setIsScissor(false);

        setIsComRock(false);
        setIsComPaper(false);
        setIsComScissor(false);
    }

    async function condition(){
        if((isRock && isComRock) || (isScissor && isComScissor) || (isPaper && isComPaper)){
            setGameStatus('draw');

        } else if (isRock && isComPaper){
            setGameStatus('lose');
        } else if (isRock && isComScissor){
            setGameStatus('win');
            // addPoint();
        } else if (isScissor && isComPaper){
            setGameStatus('win');
            // addPoint();
        } else if (isScissor && isComRock){
            setGameStatus('lose');
        } else if (isPaper && isComScissor){
            setGameStatus('lose');
        } else if (isPaper && isComRock){
            setGameStatus('win');
            // addPoint();
        }
    }

    async function decideResult(choice){
        console.log('clicked');
        setIsInteractive(false);
        if (choice === 'batu'){
            setIsRock(true);
        } else if (choice === 'gunting'){
            setIsScissor(true);
        } else {
            setIsPaper(true);
        }
        await comChoose();
    }

    useEffect(()=>{
        condition();
    }, [isRock, isPaper, isScissor])

    useEffect(()=>{
        console.log('is interactive: ', isInteractive);
    }, [isInteractive]);

    useEffect(()=>{
        console.log('Game Stat: ', gameStatus);
    }, [gameStatus]);

	return (
        <div className= {styles.gameContainer}>
            <div className= {styles.player}>
                <p className={styles.textPlayer}>PLAYER 1</p>
                <Image 
                className={isRock?`${styles.img} ${styles.playerRock} ${styles.selected}` : `${styles.img} ${styles.imgClickable} ${styles.playerRock}`} 
                id={isInteractive?``:`${styles.disableImg}`}
                onClick={() => decideResult('batu')}
                src={gambarBatu}
                alt="batu.png" 
                width="100"
                />
                <Image 
                className={isPaper?`${styles.img} ${styles.playerPaper} ${styles.selected}` : `${styles.img} ${styles.imgClickable} ${styles.playerPaper}`} 
                id={isInteractive?``:`${styles.disableImg}`}
                onClick={() => decideResult('kertas')}
                src={gambarKertas}
                alt="kertas.png" 
                width="100"
                />
                <Image 
                className={isScissor?`${styles.img} ${styles.playerScissor} ${styles.selected}` : `${styles.img} ${styles.imgClickable} ${styles.playerScissor}`}
                id={isInteractive?``:`${styles.disableImg}`}
                onClick={() => decideResult('gunting')}
                src={gambarGunting}
                alt="gunting.png" 
                width="100"/>
            </div>
            <div className={styles.midUtilities}>
                {
                    gameStatus === 'win'?
                        <h1 className={styles.textWin}>YOU WIN</h1>
                    :
                        (gameStatus === 'lose'?
                            <h1 className={styles.textLose}>YOU LOSE</h1>
                        :
                            (gameStatus === 'draw'?
                                <h1 className={styles.textDraw}>DRAW</h1>
                            :
                                <h1 className={styles.textVs}>VS</h1>
                            )
                        )
                    
                }
                <Image 
                className={`${styles.img} ${styles.imgClickable} ${styles.btnRefresh}`} 
                id='refresh' 
                onClick={() => refreshBoard()}
                src={ gambarRefresh }
                alt="refresh.png" 
                width="75"/>
            </div>
            <div className={styles.com}>
                <p className={styles.textCom}>COM</p>
                <Image 
                className={isComRock?`${styles.img} ${styles.comRock} ${styles.selected}` : `${styles.img} ${styles.comRock}`} 
                id='1' 
                src={gambarBatu}
                alt="batu.png" 
                width="100"/>
                <Image 
                className={isComPaper?`${styles.img} ${styles.comPaper} ${styles.selected}` : `${styles.img} ${styles.comPaper}`} 
                id='2' 
                src={gambarKertas}
                alt="kertas.png" 
                width="100"/>
                <Image 
                className={isComScissor?`${styles.img} ${styles.comScissor} ${styles.selected}` : `${styles.img} ${styles.comScissor}`} 
                id="3" 
                src={gambarGunting}
                alt="gunting.png" 
                width="100"/>
            </div>
        </div>
	)
}

export default Game;
