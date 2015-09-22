module Inknote.Audio {

    export class SynthManager {

        private static _instance: SynthManager;

        static get Instance(){
            if (!SynthManager._instance) {
                SynthManager._instance = new SynthManager();
            }
            return SynthManager._instance;
        }

        private synths: Synth[] = Storage.getSynths();

        addSynth(synth: Synth) {
            this.synths.push(synth);
        }

        getSynths(): Synth[] {
            return this.synths;
        }

        private getSynthFromID(id: string): Synth {
            return <Synth>getItemFromID(this.synths, id);
        }

        private getSynthFromName(name: string): Synth {
            for (var i = 0; i < this.synths.length; i++) {
                if (this.synths[i].name == name) {
                    return this.synths[i];
                }
            } 
            return null;
        }
        
        getSynth(id: string, name: string): Synth {
            // gets by id
            var result = this.getSynthFromID(id);

            // otherwise gets from name
            if (!result) {
                result = this.getSynthFromName(name);
            }

            // else creates a new synth with this name
            if (!result) {
                var synth = new Synth(name);
                this.addSynth(synth);

                return synth;
            }

            return result;
        }

    }

}