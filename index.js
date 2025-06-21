// Данные из https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd
const BASE_URL = 'https://dash.akamaized.net/akamai/bbb_30fps/';
const videoCodec = 'video/mp4; codecs="avc1.64001f"';
const audioCodec = 'audio/mp4; codecs="mp4a.40.5"';

const amountOfChunks = 159;
const video = document.getElementsByTagName('video')[0];

function getMediaSource() {
    if (window.ManagedMediaSource) {
        return new window.ManagedMediaSource();
    }

    if (window.MediaSource) {
        return new window.MediaSource();
    }

    throw new Error('No MediaSource API available');
}

const ms = new getMediaSource();
ms.addEventListener('sourceopen', onMediaSourceOpen);
video.src = URL.createObjectURL(ms);

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

function getSegmentUrl(index, type) {
    const videoUrl = `${BASE_URL}bbb_30fps_1280x720_4000k/bbb_30fps_1280x720_4000k_${index}.m4v`;
    const audioUrl = `${BASE_URL}bbb_a64k/bbb_a64k_${index}.m4a`;

    return type === 'video' ? videoUrl : audioUrl;
}

function addSourceBuffer(type) {
    let i = 0;
    const sourceBuffer = ms.addSourceBuffer(type === 'video' ? videoCodec : audioCodec);

    sourceBuffer.addEventListener('updateend', () => {
        if (i < amountOfChunks) {
            fetchAndAppendSegmentByIndex(i, type, sourceBuffer).then(() => i++);
        }
    });

    fetchAndAppendSegmentByIndex(i, type, sourceBuffer).then(() => i++);
}

function onMediaSourceOpen() {
    addSourceBuffer('video');
    addSourceBuffer('audio');
}

function fetchAndAppendSegmentByIndex(index, type, sb) {
    const url = getSegmentUrl(index, type);

    return fetchSegment(url).then((e) => {
        appendToBuffer(e, sb);
    });
}

function appendToBuffer(videoChunk, sourceBuffer) {
    sourceBuffer.appendBuffer(new Uint8Array(videoChunk));
}
