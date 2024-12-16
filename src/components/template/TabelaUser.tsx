import User from '@/model/User';
import { iconEdit, iconTrash } from '@/components/icons';
import Botao from './Botao';
import { useState } from 'react';
import ModalConfirm from './ModalConfirm';

interface TableUserProps {
    user: User[];
    userNew?: () => void;
    userEdition?: (user: User) => void;
    userDeleted?: (user: User) => void;
}

export default function TableUser(props: TableUserProps) {
    const [inc, setInc] = useState(1);
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const showActions = props.userEdition || props.userDeleted;
    const [userSelect, setUserSelect] = useState<User>(User.vazio());

    function renderHead() {
        return (
            <tr className="w-full">
                <th className="py-2 w-8/12">Nome</th>
                <th className="w-1/12 ">Idade</th>
                <th className="w-1/12">Id</th>
                {showActions ? <th className="w-2/12">Actions</th> : false}
            </tr>
        );
    }

    function renderUser() {
        return props.user?.map((user, i) => {
            return (
                <tr key={user.id} className="even:bg-gray-200 odd:bg-gray-100">
                    <td className="text-left pl-2">{user.name}</td>
                    <td className="text-center">{user.age}</td>
                    <td className="text-center">{user.id}</td>
                    {showActions ? renderActions(user) : false}
                </tr>
            );
        });
    }

    function renderActions(user: User) {
        return (
            <td className="flex-row text-center">
                {props.userEdition ? (
                    <button
                        onClick={() => props.userEdition?.(user)}
                        className={`justify-center items-center text-green-600 rounded-full p-2 m-1 hover:bg-white`}>
                        {iconEdit}
                    </button>
                ) : (
                    false
                )}
                {props.userDeleted ? (
                    <button
                        onClick={() => renderConfirm(user)}
                        className={`justify-center items-center text-red-600 rounded-full p-2 m-1 hover:bg-white`}>
                        {iconTrash}
                    </button>
                ) : (
                    false
                )}
            </td>
        );
    }

    function renderConfirm(user: User) {
        setShowConfirm(true);
        setUserSelect(user);
    }

    function deleteUser() {
        setShowConfirm(false);
        props.user.splice(props.user.map((e) => e.id).indexOf(userSelect.id), 1);
        props.userDeleted?.(userSelect);
    }

    function renderCancel() {
        setShowConfirm(false);
    }

    return (
        <>
            <div className="flex-grow bg-gray-300 justify-center p-5 rounded-lg">
                <div className={`flex justify-between flex-wrap mb-4`}>
                    <h1 className="text-3xl text-black">Cadastro de Usuários</h1>
                    <Botao cor="cyan" onClick={props.userNew}>
                        Novo Usuário {inc}
                    </Botao>
                </div>
                <table className="bg-cyan-500 w-full">
                    <thead className={`bg-cyan-800 text-white`}>{renderHead()}</thead>
                    <tbody>{renderUser()}</tbody>
                </table>
            </div>
            {showConfirm ? (
                <ModalConfirm
                    user={userSelect}
                    btnOk={() => deleteUser()}
                    btnCancel={() => renderCancel()}
                />
            ) : (
                false
            )}
        </>
    );
}
