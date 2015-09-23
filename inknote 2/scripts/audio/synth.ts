module Inknote.Audio {

    export class Synth implements IIdentifiable {

        ID = getID();
        
        setInput(node: AudioNode) {

            this.input = node;

        }

        input: AudioNode;

        gain: number;

        connectTo(node: AudioNode, audioContext: AudioContext) {

            if (!node) {
                throw Error("must specify node when connecting synth");
            }
            if (!audioContext) {
                throw Error("must specify audioContext when connecting synth");
            }
            if (!this.input) {
                throw Error("the input must be set first, before connecting the synth to further items");
            }

            var wetGain = audioContext.createGain();
            wetGain.gain.value = 0.5;

            var dryGain = audioContext.createGain();

            var delay = audioContext.createDelay(1);
            delay.delayTime.value = 0.2;

            var mixGain = audioContext.createGain();
            if (this.gain) {
                mixGain.gain.value = this.gain;
            }

            var bq = audioContext.createBiquadFilter();

            var comp = audioContext.createDynamicsCompressor();

            /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
             * input ----> dryGain ----------------|
             *    |------> delay --> wetGain --> mixGain --> output
             *                |---<----|
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

            this.input.connect(dryGain);
            this.input.connect(delay);
            delay.connect(wetGain);
            wetGain.connect(delay);

            dryGain.connect(mixGain);
            wetGain.connect(mixGain);

            mixGain.connect(node);

        }

        constructor(public name: string) {
            if (!name) {
                throw new Error("A synth must have a name!");
            }
        }

    }

}