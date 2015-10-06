module Inknote.Audio {

    export enum SoundType {
        "sine",
        "sawtooth",
        "triangle",
        "square",
        "custome"
    }

    export function getSoundType(soundType: SoundType): any {
        switch (soundType) {
            case SoundType.sine:
                return "sine";
            case SoundType.sawtooth:
                return "sawtooth";
            case SoundType.triangle:
                return "triangle";
            case SoundType.square:
                return "square";
            default:
                return "sine";
        }
    }

    export class Sound {
        startTime: Date;

        playTime: number;

        lifeTime: number;

        frequency: number;

        isSilent: boolean = false;

        finished: boolean = false;

        oscillator: OscillatorNode;

        gain: GainNode;

        note: Model.Note = null;

        soundType: SoundType = SoundType.sine;

        synth: Synth;

        play(ctx: AudioContext, connectTo: GainNode) {

            this.oscillator = ctx.createOscillator();

            this.oscillator.type = getSoundType(this.soundType);
            if (this.synth) {
                this.oscillator.type = getSoundType(this.synth.oscillatorType);
            }

            this.gain = ctx.createGain();
            this.gain.gain.value = 0.3;

            this.oscillator.connect(this.gain);

            if (this.synth) {
                var synth = this.synth;
                synth.setInput(this.gain);
                synth.connectTo(connectTo, ctx);
            }
            else {
                this.gain.connect(connectTo);
            }

            //this.gain.connect(connectTo);

            this.oscillator.frequency.value = this.frequency;

            this.oscillator.start(0);

            this.startTime = new Date();

            this.note.isPlaying = true;

            ScoringService.Instance.refresh();
        }

        mute() {
            // seperated from stop && disconnecting functions to reduce clipping.
            this.isSilent = true;

            this.gain.gain.value = 0;

            this.note.isPlaying = false;

            ScoringService.Instance.refresh();
        }

        stop() {
            // by only decreasing gain, removes popping.
            // this.oscillator.disconnect();

            this.finished = true;

            this.oscillator.disconnect();
            this.gain.disconnect();
            this.gain.numberOfOutputs
        }
         
        update() {

            var currentTime = (new Date()).getTime();

            var start = this.startTime.getTime();

            if (currentTime - start > this.playTime) {
                this.mute();
            }
            else if (currentTime - start > this.lifeTime) {
                this.stop();
            }
            else {
                this.gain.gain.value *= 0.95;
            }

        }

        constructor(freq: number, time: number, soundType?: SoundType) {
            this.frequency = freq;
            this.playTime = time;
            this.lifeTime = time + 1000;

            if (soundType) {
                this.soundType = soundType;
            }

        }
    }

}