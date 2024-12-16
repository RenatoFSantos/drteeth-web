const url = process.env.NEXT_PUBLIC_URL;

export default function ApiQuerys() {
    function createToken() {
        let param = {
            userDsEmail: 'renato.insigne@gmail.com',
            userCdPassword: '123',
        };
        let url_token = url + 'users/auth';
        fetch(url_token, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(param),
        })
            .then((res) => res.json())
            .then((json) => console.log('Valor de retorno=', json.token))
            .catch((err) => console.log('Erro = ', err));
    }

    return {
        createToken,
    };
}
