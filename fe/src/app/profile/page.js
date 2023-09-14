"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "../../lib/axios";

const Profile = () => {
    const router = useRouter();
    const {status, data} = useSession();
    const {player, setPlayer} = useState();
    useEffect(()=> {
        if(status === 'unauthenticated'){
            router.push("/login");
        }
    },[status])

    useEffect(()=>{
        axios
        .get("/player/1")
        .then((data)=>{
            setPlayer([]);
            setPlayer(data.data.data);
            console.log(data.data.data);
        }).catch(()=>{
            alert("something wrong")
        })
    })

    // return (<>This is for protected user {data?.user?.name}</>)
    return (
        <>
            <h1>{player}</h1>
        </>
    )
}

export default Profile;