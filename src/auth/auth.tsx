import { createContext, useContext, useState, type ReactNode } from "react";

export type User = { id: string; name: string; phone: string; password: string };
type AuthResult = { ok: true } | { ok: false; error: string };

type AuthContextValue = {
    user: User | null;
    login: (phone: string, password: string) => Promise<AuthResult>;
    register: (name: string, phone: string, password: string) => Promise<AuthResult>;
    logout: () => void;
};

const dummy: User[] = [{ id: 'id1', name: "Steven", phone: "08112798890", password: "123456" }];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState<User[]>(dummy);
    const [user, setUser] = useState<User | null>(null);

    const login: AuthContextValue['login'] = async (phone, password) => {
        await wait(600);
        const found = users.find((u) => u.phone === phone && u.password === password);
        if (!found) return { ok: false, error: 'Nomor HP atau kata sandi salah' };

        setUser(found);
        return { ok: true }
    };

    const register: AuthContextValue['register'] = async (name, phone, password) => {
        await wait(600);
        if (users.some((u) => u.phone === phone)) {
            return { ok: false, error: 'Nomor ini sudah terdaftar' };
        }

        const created: User = { id: 'u${Date.now()}', name: name.trim(), phone, password };
        setUsers((prev) => [...prev, created]);
        setUser(created);
        return { ok: true };
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth harus dipakai di dalam AuthProvider');
    return context;
}