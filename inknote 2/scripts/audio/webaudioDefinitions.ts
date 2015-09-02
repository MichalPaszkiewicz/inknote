enum PanningModelType {
    equalpower,
    HRTF,
    soundfield
}

enum DistanceModelType {
    linear,
    inverse,
    exponential
}

enum BiquadFilterType {
    lowpass,
    highpass,
    bandpass,
    lowshelf,
    highshelf,
    peaking,
    notch,
    allpass
}

enum OscillatorType {
    sine,
    square,
    sawtooth,
    triangle,
    custom
}


declare var webkitAudioContext:
    {
        prototype: AudioContext;
        new (): AudioContext;
    }

declare class AudioContext {

    destination: AudioDestinationNode; // readonly
    sampleRate: number; // readonly
    currentTime: number; // readonly
    listener: AudioListener; // readonly
    activeSourceCount: number; // readonly
	
    createBuffer(numberOfChannels: number, length: number, sampleRate: number): AudioBuffer;
    createBuffer(buffer: ArrayBuffer, mixToMono: boolean): AudioBuffer;
    decodeAudioData(audioData: ArrayBuffer, decodeSuccessCallback?: Function, decodeErrorCallback?: Function);
    createBufferSource(): AudioBufferSourceNode;
    createMediaElementSource(mediaElement: HTMLMediaElement): MediaElementAudioSourceNode;
    createMediaStreamSource(mediaStreamMediaStream): MediaStreamAudioSourceNode;
    createMediaStreamDestination(): MediaStreamAudioDestinationNode;
    createScriptProcessor(bufferSize, numberOfInputChannels?: number, numberOfOutputChannels?: number): ScriptProcessorNode;
    createAnalyser(): AnalyserNode;
    createGain(): GainNode;
    createDelay(maxDelayTime?: number): DelayNode;
    createBiquadFilter(): BiquadFilterNode;
    createWaveShaper(): WaveShaperNode;
    createPanner(): PannerNode;
    createConvolver(): ConvolverNode;
    createChannelSplitter(numberOfOutputs?: number): ChannelSplitterNode;
    createChannelMerger(numberOfInputs?: number): ChannelMergerNode;
    createDynamicsCompressor(): DynamicsCompressorNode;
    createOscillator(): OscillatorNode;
    createWaveTable(real: Float32Array, imag: Float32Array): WaveTable;
}

interface OfflineAudioContext extends AudioContext {
    startRendering(): void;
    oncomplete: Function;
}

interface AudioNode {
    context: AudioContext; // readonly
    numberOfInputs: number; // readonly
    numberOfOutputs: number; // readonly

    connect(destination: AudioNode, output?: number, input?: number): void;
    connect(destination: AudioParam, output?: number): void;
    disconnect(output?: number): void;
}

interface AudioSourceNode extends AudioNode {
}

interface AudioDestinationNode extends AudioNode {
    maxNumberOfChannels: number; // readonly
    numberOfChannels: number;
}

interface AudioParam {
    value: number;
    computedValue: number; // readonly
    minValue: number; // readonly
    maxValue: number; // readonly
    defaultValue: number; // readonly

    setValueAtTime(value: number, startTime: number): void;
    linearRampToValueAtTime(value: number, endTime: number): void;
    exponentialRampToValueAtTime(value: number, endTime: number): void;
    setTargetAtTime(target: number, startTime: number, timeConstant: number): void;
    setValueCurveAtTime(values: Float32Array, startTime: number, duration: number): void;
    cancelScheduledValues(startTime: number): void;
}

interface AudioListener {
    dopplerFactor: number;
    speedOfSound: number;
    setPosition(x: number, y: number, z: number): void;
    setOrientation(x: number, y: number, z: number, xUp: number, yUp: number, zUp: number): void;
    setVelocity(x: number, y: number, z: number): void;
}

interface AudioBufferSourceNode extends AudioSourceNode {
    UNSCHEDULED_STATE: number;
    SCHEDULED_STATE: number;
    PLAYING_STATE: number;
    FINISHED_STATE: number;

    playbackState: number;	// readonly
    buffer: AudioBuffer;
    playbackRate: AudioParam;
    loop: boolean;
    loopStart: number;
    loopEnd: number;

    start(when: number, offset?: number, duration?: number): void;
    stop(when: number): void;
}

interface MediaElementAudioSourceNode extends AudioSourceNode {

}

interface MediaStreamAudioSourceNode extends AudioSourceNode {
}

interface MediaStreamAudioDestinationNode extends AudioDestinationNode {
    stream: MediaStream; //  readonly
}

interface MediaStream {
}

interface ScriptProcessorNode extends AudioNode {
    onaudioprocess: EventListener;
    bufferSize: number; //  readonly
}

interface AudioProcessingEvent extends Event {
    node: ScriptProcessorNode;
    playbackTime: number; // readonly
    inputBuffer: AudioBuffer; // readonly
    outputBuffer: AudioBuffer; // readonly
}

interface AnalyserNode extends AudioNode {
    getFloatFrequencyData(array: Float32Array): void;
    getByteFrequencyData(array: Uint8Array): void;
    getByteTimeDomainData(array: Uint8Array): void;

    fftSize: number;
    frequencyBinCount: number; // readonly
    minDecibels: number;
    maxDecibels: number;
    smoothingTimeConstant: number;
}

interface GainNode extends AudioNode {
    gain: AudioParam; // readonly
}

interface DelayNode {
    delayTime: AudioParam; // readonly
}

interface BiquadFilterNode extends AudioNode {
    type: BiquadFilterType;
    frequency: AudioParam; // readonly
    detune: AudioParam; // readonly
    Q: AudioParam; // readonly
    gain: AudioParam; // readonly

    getFrequencyResponse(frequencyHz: Float32Array, magResponse: Float32Array, phaseResponse: Float32Array): void;
}

interface WaveShaperNode extends AudioNode {
    curve: Float32Array;
}

interface PannerNode {
    panningModel: PanningModelType;
    setPosition(x: number, y: number, z: number): void;
    setOrientation(x: number, y: number, z: number): void;
    setVelocity(x: number, y: number, z: number): void;
    distanceModel: DistanceModelType;
    refDistance: number;
    maxDistance: number;
    rolloffFactor: number;
    coneInnerAngle: number;
    coneOuterAngle: number;
    coneOuterGain: number;
}

interface ChannelSplitterNode extends AudioNode {
}

interface ChannelMergerNode extends AudioNode {
}

interface ConvolverNode extends AudioNode {
    buffer: AudioBuffer;
    normalize: boolean;
}

interface DynamicsCompressorNode extends AudioNode {
    threshold: AudioParam; // readonly
    knee: AudioParam; // readonly
    ratio: AudioParam; // readonly
    reduction: AudioParam; // readonly
    attack: AudioParam; // readonly
    release: AudioParam; // readonly
}

interface OscillatorNode extends AudioSourceNode {
    type: OscillatorType;

    UNSCHEDULED_STATE: number;
    SCHEDULED_STATE: number;
    PLAYING_STATE: number;
    FINISHED_STATE: number;

    playbackState: number; // readonly
    frequency: AudioParam; // readonly
    detune: AudioParam; // readonly

    start(when: number): void;
    stop(when: number): void;
    setWaveTable(waveTable: WaveTable): void;
}

interface WaveTable {
}


interface AudioBuffer {
    sampleRate: number; // readonly
    length: number; // readonly
    duration: number; // readonly
    numberOfChannels: number; // readonly

    getChannelData(channel: number): Float32Array;
}
