import { fetchM3u8Data } from "./fetch.js";

export const m3u8Downloader = (accessUrl, urlEndPoints) => {
    try {
        let currentIndex = 0;
        let indexCounter = 150;
        let totalParts =  {
            value: urlEndPoints.length
        };
        console.log('total parts:-', totalParts);
        const promises = urlEndPoints.map((endPoint, index) => {
            if (index > indexCounter) {
                indexCounter += 150;
                currentIndex += 1;
            }
            const videoChunkUrl = accessUrl + endPoint;
            const promise = fetchM3u8Data({
                videoChunkUrl,
                endPoint, 
                index,
                currentIndex,
                totalParts
            });
    
            return promise
        });
    
        return Promise.all(promises);
    } catch (err) {
        console.log('error 8888', err);
        return;
    }
}