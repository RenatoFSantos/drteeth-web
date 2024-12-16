import { User, Session, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";


declare module 'next-auth' {
    interface signIn {
        user?: User & {
            provider: string | null, 
            token: JWT | null
        }
    }

    interface User extends DefaultUser {
        provider?: string | null;
        token?: JWT | null;
    }

    interface Session {
        userAPI?: JWT | null
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        provider?: string | null;
        token?: JWT;
    }
}