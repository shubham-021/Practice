import { RawData, WebSocket , WebSocketServer } from 'ws'

const wss = new WebSocketServer({port : 8080})

let senderSocket : WebSocket | null = null
let recieverSocket : WebSocket | null = null

wss.on('connection' , function connection(ws){
    ws.on('error' , console.error)
    ws.on('message' , function message(data){
        const message = JSON.parse(data.toString())
        if(message.type == "sender"){
            senderSocket = ws
            console.log("Sender Set")
        } else if(message.type == "reciever"){
            recieverSocket = ws
            console.log("Reciever Set")
        } else if(message.type == "createOffer"){
            if(ws !== senderSocket){
                return;
            }
            recieverSocket?.send(JSON.stringify({type : 'createOffer' , sdp : message.sdp}))
            console.log("Offer created")
        } else if(message.type == "createAnswer"){
            if(ws !== recieverSocket){
                return;
            }
            senderSocket?.send(JSON.stringify({type : 'createAnswer' , sdp : message.sdp}))
            console.log("Answer created")
        } else if(message.type == "iceCandidate"){
            if(ws === senderSocket){
                recieverSocket?.send(JSON.stringify({type : 'iceCandidate' , candidate : message.candidate}))
            } else if(ws === recieverSocket){
                senderSocket?.send(JSON.stringify({type : 'iceCandidate' , candidate : message.candidate}))
            }
        }
    })
})
