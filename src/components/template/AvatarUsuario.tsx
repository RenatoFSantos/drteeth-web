import Link from 'next/link';
import Image from 'next/image';
import UserAuthModel from '@/model/UserAuth';

interface AvatarUsuarioProps {
    className?: string;
    user: any;
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
    let avatar = '/user.png';
    let user: UserAuthModel;

    return (
        <Link href="/">
            <div className={`flex flex-row items-center mr-5`}>
                <Image
                    className={`rounded-full cursor-pointer ${props.className} mr-2`}
                    src={props.user?.picture}
                    width={35}
                    height={35}
                    alt="Avatar do Usuário"
                />
                <span>{props.user?.name}</span>
            </div>
        </Link>
    );
}
