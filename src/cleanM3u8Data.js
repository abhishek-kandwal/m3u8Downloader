export const cleanM3u8Data = (data) => {
    // const filterMap = ['#', 'vtt', 'woff', 'srt', 'html', 'css', 'txt', 'jpg'];
    const filterMap = ['#'];

    return data.filter(metaData => {
        const isExistSubStr = filterMap.filter(checkString => metaData.includes(checkString));
        return isExistSubStr.length > 0 || !metaData ? false : true ;
    });
}