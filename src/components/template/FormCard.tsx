import Botao from './Botao';
import ModalConfirm from './ModalConfirm';

interface FormCardProps {}

export default function FormCard(props: FormCardProps) {
    return (
        <div className="flex w-full flex-col ">
            <div className="grid grid-flow-row grid-cols-4 gap-4 text-center justify-items-stretch bg-cyan-800">
                <div className="bg-green-100">Nome</div>
                <div className="bg-green-300">CPF</div>
                <div className="bg-green-500">Telefone</div>
                <div className="bg-green-700">Ações</div>
            </div>
            <div className="grid grid-flow-row grid-cols-4 gap-4 text-center justify-items-stretch">
                <div className="bg-green-100">Nome</div>
                <div className="bg-green-300">CPF</div>
                <div className="bg-green-500">Telefone</div>
                <div className="bg-green-700">Ações</div>
            </div>
        </div>
    );
}
