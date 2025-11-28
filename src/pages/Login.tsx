import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) return alert("Please enter both email and password");

        try {
            setLoading(true);

            const res = await API.post(
                "/auth/login",
                { email, password },
                { withCredentials: true }
            );

            const user = res.data.user;

            if (!user) return alert("Login failed: no user returned");

            // Store user in Auth Context
            setUser(user);

            if (user.role === "admin") navigate("/admin/users");
            else navigate("/");

        } catch (err: any) {
            alert(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
            <form
                className="bg-white p-6 rounded shadow-md space-y-4 w-80"
                onSubmit={handleLogin}
            >
                <h2 className="text-xl font-bold text-center">Login</h2>

                <input
                    className="border p-2 w-full rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                />

                <input
                    className="border p-2 w-full rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded text-white ${loading ? "bg-gray-500" : "bg-blue-600"}`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-sm text-center">
                    No account?{" "}
                    <a href="/register" className="text-blue-600 underline">
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
}
