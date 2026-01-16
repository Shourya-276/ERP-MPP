import React, { useState } from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthLayout>
      {/* Toggle */}
      <div className="auth-toggle flex mb-8">
        <button
          onClick={() => setIsLogin(true)}
          className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
            isLogin ? 'auth-toggle-active text-foreground' : 'text-muted-foreground'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
            !isLogin ? 'auth-toggle-active text-foreground' : 'text-muted-foreground'
          }`}
        >
          Sign Up
        </button>
      </div>

      {isLogin ? (
        <LoginForm onToggle={() => setIsLogin(false)} />
      ) : (
        <SignupForm onToggle={() => setIsLogin(true)} />
      )}
    </AuthLayout>
  );
};

export default AuthPage;
