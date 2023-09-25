"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import React from 'react';
import {Page, Text, View, Document, StyleSheet, BlobProvider} from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff'
    },
    title: {
        fontSize: '16pt'
    },
    section: {
        margin: 4, padding: 8, fontSize: '12pt'
    }
});



const Profile = () => {
    const router = useRouter();
    const {status, data} = useSession();
    const [pdfPanel, showPdfPanel] = useState(false)
    const [player, setPlayerData] = useState({
        'data':{
        'id': '',
        'email': '',
        'username': '',
        'bio': "",
        'city': '',
        'social_media_url': '',
        'total_score': ''
    }  });

    function pdfText() {
        return(
            <Document>
                <Page size='A4' style={styles.page}>
                    <View style={styles.section}>
                        <Text style={styles.title}>{player.data.username}'s Data:</Text>
                        <View style={styles.section}>
                            <Text>ID: {player.data.id}</Text>
                            <Text>Email: {player.data.email}</Text>
                            <Text>Bio: {player.data.bio}</Text>
                            <Text>City: {player.data.city}</Text>
                            <Text>Social Media: {player.data.social_media_url}</Text>
                            <Text>Total Score: {player.data.total_score}</Text>
                        </View>
                    </View>
                </Page>
            </Document>
        )
    }

    useEffect(()=> {
        if(status === 'unauthenticated'){
            router.push("/login");
        }
    },[status])

    useEffect(()=>{
        axios
        .get("/player/1")
        .then((data)=>{

            setPlayerData(data.data);
            console.log(data.data);
        }).catch((err)=>{
            // alert(err)
            console.log(err)
        })
    },[])

    // return (<>This is for protected user {data?.user?.name}</>)
    return (
    <div>
        <h1>Player Information Form</h1>
        <form>
            <label htmlFor="playerId">Player ID:</label>
            <input
            disabled='true'
            type="text"
            id="playerId"
            name="playerId"
            value={player.data.id}
            /><br /><br />

            <label htmlFor="playerEmail">Email:</label>
            <input
            disabled='true'
            type="email"
            id="playerEmail"
            name="playerEmail"
            value={player.data.email}
            /><br /><br />

            <label htmlFor="playerUsername">Username:</label>
            <input
            disabled='true'
            type="text"
            id="playerUsername"
            name="playerUsername"
            value={player.data.username}
            /><br /><br />

            <label htmlFor="playerBio">Bio:</label>
            <input
            disabled='true'
            type="text"
            id="playerBio"
            name="playerBio"
            value={player.data.bio}
            /><br /><br />

            <label htmlFor="playerCity">City:</label>
            <input
            disabled='true'
            type="text"
            id="playerCity"
            name="playerCity"
            value={player.data.city}
            /><br /><br />

            <label htmlFor="playerSocialMedia">Social Media:</label>
            <input
            disabled='true'
            type="text"
            id="playerSocialMedia"
            name="playerSocialMedia"
            value={player.data.social_media_url}
            /><br /><br />

            <label htmlFor="playerTotalScore">Total Score:</label>
            <input
            disabled='true'
            type="text"
            id="playerTotalScore"
            name="playerTotalScore"
            value={player.data.total_score}
            /><br /><br />

            <button type="button" onClick={()=> showPdfPanel(!pdfPanel)}>
            Show PDF
            </button>
        </form>
        {pdfPanel ?
            <BlobProvider document={pdfText()}>
                {({url})=> <iframe src={url} style ={{width: '100%', height:'100%'}} />}
            </BlobProvider>
            :
            <></>
        }
    </div>

    )
}

export default Profile;