import { useEffect } from "react"

export const Reciever = () => {

    // const [socket , setSocket] = useState<WebSocket | null>(null)
    // const [pc , setPc] = useState<RTCPeerConnection | null>(null)
    // const videoRef = useRef<HTMLVideoElement>(null)
    
        useEffect(()=>{
            const socket = new WebSocket('ws://localhost:8080')
            // setSocket(socket)
            socket.onopen = () => {
                socket.send(JSON.stringify({ type : 'reciever' }))
            }

            const pc = new RTCPeerConnection()
            // setPc(pc)
            pc.onicecandidate = (event) => {
                // console.log(event)
                if(event.candidate){
                    socket?.send(JSON.stringify({ type : 'iceCandidate' , candidate : event.candidate}))
                }
            }

            pc.ontrack = (event) => {
                console.log("Track received")
                const video = document.createElement('video')
                video.autoplay = true
                video.muted = true
                video.controls = true
                video.srcObject = new MediaStream([event.track])
                document.body.appendChild(video)
            }

            socket.onmessage = async (event) => {
                const message = JSON.parse(event.data)
                if(message.type === "createOffer"){
                    await pc.setRemoteDescription(message.sdp)
                    const answer = await pc.createAnswer()
                    await pc.setLocalDescription(answer)
                    // console.log(answer)
                    // console.log(pc.localDescription)
                    socket.send(JSON.stringify({ type : 'createAnswer' , sdp : pc.localDescription}))
                } else if(message.type === "iceCandidate") {
                    pc?.addIceCandidate(message.candidate)
                }
            }
        },[])


    return(
        <div>
            Reciever
            {/* <video ref={videoRef}></video> */}
        </div>
    )
}