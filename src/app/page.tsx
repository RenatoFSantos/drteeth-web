import Layout from '@/components/template/Layout';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
    const cookieStore = cookies();
    const cookieUser = await cookieStore.get('drteeth-user');

    if (!cookieUser) {
        redirect('/authentication');
    }

    return (
        <Layout titulo="Página Inicial" subtitulo="Construindo nosso aplicativo">
            Conteúdo!!!
        </Layout>
    );
}
