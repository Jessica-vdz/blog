import { Navigate } from "react-router-dom";

export function AdminRoute({children}){
    const storedUser = localStorage.getItem("user");

    if(!storedUser)  {
        return <Navigate to="/login" replace />
    }

    const user = JSON.parse(storedUser);

    if (user.admin !== 1) {
        return <Navigate to="/" replace />
    }

    return children;
}