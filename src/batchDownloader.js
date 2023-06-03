import { fetchM3u8Data } from "./fetchM3u8Data.js";
export const batchDownloader = async (batchListData) => {
    try {
        const { 
            batchContainer,
            totalDownloadList 
        } = batchListData;
    
        let fullDownloadedBuffer = [];
        let totalParts = {
            value: totalDownloadList
        };
        for (let batch of batchContainer) {
            const promises = batch.map((url) => {
                const promise = fetchM3u8Data({
                    videoChunkUrl: url,
                    totalParts
                });
    
                return promise
            });
            const downloadedBuffer = await Promise.all(promises);
            fullDownloadedBuffer.push(...downloadedBuffer);
        }
    
        return fullDownloadedBuffer;
    } catch (err) {
        console.log('batch Downlaoder error', err);
    }
}