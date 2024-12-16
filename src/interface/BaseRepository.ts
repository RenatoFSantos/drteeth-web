import { iResultHttp } from './iResultHttp';

interface BaseRepository<T> {
    save(model: T): Promise<iResultHttp>;
    delete(model: T): Promise<iResultHttp>;
    all(): Promise<iResultHttp>;
}

export default BaseRepository;
