interface TituloProps {
    titulo: string;
    subtitulo: string;
}

export default function Titulo(props: TituloProps) {
    return (
        <div className="flex-1 flex-row pt-2 pl-5 items-center">
            <h1 className="font-black text-3xl text-gray-700">{props.titulo}</h1>
            <h2 className="font-light text-sm text-gray-500">{props.subtitulo}</h2>
        </div>
    );
}
