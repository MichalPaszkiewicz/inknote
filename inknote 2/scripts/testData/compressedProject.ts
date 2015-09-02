module Inknote.Testing {

    var _compressedProject = new Compressed.CompressedProject("TestCompressed");
    _compressedProject.ID = "42";
    var _compressedInstrument1 = new Compressed.Instrument("Violin");
    var _compressedInstrument2 = new Compressed.Instrument("Guitar");

    _compressedProject.instruments = [
        _compressedInstrument1,
        _compressedInstrument2
    ]

    export var $TEST$_compressedProject = _compressedProject;

} 