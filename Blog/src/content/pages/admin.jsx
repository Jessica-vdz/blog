import { CreatePost, SendToLatest } from "./admin/createPost"
import { Mailbot } from "../components/mailbot"
import { Navigate, useNavigate } from "react-router-dom"
import '../../App'

export function Admin() {

   return (
      <main>
         <header className="header">
            <h2>dit is mail</h2>
            <Mailbot />
         </header>
         <section className="main-content" id="post-container">
            <SendToLatest />
            <CreatePost />
         </section>
         <section className="side-content">
            <h2>Edit</h2>
         </section>
      </main>
   )
}