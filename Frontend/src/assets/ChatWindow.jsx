
import "./ChatWindow.css"
import Chat from "./Chat.jsx"
import { MyContext } from "../MyContext.jsx";
import { useContext , useState , useEffect } from "react";
import {RingLoader} from "react-spinners"

function ChatWindow()
{
    const {prompt , setPrompt , reply , setReply , currThreadId , setCurrThreadId , prevChats , setNewChat , setPrevChats} = useContext(MyContext);
    const [loading , setLoading] = useState(false);
    const getReply = async()=>
    {
        setLoading(true);
        setNewChat(false);
        const options = {
            method : "POST",
            headers :
            {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                message : prompt,
                threadId : currThreadId
            })
        };
        try {
            const response = await fetch("http://localhost:8000/api/chat" , options);
            const res = await response.json();
            console.log(res);
            setReply(res.reply)
            

        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    
    }
    useEffect(()=>
    {
        if(prompt && reply)
        {
            setPrevChats(prevChats => [...prevChats,
                {
                    role : "user",
                    content : prompt
                },
                {
                    role:"assistant",
                    content : reply
                }

            ])
        }
        setPrompt("");

    } , [reply])

    return (
        <div className="chatWindow">
            <div className="navbar">
                <span>CoreGPT <i className="fa-solid fa-chevron-down"></i></span>
                <div className="userIconDiv">
                   <span><i className="fa-solid fa-user"></i></span> 
                </div>

            </div>
            <Chat/>
            <RingLoader color="#fff" loading = {loading}>

            </RingLoader>
            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask Anything" value={prompt} onChange={(e)=> setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter"? getReply() : ""}>
                    </input>
                    <div id="submit" onClick={getReply}>

                        <i className="fa-solid fa-arrow-up"></i>
                    </div>
                </div>
                <p className="info">CoreGPT can make mistakes. Check imortant info.See Cookie Preferences</p>

            </div>

        </div>
    )
}
export default ChatWindow;