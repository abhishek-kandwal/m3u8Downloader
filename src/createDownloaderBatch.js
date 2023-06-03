export const createDownloaderBatch = (urlList) => {
    const totalDownloadList = urlList.length;
    console.log('total items to download:- ', totalDownloadList);

    let batchContainer = [];
    let batchSize = 20;
    let container = [];
    for (let i = 0; i < totalDownloadList; i++) {
        if (i < batchSize) {
            container.push(urlList[i]);
        } else {
            batchContainer.push([...container]);
            container = [];
            batchSize += 20;
            container.push(urlList[i]);
        }
    }

    if (container.length) {
        batchContainer.push([...container]);
        container = [];
    }

    return { 
        batchContainer,
        totalDownloadList
    };
}