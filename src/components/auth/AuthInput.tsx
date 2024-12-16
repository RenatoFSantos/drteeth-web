interface AuthInputProps {
    label: string;
    value: any;
    required?: boolean;
    render: boolean;
    typeIn?: 'text' | 'email' | 'password';
    changeValue: (newValue: any) => void;
}

export default function AuthInput(props: AuthInputProps) {
    return props.render ? (
        <div className="flex flex-col w-full mt-4">
            <label htmlFor="">
                {props.label}
                {props.required ? '*' : ''}
            </label>
            <input
                className="flex bg-gray-200 border-2 focus:border-gray-500 focus:outline-none focus:bg-white mt-2 rounded-lg px-4 py-3"
                type={props.typeIn ?? 'text'}
                value={props.value}
                required={props.required}
                onChange={(e) => props.changeValue?.(e.target.value)}
            />
        </div>
    ) : null;
}
