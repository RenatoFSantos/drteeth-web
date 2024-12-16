'use client';
import useAppData from '@/data/hook/useAppData';
import Cabecalho from './Cabecalho';
import Conteudo from './Conteudo';
import MenuLateral from './MenuLateral';
import Rodape from './Rodape';
import { ModalProvider } from '@/data/context/ModalContext';
import ModalLogout from './ModalLogout';
import { signOut } from 'next-auth/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Toaster } from 'sonner';
interface LayoutProps {
    titulo: string;
    subtitulo: string;
    children?: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
    console.log('Estou no Layout');
    let userCookie = Cookies.get('drteeth-user');
    let userLogged = '';
    if (userCookie) {
        userLogged = JSON.parse(userCookie);
    }

    const { tema } = useAppData();
    const router = useRouter();

    async function exitApp() {
        await signOut({
            // redirect: false,
        });
        Cookies.remove('next-auth.session-token');
        Cookies.remove('drteeth-token');
        Cookies.remove('drteeth-user');
        router.replace('/authentication');
    }

    return (
        <ModalProvider>
            <div className={`${tema} flex flex-col`}>
                <Toaster position="top-right" richColors />
                <div className="flex" style={{ height: '97vh' }}>
                    <MenuLateral />
                    <div className={`flex flex-col w-full bg-gray-100`} style={{ height: '6vh' }}>
                        <Cabecalho
                            titulo={props.titulo}
                            subtitulo={props.subtitulo}
                            user={userLogged}
                        />
                        <div className="flex-1 p-5" style={{ height: '91vh' }}>
                            <Conteudo>{props.children}</Conteudo>
                        </div>
                    </div>
                </div>
                <ModalLogout title="Deseja sair do sistema?" confirmModal={exitApp} />
                <div style={{ height: '3vh' }}>
                    <Rodape company="Midilabs - Mídias Digitais Ltda." version="v.1.0.0" />
                </div>
            </div>
        </ModalProvider>
    );
}
