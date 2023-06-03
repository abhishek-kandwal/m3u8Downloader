export const joinM3u8Urls = (endPoints, prefixUrl) => {
    return endPoints.map(endPoint => prefixUrl + endPoint)
}