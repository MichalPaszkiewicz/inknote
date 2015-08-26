module Inknote.Audio {

    export class Sound {
        
        startTime: Date;
        
        playTime: number;
        
        frequency: number;

        finished: boolean = false;

        oscillator: OscillatorNode;

        gain: GainNode;

        play(ctx: AudioContext, connectTo: GainNode) {

            this.oscillator = ctx.createOscillator();

            this.gain = ctx.createGain();
            this.gain.gain.value = 0.5;

            this.oscillator.connect(this.gain);
            this.gain.connect(connectTo);

            this.oscillator.frequency.value = this.frequency;

            this.oscillator.start(0);

            this.startTime = new Date();

        }

        stop() {

            this.gain.gain.value = 0;

            // by only decreasing gain, removes popping.
            // this.oscillator.disconnect();

            this.finished = true;

        }

        update() {

            var currentTime = (new Date()).getTime();

            var start = this.startTime.getTime();

            if (currentTime - start > this.playTime) {
                this.stop();
            }
            else {
                this.gain.gain.value *= 0.9;
            }

        }
        
        constructor(freq, time) {
            this.frequency = freq;
            this.playTime = time;
        }      

    }

}