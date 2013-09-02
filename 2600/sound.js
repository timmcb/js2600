/// <reference>../Definitions/waapi.d.ts</reference>
function Sound() {
    function PolyNext(reg, n, x0, x1) {
        var b0 = ((reg >>> x0) & 1);
        var b1 = ((reg >>> x1) & 1);
        var bx = b0 ^ b1;
        var next = (reg >>> 1) | (bx << (n - 1));
        return next;
    }

    function PolyAll(reg0, n, x0, x1) {
        var reg = reg0;
        var p = new Array();

        do {
            var b = reg & 1;
            if (b) {
                p.push(1.0);
            } else {
                p.push(-1.0);
            }
            reg = PolyNext(reg, n, x0, x1);
        } while(reg !== reg0);

        return p;
    }

    function Poly9() {
        return PolyAll(0x01FF, 9, 0, 4);
    }

    function Poly4() {
        return PolyAll(0x000F, 4, 0, 1);
    }

    function Poly5() {
        return PolyAll(0x001F, 5, 0, 2);
    }

    function Poly5To4() {
        var reg50 = 0x001F;
        var reg5 = reg50;
        var reg40 = 0x000F;
        var reg4 = reg40;
        var p = new Array();

        do {
            var b = reg4 & 1;
            if (b) {
                p.push(1);
            } else {
                p.push(-1);
            }
            reg5 = PolyNext(reg5, 5, 0, 2);
            if (reg5 & 1) {
                reg4 = PolyNext(reg4, 4, 0, 1);
            }
        } while(reg4 !== reg40 && reg5 !== reg50);

        return p;
    }

    function Div15(data) {
        var p = new Array();
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < 15; j++) {
                p.push(data[i]);
            }
        }
        return p;
    }

    function SetTo1() {
        return [1];
    }

    function PureTone() {
        return [1, -1];
    }

    function Div2(data) {
        var p = new Array();
        var len = [1, 1];
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < len[i % 2]; j++) {
                p.push(data[i]);
            }
        }
        return p;
    }

    function Div31(data) {
        var p = new Array();
        var len = [18, 13];
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < len[i % 2]; j++) {
                p.push(data[i]);
            }
        }
        return p;
    }

    function Div6(data) {
        var p = new Array();
        var len = [3, 3];
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < len[i % 2]; j++) {
                p.push(data[i]);
            }
        }
        return p;
    }

    function SetLast4To1() {
        return [1];
    }

    var sounds = [
        SetTo1(),
        Poly4(),
        Div15(Poly4()),
        Poly5To4(),
        Div2(PureTone()),
        Div2(PureTone()),
        Div31(PureTone()),
        Div2(Poly5()),
        Poly9(),
        Poly5(),
        Div31(PureTone()),
        SetLast4To1(),
        Div6(PureTone()),
        Div6(PureTone()),
        Div6(Div31(PureTone())),
        Div6(Poly5())
    ];

    if (typeof AudioContext === "function") {
        this.context = new AudioContext();
    } else if (typeof webkitAudioContext === "function") {
        this.context = new webkitAudioContext();
    }

    var buffers = new Array();
    if (this.context) {
        for (var i = 0; i < sounds.length; i++) {
            var buffer = this.context.createBuffer(1, sounds[i].length, 30000);
            var data = buffer.getChannelData(0);
            for (var j = 0; j < sounds[i].length; j++) {
                data[j] = sounds[i][j];
            }
            buffers.push(buffer);
        }
    }

    this.Sound0 = 0;
    this.Frequency0 = 0;
    this.Volume0 = 0;
    this.generator0 = new ToneGenerator(this.context, buffers);

    this.Sound1 = 0;
    this.Frequency1 = 0;
    this.Volume1 = 0;
    this.generator1 = new ToneGenerator(this.context, buffers);

    this.AudioVolume0 = function (volume) {
        this.Volume0 = volume;
        this.generator0.play(this.Sound0, this.Frequency0, this.Volume0);
    };

    this.AudioFrequency0 = function (frequency) {
        this.Frequency0 = frequency;
        this.generator0.play(this.Sound0, this.Frequency0, this.Volume0);
    };

    this.AudioSound0 = function (sound) {
        this.Sound0 = sound;
        this.generator0.play(this.Sound0, this.Frequency0, this.Volume0);
    };

    this.AudioVolume1 = function (volume) {
        this.Volume1 = volume;
        this.generator1.play(this.Sound1, this.Frequency1, this.Volume1);
    };

    this.AudioFrequency1 = function (frequency) {
        this.Frequency1 = frequency;
        this.generator1.play(this.Sound1, this.Frequency1, this.Volume1);
    };

    this.AudioSound1 = function (sound) {
        this.Sound1 = sound;
        this.generator1.play(this.Sound1, this.Frequency1, this.Volume1);
    };
}

function ToneGenerator(context, buffers) {
    this.context = context;
    this.buffers = buffers;
    if (this.context) {
        this.gainNode = this.context.createGainNode();
        this.gainNode.gain.value = 0;
        this.gainNode.connect(this.context.destination);
        this.bufferSource = null;
        this.sound = 0;
        this.frequency = 0;
        this.volume = 0;
    }
}

ToneGenerator.prototype.play = function (sound, frequency, volume) {
    if (this.context) {
        var toneChanged = (this.sound !== sound || this.frequency !== frequency);
        var volumeChanged = (this.volume !== volume);

        if (volumeChanged) {
            this.gainNode.gain.value = 0.1 * (volume / 15);
        }

        if (toneChanged || volume === 0) {
            this.stop();
        }

        if ((toneChanged || (volumeChanged && this.bufferSource === null)) && volume !== 0) {
            this.bufferSource = this.context.createBufferSource();
            this.bufferSource.buffer = this.buffers[sound];
            this.bufferSource.loop = true;
            this.bufferSource.playbackRate.value = 1.0;
            this.bufferSource.playbackRate.value = (1.0 / (frequency + 1));
            this.bufferSource.connect(this.gainNode);
            this.bufferSource.noteOn(0);
        }

        this.sound = sound;
        this.volume = volume;
        this.frequency = frequency;
    }
};

ToneGenerator.prototype.stop = function () {
    if (this.context) {
        if (this.bufferSource) {
            this.bufferSource.noteOff(0);
            this.bufferSource = null;
        }
    }
};
//# sourceMappingURL=sound.js.map
