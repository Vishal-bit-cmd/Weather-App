import { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

export default function AdminHome() {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            setLoading(true);

            const { data } = await API.get("/admin/users", { withCredentials: true });

            setUsers(data);
        } catch (err: any) {
            console.error("Admin error:", err.response || err);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id: string) => {
        if (!window.confirm("Delete user?")) return;

        try {
            await API.delete(`/admin/users/${id}`, { withCredentials: true });
            fetchUsers();
        } catch {
            alert("Failed to delete user");
        }
    };

    useEffect(() => {
        if (user?.role === "admin") fetchUsers();
    }, [user]);

    if (!user) return <p>Please log in</p>;
    if (user.role !== "admin") return <p>Admins only</p>;
    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Admin - User Management</h1>

            {users.map((u) => (
                <div key={u._id} className="bg-white p-4 shadow rounded flex justify-between">
                    <div>
                        <h3 className="text-xl">{u.name}</h3>
                        <p>{u.email}</p>
                        <p className="text-sm text-gray-600">Role: {u.role}</p>
                    </div>

                    <button
                        onClick={() => deleteUser(u._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}
