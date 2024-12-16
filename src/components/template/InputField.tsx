interface InputFieldProps {
    title: string;
    type?: 'text' | 'number';
    value: any;
    readonly?: boolean;
    changeValue?: (value: any) => void;
    className?: string;
}

export default function InputField(props: InputFieldProps) {
    return (
        <div className={`flex flex-col ${props.className}`}>
            <label className="text-lg font-semibold pt-3 pl-3">{props.title}</label>
            <input
                type={props.type ?? 'text'}
                value={props.value}
                onChange={(e) => props.changeValue?.(e.target.value)}
                readOnly={props.readonly ?? false}
                className={`focus:bg-white focus:border-cyan-400 focus:outline-none focus: p-2 rounded-xl border-gray-300 border-2 ${
                    props.readonly ? 'bg-gray-200 focus:bg-gray-200' : false
                } ${props.type === 'number' ? 'text-right' : false}`}
            />
        </div>
    );
}
