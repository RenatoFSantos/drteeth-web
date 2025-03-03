export default function () {
    const url = process.env.NEXTAUTH_URL;
    return (
        <div className="h-screen grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-indigo-600">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Página não encontrada!
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                    Desculpe! Esta página não foi encontrada. Verifique!
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a
                        href={url}
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Voltar
                    </a>
                </div>
            </div>
        </div>
    );
}
