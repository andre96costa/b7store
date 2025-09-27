"use client"

import { register } from "@/actions/register";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChangeEvent, FormEvent, useState, useTransition } from "react";
import z, { email } from "zod";

const schema = z.object({ 
    name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres."}),
    email: z.email({ message: "E-mail invalido"}), 
    password: z.string().min(6, { message: 'Senha deve ter pelo menos 5 caracteres'}),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword']
});

type ErrorStructure = {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string
    form?: string;
}

export const RegisterForm = () => {
    const [form, setForm] = useState( { name: '', email: '', password: '', confirmPassword: ''});
    const [error, setError] = useState<ErrorStructure>({});
    const [peding, startTransition] = useTransition();
    const authStore = useAuthStore(state => state);


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const result = schema.safeParse(form);
        if (!result.success) {
            const fieldErrors: any = {};
            result.error.issues.forEach(err => {
                if (err.path[0]) {
                    fieldErrors[err.path[0]] = err.message;
                }
            });
            setError(fieldErrors);
            return;
        }

        setError({});

        startTransition(async () => {
            const res = await register(form);
            if (res.error) {
                setError({ form: res.error });
            }else{
                redirect("/login");
            }
        });
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm(form => ({ ...form, [e.target.name]: e.target.value }));
        setError(error => ({ ...error, [e.target.name]: undefined, form: undefined }));
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-8 rounded-sm">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <div className="mb-4">
                <label className="mb-1">Nome</label>
                <input autoFocus 
                type="text" 
                name="name" 
                id="name" 
                value={form.name} 
                onChange={handleChange} 
                className="w-full border rounded px-3 py-2" 
                disabled={peding}/>
                {error.name && <div className="text-red-500 text-sm mt-1">{error.name}</div>}
            </div>

            <div className="mb-4">
                <label className="mb-1">E-mail</label>
                <input autoFocus 
                type="email" 
                name="email" 
                id="email" 
                value={form.email} 
                onChange={handleChange} 
                className="w-full border rounded px-3 py-2" 
                disabled={peding}/>
                {error.email && <div className="text-red-500 text-sm mt-1">{error.email}</div>}
            </div>

            <div className="mb-4">
                <label className="mb-1">Senha</label>
                <input type="password" 
                name="password" 
                id="password" 
                value={form.password} 
                onChange={handleChange} 
                className="w-full border rounded px-3 py-2" 
                disabled={peding}/>
                {error.password && <div className="text-red-500 text-sm mt-1">{error.password}</div>}
            </div>

            <div className="mb-4">
                <label className="mb-1">Confirmar senha</label>
                <input type="password" 
                name="confirmPassword" 
                id="confirmPassword" 
                value={form.confirmPassword} 
                onChange={handleChange} 
                className="w-full border rounded px-3 py-2" 
                disabled={peding}/>
                {error.confirmPassword && <div className="text-red-500 text-sm mt-1">{error.confirmPassword}</div>}
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={peding}>{peding ? 'Cadastrando...' : 'Cadastrar'}</button>
            {error.form && <div className="text-red-500 text-sm mt-1">{error.form}</div>}

            <div className="text-center mt-4">
                <Link href={'/loging'} >Realizar login</Link>
            </div>
        </form>
    );
}