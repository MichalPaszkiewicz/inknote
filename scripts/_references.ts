// every added file must be added here.
// care must be taken to ensure there are no dependency loops.

// rights
/// <reference path="rights.ts" />

// interfaces
/// <reference path="interfaces/idrawable.ts" />
/// <reference path="interfaces/iidentifiable.ts" />
/// <reference path="interfaces/inameable.ts" />
/// <reference path="interfaces/ichordable.ts" />

// helpers
/// <reference path="helpers/array.ts" />
/// <reference path="helpers/string.ts" />
/// <reference path="helpers/canvas.ts" />
/// <reference path="helpers/maths.ts" />
/// <reference path="helpers/2d.ts" />

// model
/// <reference path="model/settings.ts" />
/// <reference path="model/drawoptions.ts" />
/// <reference path="model/clef.ts" />
/// <reference path="model/timesignature.ts" />
/// <reference path="model/notation.ts" />
/// <reference path="model/notevalue.ts" />
/// <reference path="model/notelength.ts" />
/// <reference path="model/rest.ts" />
/// <reference path="model/note.ts" />
/// <reference path="model/chord.ts" />
/// <reference path="model/text.ts" />
/// <reference path="model/bar.ts" />
/// <reference path="model/instrument.ts" />
/// <reference path="model/project.ts" />
/// <reference path="model/drawingsettings.ts" />
/// <reference path="model/tempdata.ts" />

// compressed
/// <reference path="model/compressed/compresseditemidentifier.ts" />
/// <reference path="model/compressed/compressednote.ts" />
/// <reference path="model/compressed/compressedchord.ts" />
/// <reference path="model/compressed/compressedrest.ts" />
/// <reference path="model/compressed/compressedclef.ts" />
/// <reference path="model/compressed/compressedtimesignature.ts" />
/// <reference path="model/compressed/compressedtext.ts" />
/// <reference path="model/compressed/compressedBar.ts" />
/// <reference path="model/compressed/compressedInstrument.ts" />
/// <reference path="model/compressed/compressedproject.ts" />

// keys
/// <reference path="model/key/key.ts" />
/// <reference path="model/key/keytypes.ts" />
/// <reference path="model/key/keydefinitions.ts" />
/// <reference path="model/key/keyextensions.ts" />

// chord notation
/// <reference path="model/chordnotation/notationtype.ts" />
/// <reference path="model/chordnotation/doremichordnotation.ts" />
/// <reference path="model/chordnotation/standardchordnotation.ts" />
/// <reference path="model/chordnotation/upper_lowerchordnotation.ts" />

// drawings
/// <reference path="drawings/licence.ts" />
/// <reference path="drawings/fonts.ts" />
/// <reference path="drawings/colours.ts" />
/// <reference path="drawings/background.ts" />
/// <reference path="drawings/stave.ts" />
/// <reference path="drawings/clef.ts" />
/// <reference path="drawings/timesignature.ts" />
/// <reference path="drawings/sharp.ts" />
/// <reference path="drawings/flat.ts" />
/// <reference path="drawings/natural.ts" />
/// <reference path="drawings/note.ts" />
/// <reference path="drawings/ledgerline.ts" />
/// <reference path="drawings/rest.ts" />
/// <reference path="drawings/drawtext.ts" />
/// <reference path="drawings/bar.ts" />
/// <reference path="drawings/loading.ts" /> 
/// <reference path="drawings/name.ts" />
/// <reference path="drawings/file.ts" />
/// <reference path="drawings/keyboardkey.ts" />
/// <reference path="drawings/keyboard.ts" />
/// <reference path="drawings/bottommenubutton.ts" />
/// <reference path="drawings/bottommenu.ts" />
/// <reference path="drawings/scoremenu.ts" />
/// <reference path="drawings/chordsymbol.ts" />
/// <reference path="drawings/tempomark.ts" />
/// <reference path="drawings/scrollbars/scrollbar.ts" />
/// <reference path="drawings/scrollbars/filescrollbar.ts" />
/// <reference path="drawings/scrollbars/scrollthumbnail.ts" />
/// <reference path="drawings/scrollbars/projectscrollbar.ts" />

// right click menus
/// <reference path="drawings/rightclickmenus/rightclickmenu.ts" />
/// <reference path="drawings/rightclickmenus/rightclickfile.ts" />
/// <reference path="drawings/rightclickmenus/rightclickscore.ts" />

