import { useEffect, useState } from "react"

export const Sender = () => {
    // const [socket , setSocket] = useState<WebSocket | null>(null)
    const [pc , setPc] = useState<RTCPeerConnection | null>(null)

    useEffect(()=>{
        const socket = new WebSocket('ws://localhost:8080')
        // setSocket(socket)
        socket.onopen = () => {
            socket.send(JSON.stringify({
                type : 'sender'
            }))
        }

        const pc = new RTCPeerConnection()
        setPc(pc)
        pc.onnegotiationneeded = async() => {
            // console.log("onnegotiationneeded")
            const offer = await pc.createOffer()
            await pc.setLocalDescription(offer)
            // console.log("offer->" ,offer)
            // console.log(pc.localDescription)
            socket?.send(JSON.stringify({type : 'createOffer' , sdp : pc.localDescription}))
        }
        pc.onicecandidate = (event) => {
            // console.log(event)
            if(event.candidate){
                socket?.send(JSON.stringify({ type : 'iceCandidate' , candidate : event.candidate}))
            }
        }

        socket.onmessage = async (event) => {
            const data = JSON.parse(event.data)
            if(data.type === "createAnswer"){
                await pc?.setRemoteDescription(data.sdp)
            } else if(data.type === "iceCandidate"){
                pc?.addIceCandidate(data.candidate)
            }
        }
    },[])

    async function startSendingVideo(){
        if(pc === null){
            console.log("No pc")
        }else{
            // const stream = await navigator.mediaDevices.getUserMedia({ video : true , audio : false})
            // pc.addTrack(stream.getVideoTracks()[0])
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            // stream.getTracks().forEach(track => pc.addTrack(track, stream));
            pc.addTrack(stream.getVideoTracks()[0] , stream)
        }
    }

    return(
        <div>
            Sender
            <button onClick={startSendingVideo}>Start Transmition</button>
        </div>
    )
}