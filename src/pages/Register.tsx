import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await API.post("/auth/register", { name, email, password });
            const user = res.data.user;

            if (!user) {
                alert("Registration failed: no user data");
                return;
            }

            setUser(user); // context

            // Redirect based on role
            if (user.role === "admin") navigate("/admin/users");
            else navigate("/");
        } catch (err: any) {
            console.error(err);
            alert(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
            <form
                className="bg-white p-6 rounded shadow-md space-y-4 w-80"
                onSubmit={handleRegister}
            >
                <h2 className="text-xl font-bold text-center">Register</h2>
                <input
                    className="border p-2 w-full rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                <input
                    className="border p-2 w-full rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    required
                />
                <input
                    className="border p-2 w-full rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded text-white ${loading ? "bg-gray-500" : "bg-blue-600"}`}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
                <p className="text-sm text-center">
                    Already have an account? <a href="/login" className="text-blue-600 underline">Login</a>
                </p>
            </form>
        </div>
    );
}
