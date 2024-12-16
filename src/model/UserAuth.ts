export default interface User {
    uid: string;
    name: string | null;
    email: string | null;
    token: string;
    provider: string | undefined;
    imageUrl: string | null;
}
