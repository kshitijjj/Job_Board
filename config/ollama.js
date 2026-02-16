import dotenv from 'dotenv'
dotenv.config();

const options={
    url:'https://ollama.com/api/generate',
    data:{
        "model":"gemini-3-flash-preview",
        "prompt":"",
        "stream":false
    },
    headers:{
        Authorization:'Bearer ' +"249a68fd23b547c18c9883b542bd522c.AyDoEJdhhSeKt3yV6Ns2TkEK",
        'Content-Type':'application/json'
    }
}

export default options;