import fs from 'fs';

export const saveVideoToLocal = (videoChunks, name) => {
    try {
        let video = Buffer.alloc(0);
        let videoName = name || 'video1.ts';
    
        videoChunks.forEach(chunk => {
            video = Buffer.concat([video, chunk]); 
        });
        console.log('saving to local system.!');
        fs.writeFileSync(videoName, video);
        console.log('video saved!');

    } catch(err) {
        console.log('saving error', err);
    }
}