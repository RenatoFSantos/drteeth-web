interface ConteudoProps {
    children?: any;
}

export default function Conteudo(props: ConteudoProps) {
    return (
        <div className="flex flex-grow mt-3 mb-10 h-full max-h-screen overflow-y-auto">
            {props.children}
        </div>
    );
}
