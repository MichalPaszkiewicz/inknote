module Inknote.Audio {

    export class Synth implements IIdentifiable {

        ID = getID();

        setInput(node: AudioNode) {

            this.input = node;

        }

        input: AudioNode;

        oscillatorType: Audio.SoundType = Audio.SoundType.sine;

        get gain(): number {
            return this.mixGain ? this.mixGain.gain.value : 1;
        }

        set gain(newGain: number) {
            if (!this.mixGain) {
                return;
            }
            this.mixGain.gain.value = newGain;
        }

        get delay(): number {
            return this.delayNode ? this.delayNode.delayTime.value : 0.1;
        }

        set delay(delayTime: number) {
            if (!this.delayNode) {
                return;
            }
            this.delayNode.delayTime.value = delayTime;
        }

        private dryGain: GainNode;
        private delayNode: DelayNode;
        private mixGain: GainNode;

        private connectedTo: any;

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

            if (this.connectedTo == node) {
                this.input.connect(this.dryGain);
                this.input.connect(this.delayNode);
                return; 
            } 
            this.connectedTo = node;

            var wetGain = audioContext.createGain();
            wetGain.gain.value = 0.5;

            this.dryGain = audioContext.createGain();

            this.delayNode = audioContext.createDelay(1);
            this.delayNode.delayTime.value = 0.1;

            this.mixGain = audioContext.createGain();
            if (this.gain) {
                this.mixGain.gain.value = this.gain;
            }

            var bq = audioContext.createBiquadFilter();

            var comp = audioContext.createDynamicsCompressor();

            /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
             * input ----> dryGain ----------------|
             *    |------> delay --> wetGain --> mixGain --> output
             *                |---<----|
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

            this.input.connect(this.dryGain);
            this.input.connect(this.delayNode);
            this.delayNode.connect(wetGain);
            wetGain.connect(this.delayNode);

            this.dryGain.connect(this.mixGain);
            wetGain.connect(this.mixGain);

            this.mixGain.connect(node);

        } 

        constructor(public name: string) {
            if (!name) {
                throw new Error("A synth must have a name!");
            }
        }

    }

}