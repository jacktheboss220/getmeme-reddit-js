const fs = require('fs')
const axios = require('axios');
// module.exports.downloadmeme = async (url, path) => {
const downloadmeme = async (url, path) => {
    const writer = fs.createWriteStream(`${path}`)
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    })
    response.data.pipe(writer)
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    })
}
const memeUrl = 'https://meme-api.herokuapp.com/gimme';
axios(memeUrl).then((res) => {
    let url = res.data.url;
    console.log(url);
    console.log('Title : ', res.data.title);
    if (url.includes("gif")) {
        downloadmeme(`${res.data.url}`, `pic.jpg`);
    }
    else {
        downloadmeme(`${res.data.url}`, `pic.jpg`);
    }
})