// landing
/// <reference path="landing/metaball.ts" />
/// <reference path="landing/landing.ts" />

// dropCanvas
/// <reference path="dropcanvas/environment.ts" />
/// <reference path="dropcanvas/dropfile.ts" />
/// <reference path="dropcanvas/springs.ts" />
/// <reference path="dropcanvas/droplet.ts" />
/// <reference path="dropcanvas/dropcanvas.ts" />

// note controls
/// <reference path="drawings/notecontrols/notecontrolbackground.ts" />
/// <reference path="drawings/notecontrols/pianokey.ts" />
/// <reference path="drawings/notecontrols/piano.ts" />
/// <reference path="drawings/notecontrols/lengthcontrol.ts" />
/// <reference path="drawings/notecontrols/restcontrol.ts" />
/// <reference path="drawings/notecontrols/deletenotecontrol.ts" />
/// <reference path="drawings/notecontrols/minimise.ts" /> 

// logging service
/// <reference path="services/logger.ts" />

// storage
/// <reference path="storage/cookiestorage.ts" />
/// <reference path="storage/idbstorage.ts" />
/// <reference path="storage/localstorage.ts" />
/// <reference path="storage/drivestorage.ts" />

// services
/// <reference path="services/tempdataservice.ts" />
/// <reference path="services/confirmservice.ts" />
/// <reference path="services/identifyservice.ts" />
/// <reference path="services/scrollservice.ts" />
/// <reference path="services/licenceservice.ts" />
/// <reference path="services/idrawableservice.ts" />
/// <reference path="services/clipboardservice.ts" />
/// <reference path="services/rightclickmenuservice.ts" /> 
/// <reference path="services/drawservice.ts" />
/// <reference path="services/scoringservice.ts" />
/// <reference path="services/projectconverter.ts" />
/// <reference path="services/fileconverter.ts" />
/// <reference path="services/intervalservice.ts" />
/// <reference path="services/transposeservice.ts" />
/// <reference path="services/restservice.ts" />
/// <reference path="services/noteservice.ts" />
/// <reference path="services/clefservice.ts" />
/// <reference path="services/timesignatureservice.ts" />
/// <reference path="services/chordservice.ts" />
/// <reference path="services/chordnotationservice.ts" />
/// <reference path="services/chordidentifier.ts" />
/// <reference path="services/notecontrolservice.ts" />
/// <reference path="services/barservice.ts" />
/// <reference path="services/projectoptionsservice.ts" />
/// <reference path="services/instrumentservice.ts" />
/// <reference path="services/undoservice.ts" />
/// <reference path="services/httpservice.ts" />
/// <reference path="services/printservice.ts" />
/// <reference path="services/smartsearchservice.ts" />
/// <reference path="services/gotoservice.ts" />

// audio
/// <reference path="audio/sound.ts" />
/// <reference path="audio/frequencies.ts" />
/// <reference path="audio/playtime.ts" />
/// <reference path="audio/audioservice.ts" />
/// <reference path="audio/synth.ts" />
/// <reference path="audio/synthmanager.ts" />
/// <reference path="audio/synthservice.ts" />

// testData
/// <reference path="testdata/compressedproject.ts" />

// managers
/// <reference path="managers/versionmanager.ts" />
/// <reference path="managers/machinemanager.ts" />
/// <reference path="managers/pagemanager.ts" />
/// <reference path="managers/settingsmanager.ts" />
/// <reference path="managers/projectmanager.ts" />
/// <reference path="managers/pluginmanager.ts" />
/// <reference path="managers/mousemanager.ts" />

// plugins
/// <reference path="plugins/compressedplugin.ts" />
/// <reference path="plugins/plugin.ts" />
/// <reference path="plugins/pluginlist.ts" />

// controls
/// <reference path="actions/baseAction.ts" />
/// <reference path="actions/canvascontrol.ts" />
/// <reference path="actions/scrollcontrol.ts" />
/// <reference path="actions/typecontrol.ts" />
/// <reference path="actions/frontendactions.ts" />
/// <reference path="actions/frontendsearch.ts" />
/// <reference path="actions/windowresize.ts" />

// app
/// <reference path="app.ts" />
/// <reference path="security-warning.ts" />

