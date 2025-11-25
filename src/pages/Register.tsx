import { useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await API.post("/auth/register", { name, email, password });
            alert("Registration successful. Login now.");
            navigate("/login");
        } catch (err: any) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
            <form className="bg-white p-6 rounded shadow-md space-y-4" onSubmit={handleRegister}>
                <h2 className="text-xl font-bold text-center">Register</h2>
                <input className="border p-2 w-72" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                <input className="border p-2 w-72" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input className="border p-2 w-72" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
                <button className="bg-blue-600 text-white w-full py-2 rounded">Register</button>

                <p className="text-sm text-center">
                    Already registered? <Link to="/login" className="text-blue-600 underline">Login</Link>
                </p>
            </form>
        </div>
    );
}
