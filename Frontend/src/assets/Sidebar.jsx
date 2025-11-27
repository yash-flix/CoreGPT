
import "./Sidebar.css"
import { MyContext } from "../MyContext";
import { useContext , useEffect } from "react";
import {v1 as uuidv1} from "uuid" ;


function Sidebar()
{
    const {allthreads , setAllThreads ,currThreadId , setCurrThreadId , setNewChat , setPrompt , setReply , setPrevChats} = useContext(MyContext);

    const getAllThreads = async ()=>
    {
        try {
            const response = await fetch("http://localhost:8000/api/thread");
            const res = await response.json();
            //  console.log(res);
            const filteredData = res.map((thread)=>(
              
                {threadId: thread.threadId , title : thread.messages[0].content}
            ))
            // console.log(filteredData);
            setAllThreads(filteredData);
            
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(()=>
    {
        getAllThreads();

    }, [currThreadId])

    const createNewChat = async()=>
    {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);

    }
    const changeThread = async(newThreadId)=>
    {
        setCurrThreadId(newThreadId);
        try {
            const response = await fetch(`http://localhost:8000/api/thread/${newThreadId}`);
            const res = await response.json();
            console.log(res);
            setPrevChats(res);
            setNewChat(false);
            setReply(null);
            
        } catch (error) {
            console.log(error)
        }

    }
       const deleteThread = async(ThreadId) =>
        {
            try {
                const response = await fetch(`http://localhost:8000/api/thread/${ThreadId}` , {method : "DELETE"
                })
                const res = await response.json();
                //updated thread re-render
                setAllThreads(prev=> prev.filter(thread => thread.threadId !== ThreadId));

                if(ThreadId === currThreadId)
                {
                    createNewChat();
                }
                
            } catch (error) {
                console.log(error)
            }

        }
    return (
        <section className="sidebar">
          
            <button onClick={createNewChat}>
            <img className="logo" src="src/assets/blacklogo.png" alt="gpt logo"></img>
           
            <span><i className="fa-solid fa-pen-to-square "></i></span>
            </button>

            <ul className="history">
                
                {
                    allthreads?.map((thread, idx)=>
                    (
                        <li key={idx} onClick={()=>changeThread(thread.threadId)}
                        className={thread.threadId === currThreadId ? "highlighted" : ""}>{thread.title}
                        <i className="fa-regular fa-trash-can " onClick={(e)=>
                            { e.stopPropagation()
                                deleteThread(thread.threadId);
                            }
                        }></i>
                        </li>
                    ))
                }
                
            </ul>
  
            <div className="sign">
                <p>Your very Own LLM &hearts;</p>
            </div>
        </section>
    )
}
export default Sidebar;