import React from "react"
import Link from 'next/link'

export default function Block({ data }) {
    // console.log(data)
    return (<Link href={`/resources/${data.url || "coming-soon"}`} >
        <div className="resource-block" style={{
            position: "relative", backgroundImage: `url(${data.img.url})`, clipPath: "polygon(0 0, 100% 0, 100% 80%, 80% 100%, 0 100%)", backgroundSize: "cover",
            cursor: "pointer",
            height: "400px",
            marginBottom: "2.5rem"
        }}>
            <h1 className="text-white text-4xl p-10 resource-block-title" style={{
                backgroundColor: "transparent",
                position: "absolute",
                zIndex: "2",
                wordBreak: "break-word"
            }} >{data.title}</h1>
        </div></Link>
    )
}