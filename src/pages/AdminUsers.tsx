import { useEffect, useState } from "react";
import API from "../api/api";

interface User {
    _id: string;
    username: string;
    email: string;
    role: string;
}

export default function AdminUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const { data } = await API.get("/admin/users");
            setUsers(data);
        } catch (err) {
            console.error("Failed to fetch users:", err);
            alert("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await API.delete(`/admin/users/${id}`);
            alert("User deleted");
            fetchUsers(); // refresh list
        } catch (err) {
            console.error(err);
            alert("Failed to delete user");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <p className="p-6 text-center">Loading users...</p>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Admin - User Management</h1>

            {users.length === 0 && <p>No users found</p>}

            <div className="space-y-4">
                {users.map((user) => (
                    <div
                        key={user._id}
                        className="flex justify-between items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition"
                    >
                        <div>
                            <h2 className="text-xl font-semibold">{user.username}</h2>
                            <p className="text-gray-600">{user.email}</p>
                            <p className="text-gray-500">Role: {user.role}</p>
                        </div>
                        <button
                            onClick={() => deleteUser(user._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
