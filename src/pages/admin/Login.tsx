import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail, Loader2 } from 'lucide-react';
import api from '@/lib/api';

const AdminLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await api.post('/admin/login', { email, password });
            const data = response.data;

            if (data.success) {
                // Store admin info for UI persistence (Token is handled by HttpOnly cookie)
                localStorage.setItem('adminUser', JSON.stringify(data.user));

                toast({
                    title: "Welcome back, Admin",
                    description: "Redirecting to dashboard...",
                });
                navigate('/admin/dashboard');
            } else {
                toast({
                    variant: "destructive",
                    title: "Access Denied",
                    description: data.message || "Invalid credentials",
                });
            }
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.response?.data?.message || "Something went wrong. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold tracking-tight">Admin Portal</h1>
                    <p className="text-muted-foreground">
                        Enter your credentials to access the management dashboard
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="test@gmail.com"
                                className="pl-10"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="pl-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <Button className="w-full" type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Authenticating...
                            </>
                        ) : (
                            'Login as Admin'
                        )}
                    </Button>
                </form>

                <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                        This is a restricted area. Only authorized personnel can access.
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
};

export default AdminLogin;
