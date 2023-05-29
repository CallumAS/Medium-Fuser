import initCycleTLS, { CycleTLSClient } from 'cycletls';


let _cycleTLS: CycleTLSClient | undefined;
export const getCrawler = async () => {
    if (!_cycleTLS) _cycleTLS = await initCycleTLS();
    return _cycleTLS
}
