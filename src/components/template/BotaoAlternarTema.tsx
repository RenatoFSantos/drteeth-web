import { iconMoon, iconSun } from '../icons';

interface BotaoAlternarTemaProps {
    tema?: string;
    alternarTema?: () => void;
}

export default function BotaoAlternarTema(props: BotaoAlternarTemaProps) {
    return props.tema === 'dark' ? (
        //--- Botão Light
        <div
            onClick={props.alternarTema}
            className={`hidden sm:flex justify-end items-center bg-gradient-to-r from-yellow-300
             to-yellow-600 w-10 lg:w-24 h-8 rounded-3xl mr-5 cursor-pointer`}>
            <div className={`hidden lg:flex pr-1 text-white`}>
                <span className="text-sm">Claro</span>
            </div>
            <div className={`bg-white text-yellow-600 rounded-full m-1 w-6 h-6`}>{iconSun(3)}</div>
        </div>
    ) : (
        //--- Botão Dark
        <div
            onClick={props.alternarTema}
            className={`hidden sm:flex justify-start items-center bg-gradient-to-r from-gray-500 
            to-gray-900 w-10 lg:w-24 h-8 rounded-3xl mr-5 cursor-pointer`}>
            <div className={`bg-black text-yellow-300 rounded-full m-1 w-6 h-6`}>{iconMoon(3)}</div>
            <div className={`hidden lg:flex pl-1 text-gray-300`}>
                <span className="text-sm">Escuro</span>
            </div>
        </div>
    );
}
