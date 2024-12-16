'use client';
import Head from 'next/head';
import Image from 'next/image';
import loadingImg from '../../../public/loading.gif';
import useAuth from '@/data/hook/useAuth';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface ForceAuthenticationProps {
    children: ReactNode;
}

export default function ForceAuthentication({ children }: ForceAuthenticationProps) {
    const router = useRouter();
    const { user, loading } = useAuth();
    console.log('Entrei no ForceAuthentication');

    function renderContent() {
        return (
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                        if(!document.cookie?.includes("drteeth-user")) {
                        window.location.href = "/authentication"
                        }
                    `,
                        }}
                    />
                </Head>
                {children}
            </>
        );
    }

    function renderLoading() {
        return (
            <div className="flex justify-center items-center h-screen">
                <Image src={loadingImg} priority alt="loading..." />
            </div>
        );
    }

    if (!loading && user?.email) {
        return renderContent();
    } else if (loading) {
        return renderLoading();
    } else {
        router.push('/authentication');
        return null;
    }
}
