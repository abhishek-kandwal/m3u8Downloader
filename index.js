import { urlSeperator } from "./src/urlSeperator.js";
import { m3u8FileDownloader } from "./src/m3u8FileDownloader.js";
import { m3u8FileToArray } from './src/m3u8FileToArray.js';
import { cleanM3u8Data } from "./src/cleanM3u8Data.js";
import { saveVideoToLocal } from "./src/saveToLocal.js";
import { joinM3u8Urls } from "./src/joinM3u8Urls.js";
import { createDownloaderBatch } from "./src/createDownloaderBatch.js";
import { batchDownloader } from "./src/batchDownloader.js";

const main = async (url) => {
  try {
      const { accessUrl, initialUrl } = urlSeperator(url);
      const m3u8Data = await m3u8FileDownloader(initialUrl);
      const seperatedData = m3u8FileToArray(m3u8Data);
      const cleanEndPointSet = cleanM3u8Data(seperatedData);
      const urlList = joinM3u8Urls(cleanEndPointSet, accessUrl);
      const batchListData = createDownloaderBatch(urlList);
      const downloadedBatch = await batchDownloader(batchListData);
      console.log("please wait...");
      saveVideoToLocal(downloadedBatch);
  } catch (err) {
      console.log('main error', err);
  }
};

// const m3u8Url = 'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_4x3/gear2/prog_index.m3u8';
const m3u8Url = 'https://evif.onthecloudcdn.com/_v10/4c878887a558042189c62ea2b88c5f6c1c1bf23900b3eeca9b63c30aa2a28f593261db4a048142ed8cf081d852ccb12805a2a793bf1b34a16ee14010085e341e8bb1a713411d151fde1f9c0800a4955b776018a6e24583eefd57a06a0a93295bba6012eeb1376aaa4e5e4734293bb243dfaae85896c7c3c551b796de0e40e7d2/360/index.m3u8';

main(m3u8Url);