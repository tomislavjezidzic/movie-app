export function splitArrayIntoGroups(array, n) {
    const groupSize = Math.floor(array.length / n);
    const remainder = array.length % n;
    let startIndex = 0;
    let groups = [];

    for (let i = 0; i < n; i++) {
        let endIndex = startIndex + groupSize;
        if (i < remainder) endIndex++;
        groups.push(array.slice(startIndex, endIndex));
        startIndex = endIndex;
    }

    return groups;
}

export function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function matchYoutubeUrl(url) {
    const regex =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return url.match(regex)
        ? {
              type: 'youtube',
              url: url.match(regex)[0],
              embed: `https://www.youtube.com/embed/${url.match(regex)[1]}`,
              mp4: false,
          }
        : false;
}

export function matchVimeoUrl(url) {
    const regex = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
    return url.match(regex)
        ? {
              type: 'vimeo',
              url: !!url.match(regex)[5] ? url.match(regex)[0] : url,
              embed: !!url.match(regex)[5]
                  ? `https://player.vimeo.com/video/${url.match(regex)[5]}`
                  : url,
              mp4: !url.match(regex)[5],
          }
        : false;
}

export function parseVideo(url) {
    const youtube = matchYoutubeUrl(url);
    const vimeo = matchVimeoUrl(url);
    if (!!youtube) return youtube;
    if (!!vimeo) return vimeo;
    return {
        type: 'external',
        url,
        embed: false,
        mp4: true,
    };
}

export function setGlobalCSSVariable(name: string, value: string) {
    if (typeof document !== 'undefined') {
        const root = document.documentElement;
        root.style.setProperty(name, value);
    }
}
