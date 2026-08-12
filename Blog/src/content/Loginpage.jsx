import { use, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Loginpage() {
    const [user, setUser] = useState(null);

    return (
        <main className="Flex">
            <Register />
            <Login setUser={setUser} />
        </main>
    )
}

export function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const role = "parent";

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const response = await fetch("http://localhost/blog/backend/register.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role }),
        });

        const data = await response.json();
        if (data.success) {
            setMessage("Registered successfully!");
        } else {
            setMessage(data.message || "Registration failed");
        }
    };

    return (
        <section className={"loginRegisterContainer"}>
            <article className={"formContainer"}>
                <h1 className={"formHeader"}>REGISTREREN</h1>
                <form onSubmit={handleSubmit} className={"formContent"}>
                    <div className={"formInfo"}>
                        <label>
                            <h3 className={"formTitle"}>NAAM</h3>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className={"formInput"}
                            />
                        </label>
                        <label>
                            <h3 className={"formTitle"}>E-MAIL</h3>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={"formInput"}

                            />
                        </label>
                        <label>
                            <h3 className={"formTitle"}>WACHTWOORD</h3>
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
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(null);
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

                if (data.user.role === "parent") {
                    navigate("/parent");
                } else if (data.user.role === "admin") {
                    navigate("/admin");
                }
            } else {
                setMessage("Onjuiste gegevens.");
            }
        } catch (err) {
            setMessage("Er ging iets mis.");
        }

        setLoading(false);
    };

    return (
        <section className={"loginRegisterContainer"}>
            <article className={"formContainer"}>
                <h1 className={"formHeader"}>LOGIN</h1>

                <form onSubmit={handleSubmit} className={"formContent"}>
                    <div className={"formInfo"}>
                        <label className={"formTitle"}>E-MAIL</label>
                        <input
                            type="email"
                            placeholder="jouw@email.nl"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={"formInput"}
                        />

                        <label className={"formTitle"}>WACHTWOORD</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={"formInput"}
                        />
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