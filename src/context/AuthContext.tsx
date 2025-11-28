import { createContext, useEffect, useState, type ReactNode } from "react";
import api from "../api/api";

interface User {
    id: string;
    name?: string;
    email?: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    setUser: (u: User | null) => void;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    setUser: () => { },
    logout: async () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const res = await api.get("/auth/profile", { withCredentials: true });
                setUser(res.data.user);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const logout = async () => {
        try {
            await api.get("/auth/logout", { withCredentials: true }); // send cookies
            setUser(null);
            window.location.href = "/login"; // redirect after logout
        } catch (err) {
            console.error("Logout failed:", err);
            setUser(null);
            window.location.href = "/login";
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
