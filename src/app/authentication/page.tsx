'use client';
import { iconCheck, iconWarning } from '@/components/icons';
import useAuthAPI from '@/data/hook/useAuthAPI';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// const loginSchema = zod.object({
//     email: zod.string().email({ message: 'Email inválido!' }),
//     password: zod.string().min(3, { message: 'Senha inválida! Mínimo de 3 caracteres' }),
// });

// type LoginSchema = zod.infer<typeof loginSchema>;

type FormData = {
    email: string;
    password: string;
};

export default function Authentication() {
    const session = useSession();
    const router = useRouter();
    const capa = '/capa_adriana.jpg';
    const [error, setError] = useState(null);
    const [info, setInfo] = useState(null);
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const { registerAPI } = useAuthAPI();

    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm<LoginSchema>({
    //     mode: 'all',
    //     resolver: zodResolver(loginSchema),
    // });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    function addMessageError(value: string) {
        const vet = error;
        vet.push(value);
        setError((error) => vet);
    }

    useEffect(() => {
        const cookieUser = Cookies.get('drteeth-user');
        if (cookieUser) {
            redirect('/');
        }
    });

    async function submitting(formData: FormData) {
        console.log('FormData=', formData);
        const fieldEmail = formData.email;
        const fieldPassword = formData.password;

        if (mode === 'login') {
            const data = {
                email: fieldEmail,
                password: fieldPassword,
            };
            const result = await signIn('auth-api', {
                ...data,
                callbackUrl: '/',
            });
        } else {
            if (registerAPI) {
                const result = await registerAPI(fieldEmail, fieldPassword);
                if (result.success) {
                    await exibirInfo('Cadastrado com sucesso!');
                    setMode('login');
                    router.push('/');
                } else {
                    exibirError(result.error);
                }
            }
        }
    }

    async function handleLoginGoogle() {
        const result = await signIn('google', {
            callbackUrl: '/',
        });
        const session = useSession();
        redirect('/');
    }

    function exibirError(msg: any, timeInSeconds = 5) {
        setError(msg);
        setTimeout(() => setError(null), timeInSeconds * 1000);
    }

    function exibirInfo(msg: any, timeInSeconds = 5) {
        setInfo(msg);
        setTimeout(() => setInfo(null), timeInSeconds * 1000);
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="hidden md:block md:w-1/2 lg:w-2/3">
                <img
                    alt="Imagem da tela de autenticação"
                    src={capa}
                    className="h-screen w-full object-cover"
                />
            </div>
            <div className="w-full md:w-1/2 m-5 lg:m-7 lg:w-1/3">
                <h1 className="text-3xl font-bold mb-5">
                    {mode === 'login' ? 'Entre com sua Conta' : 'Faça seu Cadastro'}
                </h1>
                {error ? (
                    <div className="flex items-center bg-red-400 text-white py-3 px-5 my-2 border border-red-700 rounded-lg">
                        {iconWarning}
                        <span className="ml-2">{error}</span>
                    </div>
                ) : (
                    false
                )}
                {info ? (
                    <div className="flex items-center bg-green-400 text-white py-3 px-5 my-2 border border-green-200 rounded-lg">
                        {iconCheck}
                        <span className="ml-2">{info}</span>
                    </div>
                ) : (
                    false
                )}
                <form className="flex flex-col w-full mt-4" onSubmit={handleSubmit(submitting)}>
                    <label htmlFor="email">Email*</label>
                    <input
                        id="email"
                        className="flex bg-gray-200 border-1 focus:border-gray-100 focus:outline-none focus:bg-white mt-1 rounded-lg px-4 py-3 border-gray-300 border-2"
                        type="text"
                        required={true}
                        {...register('email')}
                    />
                    {/* {error?.email && (
                        <span className="text-red-600 text-sm">{error.email.message}</span>
                    )} */}

                    <label className="mt-4" htmlFor="password">
                        Senha*
                    </label>
                    <input
                        id="password"
                        className="flex bg-gray-200 border-1 focus:border-gray-100 focus:outline-none focus:bg-white mt-1 rounded-lg px-4 py-3 border-gray-300 border-2"
                        type="password"
                        required={true}
                        {...register('password')}
                    />
                    {/* {error?.password && (
                        <span className="text-red-600 text-sm">{error.password.message}</span>
                    )} */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-3 mt-6">
                        {mode === 'login' ? 'Entrar' : 'Cadastrar'}
                    </button>
                </form>
                <hr className="my-6 border-gray-300 w-full" />
                <button
                    onClick={handleLoginGoogle}
                    className="flex justify-center w-full bg-gray-300 text-gray-700 hover:bg-gray-200 hover:text-white rounded-lg px-4 py-3">
                    <Image
                        className={`mr-2`}
                        src="/google.svg"
                        width={24}
                        height={24}
                        alt="google"
                    />
                    {mode === 'login' && 'Entrar com Google'}
                    {mode === 'register' && 'Cadastrar com Google'}
                </button>
                {mode === 'login' ? (
                    <p className="mt-8">
                        Novo por aqui?
                        <a
                            onClick={() => setMode('register')}
                            className={`text-blue-500 hover:text-blue-700 font-semibold cursor-pointer`}>
                            &nbsp;Crie uma conta gratuitamente!
                        </a>
                    </p>
                ) : (
                    <p className="mt-8">
                        Já faz parte da nossa comunidade?
                        <a
                            onClick={() => setMode('login')}
                            className={`text-blue-500 hover:text-blue-700 font-semibold cursor-pointer`}>
                            &nbsp;Entre com suas Credenciais!
                        </a>
                    </p>
                )}
            </div>
        </div>
    );
}
