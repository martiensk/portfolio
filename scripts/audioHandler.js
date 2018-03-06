import '../audio/hdd.mp3';
import '../audio/record.mp3';
import '../audio/typing.mp3';
import '../audio/terminal.mp3';

export default class AudioHandler {
    constructor () {
        this.audioFiles = {
            hdd: './audio/hdd.mp3',
            record: './audio/record.mp3',
            typing: './audio/typing.mp3',
            terminal: './audio/terminal.mp3'
        };
        this.ready = false;
        this.fileCounter = 0;
        for (const i in this.audioFiles) {
            this.preload(i, this.audioFiles[i]);
        }
    }

    preload (clip, url) {
        const audio = new Audio();
        audio.addEventListener('canplaythrough', this.loaded(clip, url));
        audio.src = url;
    }

    loaded (clip, url) {
        this.fileCounter += 1;

        const audio = new Audio();
        const source = document.createElement('source');
        source.type = 'audio/mpeg';
        source.src = url;
        audio.appendChild(source);
        this.audioFiles[clip] = audio;

        if (this.fileCounter === Object.keys(this.audioFiles).length) {
            this.ready = true;
        }
    }

    play (clip, volume = 1) {
        this.audioFiles[clip].volume = volume;
        this.audioFiles[clip].play();
    }

    pause (clip) {
        this.audioFiles[clip].pause();
    }
}
