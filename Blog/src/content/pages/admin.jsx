import { CreatePost, SendToLatest } from "./admin/createPost"
import { Mailbot } from "../components/mailbot"
import { Navigate, useNavigate } from "react-router-dom"
import '../../App'
import { EditPost } from "./admin/editPost"
import { useState } from "react"

export function Admin() {

   const [action, setAction] = useState("");

   return (
      <main>
         <header className="header">
            <h2>dit is mail</h2>
            <Mailbot />
         </header>
         <section className="main-content" id="post-container">
            <form>
               <label>
                  <select value={action} 
                  onChange={(e) => setAction((e).target.value)} 
                  required>
                     <option value="">Choose a action</option>
                     <option value="post">post</option>
                     <option value="edit">edit</option>
                  </select>
               </label>
            </form>

            {action === "post" && (
               <CreatePost/>
            )}
            {action === "edit" && (
               <EditPost/>
            )}

         </section>
      </main>
   )
}