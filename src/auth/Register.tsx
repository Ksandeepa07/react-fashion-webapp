import { useState } from 'react';
import {Mail, Lock, ArrowRight, Check} from 'lucide-react';
import {Link} from "react-router-dom";
import {saveRegister} from "../api/Auth.ts";
import bcrypt from "bcryptjs";
import toast from "react-hot-toast";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const role='user'

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password === confirmPassword) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const data = await saveRegister({ email, password: hashedPassword, role });
            let result = JSON.parse(data);
            console.log(result.data);
        }else{
            toast.error("Password didn't match with confirm password")
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">FASHION</h1>
                    <p className="mt-2 text-gray-600" style={{fontSize:'134x'}}>Welcome back to your fashion destination</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-0 text-sm transition duration-200"
                                placeholder="Email address"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-0 text-sm transition duration-200"
                                placeholder="Password"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="relative">
                            <Check className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-0 text-sm transition duration-200"
                                placeholder="confirm password"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition duration-200 flex items-center justify-center space-x-2"
                    >
                        <span>Sign up</span>
                        <ArrowRight className="h-5 w-5"/>
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-black hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;