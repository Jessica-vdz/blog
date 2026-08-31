import { use, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./../../App.css";

export function RL() {
    return (
        <main>
            <section className="header">
                <h1>Newsletter</h1>
                <article className="header-info">
                    <h2>About : </h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni atque unde quibusdam commodi, dolorem maiores, tempore iusto quos doloremque natus dolor hic tempora quidem rem. Fuga quas maiores sint assumenda.</p>
                </article>
            </section>
            <Register />
            <Login />
        </main>
    )
}
export function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const response = await fetch("http://localhost/blog/backend/register.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        if (data.success) {
            setMessage("Registered successfully!");
        } else {
            setMessage(data.message || "Registration failed");
        }
    };

    return (
        <section className="main-content">
            <article className={"formContainer"}>
                <h1 className={"main-content-header"}>REGISTREREN</h1>
                <form onSubmit={handleSubmit} className={"main-content-card"}>
                    <div className={"formInfo"}>
                        <label className="formContent">
                            <h3 className={"formTitle"}>Name</h3>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className={"formInput"}
                            />
                        </label>
                        <label className="formContent">
                            <h3 className={"formTitle"}>E-mail</h3>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={"formInput"}

                            />
                        </label>
                        <label className="formContent">
                            <h3>Password</h3>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className={"formInput"}
                            />
                        </label>
                    </div>
                    <button type="submit"
                        className={"loginButton"}
                        disabled={loading}>
                        {loading ? "Bezig..." : "Registreren"}
                    </button>
                </form>
            </article>
        </section>

    );
}

export function Login() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost/blog/backend/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
                setMessage("Succesvol ingelogd!");

                if (data.user.admin === 1) {
                    navigate("/admin");

                } else if (data.user.role === 0) {
                    navigate("/home");
                }
            } else {
                setMessage("Onjuiste gegevens.");
            }
        } catch (err) {
            setMessage("Er ging iets mis.");
            console.log(err);
        }

        setLoading(false);
    };

    return (
        <section className="main-content">

            <article className="formContainer">
                <h1 className={"main-content-header"}>LOGIN</h1>

                <form onSubmit={handleSubmit} className={"main-content-card"}>
                    <div className={"formInfo"}>
                        <label className={"formContent"}>
                            <h3>E-mail</h3>
                            <input
                                type="email"
                                placeholder="jouw@email.nl"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={"formInput"}
                            />
                        </label>

                        <label className={"formContent"}>
                            <h3>WACHTWOORD</h3>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className={"formInput"}
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        className={"loginButton"}
                        disabled={loading}
                    >
                        {loading ? "Bezig..." : "LOGIN"}
                    </button>
                </form>

                {message && <p className={"message"}>{message}</p>}
            </article>
        </section>

    );
}