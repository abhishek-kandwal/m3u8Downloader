import https from 'https';

export const fetchM3u8Data = (input) => {
    let fetchM3u8DataRecursive;
    try {
        let recursiveCounter = 0;
        fetchM3u8DataRecursive = () => {
            const { videoChunkUrl, totalParts } = input;
            return new Promise((res, rej) => {
                    const request = https.get(videoChunkUrl, videoResponse => {
                        let videoData = Buffer.alloc(0);
        
                        videoResponse.on('data', videoChunk => {
                            videoData = Buffer.concat([videoData, videoChunk]);
                        });
        
                        videoResponse.on('end', () => {
                            totalParts.value -= 1;
                            console.log('remaining :-', totalParts.value);
                            return res(videoData);
                        });
        
                        videoResponse.on('error', () => {
                            if (recursiveCounter < 2) {
                                console.log('retrying...');
                                recursiveCounter++;
                                return fetchM3u8DataRecursive();
                            }
    
                            console.log('rejected');
                            return rej('error');
                        });
                    });

                    request.on('error', e => console.log("req error", e));
            });
        }
    
        return fetchM3u8DataRecursive();
    } catch (err) {
        console.log('error while download', err);
        return fetchM3u8DataRecursive();
    }
}