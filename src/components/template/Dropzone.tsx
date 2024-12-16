import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

interface DropzoneProps {
    onFileUploaded: (string) => void;
}

const Dropzone = (props: DropzoneProps) => {
    const [selectFileURL, setSelectFileURL] = useState('/photo_default.jpg');
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        const fileURL = URL.createObjectURL(file);
        setSelectFileURL(fileURL);
        props.onFileUploaded(fileURL);
    }, []);

    const { getRootProps, getInputProps, fileRejections } = useDropzone({
        onDrop,
        maxFiles: 1,
        maxSize: 25 * 1024 * 1024,
        accept: { 'image/*': [] },
    });

    useEffect(() => {
        if (fileRejections.length > 0) {
            const errorType = fileRejections[0].errors[0].code;
            if (errorType === 'file-invalid-type') {
                toast.error('Tipo de arquivo errado.', {
                    description: 'Por favor, verifique o formato do arquivo.',
                });
            } else if (errorType === 'file-too-large') {
                toast.error('Arquivo muito grande!', {
                    description: 'Por favor, diminua o tamanho do arquivo (25Mb).',
                });
            } else {
                toast.error('Uhhh! Problemas no upload!', {
                    description: 'Existe um problema no upload. Tente novamente!',
                });
            }
        }
    }, [fileRejections]);

    return (
        <div {...getRootProps()}>
            <label
                htmlFor="avatar"
                className={`flex flex-row justify-center bg-white border-2 cursor-pointer border-cyan-800 text-cyan-800 hover:bg-cyan-800 hover:text-cyan-100 py-1 rounded-md mt-2 h-[40px] items-center`}>
                Alterar
            </label>
            <input type="file" id="avatar" {...getInputProps()} accept="image/*" />
        </div>
    );
};

export default Dropzone;
