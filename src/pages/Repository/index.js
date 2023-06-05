import React from "react";
// import {useParams} from 'react-router-dom'
export default function Repository({match}){
 
    // let { repositorio } = useParams()
 
    return(
 
        <h1 style={{color: "#FFF"}}>
            {decodeURIComponent(match.params.repositorio)}
        </h1>
    )
}