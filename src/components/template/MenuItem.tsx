import Link from 'next/link';

interface MenuItemProps {
    url?: string;
    texto: string;
    icone: any;
    className?: string;
    onClick?: (evento: any) => void;
}

export default function MenuItem(props: MenuItemProps) {
    function renderizarLink() {
        return (
            <div
                className={`flex flex-col justify-center text-gray-100 hover:bg-white hover:text-cyan-800 items-center h-20 w-20 p-5 ${props.className}`}>
                {props.icone}
                <span className={`text-sm font-light ${props.className}`}>{props.texto}</span>
            </div>
        );
    }
    return (
        <li onClick={props.onClick} className={`cursor-pointer`}>
            {props.url ? (
                <Link
                    className={`flex flex-col justify-center items-center h-20 w-20 p-5`}
                    href={props.url}>
                    {renderizarLink()}
                </Link>
            ) : (
                renderizarLink()
            )}
        </li>
    );
}
