import { useState } from "react";
import API from "../api/api";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", { email, password });
            Cookies.set("accessToken", res.data.accessToken);
            Cookies.set("user", JSON.stringify(res.data.user));

            if (res.data.user.role === "admin") navigate("/admin");
            else navigate("/");
        } catch (err: any) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
            <form className="bg-white p-6 rounded shadow-md space-y-4" onSubmit={handleLogin}>
                <h2 className="text-xl font-bold text-center">Login</h2>
                <input
                    className="border p-2 w-72"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    className="border p-2 w-72"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                />
                <button className="bg-blue-600 text-white w-full py-2 rounded">Login</button>

                <p className="text-sm text-center">
                    No account? <Link to="/register" className="text-blue-600 underline">Register</Link>
                </p>
            </form>
        </div>
    );
}
