import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Container from '../components/ui/Container';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { useAuth } from '../app/AuthProvider';
import { BRAND } from '../lib/constants';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2),
  role: z.enum(['student', 'parent']),
  grade: z.string().optional(),
  branch: z.string().optional(),
});

export default function LoginPage() {
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');
  const { login, register: registerUser } = useAuth();
  const navigate = useNavigate();

  const schema = mode === 'login' ? loginSchema : registerSchema;
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { role: 'student' },
  });

  const redirect = (user) => {
    if (user.role === 'admin') navigate('/admin');
    else if (user.role === 'parent') navigate('/parent');
    else navigate('/dashboard');
  };

  const onSubmit = async (data) => {
    setError('');
    try {
      const user = mode === 'login'
        ? await login(data.email, data.password)
        : await registerUser(data);
      redirect(user);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <Helmet><title>Login — {BRAND}</title></Helmet>
      <section className="py-16 md:py-24">
        <Container className="max-w-md">
          <GlassCard hover={false}>
            <h1 className="font-heading text-2xl font-bold text-center mb-6">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <div className="flex gap-2 mb-6">
              <button type="button" onClick={() => setMode('login')} className={`flex-1 py-2 rounded-lg text-sm ${mode === 'login' ? 'bg-indigo-600' : 'glass'}`}>Login</button>
              <button type="button" onClick={() => setMode('register')} className={`flex-1 py-2 rounded-lg text-sm ${mode === 'register' ? 'bg-indigo-600' : 'glass'}`}>Register</button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {mode === 'register' && (
                <>
                  <input {...register('name')} placeholder="Full name" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-slate-100 outline-none" />
                  <select {...register('role')} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-slate-100">
                    <option value="student">Student</option>
                    <option value="parent">Parent</option>
                  </select>
                  <input {...register('grade')} placeholder="Grade (optional)" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-slate-100 outline-none" />
                  <input {...register('branch')} placeholder="Branch e.g. CSE (optional)" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-slate-100 outline-none" />
                </>
              )}
              <input {...register('email')} type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-slate-100 outline-none" />
              <input {...register('password')} type="password" placeholder="Password" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-slate-100 outline-none" />
              {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <Button type="submit" className="w-full">{mode === 'login' ? 'Login' : 'Register'}</Button>
            </form>
            <p className="text-slate-500 text-xs mt-4 text-center">
              Demo: student@scoremax.in / password123
            </p>
            <Link to="/" className="block text-center text-sm text-indigo-400 mt-4">← Back to home</Link>
          </GlassCard>
        </Container>
      </section>
    </>
  );
}
