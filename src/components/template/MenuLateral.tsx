import Image from 'next/image';
import { iconBell, iconCards, iconExit, iconHome, iconSettings, iconUser } from '../icons';
import MenuItem from './MenuItem';
import logo from '../../../public/marca_dentalpix.png';
import useAuth from '@/data/hook/useAuth';
import useModal from '@/data/hook/useModal';

export default function MenuLateral() {
    const { logout } = useAuth();
    const { show, setShow } = useModal();
    return (
        <aside className="flex flex-col bg-cyan-800 text-cyan-100 justify-between">
            <div>
                <div
                    className="flex bg-gray-100 justify-center items-center"
                    style={{ height: '6vh' }}>
                    <Image className="p-3" alt="" src={logo} width={60} height={60} />
                </div>
                <ul>
                    <MenuItem url="/" texto="Início" icone={iconHome} />
                    <MenuItem url="/settings" texto="Ajustes" icone={iconSettings} />
                    <MenuItem url="/cards" texto="Fichas" icone={iconCards} />
                    <MenuItem url="/profile" texto="Usuário" icone={iconUser} />
                    <MenuItem url="/authentication" texto="Avisos" icone={iconBell} />
                </ul>
            </div>
            <div>
                <ul>
                    <MenuItem texto="Sair" icone={iconExit} onClick={() => setShow(true)} />
                </ul>
            </div>
        </aside>
    );
}
