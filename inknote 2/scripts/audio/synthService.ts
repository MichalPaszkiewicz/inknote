module Inknote.Audio {

    export class SynthService {

        private static _instance: SynthService;

        static get Instance(): SynthService {
            if (!SynthService._instance) {
                SynthService._instance = new SynthService();
            }
            return SynthService._instance;
        }

        synth: Synth;

        static setSynth(id: string, name: string) {
            SynthService.Instance.synth = SynthManager.Instance.getSynth(id, name);
        }

        changeWaveShape(value: string) {
            this.synth.oscillatorType = SoundType[value];  
        }

        changeGain(value: number) {
            this.synth.gain = value;
        }
    }

}