import { CreatePost } from "./admin/createPost"
import { Navigate, useNavigate } from "react-router-dom"
import '../../App'
import { EditPost } from "./admin/editPost"
import { act, use, useState } from "react"

export function Admin() {

   const [action, setAction] = useState("");

   return (
      <main>

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

            { action === "post" && (
               <CreatePost />
            )}
            {action === "edit" && (
               <EditPost />
            )}

         </section>
      </main>
   )
}