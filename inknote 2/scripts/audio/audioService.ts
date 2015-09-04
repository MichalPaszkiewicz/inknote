module Inknote.Audio {

    function makeDistortionCurve(amount) {
        var k = typeof amount === 'number' ? amount : 50,
            n_samples = 44100,
            curve = new Float32Array(n_samples),
            deg = Math.PI / 180,
            i = 0,
            x;
        for (; i < n_samples; ++i) {
            x = i * 2 / n_samples - 1;
            curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
        }
        return curve;
    };

    function toMinimumSizeIndex(items: (Model.Note | Model.Rest | Model.Chord)[]): (Model.Note | Model.Rest | Model.Chord)[] {
        var result = [];

        for (var i = 0; i < items.length; i++) {

            var item = items[i];

            var num: number = 0;

            if (item instanceof Model.Note) {
                num = getCrotchetsFromNoteLength(item.length) * 16;

                result.push(item);
                num--;

            }
            else if (item instanceof Model.Rest) {
                num = getCrotchetsFromNoteLength(item.length) * 16;

            }
            else if (item instanceof Model.Chord) {
                num = getCrotchetsFromNoteLength(item.notes[0].length) * 16;

                result.push(item);
                num--;

            }

            for (var j = 0; j < num; j++) {
                result.push(null);
            }
            
        }

        return result;
    }

    export class AudioService {

        private static _instance: AudioService;

        static get Instance(): AudioService {
            if (!AudioService._instance) {
                AudioService._instance = new AudioService();
            }

            return AudioService._instance;
        }

        context: AudioContext = new AudioContext();
        masterGain: GainNode;
        waveShaper: WaveShaperNode;
        destination: AudioDestinationNode;
        timeStarted: Date;
        sounds: Sound[];
        bpm: number;
        timeSignature: Model.TimeSignature;
        playing: boolean = false;
        barIndex: number;
        beatIndex: number;
        indexChanged: Date;

        init() {
            this.destination = this.context.destination;
            if (this.masterGain) {
                this.masterGain.disconnect();
            }
            this.masterGain = this.context.createGain();
            this.masterGain.gain.value = 0.3;

            if (this.waveShaper) {
                this.waveShaper.disconnect();
            }
            this.waveShaper = this.context.createWaveShaper();
            // this.waveShaper.curve = makeDistortionCurve(100);

            this.masterGain.connect(this.waveShaper);
            this.waveShaper.connect(this.destination);
            this.sounds = [];
            // bpm has to be given from crotchet.
            this.bpm = 120;
            this.timeSignature = new Model.TimeSignature(4, 4);
            this.playing = false;
            this.barIndex = 0;
            this.beatIndex = 0;
            this.indexChanged = null;
        }

        constructor() {
            this.init();
        }

        toggle() {
            if (this.playing) {
                this.stop();
            }
            else {
                this.play();
            }
        }

        play() {
            if (Managers.PageManager.Current.page != Managers.Page.Score) {
                return;
            }

            this.playing = true;

            // run from selected item.
            var selectedID = ScoringService.Instance.selectID;
            var proj = Managers.ProjectManager.Instance.currentProject;
            
            for (var i = 0; i < proj.instruments.length; i++) {
                if (proj.instruments[i].visible === true) {
                    for (var j = 0; j < proj.instruments[i].bars.length; j++) {
                        if (proj.instruments[i].bars[j].ID === selectedID) {
                            this.barIndex = j;
                            return
                        }
                        
                        for (var k = 0; k < proj.instruments[i].bars[j].items.length; k++) {

                            if (proj.instruments[i].bars[j].items[k].ID === selectedID) {
                                this.barIndex = j;
                                // todo: get correct beat.
                                this.beatIndex = 0;
                                return;
                            }

                        }
                    }
                }
            }
            
            
        }

        playSound(sound: Sound) {

            this.sounds.push(sound);
            sound.play(this.context, this.masterGain);

        }

        playNote(note: Model.Note) {

            var frequency = getFrequencyFromNote(note);
            var playTime = getPlayingTime(note, this.bpm);
            var newSound = new Sound(frequency, playTime);
            newSound.note = note;
            this.playSound(newSound);

        }

        playNotes() {

            var minDifferenceTime = getPlayingTimeFromNoteLength(Model.NoteLength.HemiDemiSemiQuaver, this.bpm);

            var currentTime = new Date();

            if (this.indexChanged && (currentTime.getTime() - this.indexChanged.getTime() < minDifferenceTime)) {
                return;
            }

            var proj = Managers.ProjectManager.Instance.currentProject;

            var notesToPlay: Model.Note[] = [];

            if (this.barIndex >= proj.instruments[0].bars.length) {
                this.stop();
                return;
            }

            for (var i = 0; i < proj.instruments.length; i++) {
                var tempBar = proj.instruments[i].bars[this.barIndex];

                var tempItems: (Model.Note | Model.Rest)[] = getItemsWhere(tempBar.items, function (item) {
                    return item instanceof Model.Note || item instanceof Model.Rest;
                });

                var minimumSizeTempItems = toMinimumSizeIndex(tempItems);

                var tempItem = minimumSizeTempItems[this.beatIndex];

                if (tempItem instanceof Model.Note) {
                    
                    notesToPlay.push(tempItem);
                }

            }

            for (var i = 0; i < notesToPlay.length; i++) {
                this.playNote(notesToPlay[i]);
            }

            if (this.beatIndex + 1 >= this.timeSignature.top * 16) {
                this.barIndex++;
            }
            this.beatIndex = (this.beatIndex + 1) % (this.timeSignature.top * 16);

            this.indexChanged = new Date();
        }

        updateSounds() {
            for (var i = 0; i < this.sounds.length; i++) {
                this.sounds[i].update();
            }
        }

        removeFinishedSounds() {
            var newSounds: Sound[] = [];

            for (var i = 0; i < this.sounds.length; i++) {
                if (!this.sounds[i].finished) {
                    newSounds.push(this.sounds[i]);
                }
            }

            this.sounds = newSounds;
        }

        pause() {
            this.playing = false;
        }

        clearSounds() {
            for (var i = 0; i < this.sounds.length; i++) {
                this.sounds[i].stop();
            }
        }

        stop() {
            this.playing = false;
            this.clearSounds();
            this.init();
        }

        update() {
            if (Managers.PageManager.Current.page != Managers.Page.Score && this.playing === true) {
                this.stop();
            }

            if (this.playing === true) {
                this.playNotes();
            }

            this.updateSounds();
            this.removeFinishedSounds();
        }

    }

} 