'use client';
import FormCard from '@/components/template/FormCard';
import FormCardDetail from '@/components/template/FormCardDetail';
import Layout from '@/components/template/Layout';
import { useState } from 'react';

export default function Cards() {
    const [visible, setVisible] = useState<'table' | 'form'>('table');
    return (
        <Layout titulo="Fichas" subtitulo="Cadastro de Pacientes">
            {visible === 'table' ? <FormCard /> : <FormCardDetail title="Ficha" />}
        </Layout>
    );
}
