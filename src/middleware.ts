import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const response = NextResponse.next();
    const cookies = req.cookies;
    if (cookies.has) {
        const userCookie = await cookies.get('drteeth-user')?.value;
        const token = await getToken(userCookie);
        // console.log('Middleware Token=', token);
        response.cookies.set('x-token-access', `Bearer ${token}`);
    }

    function getToken(cookieUser: string) {
        let cookies = cookieUser?.split(',');
        if (cookies) {
            for (let element of cookies) {
                element = element.replace(/"/g, '');
                const [cookieName, cookieValue] = element.split(':');
                if (cookieName === 'token') {
                    return cookieValue.trim();
                }
            }
        }
    }
}
