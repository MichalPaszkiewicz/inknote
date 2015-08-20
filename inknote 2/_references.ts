// every added file must be added here.
// care must be taken to ensure there are no dependency loops.

// rights
/// <reference path="scripts/rights.ts" />

// interfaces
/// <reference path="scripts/interfaces/idrawable.ts" />
/// <reference path="scripts/interfaces/iidentifiable.ts" />
/// <reference path="scripts/interfaces/inameable.ts" />
/// <reference path="scripts/interfaces/ichordable.ts" />

// helpers
/// <reference path="scripts/helpers/array.ts" />
/// <reference path="scripts/helpers/string.ts" />
/// <reference path="scripts/helpers/canvas.ts" />
/// <reference path="scripts/helpers/maths.ts" />
/// <reference path="scripts/helpers/2d.ts" />
 
// model
/// <reference path="scripts/model/settings.ts" />
/// <reference path="scripts/model/drawoptions.ts" />
/// <reference path="scripts/model/clef.ts" />
/// <reference path="scripts/model/timesignature.ts" />
/// <reference path="scripts/model/notation.ts" />
/// <reference path="scripts/model/notevalue.ts" />
/// <reference path="scripts/model/notelength.ts" />
/// <reference path="scripts/model/rest.ts" />
/// <reference path="scripts/model/note.ts" />
/// <reference path="scripts/model/chord.ts" />
/// <reference path="scripts/model/bar.ts" />
/// <reference path="scripts/model/instrument.ts" />
/// <reference path="scripts/model/project.ts" />
/// <reference path="scripts/model/drawingsettings.ts" />

// compressed
/// <reference path="scripts/model/compressed/compresseditemidentifier.ts" />
/// <reference path="scripts/model/compressed/compressednote.ts" />
/// <reference path="scripts/model/compressed/compressedchord.ts" />
/// <reference path="scripts/model/compressed/compressedrest.ts" />
/// <reference path="scripts/model/compressed/compressedBar.ts" />
/// <reference path="scripts/model/compressed/compressedInstrument.ts" />
/// <reference path="scripts/model/compressed/compressedproject.ts" />

// keys
/// <reference path="scripts/model/key/key.ts" />
/// <reference path="scripts/model/key/keytypes.ts" />
/// <reference path="scripts/model/key/keydefinitions.ts" />
/// <reference path="scripts/model/key/keyextensions.ts" />

// chord notation
/// <reference path="scripts/model/chordnotation/notationtype.ts" />
/// <reference path="scripts/model/chordnotation/doremichordnotation.ts" />
/// <reference path="scripts/model/chordnotation/standardchordnotation.ts" />
/// <reference path="scripts/model/chordnotation/upper_lowerchordnotation.ts" />

// drawings
/// <reference path="scripts/drawings/licence.ts" />
/// <reference path="scripts/drawings/fonts.ts" />
/// <reference path="scripts/drawings/colours.ts" />
/// <reference path="scripts/drawings/background.ts" />
/// <reference path="scripts/drawings/stave.ts" />
/// <reference path="scripts/drawings/clef.ts" />
/// <reference path="scripts/drawings/timesignature.ts" />
/// <reference path="scripts/drawings/sharp.ts" />
/// <reference path="scripts/drawings/flat.ts" />
/// <reference path="scripts/drawings/natural.ts" />
/// <reference path="scripts/drawings/note.ts" />
/// <reference path="scripts/drawings/rest.ts" />
/// <reference path="scripts/drawings/bar.ts" />
/// <reference path="scripts/drawings/loading.ts" /> 
/// <reference path="scripts/drawings/name.ts" />
/// <reference path="scripts/drawings/file.ts" />
/// <reference path="scripts/drawings/keyboardkey.ts" />
/// <reference path="scripts/drawings/keyboard.ts" />
/// <reference path="scripts/drawings/bottommenubutton.ts" />
/// <reference path="scripts/drawings/bottommenu.ts" />
/// <reference path="scripts/drawings/scoremenu.ts" />
/// <reference path="scripts/drawings/chordsymbol.ts" />
/// <reference path="scripts/drawings/scrollbars/scrollbar.ts" />
/// <reference path="scripts/drawings/scrollbars/filescrollbar.ts" />
/// <reference path="scripts/drawings/scrollbars/scrollthumbnail.ts" />
/// <reference path="scripts/drawings/scrollbars/projectscrollbar.ts" />

