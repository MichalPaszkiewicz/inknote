module Inknote.Audio {

    export class Sound {
        
        startTime: Date;
        
        playTime: number;
        
        frequency: number;

        finished: boolean = false;

        oscillator: OscillatorNode;

        destination: AudioDestinationNode;

        play(ctx: AudioContext) {

            this.oscillator = ctx.createOscillator();
            this.destination = ctx.destination;

            this.oscillator.connect(this.destination);

            this.oscillator.frequency.value = this.frequency;

            this.oscillator.start(0);

            this.startTime = new Date();

        }

        stop() {

            this.oscillator.disconnect();

            this.finished = true;

        }

        update() {

            var currentTime = (new Date()).getTime();

            var start = this.startTime.getTime();

            if (currentTime - start > this.playTime) {
                this.stop();
            }

        }
        
        constructor(freq, time) {
            this.frequency = freq;
            this.playTime = time;
        }      

    }

}