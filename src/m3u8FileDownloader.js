import https from 'https';

export const m3u8FileDownloader = async (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let m3u8Data = '';
    
            res.on('data', chunk => {
                m3u8Data += chunk;
            });
    
            res.on('end', () => {
                return resolve(m3u8Data);
            });

            res.on('error', () => {
                return reject('error');
            });
        })
    });
}