// right click menus
/// <reference path="scripts/drawings/rightclickmenus/rightclickmenu.ts" />
/// <reference path="scripts/drawings/rightclickmenus/rightclickfile.ts" />
/// <reference path="scripts/drawings/rightclickmenus/rightclickscore.ts" />

// landing
/// <reference path="scripts/landing/metaball.ts" />
/// <reference path="scripts/landing/landing.ts" />

// dropCanvas
/// <reference path="scripts/dropcanvas/environment.ts" />
/// <reference path="scripts/dropcanvas/dropfile.ts" />
/// <reference path="scripts/dropcanvas/springs.ts" />
/// <reference path="scripts/dropcanvas/droplet.ts" />
/// <reference path="scripts/dropcanvas/dropcanvas.ts" />

// note controls
/// <reference path="scripts/drawings/notecontrols/notecontrolbackground.ts" />
/// <reference path="scripts/drawings/notecontrols/pianokey.ts" />
/// <reference path="scripts/drawings/notecontrols/piano.ts" />
/// <reference path="scripts/drawings/notecontrols/lengthcontrol.ts" />
/// <reference path="scripts/drawings/notecontrols/restcontrol.ts" />
/// <reference path="scripts/drawings/notecontrols/deletenotecontrol.ts" />
/// <reference path="scripts/drawings/notecontrols/minimise.ts" /> 

// storage
/// <reference path="scripts/storage/localstorage.ts" />
/// <reference path="scripts/storage/drivestorage.ts" />

// services
/// <reference path="scripts/services/confirmservice.ts" />
/// <reference path="scripts/services/logger.ts" />
/// <reference path="scripts/services/identifyservice.ts" />
/// <reference path="scripts/services/scrollservice.ts" />
/// <reference path="scripts/services/licenceservice.ts" />
/// <reference path="scripts/services/idrawableservice.ts" />
/// <reference path="scripts/services/rightclickmenuservice.ts" /> 
/// <reference path="scripts/services/drawservice.ts" />
/// <reference path="scripts/services/scoringservice.ts" />
/// <reference path="scripts/services/projectconverter.ts" />
/// <reference path="scripts/services/fileconverter.ts" />
/// <reference path="scripts/services/intervalservice.ts" />
/// <reference path="scripts/services/transposeservice.ts" />
/// <reference path="scripts/services/restservice.ts" />
/// <reference path="scripts/services/noteservice.ts" />
/// <reference path="scripts/services/chordservice.ts" />
/// <reference path="scripts/services/chordnotationservice.ts" />
/// <reference path="scripts/services/chordidentifier.ts" />
/// <reference path="scripts/services/notecontrolservice.ts" />
/// <reference path="scripts/services/barservice.ts" />
/// <reference path="scripts/services/projectoptionsservice.ts" />

// testData
/// <reference path="scripts/testdata/compressedproject.ts" />

// managers
/// <reference path="scripts/managers/versionmanager.ts" />
/// <reference path="scripts/managers/machinemanager.ts" />
/// <reference path="scripts/managers/pagemanager.ts" />
/// <reference path="scripts/managers/settingsmanager.ts" />
/// <reference path="scripts/managers/projectmanager.ts" />
/// <reference path="scripts/managers/pluginmanager.ts" />

// plugins
/// <reference path="scripts/plugins/compressedplugin.ts" />
/// <reference path="scripts/plugins/plugin.ts" />
/// <reference path="scripts/plugins/pluginlist.ts" />

// controls
/// <reference path="scripts/actions/baseAction.ts" />
/// <reference path="scripts/actions/canvascontrol.ts" />
/// <reference path="scripts/actions/scrollcontrol.ts" />
/// <reference path="scripts/actions/typecontrol.ts" />
/// <reference path="scripts/actions/frontendactions.ts" />
/// <reference path="scripts/actions/windowresize.ts" />

// app
/// <reference path="scripts/app.ts" />
/// <reference path="scripts/security-warning.ts" />

