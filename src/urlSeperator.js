export const urlSeperator = (url) => {
    const prefix = 'https://';

    const withoutPrefix = url.split(prefix)[1];
    const splitedWithoutPrefix = withoutPrefix.split('/');
    const accessUrl = prefix + splitedWithoutPrefix.slice(0, splitedWithoutPrefix.length - 1).join('/') + '/';
    
    return {
        accessUrl, 
        initialUrl: url
    }
}