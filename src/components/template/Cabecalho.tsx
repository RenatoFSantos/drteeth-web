import Titulo from './Titulo';
import BotaoAlternarTema from './BotaoAlternarTema';
import useAppData from '@/data/hook/useAppData';
import AvatarUsuario from './AvatarUsuario';

interface CabecalhoProps {
    titulo: string;
    subtitulo: string;
    user: {}
}

export default function Cabecalho(props: CabecalhoProps) {
    const { tema, alternarTema } = useAppData();
    return (
        <div className="flex" style={{ height: '6vh' }}>
            <Titulo titulo={props.titulo} subtitulo={props.subtitulo} />
            <div className="flex flex-grow justify-end items-center">
                <BotaoAlternarTema tema={tema} alternarTema={alternarTema} />
                <AvatarUsuario user={props.user}/>
            </div>
        </div>
    );
}
