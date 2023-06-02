import fs from 'fs';

export const saveVideoToLocal = (videoChunks, name) => {
    try {
        let video = Buffer.alloc(0);
        let videoName = name || 'video1.mp4';
    
        videoChunks.forEach(chunk => {
            video = Buffer.concat([video, chunk]); 
        });
        console.log('download started!');
        fs.writeFileSync(videoName, video);
        console.log('video downloaded!');

    } catch(err) {
        console.log('errn oooo', err);
    }
}