import React, { useState } from "react";
import { data } from "react-router-dom";
import API_BASE_URL from "../Constants";

function Dummy() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(API_BASE_URL+"login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `username=${username}&password=${password}`,
                credentials: "include", // Ensures cookies are sent for session management
            }).then((response) => {
                return response.json()
            }).then(data => {
                console.log(data)
                console.log("Login successful:", data);
            }
            ).catch(error => {
                console.log(error)
                console.error("Login failed:", error);
            });

        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Dummy;


