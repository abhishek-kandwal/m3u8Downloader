import { fetchM3u8Data } from "./fetchM3u8Data.js";
import { saveVideoToLocal } from "./saveToLocal.js";

export const m3u8Downloader = (accessUrl, urlEndPoints) => {
    return new Promise((resolve, reject) => {
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
    

            // 1.1 start - fix this code.. 
            const toDownloadsList = [];
            let i = 0;
            const limit = 10;
            let container = [];
            promises.forEach(pro => {
                if (i < limit) {
                    i++;
                    container.push(pro);
                } else {
                    i = 0;
                    toDownloadsList.push(container);
                    container = [];
                }
            });
    
            async function downloadPromise() {
                const data = [];
                console.log('len', toDownloadsList.length)
                while(toDownloadsList.length) {
                    console.log('fetching ............');
                    data.push(...await Promise.all(toDownloadsList[0]));
                    console.log("fetching another---");
                    toDownloadsList.shift();
                }
                console.log('saving>>>>>');
                saveVideoToLocal(data);
                resolve(data);
            }

            downloadPromise();
            // 1.1 end - fix this code.. 
        } catch (err) {
            console.log('error 8888', err);
            return reject();
        }
    });
}