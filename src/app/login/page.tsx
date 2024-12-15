"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Login() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const supabase = createClient();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        supabase.auth
            .signInWithOtp({
                email,
                options: {
                    shouldCreateUser: true,
                    emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL + "/otp?email=" + email,
                },
            })
            .then(({ error }) => {
                if (error) {
                    setMessage(error.message);
                } else {
                    setMessage("Check your email for the login link!");
                }
                setLoading(false);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen -mt-32">
            <div className="w-full max-w-md space-y-6 bg-white rounded">
                <h2 className="text-2xl font-bold text-center text-purple-800">
                    Log in to continue
                </h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full px-3 py-2 mt-1 border-2 border-purple-500 rounded shadow-sm focus:outline-none focus:ring-purple-800 focus:border-purple-800"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-medium text-white bg-purple-800 rounded disabled:bg-purple-800/25 disabled:cursor-not-allowed"
                            disabled={loading || !email}>
                            {loading ? "Loading..." : "Send Magic Link"}
                        </button>
                    </div>
                </form>
                {message && <div className="mt-4 text-center text-purple-800">{message}</div>}
            </div>
        </div>
    );
}
