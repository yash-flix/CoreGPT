
import "./Sidebar.css"
import { MyContext } from "../MyContext";
import { useContext , useEffect } from "react";


function Sidebar()
{
    const {allthreads , setAllThreads ,currThreadId } = useContext(MyContext);

    const getAllThreads = async ()=>
    {
        try {
            const response = await fetch("http://localhost:8000/api/thread");
            const res = await response.json();
            //  console.log(res);
            const filteredData = res.map((thread)=>(
              
                {threadId: thread.threadId , title : thread.messages[0].content}
            ))
            console.log(filteredData);
            setAllThreads(filteredData);
            
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(()=>
    {
        getAllThreads();

    }, [currThreadId])
    return (
        <section className="sidebar">
          
            <button>
            <img className="logo" src="src/assets/blacklogo.png" alt="gpt logo"></img>
           
            <span><i className="fa-solid fa-pen-to-square "></i></span>
            </button>

            <ul className="history">
                
                {
                    allthreads?.map((thread, idx)=>
                    (
                        <li key={idx}>{thread.title}</li>
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