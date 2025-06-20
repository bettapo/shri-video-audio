// Данные из https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd
const BASE_URL = 'https://dash.akamaized.net/akamai/bbb_30fps/';
const initUrl = BASE_URL + 'bbb_30fps_1280x720_4000k/bbb_30fps_1280x720_4000k_0.m4v';

let sourceBuffer;
let index = 1;
const amountOfChunks = 159;
const video = document.getElementsByTagName('video')[0];

function fetchSegment(url) {
    return fetch(url, {
        responseType: 'arraybuffer',
    }).then((res) => {
        if (!res.ok) {
            console.warn('Unexpected status code ' + res.status + ' for ' + url);
            return;
        }

        return res.arrayBuffer();
    });
}

if (window.MediaSource) {
    const ms = new MediaSource();
    ms.addEventListener('sourceopen', onMediaSourceOpen);
    video.src = URL.createObjectURL(ms);

    function onMediaSourceOpen() {
        sourceBuffer = ms.addSourceBuffer('video/mp4; codecs="avc1.64001f"');
        sourceBuffer.addEventListener('updateend', fetchAndAppendNextSegment);

        fetchSegment(initUrl).then((e) => {
            appendToBuffer(e);
            video.play();
        });
    }

    function fetchAndAppendNextSegment() {
        const url = BASE_URL + `bbb_30fps_1280x720_4000k/bbb_30fps_1280x720_4000k_${index}.m4v`;

        fetchSegment(url).then((e) => {
            appendToBuffer(e);
            index++;
            if (index > amountOfChunks) {
                sourceBuffer.removeEventListener('updateend', fetchAndAppendNextSegment);
            }
        });
    }

    function appendToBuffer(videoChunk) {
        sourceBuffer.appendBuffer(new Uint8Array(videoChunk));
    }
} else {
    console.error('No Media Source API available');
}
