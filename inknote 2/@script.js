// |__|  A......................................
//  __                                          
// |__|  MIND_BENDINGLY_AWESOME.................
//  __                                          
// |__|  TRULY_INNOVATIVE.......................
//  __                                          
// |__|  BROWSER_BASED..........................
//  __                                          
// |__|  MUSICALLY_ENLIGHTENING.................
//  __                                          
// |__|  PRODUCT_OF.............................
//  __ __    __ __  _____    __ _____ ________ _
// |  |  \  |  |  |/  /  \  |  |     |_    ___|_|
// |  |   \ |  |     /    \ |  |  _  | |  |  |_ 
// |  | |\ \|  |     \  |\ \|  | |_| | |  |   _|
// |  | | \    |  |\  \ | \    |     | | /   |__
// |__|_|  \___|__| \__\|  \___|_____| |/|______|
//                                              
// All rights reserved.                          
// Copyright @ Michal Paszkiewicz 2015;          
var Inknote;
(function (Inknote) {
    function allItemsAre(items, xAndY) {
        if (items.length === 0) {
            return false;
        }
        for (var i = 0; i < items.length; i++) {
            if (!xAndY(items[i])) {
                return false;
            }
        }
        return true;
    }
    Inknote.allItemsAre = allItemsAre;
    function anyItemIs(items, xAndY) {
        if (items === null || items === undefined) {
            return false;
        }
        for (var i = 0; i < items.length; i++) {
            if (xAndY(items[i])) {
                return true;
            }
        }
        return false;
    }
    Inknote.anyItemIs = anyItemIs;
    function countWhere(items, xAndY) {
        if (items === null || items === undefined) {
            return 0;
        }
        var count = 0;
        for (var i = 0; i < items.length; i++) {
            if (xAndY(items[i])) {
                count++;
            }
        }
        return count;
    }
    Inknote.countWhere = countWhere;
    function getItemsWhere(items, xAndY) {
        if (items === null || items === undefined) {
            return [];
        }
        var result = [];
        for (var i = 0; i < items.length; i++) {
            if (xAndY(items[i])) {
                result.push(items[i]);
            }
        }
        return result;
    }
    Inknote.getItemsWhere = getItemsWhere;
    function sum(items, xAndY) {
        if (items == null || items.length == 0) {
            return 0;
        }
        var total = 0;
        for (var i = 0; i < items.length; i++) {
            total += xAndY(items[i]);
        }
        return total;
    }
    Inknote.sum = sum;
    function last(items) {
        if (items == null || items.length == 0) {
            return null;
        }
        return items[items.length - 1];
    }
    Inknote.last = last;
    function arraysAreEqual(arrayOne, arrayTwo) {
        // if first array is false, return
        if (!arrayOne) {
            return false;
        }
        // if the other array is a falsy value, return
        if (!arrayTwo) {
            return false;
        }
        // compare lengths - can save a lot of time 
        if (arrayOne.length != arrayTwo.length) {
            return false;
        }
        for (var i = 0, l = arrayOne.length; i < l; i++) {
            // Check if we have nested arrays
            if (arrayOne[i] instanceof Array && arrayTwo[i] instanceof Array) {
                // recurse into the nested arrays
                if (!arraysAreEqual(arrayOne[i], arrayTwo[i])) {
                    return false;
                }
            }
            else if (arrayOne[i] != arrayTwo[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    }
    Inknote.arraysAreEqual = arraysAreEqual;
    function copySimpleArrayFrom(array) {
        var newArray = [];
        for (var i = 0; i < array.length; i++) {
            newArray.push(array[i]);
        }
        return newArray;
    }
    Inknote.copySimpleArrayFrom = copySimpleArrayFrom;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    function getID() {
        return ((new Date).getTime() + "") + Math.floor(10000 * Math.random());
    }
    Inknote.getID = getID;
    function pascalCase(text) {
        var newString = "";
        var textArray = text.split("");
        for (var i = 0; i < textArray.length; i++) {
            if (i == 0) {
                newString += textArray[i].toUpperCase();
            }
            else {
                newString += textArray[i].toLowerCase();
            }
        }
        return newString;
    }
    Inknote.pascalCase = pascalCase;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    function drawTextAlongArc(context, str, centerX, centerY, radius, angle) {
        var len = str.length, s;
        context.beginPath();
        context.textAlign = "center";
        context.save();
        context.translate(centerX, centerY);
        context.rotate(-1 * angle / 2);
        context.rotate(-1 * (angle / len) / 2);
        for (var n = 0; n < len; n++) {
            context.rotate(angle / len);
            context.save();
            context.translate(0, -1 * radius);
            s = str[n];
            context.font = "12px Arial";
            context.shadowColor = "black";
            context.shadowOffsetX = 1;
            context.shadowOffsetY = 1;
            context.shadowBlur = 1;
            context.fillText(s, 0, 0);
            context.restore();
        }
        context.restore();
    }
    Inknote.drawTextAlongArc = drawTextAlongArc;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Maths;
    (function (Maths) {
        function isWithinRadius(x1, y1, x2, y2, radius) {
            var dx = x1 - x2;
            var dy = y1 - y2;
            var dr = Math.sqrt(dx * dx + dy * dy);
            return dr <= radius;
        }
        Maths.isWithinRadius = isWithinRadius;
        function permutateSimpleNumberArray(array) {
            var copiedArray = Inknote.copySimpleArrayFrom(array);
            var lastValue = copiedArray.pop();
            var permutatedArray = [lastValue].concat(copiedArray);
            return permutatedArray;
        }
        function alignSimilarArrayTo(toBeAligned, toAlignTo) {
            var permutation = Inknote.copySimpleArrayFrom(toBeAligned);
            var bestValue = Infinity;
            var bestPermutation = Inknote.copySimpleArrayFrom(permutation);
            var permutations = toBeAligned.length;
            for (var i = 0; i < permutations; i++) {
                permutation = permutateSimpleNumberArray(permutation);
                var score = 0;
                for (var j = 0; j < permutation.length; j++) {
                    score += Math.abs(permutation[j] - toAlignTo[j]);
                }
                if (score < bestValue) {
                    bestPermutation = Inknote.copySimpleArrayFrom(permutation);
                }
            }
            return bestPermutation;
        }
        Maths.alignSimilarArrayTo = alignSimilarArrayTo;
        function pythagoras(x, y) {
            return Math.sqrt(x * x + y * y);
        }
        Maths.pythagoras = pythagoras;
    })(Maths = Inknote.Maths || (Inknote.Maths = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Maths;
    (function (Maths) {
        var Vector2 = (function () {
            function Vector2(x, y) {
                this.x = x;
                this.y = y;
            }
            Object.defineProperty(Vector2.prototype, "abs", {
                get: function () {
                    return Maths.pythagoras(this.x, this.y);
                },
                enumerable: true,
                configurable: true
            });
            return Vector2;
        })();
        Maths.Vector2 = Vector2;
    })(Maths = Inknote.Maths || (Inknote.Maths = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Setting = (function () {
        function Setting(name) {
            this.staveColour = "black";
            this.noteColour = "red";
            this.textColour = "green";
            this.ID = Inknote.getID();
            this.name = name;
            this.testMode = false;
            this.notationType = 0 /* Standard */;
            if (!name) {
                this.name = this.ID;
            }
        }
        return Setting;
    })();
    Inknote.Setting = Setting;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var DrawOptions = (function () {
        function DrawOptions() {
        }
        return DrawOptions;
    })();
    Inknote.DrawOptions = DrawOptions;
})(Inknote || (Inknote = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Inknote;
(function (Inknote) {
    var Model;
    (function (Model) {
        var Clef = (function () {
            function Clef() {
                this.ID = Inknote.getID();
            }
            return Clef;
        })();
        Model.Clef = Clef;
        (function (ClefType) {
            ClefType[ClefType["GClef"] = 0] = "GClef";
            ClefType[ClefType["CClef"] = 1] = "CClef";
            ClefType[ClefType["FClef"] = 2] = "FClef";
        })(Model.ClefType || (Model.ClefType = {}));
        var ClefType = Model.ClefType;
        var FrenchViolinClef = (function (_super) {
            __extends(FrenchViolinClef, _super);
            function FrenchViolinClef() {
                _super.apply(this, arguments);
                this.clefType = 0 /* GClef */;
                this.positionFromTreble = 2;
                this.drawLocation = 8;
            }
            return FrenchViolinClef;
        })(Clef);
        Model.FrenchViolinClef = FrenchViolinClef;
        var TrebleClef = (function (_super) {
            __extends(TrebleClef, _super);
            function TrebleClef() {
                _super.apply(this, arguments);
                this.clefType = 0 /* GClef */;
                this.positionFromTreble = 0;
                this.drawLocation = 6;
            }
            return TrebleClef;
        })(Clef);
        Model.TrebleClef = TrebleClef;
        var SopranoClef = (function (_super) {
            __extends(SopranoClef, _super);
            function SopranoClef() {
                _super.apply(this, arguments);
                this.clefType = 1 /* CClef */;
                this.positionFromTreble = -2;
                this.drawLocation = 8;
            }
            return SopranoClef;
        })(Clef);
        Model.SopranoClef = SopranoClef;
        var MezzoSopranoClef = (function (_super) {
            __extends(MezzoSopranoClef, _super);
            function MezzoSopranoClef() {
                _super.apply(this, arguments);
                this.clefType = 1 /* CClef */;
                this.positionFromTreble = -4;
                this.drawLocation = 6;
            }
            return MezzoSopranoClef;
        })(Clef);
        Model.MezzoSopranoClef = MezzoSopranoClef;
        var AltoClef = (function (_super) {
            __extends(AltoClef, _super);
            function AltoClef() {
                _super.apply(this, arguments);
                this.clefType = 1 /* CClef */;
                this.positionFromTreble = -6;
                this.drawLocation = 4;
            }
            return AltoClef;
        })(Clef);
        Model.AltoClef = AltoClef;
        var TenorClef = (function (_super) {
            __extends(TenorClef, _super);
            function TenorClef() {
                _super.apply(this, arguments);
                this.clefType = 1 /* CClef */;
                this.positionFromTreble = -8;
                this.drawLocation = 2;
            }
            return TenorClef;
        })(Clef);
        Model.TenorClef = TenorClef;
        var BaritoneClef = (function (_super) {
            __extends(BaritoneClef, _super);
            function BaritoneClef() {
                _super.apply(this, arguments);
                this.clefType = 2 /* FClef */;
                this.positionFromTreble = -10;
                this.drawLocation = 4;
            }
            return BaritoneClef;
        })(Clef);
        Model.BaritoneClef = BaritoneClef;
        var BassClef = (function (_super) {
            __extends(BassClef, _super);
            function BassClef() {
                _super.apply(this, arguments);
                this.clefType = 2 /* FClef */;
                this.positionFromTreble = -12;
                this.drawLocation = 2;
            }
            return BassClef;
        })(Clef);
        Model.BassClef = BassClef;
        var SubbassClef = (function (_super) {
            __extends(SubbassClef, _super);
            function SubbassClef() {
                _super.apply(this, arguments);
                this.clefType = 2 /* FClef */;
                this.positionFromTreble = -14;
                this.drawLocation = 0;
            }
            return SubbassClef;
        })(Clef);
        Model.SubbassClef = SubbassClef;
    })(Model = Inknote.Model || (Inknote.Model = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Model;
    (function (Model) {
        var TimeSignature = (function () {
            function TimeSignature(top, bottom) {
                this.top = top;
                this.bottom = bottom;
                this.ID = Inknote.getID();
                if (Math.round(top) != top || Math.round(bottom) != bottom || top == 0 || bottom == 0) {
                    throw new Error("Time signatures can only take integers");
                }
            }
            return TimeSignature;
        })();
        Model.TimeSignature = TimeSignature;
    })(Model = Inknote.Model || (Inknote.Model = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Notation = (function () {
        function Notation(drawFunction) {
            this.order = 50;
            this.attached = [];
            this.ID = Inknote.getID();
            if (drawFunction) {
                this.draw = drawFunction;
            }
        }
        Object.defineProperty(Notation.prototype, "ID", {
            // when attached, you will get id of parent item, thereby letting you e.g. select a note by clicking flat/sharp.
            get: function () {
                return this.attachedToID || this._id;
            },
            set: function (newValue) {
                this._id = newValue;
            },
            enumerable: true,
            configurable: true
        });
        // when items are attached, will hover together;
        Notation.prototype.attach = function (item) {
            item.attachedToID = this.ID;
            this.attached.push(item);
        };
        Notation.prototype.draw = function (ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
            ctx.fill();
            return false;
        };
        Notation.prototype.isOver = function (x, y) {
            var ISoverThis = Inknote.Maths.isWithinRadius(x, y, this.x, this.y, 10);
            var ISoverAttached = false;
            for (var i = 0; i < this.attached.length; i++) {
                if (this.attached[i].isOver(x, y)) {
                    ISoverAttached = true;
                }
            }
            var IS = ISoverThis || ISoverAttached;
            return IS;
        };
        return Notation;
    })();
    Inknote.Notation = Notation;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Model;
    (function (Model) {
        (function (NoteValue) {
            NoteValue[NoteValue["A"] = 0] = "A";
            NoteValue[NoteValue["Bb"] = 1] = "Bb";
            NoteValue[NoteValue["B"] = 2] = "B";
            NoteValue[NoteValue["C"] = 3] = "C";
            NoteValue[NoteValue["Db"] = 4] = "Db";
            NoteValue[NoteValue["D"] = 5] = "D";
            NoteValue[NoteValue["Eb"] = 6] = "Eb";
            NoteValue[NoteValue["E"] = 7] = "E";
            NoteValue[NoteValue["F"] = 8] = "F";
            NoteValue[NoteValue["Gb"] = 9] = "Gb";
            NoteValue[NoteValue["G"] = 10] = "G";
            NoteValue[NoteValue["Ab"] = 11] = "Ab";
        })(Model.NoteValue || (Model.NoteValue = {}));
        var NoteValue = Model.NoteValue;
        function IsBlackKey(noteVal) {
            switch (noteVal) {
                case 0 /* A */:
                case 2 /* B */:
                case 3 /* C */:
                case 5 /* D */:
                case 7 /* E */:
                case 8 /* F */:
                case 10 /* G */:
                    return false;
                case 11 /* Ab */:
                case 1 /* Bb */:
                case 4 /* Db */:
                case 6 /* Eb */:
                case 9 /* Gb */:
                    return true;
            }
        }
        Model.IsBlackKey = IsBlackKey;
        function IsWhiteKey(noteVal) {
            return !IsBlackKey(noteVal);
        }
        Model.IsWhiteKey = IsWhiteKey;
    })(Model = Inknote.Model || (Inknote.Model = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Model;
    (function (Model) {
        (function (NoteLength) {
            NoteLength[NoteLength["Breve"] = 0] = "Breve";
            NoteLength[NoteLength["SemiBreve"] = 1] = "SemiBreve";
            NoteLength[NoteLength["Minim"] = 2] = "Minim";
            NoteLength[NoteLength["Crotchet"] = 3] = "Crotchet";
            NoteLength[NoteLength["Quaver"] = 4] = "Quaver";
            NoteLength[NoteLength["SemiQuaver"] = 5] = "SemiQuaver";
            NoteLength[NoteLength["DemiSemiQuaver"] = 6] = "DemiSemiQuaver";
            NoteLength[NoteLength["HemiDemiSemiQuaver"] = 7] = "HemiDemiSemiQuaver";
        })(Model.NoteLength || (Model.NoteLength = {}));
        var NoteLength = Model.NoteLength;
    })(Model = Inknote.Model || (Inknote.Model = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Model;
    (function (Model) {
        var Rest = (function () {
            function Rest(length) {
                this.length = length;
                this.ID = Inknote.getID();
            }
            return Rest;
        })();
        Model.Rest = Rest;
    })(Model = Inknote.Model || (Inknote.Model = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Model;
    (function (Model) {
        (function (AccidentalType) {
            AccidentalType[AccidentalType["Sharp"] = 0] = "Sharp";
            AccidentalType[AccidentalType["Flat"] = 1] = "Flat";
            AccidentalType[AccidentalType["Natural"] = 2] = "Natural";
            AccidentalType[AccidentalType["DoubleSharp"] = 3] = "DoubleSharp";
            AccidentalType[AccidentalType["DoubleFlat"] = 4] = "DoubleFlat";
        })(Model.AccidentalType || (Model.AccidentalType = {}));
        var AccidentalType = Model.AccidentalType;
        var Note = (function () {
            function Note(value, octave, length) {
                this.ID = Inknote.getID();
                this.value = value;
                this.octave = octave, this.length = length;
            }
            return Note;
        })();
        Model.Note = Note;
    })(Model = Inknote.Model || (Inknote.Model = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Model;
    (function (Model) {
        var Chord = (function () {
            function Chord(notes) {
                this.ID = Inknote.getID();
                this.notes = notes;
            }
            return Chord;
        })();
        Model.Chord = Chord;
    })(Model = Inknote.Model || (Inknote.Model = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Model;
    (function (Model) {
        var Bar = (function () {
            function Bar() {
                this.ID = Inknote.getID();
                this.items = [];
            }
            return Bar;
        })();
        Model.Bar = Bar;
    })(Model = Inknote.Model || (Inknote.Model = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Model;
    (function (Model) {
        var Instrument = (function () {
            function Instrument(name) {
                this.name = name;
                this.ID = Inknote.getID();
                this.bars = [];
                this.visible = true;
            }
            return Instrument;
        })();
        Model.Instrument = Instrument;
    })(Model = Inknote.Model || (Inknote.Model = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Project = (function () {
        function Project(name) {
            this.colour = "#FFFFFF";
            this.pause = false;
            this.ID = Inknote.getID();
            this.name = name;
            this.hover = false;
            this.instruments = [];
            this.instruments.push(new Inknote.Model.Instrument("Guitar"));
            if (!name) {
                this.name = "Untitled";
            }
        }
        return Project;
    })();
    Inknote.Project = Project;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    // stores settings of items currently to be drawn.
    var DrawingSettings = (function () {
        function DrawingSettings() {
            this.isNote = true;
        }
        Object.defineProperty(DrawingSettings, "Instance", {
            get: function () {
                if (this._instance === null || this._instance === undefined) {
                    this._instance = new DrawingSettings();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        return DrawingSettings;
    })();
    Inknote.DrawingSettings = DrawingSettings;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Compressed;
    (function (Compressed) {
        (function (ItemIdentifier) {
            ItemIdentifier[ItemIdentifier["NOTE"] = 0] = "NOTE";
            ItemIdentifier[ItemIdentifier["REST"] = 1] = "REST";
            ItemIdentifier[ItemIdentifier["CHORD"] = 2] = "CHORD";
            ItemIdentifier[ItemIdentifier["CLEF"] = 3] = "CLEF";
            ItemIdentifier[ItemIdentifier["TIMESIGNATURE"] = 4] = "TIMESIGNATURE";
        })(Compressed.ItemIdentifier || (Compressed.ItemIdentifier = {}));
        var ItemIdentifier = Compressed.ItemIdentifier;
    })(Compressed = Inknote.Compressed || (Inknote.Compressed = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Compressed;
    (function (Compressed) {
        var CompressedNote = (function () {
            function CompressedNote(v, o, l) {
                this.v = v;
                this.o = o;
                this.l = l;
                this.i = 0 /* NOTE */;
            }
            return CompressedNote;
        })();
        Compressed.CompressedNote = CompressedNote;
    })(Compressed = Inknote.Compressed || (Inknote.Compressed = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Compressed;
    (function (Compressed) {
        var CompressedChord = (function () {
            function CompressedChord(notes) {
                this.notes = notes;
                this.i = 2 /* CHORD */;
            }
            return CompressedChord;
        })();
        Compressed.CompressedChord = CompressedChord;
    })(Compressed = Inknote.Compressed || (Inknote.Compressed = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Compressed;
    (function (Compressed) {
        var CompressedRest = (function () {
            function CompressedRest(l) {
                this.l = l;
                this.i = 1 /* REST */;
            }
            return CompressedRest;
        })();
        Compressed.CompressedRest = CompressedRest;
    })(Compressed = Inknote.Compressed || (Inknote.Compressed = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Compressed;
    (function (Compressed) {
        (function (CompressedClefType) {
            CompressedClefType[CompressedClefType["FRENCH_VIOLIN"] = 0] = "FRENCH_VIOLIN";
            CompressedClefType[CompressedClefType["TREBLE"] = 1] = "TREBLE";
            CompressedClefType[CompressedClefType["SOPRANO"] = 2] = "SOPRANO";
            CompressedClefType[CompressedClefType["MEZZ_SOPRANO"] = 3] = "MEZZ_SOPRANO";
            CompressedClefType[CompressedClefType["ALTO"] = 4] = "ALTO";
            CompressedClefType[CompressedClefType["TENOR"] = 5] = "TENOR";
            CompressedClefType[CompressedClefType["BARITONE"] = 6] = "BARITONE";
            CompressedClefType[CompressedClefType["BASS"] = 7] = "BASS";
            CompressedClefType[CompressedClefType["SUBBASS"] = 8] = "SUBBASS";
        })(Compressed.CompressedClefType || (Compressed.CompressedClefType = {}));
        var CompressedClefType = Compressed.CompressedClefType;
        var CompressedClef = (function () {
            function CompressedClef(v) {
                this.v = v;
                this.i = 3 /* CLEF */;
            }
            return CompressedClef;
        })();
        Compressed.CompressedClef = CompressedClef;
    })(Compressed = Inknote.Compressed || (Inknote.Compressed = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Compressed;
    (function (Compressed) {
        var CompressedTimeSignature = (function () {
            function CompressedTimeSignature(t, b) {
                this.t = t;
                this.b = b;
                this.i = 4 /* TIMESIGNATURE */;
            }
            return CompressedTimeSignature;
        })();
        Compressed.CompressedTimeSignature = CompressedTimeSignature;
    })(Compressed = Inknote.Compressed || (Inknote.Compressed = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Compressed;
    (function (Compressed) {
        // could contain chords & notes & rests.
        // simplest way to store...?
        var Bar = (function () {
            function Bar() {
                this.items = [];
            }
            return Bar;
        })();
        Compressed.Bar = Bar;
    })(Compressed = Inknote.Compressed || (Inknote.Compressed = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Compressed;
    (function (Compressed) {
        var Instrument = (function () {
            function Instrument(name) {
                this.name = name;
                this.bars = [];
            }
            return Instrument;
        })();
        Compressed.Instrument = Instrument;
    })(Compressed = Inknote.Compressed || (Inknote.Compressed = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Compressed;
    (function (Compressed) {
        var CompressedProject = (function () {
            function CompressedProject(name) {
                this.name = name;
                this.colour = "#FFFFFF";
                this.ID = Inknote.getID();
                this.instruments = [];
                if (!name) {
                    this.name = this.ID;
                }
            }
            return CompressedProject;
        })();
        Compressed.CompressedProject = CompressedProject;
    })(Compressed = Inknote.Compressed || (Inknote.Compressed = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Model;
    (function (Model) {
        // key will be an instance e.g. Bb minor.
        var Key = (function () {
            function Key(name, notesInKey, sharps, flats) {
                this.name = name;
                this.notesInKey = notesInKey;
                this.sharps = sharps;
                this.flats = flats;
            }
            Key.prototype.countSharps = function () {
                return this.sharps.length;
            };
            Key.prototype.countFlats = function () {
                return this.flats.length;
            };
            return Key;
        })();
        Model.Key = Key;
    })(Model = Inknote.Model || (Inknote.Model = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Model;
    (function (Model) {
        // key types, e.g. minor, major, defined in keyDefinitions file.
        var KeyType = (function () {
            function KeyType(name, intervals) {
                this.name = name;
                this.intervals = intervals;
            }
            return KeyType;
        })();
        Model.KeyType = KeyType;
    })(Model = Inknote.Model || (Inknote.Model = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Model;
    (function (Model) {
        var keyTypes = [
            new Model.KeyType("major", [0, 2, 4, 5, 7, 9, 11]),
            new Model.KeyType("melodic minor", [0, 2, 3, 5, 7, 8, 10]),
            new Model.KeyType("harmonic minor", [0, 2, 3, 5, 7, 8, 11])
        ];
        Model.C_MAJOR = new Model.Key("C_MAJOR", [
            3 /* C */,
            5 /* D */,
            7 /* E */,
            8 /* F */,
            10 /* G */,
            0 /* A */,
            2 /* B */
        ], [], []);
        function getSharpsFromNotesAndTranspose(notes) {
            var aligned = Inknote.Maths.alignSimilarArrayTo(notes, Model.C_MAJOR.notesInKey);
            var sharps = [];
            for (var i = 0; i < aligned.length; i++) {
                if (aligned[i] == Model.C_MAJOR.notesInKey[i] + 1) {
                    sharps.push(Model.C_MAJOR.notesInKey[i]);
                }
            }
            return sharps;
        }
        function getFlatsFromNotesAndTranspose(notes) {
            var aligned = Inknote.Maths.alignSimilarArrayTo(notes, Model.C_MAJOR.notesInKey);
            var flats = [];
            for (var i = 0; i < aligned.length; i++) {
                if (aligned[i] == Model.C_MAJOR.notesInKey[i] - 1) {
                    flats.push(Model.C_MAJOR.notesInKey[i]);
                }
            }
            return flats;
        }
        function getKeys(transpose) {
            if (!transpose) {
                transpose = 0;
            }
            var allKeys = [];
            for (var i = 0; i < keyTypes.length; i++) {
                var kt = keyTypes[i];
                for (var j in Model.NoteValue) {
                    if (isNaN(j)) {
                        var allKeyNotes = [];
                        var baseNote = new Model.Note(parseInt(Model.NoteValue[j]), 4, 1);
                        baseNote.value = (baseNote.value + transpose) % 12;
                        for (var k = 0; k < kt.intervals.length; k++) {
                            var tempNote = Inknote.getNoteOfDistance(baseNote, kt.intervals[k]);
                            allKeyNotes.push(tempNote.value);
                        }
                        allKeys.push(new Model.Key(j + " " + kt.name, allKeyNotes, getSharpsFromNotesAndTranspose(allKeyNotes), getFlatsFromNotesAndTranspose(allKeyNotes)));
                    }
                }
            }
            return allKeys;
        }
        var KeyHolder = (function () {
            function KeyHolder() {
            }
            Object.defineProperty(KeyHolder, "Instance", {
                get: function () {
                    if (!KeyHolder._instance) {
                        KeyHolder._instance = new KeyHolder();
                    }
                    return KeyHolder._instance;
                },
                enumerable: true,
                configurable: true
            });
            KeyHolder.prototype.getAllKeys = function (transpose) {
                return getKeys(transpose);
            };
            return KeyHolder;
        })();
        Model.KeyHolder = KeyHolder;
    })(Model = Inknote.Model || (Inknote.Model = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Model;
    (function (Model) {
        function NoteIsInKey(note, key) {
            for (var i = 0; i < key.notesInKey.length; i++) {
                if (note.value == key.notesInKey[i]) {
                    return true;
                }
            }
            return false;
        }
        Model.NoteIsInKey = NoteIsInKey;
    })(Model = Inknote.Model || (Inknote.Model = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    (function (NotationType) {
        NotationType[NotationType["Standard"] = 0] = "Standard";
        NotationType[NotationType["UPPER_lower"] = 1] = "UPPER_lower";
        NotationType[NotationType["DoReMi"] = 2] = "DoReMi";
    })(Inknote.NotationType || (Inknote.NotationType = {}));
    var NotationType = Inknote.NotationType;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var ChordNotation;
    (function (ChordNotation) {
        function getDoReMiTextFrom(index) {
            return [
                "Do",
                "Di",
                "Re",
                "Ri",
                "Me",
                "Mi",
                "Fa",
                "Fi",
                "Sol",
                "Si",
                "La",
                "Li",
                "Te",
                "Ti"
            ][index];
        }
        var DoReMiChordNotation = (function () {
            function DoReMiChordNotation(baseNote, rootNote, minor, annotations) {
                this.baseNote = baseNote;
                this.rootNote = rootNote;
                this.minor = minor;
                this.annotations = annotations;
            }
            Object.defineProperty(DoReMiChordNotation.prototype, "name", {
                get: function () {
                    throw new Error("Not implemented");
                    return;
                },
                enumerable: true,
                configurable: true
            });
            return DoReMiChordNotation;
        })();
        ChordNotation.DoReMiChordNotation = DoReMiChordNotation;
    })(ChordNotation = Inknote.ChordNotation || (Inknote.ChordNotation = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var ChordNotation;
    (function (ChordNotation) {
        function getStandardTextFrom(index) {
            return [
                "C",
                "Db",
                "D",
                "Eb",
                "E",
                "F",
                "Gb",
                "G",
                "Ab",
                "A",
                "Bb",
                "B",
            ][index];
        }
        var StandardChordNotation = (function () {
            function StandardChordNotation(baseNote, rootNote, minor, annotations) {
                this.baseNote = baseNote;
                this.rootNote = rootNote;
                this.minor = minor;
                this.annotations = annotations;
            }
            Object.defineProperty(StandardChordNotation.prototype, "name", {
                get: function () {
                    var text = getStandardTextFrom(this.rootNote.value);
                    if (this.minor) {
                        text += "m";
                    }
                    text = text + this.annotations;
                    if (this.baseNote.value != this.rootNote.value) {
                        text += "/" + getStandardTextFrom(this.baseNote.value);
                    }
                    return text;
                },
                enumerable: true,
                configurable: true
            });
            return StandardChordNotation;
        })();
        ChordNotation.StandardChordNotation = StandardChordNotation;
    })(ChordNotation = Inknote.ChordNotation || (Inknote.ChordNotation = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var ChordNotation;
    (function (ChordNotation) {
        function getUPPER_lowerTextFrom(index) {
            return [
                "C",
                "Cis",
                "D",
                "Dis",
                "E",
                "F",
                "Fis",
                "G",
                "Gis",
                "A",
                "B",
                "H",
            ][index];
        }
        ;
        var UPPER_lowerChordNotation = (function () {
            function UPPER_lowerChordNotation(baseNote, rootNote, minor, annotations) {
                this.baseNote = baseNote;
                this.rootNote = rootNote;
                this.minor = minor;
                this.annotations = annotations;
            }
            Object.defineProperty(UPPER_lowerChordNotation.prototype, "name", {
                get: function () {
                    var text = getUPPER_lowerTextFrom(this.rootNote.value);
                    if (this.minor) {
                        text = text.toLowerCase();
                    }
                    text = text + this.annotations;
                    if (this.baseNote.value != this.rootNote.value) {
                        text += "/" + getUPPER_lowerTextFrom(this.baseNote.value);
                    }
                    return text;
                },
                enumerable: true,
                configurable: true
            });
            return UPPER_lowerChordNotation;
        })();
        ChordNotation.UPPER_lowerChordNotation = UPPER_lowerChordNotation;
    })(ChordNotation = Inknote.ChordNotation || (Inknote.ChordNotation = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var Licence = (function () {
            function Licence() {
                this.ID = Inknote.getID();
                this.order = 100;
                this.text = "Free licence";
            }
            Licence.prototype.isOver = function (x, y, canvas) {
                var isRight = x > canvas.width - 120;
                var isLeft = x < canvas.width - 10;
                var isBelow = y > 10;
                var isAbove = y < 30;
                var result = isRight && isLeft && isBelow && isAbove;
                if (result) {
                    this.hover = true;
                }
                else {
                    this.hover = false;
                }
                return result;
            };
            Licence.prototype.click = function (e) {
                Inknote.Managers.PageManager.Current.page = 4 /* Licence */;
            };
            Licence.prototype.draw = function (ctx, canvas) {
                ctx.fillStyle = Drawing.Colours.white;
                ctx.strokeStyle = Drawing.Colours.black;
                if (this.hover) {
                    ctx.strokeStyle = Drawing.Colours.orange;
                }
                ctx.beginPath();
                ctx.rect(canvas.width - 120, 10, 110, 20);
                ctx.lineWidth = 1;
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = Drawing.Colours.black;
                ctx.font = Drawing.Fonts.standard;
                ctx.beginPath();
                ctx.textAlign = "center";
                ctx.fillText(this.text, canvas.width - 65, 25);
                if (this.hover) {
                    ctx.beginPath();
                    ctx.font = Drawing.Fonts.small;
                    ctx.textAlign = "right";
                    ctx.fillText("Click to upgrade your licence", canvas.width - 10, 45);
                }
                return true;
            };
            return Licence;
        })();
        Drawing.Licence = Licence;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        Drawing.Fonts = {
            title: "40px Josefin Sans",
            large: "18px Josefin Sans",
            standard: "12px Josefin Sans",
            small: "10px Josefin Sans",
            watermark: "42px Josefin Sans",
            halfHeight: "30px Arial"
        };
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        Drawing.Colours = {
            white: "white",
            orange: "orange",
            lightOrange: "rgba(255,150,0,0.5)",
            // these 3 for file shading
            tan: "rgb(220, 142, 66)",
            lightTan: "rgb(240, 162, 86)",
            peach: "rgb(250, 222, 196)",
            black: "rgb(10,10,10)",
            watermarkGray: "rgba(120,120,120,0.1)",
            shadowGray: "rgba(70,70,70,0.3)",
            lightGray: "lightgray",
            gray: "darkgray",
            darkgray: "gray",
            darkerGray: "rgb(100,100,100)",
            darkestGray: "rgb(80,80,80)",
            translucentBlack: "rgba(0,0,0,0.2)",
            faintBlue: "rgb(245,245,255)",
            lightBlue: "lightblue",
            midBlue: "rgb(100,130,240)",
            brightRed: "rgb(255,0,0)",
            negativeRed: "rgb(255, 129, 129)",
            negativeHoverRed: "rgb(255,150,150)"
        };
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var Background = (function () {
            function Background() {
                this.ID = Inknote.getID();
                this.order = -10;
                this.mouse = { x: -100, y: -100 };
                this.t = 0;
                this.spinners = [];
            }
            Object.defineProperty(Background, "Instance", {
                get: function () {
                    if (!Background._instance) {
                        Background._instance = new Background();
                    }
                    return Background._instance;
                },
                enumerable: true,
                configurable: true
            });
            Background.prototype.isOver = function (x, y, canvas) {
                this.mouse.x = x;
                this.mouse.y = y;
                return false;
            };
            Background.prototype.draw = function (ctx, canvas, scale) {
                // uncomment for striped background.
                /*for (var i = 0; i < canvas.width; i += 4){
                    ctx.beginPath();
                    ctx.moveTo(i, 0);
    
                    // bulge around mouse?
                    //var dif = this.chase.x - i;
                    //if (dif > 0 && dif < 8) dif = 8;
                    //if (dif <= 0 && dif > -8) dif = -8;
                    //var blah = 100 / (dif);
    
                    //if (Math.abs(dif) < 200) {
                    //    ctx.lineTo(i, this.mouse.y - Math.abs(blah) - 20);
                    //    ctx.bezierCurveTo(i - blah, this.mouse.y, i - blah, this.mouse.y, i, this.mouse.y + Math.abs(blah) + 20);
                    //    ctx.lineTo(i, canvas.height);
                    //    ctx.
                    //}
                    //else {
                    //}
    
                    ctx.lineTo(i, canvas.height);
                    ctx.strokeStyle = Colours.faintBlue;
                    ctx.stroke();
                }*/
                this.t++;
                // signature
                ctx.save();
                ctx.beginPath();
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(-Math.PI / 4);
                ctx.font = Drawing.Fonts.watermark;
                ctx.textAlign = "center";
                ctx.fillStyle = Drawing.Colours.watermarkGray;
                ctx.fillText("with ♥ - inknote", 0, 0);
                ctx.restore();
                return true;
            };
            return Background;
        })();
        Drawing.Background = Background;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var Stave = (function () {
            function Stave(y, name) {
                this.y = y;
                this.name = name;
                this.order = 10;
                this.ID = Inknote.getID();
                this.x = 30;
                this.width = 0;
            }
            Stave.prototype.isOver = function (x, y) {
                return false;
            };
            Stave.prototype.draw = function (ctx, canvas) {
                if (this.name) {
                    ctx.beginPath();
                    ctx.fillStyle = Drawing.Colours.black;
                    ctx.strokeStyle = Drawing.Colours.black;
                    ctx.font = Drawing.Fonts.small;
                    ctx.textAlign = "left";
                    ctx.fillText(this.name, this.x + 10, this.y - 15);
                    ctx.textAlign = "center";
                }
                this.width = canvas.width - this.x * 2;
                for (var i = 0; i < 5; i++) {
                    ctx.beginPath();
                    ctx.strokeStyle = Drawing.Colours.black;
                    ctx.moveTo(this.x, this.y + 10 * i);
                    ctx.lineTo(canvas.width - this.x, this.y + 10 * i);
                    ctx.stroke();
                }
                return true;
            };
            return Stave;
        })();
        Drawing.Stave = Stave;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var Clef = (function (_super) {
            __extends(Clef, _super);
            function Clef(drawPosition) {
                _super.call(this);
                this.drawPosition = drawPosition;
                this.lineHeight = 10;
            }
            return Clef;
        })(Inknote.Notation);
        Drawing.Clef = Clef;
        var GClef = (function (_super) {
            __extends(GClef, _super);
            function GClef() {
                _super.apply(this, arguments);
            }
            GClef.prototype.draw = function (ctx) {
                var hlh = this.lineHeight / 2;
                var diag = hlh * Math.sin(Math.PI / 4);
                ctx.beginPath();
                ctx.fillStyle = Drawing.Colours.black;
                ctx.strokeStyle = Drawing.Colours.black;
                if (this.hover || this.select) {
                    ctx.fillStyle = Drawing.Colours.orange;
                    ctx.strokeStyle = Drawing.Colours.orange;
                }
                //outer
                ctx.moveTo(this.x + diag / 2, this.y + 3 * hlh);
                ctx.lineTo(this.x - diag, this.y - 4 * hlh);
                ctx.bezierCurveTo(this.x - 3 * hlh, this.y - 11 * hlh, this.x + 5 * hlh, this.y - 9 * hlh, this.x, this.y - 4 * hlh);
                ctx.bezierCurveTo(this.x - 2 * hlh, this.y - 3 * hlh, this.x - 4 * hlh, this.y - 2 * hlh, this.x - 2 * hlh, this.y + diag);
                ctx.bezierCurveTo(this.x - 2 * diag, this.y + 3 * diag, this.x, this.y + 2 * diag, this.x + diag, this.y + diag);
                ctx.bezierCurveTo(this.x + 4 * diag, this.y - 2 * hlh, this.x - 4 * diag, this.y - 2 * hlh, this.x - diag, this.y + diag);
                // inner
                ctx.bezierCurveTo(this.x - 3 * diag, this.y - hlh, this.x + 3 * diag, this.y - hlh, this.x + diag, this.y + diag);
                ctx.bezierCurveTo(this.x, this.y + 2 * diag, this.x - 2 * diag, this.y + 3 * diag, this.x - 2 * hlh, this.y + diag);
                ctx.bezierCurveTo(this.x - 3 * hlh, this.y - 2 * hlh, this.x - hlh, this.y - 3 * hlh, this.x, this.y - 4 * hlh);
                ctx.bezierCurveTo(this.x + 4 * hlh, this.y - 8 * hlh, this.x - 2 * hlh, this.y - 10 * hlh, this.x - diag, this.y - 4 * hlh);
                ctx.lineTo(this.x + diag / 2, this.y + 3 * hlh);
                ctx.fill();
                ctx.stroke();
                // connecting line
                ctx.beginPath();
                ctx.moveTo(this.x + diag / 2, this.y + 3 * hlh);
                ctx.bezierCurveTo(this.x + diag, this.y + 5 * hlh, this.x - 2 * diag, this.y + 5 * hlh, this.x - hlh, this.y + 4 * hlh);
                ctx.stroke();
                // ball
                ctx.beginPath();
                ctx.arc(this.x - hlh, this.y + 4 * hlh, diag, 0, 2 * Math.PI);
                ctx.fill();
                return true;
            };
            return GClef;
        })(Clef);
        Drawing.GClef = GClef;
        var CClef = (function (_super) {
            __extends(CClef, _super);
            function CClef() {
                _super.apply(this, arguments);
            }
            CClef.prototype.draw = function (ctx) {
                var hlh = this.lineHeight / 2;
                ctx.beginPath();
                ctx.fillStyle = Drawing.Colours.black;
                ctx.strokeStyle = Drawing.Colours.black;
                if (this.hover || this.select) {
                    ctx.fillStyle = Drawing.Colours.orange;
                    ctx.strokeStyle = Drawing.Colours.orange;
                }
                // line 1
                ctx.lineWidth = 4;
                ctx.moveTo(this.x - 4, this.y + 2 * this.lineHeight);
                ctx.lineTo(this.x - 4, this.y - 2 * this.lineHeight);
                ctx.stroke();
                // line 2
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y + 2 * this.lineHeight);
                ctx.lineTo(this.x, this.y - 2 * this.lineHeight);
                ctx.stroke();
                // top squiggle.
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.bezierCurveTo(this.x + hlh, this.y, this.x + hlh, this.y - hlh, this.x + hlh, this.y - hlh);
                ctx.bezierCurveTo(this.x + 2 * hlh, this.y, this.x + 2 * hlh, this.y - 5 * hlh, this.x + hlh, this.y - 3 * hlh);
                ctx.bezierCurveTo(this.x + 3 * hlh, this.y - 6 * hlh, this.x + 3 * hlh, this.y + hlh, this.x + hlh, this.y - hlh);
                ctx.fill();
                ctx.stroke();
                // bottom squiggle.
                // top squiggle.
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.bezierCurveTo(this.x + hlh, this.y, this.x + hlh, this.y + hlh, this.x + hlh, this.y + hlh);
                ctx.bezierCurveTo(this.x + 2 * hlh, this.y, this.x + 2 * hlh, this.y + 5 * hlh, this.x + hlh, this.y + 3 * hlh);
                ctx.bezierCurveTo(this.x + 3 * hlh, this.y + 6 * hlh, this.x + 3 * hlh, this.y - hlh, this.x + hlh, this.y + hlh);
                ctx.fill();
                ctx.stroke();
                return true;
            };
            return CClef;
        })(Clef);
        Drawing.CClef = CClef;
        var FClef = (function (_super) {
            __extends(FClef, _super);
            function FClef() {
                _super.apply(this, arguments);
            }
            FClef.prototype.draw = function (ctx) {
                var hlh = this.lineHeight / 2;
                ctx.fillStyle = Drawing.Colours.black;
                if (this.hover) {
                    ctx.fillStyle = Drawing.Colours.orange;
                }
                if (this.select) {
                    ctx.fillStyle = Drawing.Colours.orange;
                    ctx.strokeStyle = Drawing.Colours.orange;
                }
                ctx.beginPath();
                ctx.arc(this.x, this.y, hlh, 0, 2 * Math.PI);
                var strt = hlh * Math.sin(Math.PI / 4);
                ctx.moveTo(this.x - strt, this.y + strt);
                // outer
                ctx.bezierCurveTo(this.x - hlh, this.y, this.x - 2 * hlh, this.y - this.lineHeight, this.x + hlh * 3 / 2, this.y - this.lineHeight);
                ctx.bezierCurveTo(this.x + 4 * hlh, this.y - hlh * 3 / 2, this.x + 4 * hlh, this.y + 2 * hlh, this.x, this.y + 2 * this.lineHeight);
                // inner 
                ctx.bezierCurveTo(this.x + 3 * hlh, this.y + 2 * hlh, this.x + 3 * hlh, this.y, this.x + hlh * 3 / 2, this.y - this.lineHeight);
                ctx.bezierCurveTo(this.x - hlh, this.y - this.lineHeight, this.x - hlh / 2, this.y, this.x, this.y);
                // ctx.stroke();
                ctx.fill();
                ctx.beginPath();
                ctx.arc(this.x + 4 * hlh, this.y - hlh, hlh / 2, 0, 2 * Math.PI);
                ctx.arc(this.x + 4 * hlh, this.y + hlh, hlh / 2, 0, 2 * Math.PI);
                ctx.fill();
                return true;
            };
            return FClef;
        })(Clef);
        Drawing.FClef = FClef;
        function getDrawingFromClef(clef) {
            var drawing = null;
            switch (clef.clefType) {
                case 0 /* GClef */:
                    drawing = new Drawing.GClef(clef.drawLocation);
                    break;
                case 1 /* CClef */:
                    drawing = new Drawing.CClef(clef.drawLocation);
                    break;
                case 2 /* FClef */:
                    drawing = new Drawing.FClef(clef.drawLocation);
                    break;
            }
            return drawing;
        }
        Drawing.getDrawingFromClef = getDrawingFromClef;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var TimeSignature = (function (_super) {
            __extends(TimeSignature, _super);
            function TimeSignature(top, bottom) {
                _super.call(this);
                this.top = top;
                this.bottom = bottom;
            }
            TimeSignature.prototype.draw = function (ctx) {
                ctx.beginPath();
                ctx.fillStyle = Drawing.Colours.black;
                if (this.hover || this.select) {
                    ctx.fillStyle = Drawing.Colours.orange;
                }
                ctx.font = Drawing.Fonts.halfHeight;
                ctx.textAlign = "center";
                ctx.fillText(this.top + "", this.x, this.y);
                ctx.fillText(this.bottom + "", this.x, this.y + 20);
                if (this.select) {
                    ctx.beginPath();
                    ctx.strokeStyle = Drawing.Colours.orange;
                    ctx.rect(this.x - 15, this.y - 25, 30, 50);
                    ctx.stroke();
                }
                return true;
            };
            return TimeSignature;
        })(Inknote.Notation);
        Drawing.TimeSignature = TimeSignature;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        function drawSharp(ctx, x, y, lineHeight) {
            ctx.beginPath();
            // up strokes
            ctx.moveTo(x - lineHeight / 5, y + lineHeight * 4 / 3);
            ctx.lineTo(x - lineHeight / 5, y - lineHeight * 6 / 5);
            ctx.moveTo(x + lineHeight / 5, y + lineHeight * 6 / 5);
            ctx.lineTo(x + lineHeight / 5, y - lineHeight * 4 / 3);
            ctx.stroke();
            ctx.beginPath();
            ctx.lineWidth = 2;
            // side strokes
            ctx.moveTo(x - lineHeight / 2, y - lineHeight / 4);
            ctx.lineTo(x + lineHeight / 2, y - lineHeight * 3 / 4);
            ctx.moveTo(x - lineHeight / 2, y + lineHeight * 3 / 4);
            ctx.lineTo(x + lineHeight / 2, y + lineHeight / 4);
            ctx.stroke();
        }
        var Sharp = (function (_super) {
            __extends(Sharp, _super);
            function Sharp() {
                _super.apply(this, arguments);
            }
            Sharp.prototype.draw = function (ctx) {
                ctx.strokeStyle = Drawing.Colours.black;
                ctx.fillStyle = Drawing.Colours.black;
                if (this.select) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
                    ctx.strokeStyle = Drawing.Colours.orange;
                    ctx.fillStyle = Drawing.Colours.orange;
                    ctx.stroke();
                }
                if (this.hover) {
                    ctx.strokeStyle = Drawing.Colours.orange;
                    ctx.fillStyle = Drawing.Colours.orange;
                }
                drawSharp(ctx, this.x, this.y, 10);
                ctx.lineWidth = 1;
                return true;
            };
            return Sharp;
        })(Inknote.Notation);
        Drawing.Sharp = Sharp;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        function drawFlat(ctx, x, y, lineHeight) {
            // curvy b bit
            ctx.beginPath();
            ctx.moveTo(x - lineHeight / 2, y - lineHeight / 2);
            ctx.bezierCurveTo(x + lineHeight / 2, y - lineHeight / 4, x + lineHeight / 2, y + lineHeight / 4, x - lineHeight / 2, y + lineHeight / 2);
            ctx.bezierCurveTo(x, y, x, y, x - lineHeight / 2, y - lineHeight / 2);
            ctx.fill();
            // line
            ctx.beginPath();
            ctx.moveTo(x - lineHeight / 2, y + lineHeight / 2);
            ctx.lineTo(x - lineHeight / 2, y - lineHeight * 3 / 2);
            ctx.stroke();
        }
        var Flat = (function (_super) {
            __extends(Flat, _super);
            function Flat() {
                _super.apply(this, arguments);
            }
            Flat.prototype.draw = function (ctx) {
                ctx.strokeStyle = Drawing.Colours.black;
                ctx.fillStyle = Drawing.Colours.black;
                if (this.select) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
                    ctx.strokeStyle = Drawing.Colours.orange;
                    ctx.fillStyle = Drawing.Colours.orange;
                    ctx.stroke();
                }
                if (this.hover) {
                    ctx.strokeStyle = Drawing.Colours.orange;
                    ctx.fillStyle = Drawing.Colours.orange;
                }
                drawFlat(ctx, this.x, this.y, 10);
                return true;
            };
            return Flat;
        })(Inknote.Notation);
        Drawing.Flat = Flat;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        function drawNatural(ctx, x, y, lineHeight) {
            ctx.beginPath();
            // up strokes
            ctx.moveTo(x - lineHeight / 4, y + lineHeight * 3 / 4);
            ctx.lineTo(x - lineHeight / 4, y - lineHeight * 3 / 2);
            ctx.moveTo(x + lineHeight / 4, y + lineHeight * 3 / 2);
            ctx.lineTo(x + lineHeight / 4, y - lineHeight * 3 / 4);
            ctx.stroke();
            ctx.beginPath();
            ctx.lineWidth = 2;
            // side strokes
            ctx.moveTo(x - lineHeight / 4, y - lineHeight / 4);
            ctx.lineTo(x + lineHeight / 4, y - lineHeight * 3 / 4);
            ctx.moveTo(x - lineHeight / 4, y + lineHeight * 3 / 4);
            ctx.lineTo(x + lineHeight / 4, y + lineHeight / 4);
            ctx.stroke();
        }
        var Natural = (function (_super) {
            __extends(Natural, _super);
            function Natural() {
                _super.apply(this, arguments);
            }
            Natural.prototype.draw = function (ctx) {
                ctx.strokeStyle = Drawing.Colours.black;
                ctx.fillStyle = Drawing.Colours.black;
                if (this.select) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
                    ctx.strokeStyle = Drawing.Colours.orange;
                    ctx.fillStyle = Drawing.Colours.orange;
                    ctx.stroke();
                }
                if (this.hover) {
                    ctx.strokeStyle = Drawing.Colours.orange;
                    ctx.fillStyle = Drawing.Colours.orange;
                }
                drawNatural(ctx, this.x, this.y, 10);
                ctx.lineWidth = 1;
                return true;
            };
            return Natural;
        })(Inknote.Notation);
        Drawing.Natural = Natural;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        function drawNote(ctx, x, y, note, lineHeight) {
            ctx.fillStyle = Drawing.Colours.black;
            ctx.strokeStyle = Drawing.Colours.black;
            if (note.isPotential) {
                ctx.fillStyle = Drawing.Colours.midBlue;
                ctx.strokeStyle = Drawing.Colours.midBlue;
            }
            if (note.select) {
                ctx.beginPath();
                ctx.arc(x, y, lineHeight, 0, 2 * Math.PI);
                ctx.strokeStyle = Drawing.Colours.orange;
                ctx.fillStyle = Drawing.Colours.orange;
                ctx.stroke();
            }
            if (note.hover) {
                ctx.strokeStyle = Drawing.Colours.orange;
                ctx.fillStyle = Drawing.Colours.orange;
            }
            if (note.noteLength == 0 /* Breve */) {
                ctx.lineWidth = 2;
                return;
            }
            //draw the note
            ctx.beginPath();
            ctx.arc(x, y, lineHeight / 2, 0, 2 * Math.PI, false);
            if (note.noteLength == 1 /* SemiBreve */) {
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.lineWidth = 1;
            }
            else {
                if (note.noteLength == 2 /* Minim */) {
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    ctx.lineWidth = 1;
                }
                else {
                    ctx.fill();
                }
                //draw the stem
                ctx.beginPath();
                if (note.stemUp) {
                    ctx.moveTo(x + lineHeight / 2 - 0.5, y);
                    ctx.lineTo(x + lineHeight / 2 - 0.5, y - lineHeight * 7 / 2);
                    ctx.stroke();
                    if (note.noteLength > 3 /* Crotchet */) {
                        var tailX = x + lineHeight / 2 - 0.5;
                        var tailY = y - lineHeight * 7 / 2;
                        var tailController = note.noteLength - 3 /* Crotchet */;
                        var tailNum = 0;
                        while (tailController >= 1) {
                            ctx.beginPath();
                            ctx.moveTo(tailX, tailY);
                            ctx.bezierCurveTo(tailX + 1, tailY + 10, tailX + 15, tailY + 13, tailX + 7, tailY + 25);
                            ctx.bezierCurveTo(tailX + 13, tailY + 13, tailX, tailY + 8, tailX, tailY + 15);
                            ctx.fill();
                            ctx.stroke();
                            tailController--;
                            if (tailNum == 0) {
                                tailY += 10;
                            }
                            else if (tailNum == 1) {
                                tailY -= 20;
                            }
                            else {
                                tailY -= 10;
                            }
                            tailNum++;
                        }
                    }
                }
                else {
                    ctx.moveTo(x - lineHeight / 2 + 0.5, y);
                    ctx.lineTo(x - lineHeight / 2 + 0.5, y + lineHeight * 7 / 2);
                    ctx.stroke();
                    if (note.noteLength > 3 /* Crotchet */) {
                        var tailX = x + 0.5 - lineHeight / 2;
                        var tailY = y + lineHeight * 7 / 2;
                        var tailController = note.noteLength - 3 /* Crotchet */;
                        var tailNum = 0;
                        while (tailController >= 1) {
                            ctx.beginPath();
                            ctx.moveTo(tailX, tailY);
                            ctx.bezierCurveTo(tailX + 1, tailY - 10, tailX + 15, tailY - 13, tailX + 7, tailY - 25);
                            ctx.bezierCurveTo(tailX + 13, tailY - 13, tailX, tailY - 8, tailX, tailY - 15);
                            ctx.fill();
                            ctx.stroke();
                            tailController--;
                            if (tailNum == 0) {
                                tailY -= 10;
                            }
                            else if (tailNum == 1) {
                                tailY += 20;
                            }
                            else {
                                tailY += 10;
                            }
                            tailNum++;
                        }
                    }
                }
            }
        }
        var Note = (function (_super) {
            __extends(Note, _super);
            function Note(stemUp) {
                _super.call(this);
                this.stemUp = stemUp;
                this.isPotential = false;
            }
            return Note;
        })(Inknote.Notation);
        Drawing.Note = Note;
        var Breve = (function (_super) {
            __extends(Breve, _super);
            function Breve() {
                _super.apply(this, arguments);
                this.noteLength = 0 /* Breve */;
            }
            Breve.prototype.draw = function (ctx) {
                ctx.beginPath();
                ctx.fillStyle = Drawing.Colours.white;
                ctx.strokeStyle = Drawing.Colours.black;
                if (this.hover || this.select) {
                    ctx.strokeStyle = Drawing.Colours.orange;
                }
                // lines down
                ctx.moveTo(this.x - 5, this.y - 5);
                ctx.lineTo(this.x - 5, this.y + 5);
                ctx.moveTo(this.x + 5, this.y - 5);
                ctx.lineTo(this.x + 5, this.y + 5);
                ctx.lineWidth = 2;
                // lines across
                ctx.moveTo(this.x - 5, this.y - 3);
                ctx.lineTo(this.x + 5, this.y - 3);
                ctx.moveTo(this.x - 5, this.y + 3);
                ctx.lineTo(this.x + 5, this.y + 3);
                ctx.lineWidth = 1;
                ctx.stroke();
                if (this.select) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
                    ctx.strokeStyle = Drawing.Colours.orange;
                    ctx.fillStyle = Drawing.Colours.orange;
                    ctx.stroke();
                }
                return true;
            };
            return Breve;
        })(Note);
        Drawing.Breve = Breve;
        var SemiBreve = (function (_super) {
            __extends(SemiBreve, _super);
            function SemiBreve() {
                _super.apply(this, arguments);
                this.noteLength = 1 /* SemiBreve */;
            }
            SemiBreve.prototype.draw = function (ctx) {
                drawNote(ctx, this.x, this.y, this, 10);
                return true;
            };
            return SemiBreve;
        })(Note);
        Drawing.SemiBreve = SemiBreve;
        var Minim = (function (_super) {
            __extends(Minim, _super);
            function Minim() {
                _super.apply(this, arguments);
                this.noteLength = 2 /* Minim */;
            }
            Minim.prototype.draw = function (ctx) {
                drawNote(ctx, this.x, this.y, this, 10);
                return true;
            };
            return Minim;
        })(Note);
        Drawing.Minim = Minim;
        var Crotchet = (function (_super) {
            __extends(Crotchet, _super);
            function Crotchet() {
                _super.apply(this, arguments);
                this.noteLength = 3 /* Crotchet */;
            }
            Crotchet.prototype.draw = function (ctx) {
                drawNote(ctx, this.x, this.y, this, 10);
                return true;
            };
            return Crotchet;
        })(Note);
        Drawing.Crotchet = Crotchet;
        var Quaver = (function (_super) {
            __extends(Quaver, _super);
            function Quaver() {
                _super.apply(this, arguments);
                this.noteLength = 4 /* Quaver */;
            }
            Quaver.prototype.draw = function (ctx) {
                drawNote(ctx, this.x, this.y, this, 10);
                return true;
            };
            return Quaver;
        })(Note);
        Drawing.Quaver = Quaver;
        var SemiQuaver = (function (_super) {
            __extends(SemiQuaver, _super);
            function SemiQuaver() {
                _super.apply(this, arguments);
                this.noteLength = 5 /* SemiQuaver */;
            }
            SemiQuaver.prototype.draw = function (ctx) {
                drawNote(ctx, this.x, this.y, this, 10);
                return true;
            };
            return SemiQuaver;
        })(Note);
        Drawing.SemiQuaver = SemiQuaver;
        var DemiSemiQuaver = (function (_super) {
            __extends(DemiSemiQuaver, _super);
            function DemiSemiQuaver() {
                _super.apply(this, arguments);
                this.noteLength = 6 /* DemiSemiQuaver */;
            }
            DemiSemiQuaver.prototype.draw = function (ctx) {
                drawNote(ctx, this.x, this.y, this, 10);
                return true;
            };
            return DemiSemiQuaver;
        })(Note);
        Drawing.DemiSemiQuaver = DemiSemiQuaver;
        var HemiDemiSemiQuaver = (function (_super) {
            __extends(HemiDemiSemiQuaver, _super);
            function HemiDemiSemiQuaver() {
                _super.apply(this, arguments);
                this.noteLength = 7 /* HemiDemiSemiQuaver */;
            }
            HemiDemiSemiQuaver.prototype.draw = function (ctx) {
                drawNote(ctx, this.x, this.y, this, 10);
                return true;
            };
            return HemiDemiSemiQuaver;
        })(Note);
        Drawing.HemiDemiSemiQuaver = HemiDemiSemiQuaver;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        function restCommon(ctx, rest) {
            if (rest.select) {
                ctx.beginPath();
                ctx.arc(rest.x, rest.y, 10, 0, 2 * Math.PI);
                ctx.strokeStyle = Drawing.Colours.orange;
                ctx.fillStyle = Drawing.Colours.orange;
                ctx.stroke();
            }
            ctx.strokeStyle = Drawing.Colours.black;
            ctx.fillStyle = Drawing.Colours.black;
            if (rest.hover || rest.select) {
                ctx.strokeStyle = Drawing.Colours.orange;
                ctx.fillStyle = Drawing.Colours.orange;
            }
        }
        function drawBreveRest(ctx, x, y, height) {
            ctx.beginPath();
            ctx.moveTo(x, y - height);
            ctx.lineTo(x + 2 * height / 2, y - height);
            ctx.lineTo(x + 2 * height / 2, y + height);
            ctx.lineTo(x, y + height);
            ctx.lineTo(x, y - height);
            ctx.fill();
        }
        function drawSemiBreveRest(ctx, x, y, height) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + 2 * height, y);
            ctx.lineTo(x + 2 * height, y + height / 2);
            ctx.lineTo(x, y + height / 2);
            ctx.lineTo(x, y);
            ctx.fill();
        }
        function drawMinimRest(ctx, x, y, height) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + 2 * height, y);
            ctx.lineTo(x + 2 * height, y - height / 2);
            ctx.lineTo(x, y - height / 2);
            ctx.lineTo(x, y);
            ctx.fill();
        }
        function drawCrotchetRest(ctx, x, y, height) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.quadraticCurveTo(x + height, y - height / 2, x, y - height);
            ctx.quadraticCurveTo(x + 2 * height, y, x + height / 2, y + height / 2);
            ctx.quadraticCurveTo(x - height, y + height, x + height / 2, y + 3 * height / 2);
            ctx.quadraticCurveTo(x - height / 2, y + 7 * height / 4, x, y + 5 * height / 2);
            ctx.quadraticCurveTo(x - 3 * height / 2, y + 6 * height / 4, x + height / 2, y + 3 * height / 2);
            ctx.quadraticCurveTo(x - 2 * height, y + height / 2, x, y);
            ctx.fill();
            ctx.stroke();
        }
        function drawQuaverRest(ctx, x, y, height) {
            ctx.beginPath();
            ctx.arc(x, y, height / 4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.moveTo(x, y);
            ctx.bezierCurveTo(x + height / 2, y + height, x + 3 * height / 2, y + height / 2, x + 2 * height, y);
            ctx.bezierCurveTo(x + 3 * height / 2, y + height / 2, x + height / 2, y + height, x - height / 5, y + height * 0.75 / 4);
            ctx.stroke();
            ctx.fill();
            ctx.moveTo(x + 2 * height, y);
            ctx.lineTo(x, y + height * 4);
            ctx.stroke();
        }
        function drawSemiQuaverRest(ctx, x, y, height) {
            drawQuaverRest(ctx, x, y, height);
            drawQuaverRest(ctx, x - height, y + 2 * height, height);
        }
        function drawDemiSemiQuaverRest(ctx, x, y, height) {
            drawQuaverRest(ctx, x, y, height);
            drawQuaverRest(ctx, x - height, y + 2 * height, height);
            drawQuaverRest(ctx, x + height, y - 2 * height, height);
        }
        function drawHemiDemiSemiQuaverRest(ctx, x, y, height) {
            drawQuaverRest(ctx, x, y, height);
            drawQuaverRest(ctx, x - height, y + 2 * height, height);
            drawQuaverRest(ctx, x + height, y - 2 * height, height);
            drawQuaverRest(ctx, x - height * 2, y + 4 * height, height);
        }
        /* y should be middle of second top line, ideally. */
        function drawRest(ctx, x, y, duration, lineHeight) {
            ctx.strokeStyle = Drawing.Colours.black;
            ctx.fillStyle = Drawing.Colours.black;
            var height = lineHeight / 2;
            if (duration.denom == 1) {
                switch (duration.num) {
                    case 1:
                        drawCrotchetRest(ctx, x, y, height * 3 / 2);
                        break;
                    case 2:
                        drawMinimRest(ctx, x, y + 2, height * 2);
                        break;
                    case 4:
                        drawSemiBreveRest(ctx, x, y + 2, height * 2);
                        break;
                }
            }
            else {
                switch (duration.denom) {
                    case 2:
                        drawQuaverRest(ctx, x, y, height);
                        break;
                    case 4:
                        drawSemiQuaverRest(ctx, x, y, height);
                        break;
                    case 8:
                        drawDemiSemiQuaverRest(ctx, x, y, height);
                        break;
                    case 16:
                        drawHemiDemiSemiQuaverRest(ctx, x, y, height);
                        break;
                }
            }
            ctx.strokeStyle = Drawing.Colours.black;
            ctx.fillStyle = Drawing.Colours.black;
        }
        var Rest = (function (_super) {
            __extends(Rest, _super);
            function Rest() {
                _super.apply(this, arguments);
            }
            return Rest;
        })(Inknote.Notation);
        Drawing.Rest = Rest;
        var BreveRest = (function (_super) {
            __extends(BreveRest, _super);
            function BreveRest() {
                _super.apply(this, arguments);
            }
            // this is incorrect. currently draws a minim note;
            // todo: fix this.
            BreveRest.prototype.draw = function (ctx) {
                restCommon(ctx, this);
                drawBreveRest(ctx, this.x, this.y, 10);
                return true;
            };
            return BreveRest;
        })(Rest);
        Drawing.BreveRest = BreveRest;
        var SemiBreveRest = (function (_super) {
            __extends(SemiBreveRest, _super);
            function SemiBreveRest() {
                _super.apply(this, arguments);
            }
            SemiBreveRest.prototype.draw = function (ctx) {
                restCommon(ctx, this);
                drawSemiBreveRest(ctx, this.x, this.y, 5);
                return true;
            };
            return SemiBreveRest;
        })(Rest);
        Drawing.SemiBreveRest = SemiBreveRest;
        var MinimRest = (function (_super) {
            __extends(MinimRest, _super);
            function MinimRest() {
                _super.apply(this, arguments);
            }
            MinimRest.prototype.draw = function (ctx) {
                restCommon(ctx, this);
                drawMinimRest(ctx, this.x, this.y, 5);
                return true;
            };
            return MinimRest;
        })(Rest);
        Drawing.MinimRest = MinimRest;
        var CrotchetRest = (function (_super) {
            __extends(CrotchetRest, _super);
            function CrotchetRest() {
                _super.apply(this, arguments);
            }
            CrotchetRest.prototype.draw = function (ctx) {
                restCommon(ctx, this);
                drawCrotchetRest(ctx, this.x, this.y, 5);
                return true;
            };
            return CrotchetRest;
        })(Rest);
        Drawing.CrotchetRest = CrotchetRest;
        var QuaverRest = (function (_super) {
            __extends(QuaverRest, _super);
            function QuaverRest() {
                _super.apply(this, arguments);
            }
            QuaverRest.prototype.draw = function (ctx) {
                restCommon(ctx, this);
                drawQuaverRest(ctx, this.x, this.y, 5);
                return true;
            };
            return QuaverRest;
        })(Rest);
        Drawing.QuaverRest = QuaverRest;
        var SemiQuaverRest = (function (_super) {
            __extends(SemiQuaverRest, _super);
            function SemiQuaverRest() {
                _super.apply(this, arguments);
            }
            SemiQuaverRest.prototype.draw = function (ctx) {
                restCommon(ctx, this);
                drawSemiQuaverRest(ctx, this.x, this.y, 5);
                return true;
            };
            return SemiQuaverRest;
        })(Rest);
        Drawing.SemiQuaverRest = SemiQuaverRest;
        var DemiSemiQuaverRest = (function (_super) {
            __extends(DemiSemiQuaverRest, _super);
            function DemiSemiQuaverRest() {
                _super.apply(this, arguments);
            }
            DemiSemiQuaverRest.prototype.draw = function (ctx) {
                restCommon(ctx, this);
                drawDemiSemiQuaverRest(ctx, this.x, this.y, 5);
                return true;
            };
            return DemiSemiQuaverRest;
        })(Rest);
        Drawing.DemiSemiQuaverRest = DemiSemiQuaverRest;
        var HemiDemiSemiQuaverRest = (function (_super) {
            __extends(HemiDemiSemiQuaverRest, _super);
            function HemiDemiSemiQuaverRest() {
                _super.apply(this, arguments);
            }
            HemiDemiSemiQuaverRest.prototype.draw = function (ctx) {
                restCommon(ctx, this);
                drawHemiDemiSemiQuaverRest(ctx, this.x, this.y, 5);
                return true;
            };
            return HemiDemiSemiQuaverRest;
        })(Rest);
        Drawing.HemiDemiSemiQuaverRest = HemiDemiSemiQuaverRest;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var Bar = (function (_super) {
            __extends(Bar, _super);
            function Bar() {
                _super.apply(this, arguments);
                this.ID = Inknote.getID();
                this.order = 20;
            }
            Bar.prototype.isOver = function (x, y) {
                var isLeft = x < this.x + this.width;
                var isRight = x > this.x;
                var isBelow = y > this.y;
                var isAbove = y < this.y + this.height;
                return isLeft && isRight && isBelow && isAbove;
            };
            Bar.prototype.draw = function (ctx) {
                ctx.beginPath();
                ctx.strokeStyle = Drawing.Colours.black;
                if (this.hover) {
                    ctx.strokeStyle = Drawing.Colours.orange;
                }
                if (this.select) {
                    ctx.strokeStyle = Drawing.Colours.orange;
                    ctx.lineWidth = 2;
                }
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x, this.y + this.height);
                ctx.moveTo(this.x + this.width, this.y);
                ctx.lineTo(this.x + this.width, this.y + this.height);
                ctx.stroke();
                // line under
                if (this.select) {
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y + this.height + 10);
                    ctx.lineTo(this.x + this.width, this.y + this.height + 10);
                    ctx.stroke();
                }
                ctx.lineWidth = 1;
                return true;
            };
            return Bar;
        })(Inknote.Notation);
        Drawing.Bar = Bar;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var LoadingSplash = (function () {
            function LoadingSplash() {
                this.ID = Inknote.getID();
                this.t = 0;
                this.x = 0;
                this.y = 0;
                this.order = 100;
                this.hover = false;
                this.select = false;
                this.x = 5;
                this.y = 7;
                var self = this;
                self.draw = function (ctx, canvas, scale) {
                    this.t++;
                    ctx.beginPath();
                    ctx.fillStyle = Drawing.Colours.translucentBlack;
                    ctx.rect(0, 0, canvas.width, canvas.height);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.fillStyle = "orange";
                    ctx.arc(canvas.width / 2, canvas.height / 2, 80, 0, 2 * Math.PI);
                    ctx.fill();
                    Inknote.drawTextAlongArc(ctx, "Loading", canvas.width / 2, canvas.height / 2, 90, 1);
                    ctx.beginPath();
                    ctx.fillStyle = "black";
                    ctx.arc(50 * Math.sin(self.t / 100) * Math.sin(self.t / 50) + canvas.width / 2, 50 * Math.sin(self.t / 100) * Math.cos(self.t / 50) + canvas.height / 2, 10 * Math.abs(Math.sin(self.t / 100)), 0, 2 * Math.PI);
                    ctx.arc(-50 * Math.sin(self.t / 100) * Math.sin(self.t / 50) + canvas.width / 2, -50 * Math.sin(self.t / 100) * Math.cos(-self.t / 50) + canvas.height / 2, 10 * Math.abs(Math.sin(self.t / 100)), 0, 2 * Math.PI);
                    ctx.fill();
                    return true;
                };
            }
            LoadingSplash.prototype.isOver = function (x, y) {
                return Inknote.Maths.isWithinRadius(x, y, this.x, this.y, 10);
            };
            return LoadingSplash;
        })();
        Drawing.LoadingSplash = LoadingSplash;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var Name = (function () {
            function Name(name) {
                this.ID = Inknote.getID();
                this.x = 0;
                this.order = 100;
                this.hover = false;
                this.select = false;
                this.name = name;
                this.x = 0;
                var self = this;
                self.draw = function (ctx, canvas, scale) {
                    if (self.select) {
                        ctx.beginPath();
                        ctx.fillStyle = Drawing.Colours.white;
                        var width = Inknote.Managers.ProjectManager.Instance.currentProject.name.length * 30 + 100;
                        ctx.rect(canvas.width / 2 - width / 2, this.y + 60, width, 50);
                        ctx.strokeStyle = Drawing.Colours.lightOrange;
                        ctx.lineWidth = 10;
                        ctx.stroke();
                        if (this.name.length > 0) {
                            ctx.beginPath();
                            ctx.fillStyle = Drawing.Colours.black;
                            ctx.font = Drawing.Fonts.small;
                            ctx.textAlign = "center";
                            ctx.fillText("Click delete to clear text", canvas.width / 2, this.y + 50);
                            ctx.fill();
                        }
                        else {
                            ctx.beginPath();
                            ctx.fillStyle = Drawing.Colours.black;
                            ctx.font = Drawing.Fonts.small;
                            ctx.textAlign = "center";
                            ctx.fillText("Please type a project name", canvas.width / 2, this.y + 50);
                            ctx.fill();
                        }
                    }
                    ctx.beginPath();
                    ctx.fillStyle = Drawing.Colours.orange;
                    ctx.font = Drawing.Fonts.title;
                    ctx.textAlign = "center";
                    ctx.fillText(self.name, canvas.width / 2, this.y + 100);
                    ctx.fill();
                    if (self.hover) {
                        ctx.beginPath();
                        ctx.rect(canvas.width / 2 - 50, this.y + 105, 100, 10);
                        ctx.fill();
                        if (!self.select) {
                            ctx.beginPath();
                            ctx.font = Drawing.Fonts.small;
                            ctx.fillStyle = Drawing.Colours.black;
                            ctx.textAlign = "center";
                            ctx.fillText("Click to edit project name", canvas.width / 2, this.y + 50);
                            ctx.fill();
                        }
                    }
                    return true;
                };
            }
            Object.defineProperty(Name.prototype, "y", {
                get: function () {
                    return -Inknote.ScrollService.Instance.y;
                },
                set: function (val) {
                    return;
                },
                enumerable: true,
                configurable: true
            });
            Name.prototype.isOver = function (x, y, canvas) {
                return y < this.y + 100 && y > this.y + 65 && x > canvas.width / 2 - 150 && x < canvas.width / 2 + 150;
            };
            return Name;
        })();
        Drawing.Name = Name;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var File = (function () {
            function File(name) {
                this.name = name;
                this.ID = Inknote.getID();
                this.order = 10;
                this.hover = false;
                this.select = false;
                this.colour = "#FFFFFF";
                var self = this;
                self.draw = function (ctx, canvas, scale) {
                    if (self.hover || self.select) {
                        ctx.fillStyle = Drawing.Colours.lightBlue;
                        ctx.beginPath();
                        ctx.rect(self.x - 60, self.y - 60, 120, 140);
                        ctx.fill();
                    }
                    var grd = ctx.createLinearGradient(self.x - 50, self.y - 50, self.x + 50, self.y + 50);
                    var fold = 20;
                    if (self.select) {
                        grd.addColorStop(0, Drawing.Colours.lightTan);
                        fold = 0;
                    }
                    else {
                        grd.addColorStop(0, Drawing.Colours.tan);
                    }
                    grd.addColorStop(1, Drawing.Colours.peach);
                    ctx.fillStyle = grd;
                    ctx.beginPath();
                    ctx.moveTo(self.x - 50, self.y + 50);
                    ctx.lineTo(self.x + 50, self.y + 50);
                    ctx.lineTo(self.x + 50, self.y - 50);
                    ctx.lineTo(self.x - fold, self.y - 50);
                    ctx.lineTo(self.x - 50, self.y - fold);
                    ctx.fill();
                    // file white bit.
                    ctx.beginPath();
                    ctx.moveTo(self.x - (fold + 4), self.y - 45);
                    ctx.lineTo(self.x - 45, self.y - 45);
                    ctx.lineTo(self.x - 45, self.y - (fold + 4));
                    ctx.strokeStyle = Drawing.Colours.black;
                    ctx.fillStyle = Drawing.Colours.white;
                    ctx.fill();
                    ctx.stroke();
                    // colour tag.
                    ctx.beginPath();
                    ctx.rect(self.x + 30, self.y + 30, 15, 15);
                    ctx.fillStyle = self.colour;
                    ctx.fill();
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.fillStyle = Drawing.Colours.black;
                    ctx.textAlign = "center";
                    ctx.fillText(self.name, self.x, self.y + 70);
                    if (self.hover) {
                        ctx.strokeStyle = Drawing.Colours.midBlue;
                        ctx.beginPath();
                        ctx.rect(self.x - 60, self.y - 60, 120, 140);
                        ctx.stroke();
                    }
                    return true;
                };
            }
            File.prototype.isOver = function (x, y) {
                if (x < this.x + 50 && x > this.x - 50) {
                    //console.log(this.x + ":" + this.y);
                    //console.log("Mouse: " + x + ":" + y);
                    return (y < this.y + 80 && y > this.y - 50);
                }
                return false;
            };
            return File;
        })();
        Drawing.File = File;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var KeyboardKey = (function () {
            function KeyboardKey(name, x, y, width, height) {
                this.name = name;
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
            }
            KeyboardKey.prototype.draw = function (ctx, canvas) {
                if (this.name == "") {
                    return;
                }
                ctx.beginPath();
                ctx.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
                var grd = ctx.createLinearGradient(this.x - this.width / 2, this.y - this.height / 2, this.x + this.width / 2, this.y + this.height / 2);
                if (this.hover) {
                    grd.addColorStop(0, Drawing.Colours.lightBlue);
                }
                else {
                    grd.addColorStop(0, Drawing.Colours.darkestGray);
                }
                grd.addColorStop(1, Drawing.Colours.black);
                ctx.fillStyle = grd;
                ctx.fill();
                //ctx.stroke();
                ctx.beginPath();
                ctx.fillStyle = Drawing.Colours.white;
                ctx.textAlign = "center";
                ctx.font = Drawing.Fonts.large;
                ctx.fillText(this.name, this.x, this.y + 5);
            };
            KeyboardKey.prototype.isOver = function (x, y) {
                if (this.name == "") {
                    return false;
                }
                var isRight = x > this.x - this.width / 2;
                var isLeft = x < this.x + this.width / 2;
                var isDown = y > this.y - this.height / 2;
                var isUp = y < this.y + this.height / 2;
                return isRight && isLeft && isDown && isUp;
            };
            return KeyboardKey;
        })();
        Drawing.KeyboardKey = KeyboardKey;
        function keysFromString(text, x, y, totalWidth, itemHeight) {
            var charArray = text.split("");
            var keys = [];
            var itemWidth = totalWidth / charArray.length;
            var maxWidth = 10000;
            var column = 0;
            for (var i = 0; i < charArray.length; i++) {
                keys.push(new KeyboardKey(charArray[i], x + itemWidth * column + itemWidth / 2, y + itemHeight / 2, itemWidth - 2, itemHeight - 2));
                column++;
            }
            return keys;
        }
        Drawing.keysFromString = keysFromString;
        function keysFromArray(array, x, y, totalWidth, itemHeight) {
            var charArray = array;
            var keys = [];
            var itemWidth = totalWidth / charArray.length;
            var maxWidth = 10000;
            var column = 0;
            for (var i = 0; i < charArray.length; i++) {
                keys.push(new KeyboardKey(charArray[i], x + itemWidth * column + itemWidth / 2, y + itemHeight / 2, itemWidth - 2, itemHeight - 4));
                column++;
            }
            return keys;
        }
        Drawing.keysFromArray = keysFromArray;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var Keyboard = (function () {
            function Keyboard() {
                this.ID = Inknote.getID();
                this.order = 200;
                this.cSize = { x: 0, y: 0 };
                var self = this;
                self.draw = function (ctx, canvas, scale) {
                    if (canvas.width != self.cSize.x || canvas.height != self.cSize.y) {
                        self.cSize = { x: canvas.width, y: canvas.height };
                        self.keys = [];
                        //self.keys.push(new KeyboardKey("Delete", canvas.width - 40, canvas.height / 2 + 20, 70, 30));
                        self.keys = self.keys.concat(Drawing.keysFromString("qwertyuiop", 0, canvas.height / 2 + 0 * canvas.height / 8, canvas.width, canvas.height / 8));
                        self.keys = self.keys.concat(Drawing.keysFromString("asdfghjkl-", 0, canvas.height / 2 + canvas.height / 8, canvas.width, canvas.height / 8));
                        self.keys = self.keys.concat(Drawing.keysFromString("zxcvbnm,./", 0, canvas.height / 2 + 2 * canvas.height / 8, canvas.width, canvas.height / 8));
                        self.keys = self.keys.concat(Drawing.keysFromArray(["|<", " ", " ", " ", "Delete"], 0, canvas.height / 2 + 3 * canvas.height / 8, canvas.width, canvas.height / 8));
                    }
                    else {
                    }
                    ctx.font = Drawing.Fonts.standard;
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = Drawing.Colours.black;
                    ctx.beginPath();
                    var grd = ctx.createLinearGradient(0, canvas.height / 2, canvas.width / 2, canvas.height);
                    grd.addColorStop(0, Drawing.Colours.darkestGray);
                    grd.addColorStop(1, Drawing.Colours.darkerGray);
                    ctx.fillStyle = grd;
                    ctx.rect(0, canvas.height / 2, canvas.width, canvas.height / 2);
                    ctx.fill();
                    for (var i = 0; i < self.keys.length; i++) {
                        self.keys[i].draw(ctx, canvas);
                    }
                    return true;
                };
            }
            Object.defineProperty(Keyboard, "Instance", {
                get: function () {
                    if (!Keyboard._instance) {
                        Keyboard._instance = new Keyboard();
                    }
                    return Keyboard._instance;
                },
                enumerable: true,
                configurable: true
            });
            Keyboard.prototype.isOver = function (x, y, canvas) {
                var result = false;
                for (var i = 0; i < this.keys.length; i++) {
                    if (this.keys[i].isOver(x, y)) {
                        this.keys[i].hover = true;
                        result = true;
                    }
                    else {
                        this.keys[i].hover = false;
                    }
                }
                return result;
            };
            Keyboard.prototype.click = function (e) {
                var inst = Inknote.Managers.ProjectManager.Instance;
                var proj = inst.currentProject;
                for (var i = 0; i < this.keys.length; i++) {
                    if (this.keys[i].isOver(e.clientX, e.clientY - 50)) {
                        if (this.keys[i].name == "Delete") {
                            if (inst.selectID == proj.ID) {
                                proj.name = "";
                            }
                        }
                        else if (this.keys[i].name == "|<") {
                            if (inst.selectID == proj.ID) {
                                proj.name = proj.name.substr(0, proj.name.length - 1);
                            }
                        }
                        else {
                            console.log(this.keys[i].name);
                            proj.name = Inknote.pascalCase(proj.name + this.keys[i].name);
                        }
                    }
                }
            };
            return Keyboard;
        })();
        Drawing.Keyboard = Keyboard;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var BottomMenuButton = (function () {
            function BottomMenuButton(text, x, y, width, height, clicker, negative) {
                this.negative = negative;
                this.text = text;
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                this.click = clicker;
            }
            BottomMenuButton.prototype.isOver = function (x, y) {
                var isRight = x >= this.x;
                var isLeft = x <= this.x + this.width;
                var isUp = y <= this.y + this.height;
                var isDown = y >= this.y;
                return isRight && isLeft && isUp && isDown;
            };
            BottomMenuButton.prototype.draw = function (ctx) {
                ctx.beginPath();
                var grd = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y + this.height);
                if (this.hover) {
                    grd.addColorStop(0, Drawing.Colours.lightBlue);
                }
                else {
                    grd.addColorStop(0, Drawing.Colours.gray);
                }
                grd.addColorStop(1, Drawing.Colours.white);
                ctx.fillStyle = grd;
                if (this.negative) {
                    ctx.fillStyle = Drawing.Colours.negativeRed;
                    if (this.hover) {
                        ctx.fillStyle = Drawing.Colours.negativeHoverRed;
                    }
                }
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.fill();
                if (this.hover) {
                    ctx.strokeStyle = Drawing.Colours.white;
                    ctx.stroke();
                }
                ctx.beginPath();
                ctx.fillStyle = Drawing.Colours.black;
                ctx.textAlign = "center";
                ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2 + 5);
                ctx.fill();
            };
            return BottomMenuButton;
        })();
        Drawing.BottomMenuButton = BottomMenuButton;
        function createMenuFromArray(items, x, y, width, height) {
            var correctItems = [];
            var result = [];
            for (var i = 0; i < items.length; i++) {
                var o = items[i];
                if (!o.click || !o.text) {
                    Inknote.log("bad item in menu array");
                    continue;
                }
                correctItems.push(o);
            }
            var itemCount = correctItems.length;
            var singleWidth = width / itemCount;
            var column = 0;
            for (var i = 0; i < correctItems.length; i++) {
                result.push(new BottomMenuButton(correctItems[i].text, column * singleWidth + singleWidth / 20, y + height / 10, singleWidth - 2 * singleWidth / 20, 8 * height / 10, correctItems[i].click, correctItems[i].negative));
                column++;
            }
            return result;
        }
        Drawing.createMenuFromArray = createMenuFromArray;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var BottomMenu = (function () {
            function BottomMenu() {
                this.ID = Inknote.getID();
                this.order = 150;
                this.buttons = [];
                var self = this;
                self.draw = function (ctx, canvas, scale) {
                    if (self.buttons.length < 1) {
                        self.buttons = Drawing.createMenuFromArray([
                            {
                                text: "Open",
                                click: function () {
                                    Inknote.Managers.ProjectManager.Instance.openSelectedProject();
                                }
                            },
                            {
                                text: "<",
                                click: function () {
                                    Inknote.Managers.ProjectManager.Instance.previous();
                                }
                            },
                            {
                                text: ">",
                                click: function () {
                                    Inknote.Managers.ProjectManager.Instance.next();
                                }
                            },
                            {
                                text: "Delete",
                                click: function () {
                                    var inst = Inknote.Managers.ProjectManager.Instance;
                                    inst.deleteSelectedProject();
                                },
                                negative: true
                            }
                        ], 0, canvas.height - 100, canvas.width, 100);
                    }
                    else {
                        this.resizeButtons(canvas);
                    }
                    ctx.beginPath();
                    ctx.fillStyle = "black";
                    ctx.rect(0, canvas.height - 100, canvas.width, 100);
                    ctx.fill();
                    for (var i = 0; i < self.buttons.length; i++) {
                        self.buttons[i].draw(ctx);
                    }
                    return true;
                };
            }
            Object.defineProperty(BottomMenu, "Instance", {
                get: function () {
                    if (!BottomMenu._instance) {
                        BottomMenu._instance = new BottomMenu();
                    }
                    return BottomMenu._instance;
                },
                enumerable: true,
                configurable: true
            });
            BottomMenu.prototype.isOver = function (x, y, canvas) {
                for (var i = 0; i < this.buttons.length; i++) {
                    if (this.buttons[i].isOver(x, y)) {
                        this.buttons[i].hover = true;
                    }
                    else {
                        this.buttons[i].hover = false;
                    }
                }
                return y > canvas.height - 100;
            };
            BottomMenu.prototype.click = function (e) {
                var inst = Inknote.Managers.ProjectManager.Instance;
                var proj = inst.currentProject;
                for (var i = 0; i < this.buttons.length; i++) {
                    if (this.buttons[i].isOver(e.clientX, e.clientY - 50)) {
                        this.buttons[i].click();
                        e.preventDefault();
                    }
                }
            };
            BottomMenu.prototype.resizeButtons = function (canvas) {
                var btns = this.buttons;
                var itemCount = btns.length;
                var singleWidth = canvas.width / itemCount;
                var column = 0;
                var height = 100;
                for (var i = 0; i < btns.length; i++) {
                    btns[i].x = column * singleWidth + singleWidth / 20;
                    btns[i].y = canvas.height - 100 + height / 10;
                    btns[i].width = singleWidth - 2 * singleWidth / 20;
                    btns[i].height = 8 * height / 10;
                    column++;
                }
            };
            return BottomMenu;
        })();
        Drawing.BottomMenu = BottomMenu;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var ScoreMenu = (function () {
            function ScoreMenu() {
                this.ID = Inknote.getID();
                this.order = 150;
                var self = this;
                self.draw = function (ctx, canvas, scale) {
                    return true;
                };
            }
            Object.defineProperty(ScoreMenu, "Instance", {
                get: function () {
                    if (!ScoreMenu._instance) {
                        ScoreMenu._instance = new ScoreMenu();
                    }
                    return ScoreMenu._instance;
                },
                enumerable: true,
                configurable: true
            });
            return ScoreMenu;
        })();
        Drawing.ScoreMenu = ScoreMenu;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var ChordSymbol = (function (_super) {
            __extends(ChordSymbol, _super);
            function ChordSymbol() {
                _super.apply(this, arguments);
            }
            ChordSymbol.prototype.draw = function (ctx) {
                // displays chord in correct manner.
                var theChord = this.standardChord;
                var displayChord = Inknote.getCurrentChordNotation(theChord.baseNote, theChord.rootNote, theChord.minor, theChord.annotations);
                var text = displayChord.name;
                ctx.beginPath();
                ctx.fillStyle = Drawing.Colours.black;
                ctx.strokeStyle = Drawing.Colours.black;
                ctx.textAlign = "center";
                ctx.fillText(text, this.x, this.y);
                return true;
            };
            return ChordSymbol;
        })(Inknote.Notation);
        Drawing.ChordSymbol = ChordSymbol;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var ScrollBar;
        (function (_ScrollBar) {
            var ScrollBar = (function () {
                function ScrollBar() {
                    this.ID = Inknote.getID();
                    this.y = 50;
                    this.width = 25;
                    this.order = 200;
                    this.buttonHeight = 20;
                    this.scrollThumbnail = new _ScrollBar.ScrollThumbnail();
                }
                ScrollBar.prototype.click = function (e) {
                    if (e.clientY < 50 + this.y + this.buttonHeight) {
                        Inknote.ScrollService.Instance.up();
                    }
                    else if (e.clientY > 50 + this.y + this.height - this.buttonHeight) {
                        Inknote.ScrollService.Instance.down();
                    }
                    else {
                    }
                };
                ScrollBar.prototype.isOver = function (x, y) {
                    var isRight = x > this.x;
                    var isLeft = x < this.x + this.width;
                    var isBelow = y > this.y;
                    var isAbove = y < this.y + this.height;
                    var result = isRight && isLeft && isBelow && isAbove;
                    this.isOverTopButton = false;
                    this.isOverBottomButton = false;
                    this.isOverMiddle = false;
                    if (result) {
                        if (y < this.y + this.buttonHeight) {
                            this.scrollThumbnail.visible = false;
                            this.isOverTopButton = true;
                        }
                        else if (y > this.y + this.height - this.buttonHeight) {
                            this.isOverBottomButton = true;
                            this.scrollThumbnail.visible = false;
                        }
                        else {
                            this.isOverMiddle = true;
                            this.scrollThumbnail.visible = true;
                            this.scrollThumbnail.y = y;
                            this.scrollThumbnail.x = this.x - 3 - this.scrollThumbnail.width;
                        }
                    }
                    this.hover = result;
                    return result;
                };
                ScrollBar.prototype.draw = function (ctx, canvas) {
                    this.x = canvas.width - this.width;
                    this.height = canvas.height - this.y;
                    ctx.beginPath();
                    ctx.clearRect(this.x, this.y, this.width, this.height);
                    ctx.fillStyle = Drawing.Colours.lightBlue;
                    if (this.isOverMiddle) {
                        ctx.beginPath();
                        ctx.rect(this.x, this.y + this.buttonHeight, this.width, this.height - 2 * this.buttonHeight);
                        ctx.fill();
                    }
                    ctx.beginPath();
                    ctx.strokeStyle = Drawing.Colours.black;
                    ctx.moveTo(this.x, this.y + this.buttonHeight);
                    ctx.lineTo(this.x, canvas.height - this.buttonHeight);
                    ctx.stroke();
                    // top button
                    ctx.beginPath();
                    ctx.rect(this.x, this.y, this.width, this.buttonHeight);
                    ctx.moveTo(this.x + this.width / 2, this.y + this.buttonHeight * 2 / 3);
                    ctx.lineTo(this.x + this.width / 2, this.y + this.buttonHeight * 1 / 3);
                    ctx.moveTo(this.x + this.width / 2 + 3, this.y + this.buttonHeight / 2);
                    ctx.lineTo(this.x + this.width / 2, this.y + this.buttonHeight * 1 / 3);
                    ctx.moveTo(this.x + this.width / 2 - 3, this.y + this.buttonHeight / 2);
                    ctx.lineTo(this.x + this.width / 2, this.y + this.buttonHeight * 1 / 3);
                    if (this.isOverTopButton) {
                        ctx.fill();
                    }
                    ctx.stroke();
                    // bottom button
                    ctx.beginPath();
                    ctx.rect(this.x, canvas.height - this.buttonHeight, this.width, this.buttonHeight);
                    ctx.moveTo(this.x + this.width / 2, canvas.height - this.buttonHeight * 2 / 3);
                    ctx.lineTo(this.x + this.width / 2, canvas.height - this.buttonHeight * 1 / 3);
                    ctx.moveTo(this.x + this.width / 2 + 3, canvas.height - this.buttonHeight / 2);
                    ctx.lineTo(this.x + this.width / 2, canvas.height - this.buttonHeight * 1 / 3);
                    ctx.moveTo(this.x + this.width / 2 - 3, canvas.height - this.buttonHeight / 2);
                    ctx.lineTo(this.x + this.width / 2, canvas.height - this.buttonHeight * 1 / 3);
                    if (this.isOverBottomButton) {
                        ctx.fill();
                    }
                    ctx.stroke();
                    return true;
                };
                return ScrollBar;
            })();
            _ScrollBar.ScrollBar = ScrollBar;
        })(ScrollBar = Drawing.ScrollBar || (Drawing.ScrollBar = {}));
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var ScrollBar;
        (function (ScrollBar) {
            var FileScroll = (function (_super) {
                __extends(FileScroll, _super);
                function FileScroll() {
                    _super.apply(this, arguments);
                }
                return FileScroll;
            })(ScrollBar.ScrollBar);
            ScrollBar.FileScroll = FileScroll;
        })(ScrollBar = Drawing.ScrollBar || (Drawing.ScrollBar = {}));
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var ScrollBar;
        (function (ScrollBar) {
            var ScrollThumbnail = (function () {
                function ScrollThumbnail() {
                    this.ID = Inknote.getID();
                    this.width = 80;
                    this.height = 100;
                    this.invert = false;
                    this.visible = false;
                    this.order = 201;
                }
                ScrollThumbnail.prototype.click = function (e) {
                    alert("Scroll thumb");
                };
                ScrollThumbnail.prototype.isOver = function (x, y) {
                    var isRight = x > this.x;
                    var isLeft = x < this.x + this.width;
                    var isBelow = y > this.y;
                    var isAbove = y < this.y + this.height;
                    var result = isRight && isLeft && isBelow && isAbove;
                    return result;
                };
                ScrollThumbnail.prototype.draw = function (ctx, canvas) {
                    if (this.y + this.height > canvas.height) {
                        this.invert = true;
                    }
                    else {
                        this.invert = false;
                    }
                    var y = this.invert ? this.y - this.height : this.y;
                    var height = this.height;
                    var farLeft = this.x;
                    ctx.strokeStyle = Drawing.Colours.black;
                    ctx.fillStyle = Drawing.Colours.white;
                    ctx.lineWidth = 2;
                    if (this.invert) {
                        ctx.beginPath();
                        ctx.moveTo(farLeft, y);
                        ctx.lineTo(farLeft, y + this.height);
                        ctx.lineTo(farLeft + this.width + 10, y + this.height);
                        ctx.lineTo(farLeft + this.width, y + this.height - 5);
                        ctx.lineTo(farLeft + this.width, y);
                        ctx.lineTo(farLeft, y);
                        ctx.fill();
                        ctx.stroke();
                    }
                    else {
                        ctx.beginPath();
                        ctx.moveTo(farLeft, y);
                        ctx.lineTo(farLeft + this.width + 10, y);
                        ctx.lineTo(farLeft + this.width, y + 5);
                        ctx.lineTo(farLeft + this.width, y + height);
                        ctx.lineTo(farLeft, y + height);
                        ctx.lineTo(farLeft, y);
                        ctx.fill();
                        ctx.stroke();
                    }
                    ctx.lineWidth = 1;
                    return true;
                };
                return ScrollThumbnail;
            })();
            ScrollBar.ScrollThumbnail = ScrollThumbnail;
        })(ScrollBar = Drawing.ScrollBar || (Drawing.ScrollBar = {}));
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var ScrollBar;
        (function (ScrollBar) {
            var ProjectScroll = (function (_super) {
                __extends(ProjectScroll, _super);
                function ProjectScroll() {
                    _super.apply(this, arguments);
                    this.width = 25;
                }
                return ProjectScroll;
            })(ScrollBar.ScrollBar);
            ScrollBar.ProjectScroll = ProjectScroll;
        })(ScrollBar = Drawing.ScrollBar || (Drawing.ScrollBar = {}));
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var RightClickMenus;
        (function (RightClickMenus) {
            var ClickableMenuItem = (function () {
                function ClickableMenuItem(text, click) {
                    this.text = text;
                    this.click = click;
                }
                return ClickableMenuItem;
            })();
            RightClickMenus.ClickableMenuItem = ClickableMenuItem;
            var RightClickMenu = (function () {
                function RightClickMenu() {
                    this.items = [
                        new ClickableMenuItem("save", function () {
                            Inknote.Action(2 /* SaveProject */);
                        }),
                        new ClickableMenuItem("plugins", function () {
                            Modal.toggle("plugins");
                        }),
                        new ClickableMenuItem("report bug", function () {
                            Modal.toggle("report");
                        })
                    ];
                    this.ID = Inknote.getID();
                    this.width = 100;
                    this.order = 500;
                }
                Object.defineProperty(RightClickMenu.prototype, "itemHeight", {
                    get: function () {
                        return 25;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RightClickMenu.prototype, "height", {
                    get: function () {
                        return this.items.length * this.itemHeight;
                    },
                    enumerable: true,
                    configurable: true
                });
                RightClickMenu.prototype.draw = function (ctx, canvas) {
                    ctx.beginPath();
                    ctx.fillStyle = Drawing.Colours.shadowGray;
                    ctx.rect(this.x + 4, this.y + 3, this.width, this.height);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.fillStyle = Drawing.Colours.white;
                    ctx.strokeStyle = Drawing.Colours.black;
                    ctx.rect(this.x, this.y, this.width, this.height);
                    ctx.fill();
                    ctx.stroke();
                    for (var i = 0; i < this.items.length; i++) {
                        if (this.items[i].hover) {
                            ctx.beginPath();
                            ctx.fillStyle = Drawing.Colours.orange;
                            ctx.rect(this.x, i * 25 + this.y, this.width, this.itemHeight);
                            ctx.fill();
                        }
                        ctx.beginPath();
                        var itemBottom = (i + 1) * 25 + this.y;
                        var textHeight = itemBottom - 8;
                        ctx.font = Drawing.Fonts.standard;
                        ctx.textAlign = "center";
                        ctx.fillStyle = Drawing.Colours.black;
                        ctx.fillText(this.items[i].text, this.x + this.width / 2, textHeight);
                        if (i < this.items.length - 1) {
                            ctx.beginPath();
                            ctx.strokeStyle = Drawing.Colours.gray;
                            ctx.moveTo(this.x, itemBottom);
                            ctx.lineTo(this.x + this.width, itemBottom);
                            ctx.stroke();
                        }
                    }
                    return true;
                };
                RightClickMenu.prototype.isOver = function (x, y) {
                    var isRight = x > this.x;
                    var isLeft = x < this.x + this.width;
                    var isBelow = y > this.y;
                    var isAbove = y < this.y + this.height;
                    var result = isRight && isLeft && isBelow && isAbove;
                    var itemNo = Math.floor((y - this.y) / this.itemHeight);
                    for (var i = 0; i < this.items.length; i++) {
                        if (result && i == itemNo) {
                            this.items[i].hover = true;
                        }
                        else {
                            this.items[i].hover = false;
                        }
                    }
                    return result;
                };
                RightClickMenu.prototype.click = function (e) {
                    var x = e.clientX;
                    var y = e.clientY - 50;
                    var itemNo = Math.floor((y - this.y) / this.itemHeight);
                    this.items[itemNo].click();
                };
                return RightClickMenu;
            })();
            RightClickMenus.RightClickMenu = RightClickMenu;
        })(RightClickMenus = Drawing.RightClickMenus || (Drawing.RightClickMenus = {}));
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var RightClickMenus;
        (function (RightClickMenus) {
            var RightClickFile = (function (_super) {
                __extends(RightClickFile, _super);
                function RightClickFile(ID) {
                    _super.call(this);
                    this.items = [
                        new RightClickMenus.ClickableMenuItem("open", function () {
                            Inknote.Managers.ProjectManager.Instance.openProjectFromID(Inknote.RightClickMenuService.Instance.Menu.fileID);
                        }),
                        new RightClickMenus.ClickableMenuItem("open in new tab", function () {
                            Inknote.Managers.PageManager.Current.openNewPage(0 /* Score */, Inknote.RightClickMenuService.Instance.Menu.fileID);
                        }),
                        new RightClickMenus.ClickableMenuItem("properties", function () {
                            var selectedProjectID = Inknote.RightClickMenuService.Instance.Menu.fileID;
                            var project = Inknote.getItemFromID(Inknote.Managers.ProjectManager.Instance.allProjects, selectedProjectID);
                            Inknote.ProjectOptionsService.Instance.open(project);
                        }),
                        new RightClickMenus.ClickableMenuItem("download", function () {
                            var selectedProjectID = Inknote.RightClickMenuService.Instance.Menu.fileID;
                            var project = Inknote.getItemFromID(Inknote.Managers.ProjectManager.Instance.allProjects, selectedProjectID);
                            var compressedProject = Inknote.ProjectConverter.compress(project);
                            Inknote.Storage.download(compressedProject.name + ".score", JSON.stringify(compressedProject));
                        }),
                        new RightClickMenus.ClickableMenuItem("delete", function () {
                            Inknote.Managers.ProjectManager.Instance.deleteProjectByID(Inknote.RightClickMenuService.Instance.Menu.fileID);
                        })
                    ];
                    this.fileID = ID;
                }
                return RightClickFile;
            })(RightClickMenus.RightClickMenu);
            RightClickMenus.RightClickFile = RightClickFile;
        })(RightClickMenus = Drawing.RightClickMenus || (Drawing.RightClickMenus = {}));
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var RightClickMenus;
        (function (RightClickMenus) {
            var RightClickScore = (function (_super) {
                __extends(RightClickScore, _super);
                function RightClickScore() {
                    _super.call(this);
                    this.items.unshift(new RightClickMenus.ClickableMenuItem("properties", function () {
                        var project = Inknote.Managers.ProjectManager.Instance.currentProject;
                        Inknote.ProjectOptionsService.Instance.open(project);
                    }));
                    this.items.unshift(new RightClickMenus.ClickableMenuItem("add a bar", function () {
                        Inknote.NoteControlService.Instance.addBar();
                        Inknote.ScoringService.Instance.refresh();
                    }));
                    this.items.unshift(new RightClickMenus.ClickableMenuItem("add instrument", function () {
                        var name = prompt("What is the name of the new instrument?");
                        if (name != "" && name != null) {
                            Inknote.NoteControlService.Instance.addInstrument(name);
                        }
                        if (name == "") {
                            Inknote.check("Your instrument name cannot be empty", null, null);
                        }
                    }));
                }
                return RightClickScore;
            })(RightClickMenus.RightClickMenu);
            RightClickMenus.RightClickScore = RightClickScore;
        })(RightClickMenus = Drawing.RightClickMenus || (Drawing.RightClickMenus = {}));
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Landing;
    (function (Landing) {
        var Metaball = (function () {
            function Metaball(pos, vel, r) {
                this.running = false;
                this.position = pos;
                this.velocity = vel;
                this.radius = r;
            }
            Object.defineProperty(Metaball.prototype, "acceleration", {
                get: function () {
                    if (this.running) {
                        return -0.02;
                    }
                    return 0.002 * this.radius;
                },
                enumerable: true,
                configurable: true
            });
            Metaball.prototype.update = function (centre) {
                this.position.x += this.velocity.x;
                this.position.y += this.velocity.y;
                var acc = new Inknote.Maths.Vector2(centre.x - this.position.x, centre.y - this.position.y);
                var absS = acc.abs; // * acc.abs;
                var damp = 0.002;
                if (this.running) {
                    this.velocity.x += acc.x * this.acceleration - this.velocity.x * damp;
                    this.velocity.y += acc.y * this.acceleration - this.velocity.y * damp;
                }
                else {
                    this.velocity.x += acc.x / absS * this.acceleration - this.velocity.x * damp;
                    this.velocity.y += acc.y / absS * this.acceleration - this.velocity.y * damp;
                }
            };
            Metaball.prototype.draw = function (ctx) {
                ctx.beginPath();
                var grad = ctx.createRadialGradient(this.position.x, this.position.y, 10, this.position.x, this.position.y, this.radius);
                grad.addColorStop(0, "rgba(0,0,0,1)");
                grad.addColorStop(1, "rgba(0,0,0,0.0)");
                ctx.fillStyle = grad;
                ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
                ctx.fill();
            };
            return Metaball;
        })();
        Landing.Metaball = Metaball;
        var MetaballList = (function () {
            function MetaballList(amount, canvas) {
                this.ended = false;
                var width = canvas.width;
                var height = canvas.height;
                var hW = width / 2;
                var hH = height / 2;
                var minLength = Math.min(width, height, 600);
                this.metaballs = [];
                for (var i = 0; i < amount; i++) {
                    var x = hW + minLength * Math.random() - minLength / 2;
                    var y = hH + minLength * Math.random() - minLength / 2;
                    var pos = new Inknote.Maths.Vector2(x, y);
                    var speed = 4;
                    var vx = speed * Math.random() - speed / 2;
                    var vy = speed * Math.random() - speed / 2;
                    var vel = new Inknote.Maths.Vector2(vx, vy);
                    var r = 30 + minLength / 4 * Math.random();
                    var tempBall = new Metaball(pos, vel, r);
                    this.metaballs.push(tempBall);
                }
            }
            MetaballList.prototype.update = function (x, y) {
                var centre = new Inknote.Maths.Vector2(x, y);
                for (var i = 0; i < this.metaballs.length; i++) {
                    this.metaballs[i].update(centre);
                }
                if (this.ended) {
                    var newBalls = [];
                    for (var i = 0; i < this.metaballs.length; i++) {
                        var b = this.metaballs[i];
                        if (b.position.x + b.radius < 0 || b.position.x - b.radius > centre.x * 2 || b.position.y + b.radius < 0 || b.position.y - b.radius > centre.y * 2) {
                        }
                        else {
                            newBalls.push(b);
                        }
                    }
                    this.metaballs = newBalls;
                }
            };
            MetaballList.prototype.metabalise = function (ctx, canvas) {
                var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                var pixels = imageData.data;
                for (var i = 0; i < pixels.length; i += 4) {
                    var a = pixels[i + 3];
                    //var g = pixels[i + 1];
                    if (a < 180) {
                        a = 0;
                    }
                    else {
                    }
                    imageData.data[i + 3] = a;
                }
                ctx.putImageData(imageData, 0, 0);
            };
            MetaballList.prototype.draw = function (ctx, canvas) {
                for (var i = 0; i < this.metaballs.length; i++) {
                    this.metaballs[i].draw(ctx);
                }
                this.metabalise(ctx, canvas);
            };
            MetaballList.prototype.end = function () {
                this.ended = true;
                for (var i = 0; i < this.metaballs.length; i++) {
                    this.metaballs[i].running = true;
                }
            };
            return MetaballList;
        })();
        Landing.MetaballList = MetaballList;
    })(Landing = Inknote.Landing || (Inknote.Landing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Landing;
    (function (_Landing) {
        var Landing = (function () {
            function Landing() {
                this.ended = false;
                this.canvas = document.getElementById("landing-canvas");
                this.ctx = this.canvas.getContext("2d");
                if (Inknote.Managers.MachineManager.Instance.machineType != 0 /* Desktop */) {
                    return;
                }
                this.canvas.width = this.canvas.parentElement.clientWidth;
                this.canvas.height = this.canvas.parentElement.clientHeight;
                this.metaballs = new _Landing.MetaballList(20, this.canvas);
                this.run();
            }
            Object.defineProperty(Landing, "Instance", {
                get: function () {
                    if (!Landing._instance) {
                        Landing._instance = new Landing();
                    }
                    return Landing._instance;
                },
                enumerable: true,
                configurable: true
            });
            Landing.prototype.run = function () {
                if (this.metaballs.metaballs.length === 0) {
                    FrontEnd.hideElement(this.canvas.parentElement);
                    return;
                }
                if (this.canvas.parentElement.className.indexOf("hidden") != -1) {
                    return;
                }
                this.canvas.width = this.canvas.parentElement.clientWidth;
                this.canvas.height = this.canvas.parentElement.clientHeight;
                this.metaballs.update(this.canvas.width / 2, this.canvas.height / 2);
                this.metaballs.draw(this.ctx, this.canvas);
                var self = this;
                window.requestAnimationFrame(function () {
                    self.run();
                });
            };
            Landing.prototype.hide = function () {
                if (Inknote.Managers.MachineManager.Instance.machineType != 0 /* Desktop */) {
                    this.canvas.parentElement.className += " hidden";
                }
                this.ended = true;
                if (Inknote.Managers.MachineManager.Instance.machineType == 0 /* Desktop */) {
                    this.metaballs.end();
                    this.canvas.parentElement.className += " faded";
                }
            };
            return Landing;
        })();
        _Landing.Landing = Landing;
    })(Landing = Inknote.Landing || (Inknote.Landing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var DropCanvas;
    (function (DropCanvas) {
        DropCanvas.GRAVITY = 0.4;
    })(DropCanvas = Inknote.DropCanvas || (Inknote.DropCanvas = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var DropCanvas;
    (function (DropCanvas) {
        var DropFile = (function () {
            function DropFile(x, y) {
                this.x = x;
                this.y = y;
                this.tilt = Math.random() * 2 * Math.PI;
                this.velocity = 0;
                this.acceleration = DropCanvas.GRAVITY;
                this.removeThis = false;
            }
            DropFile.prototype.draw = function (ctx) {
                var self = this;
                ctx.translate(self.x, self.y);
                ctx.rotate(self.tilt);
                ctx.translate(-self.x, -self.y);
                var grd = ctx.createLinearGradient(self.x - 50, self.y - 50, self.x + 50, self.y + 50);
                var fold = 20;
                grd.addColorStop(0, Inknote.Drawing.Colours.tan);
                grd.addColorStop(1, Inknote.Drawing.Colours.peach);
                ctx.fillStyle = grd;
                ctx.beginPath();
                ctx.moveTo(self.x - 50, self.y + 50);
                ctx.lineTo(self.x + 50, self.y + 50);
                ctx.lineTo(self.x + 50, self.y - 50);
                ctx.lineTo(self.x - fold, self.y - 50);
                ctx.lineTo(self.x - 50, self.y - fold);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(self.x - (fold + 4), self.y - 45);
                ctx.lineTo(self.x - 45, self.y - 45);
                ctx.lineTo(self.x - 45, self.y - (fold + 4));
                ctx.strokeStyle = Inknote.Drawing.Colours.black;
                ctx.fillStyle = Inknote.Drawing.Colours.white;
                ctx.fill();
                ctx.stroke();
                ctx.translate(self.x, self.y);
                ctx.rotate(-self.tilt);
                ctx.translate(-self.x, -self.y);
            };
            DropFile.prototype.getClosestSpring = function (springs) {
                var closestSpring = null;
                var dist = Infinity;
                for (var i = 0; i < springs.length; i++) {
                    var tempDist = Math.abs(springs[i].x - this.x);
                    if (tempDist < dist) {
                        closestSpring = springs[i];
                        dist = tempDist;
                    }
                }
                return closestSpring;
            };
            DropFile.prototype.update = function (springTop) {
                var willSplash = false;
                this.y += this.velocity;
                this.velocity += this.acceleration;
                this.tilt += 0.01;
                if (springTop < this.y) {
                    willSplash = true;
                }
                if (this.removeThis) {
                    willSplash = false;
                }
                if (willSplash) {
                    this.removeThis = true;
                }
                return willSplash;
            };
            return DropFile;
        })();
        DropCanvas.DropFile = DropFile;
        var Splash = (function () {
            function Splash(index, strength) {
                this.index = index;
                this.strength = strength;
            }
            return Splash;
        })();
        DropCanvas.Splash = Splash;
        function updateFiles(files, springs, springTop) {
            var splashes = [];
            for (var i = 0; i < files.length; i++) {
                var willSplash = files[i].update(springTop);
                if (willSplash) {
                    var spring = files[i].getClosestSpring(springs);
                    splashes.push(new Splash(spring.index, 5 * files[i].velocity));
                }
            }
            return splashes;
        }
        DropCanvas.updateFiles = updateFiles;
        function drawFiles(files, ctx) {
            for (var i = 0; i < files.length; i++) {
                files[i].draw(ctx);
            }
        }
        DropCanvas.drawFiles = drawFiles;
    })(DropCanvas = Inknote.DropCanvas || (Inknote.DropCanvas = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var DropCanvas;
    (function (DropCanvas) {
        var Spring = (function () {
            function Spring(x, baseY, bottomY, index) {
                this.x = x;
                this.baseY = baseY;
                this.bottomY = bottomY;
                this.index = index;
                this.y = 20 * Math.random() - 10;
                this.tension = 0.01;
                this.dampeningFactor = 0.0001;
                this.velocity = 1 * Math.random() - 0.5;
            }
            Object.defineProperty(Spring.prototype, "acceleration", {
                get: function () {
                    return -this.y * this.tension - this.velocity * this.dampeningFactor;
                },
                enumerable: true,
                configurable: true
            });
            Spring.prototype.update = function () {
                this.y += this.velocity;
                this.velocity += this.acceleration;
            };
            return Spring;
        })();
        DropCanvas.Spring = Spring;
        function updateSprings(springs) {
            for (var i = 0; i < springs.length; i++) {
                springs[i].update();
            }
            var leftDeltas = [];
            var rightDeltas = [];
            var Spread = 0.1;
            for (var i = 0; i < springs.length; i++) {
                if (i > 0) {
                    leftDeltas[i] = Spread * (springs[i].y - springs[i - 1].y);
                    springs[i - 1].velocity += leftDeltas[i];
                }
                if (i < springs.length - 1) {
                    rightDeltas[i] = Spread * (springs[i].y - springs[i + 1].y);
                    springs[i + 1].velocity += rightDeltas[i];
                }
            }
            for (var i = 0; i < springs.length; i++) {
                if (i > 0) {
                    springs[i - 1].y += leftDeltas[i];
                }
                if (i < springs.length - 1) {
                    springs[i + 1].y += rightDeltas[i];
                }
            }
        }
        DropCanvas.updateSprings = updateSprings;
    })(DropCanvas = Inknote.DropCanvas || (Inknote.DropCanvas = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var DropCanvas;
    (function (DropCanvas) {
        var Droplet = (function () {
            function Droplet(pos, vel, r) {
                this.r = r;
                this.position = pos;
                this.velocity = vel;
            }
            Object.defineProperty(Droplet.prototype, "orientation", {
                get: function () {
                    return Math.atan2(this.velocity.y, this.velocity.x);
                },
                enumerable: true,
                configurable: true
            });
            Droplet.prototype.update = function () {
                this.position.y += this.velocity.y;
                this.position.x += this.velocity.x;
                this.velocity.y += DropCanvas.GRAVITY;
            };
            Droplet.prototype.draw = function (ctx) {
                ctx.beginPath();
                var r = this.r;
                var x = this.position.x;
                var y = this.position.y;
                var theta = this.orientation;
                var tail = Math.min(this.velocity.abs / 2, 4 * r);
                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.arc(x, y, r, theta - Math.PI / 2, theta + Math.PI / 2);
                ctx.lineTo(x + 3 * tail * Math.cos(theta + Math.PI), y + 3 * tail * Math.sin(theta + Math.PI));
                ctx.fill();
            };
            return Droplet;
        })();
        DropCanvas.Droplet = Droplet;
    })(DropCanvas = Inknote.DropCanvas || (Inknote.DropCanvas = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var DropCanvas;
    (function (_DropCanvas) {
        var DropCanvas = (function () {
            function DropCanvas() {
                this.maxSplashTime = 200;
                this.running = false;
                this.dropped = false;
                this.splashed = false;
                this.splashCounter = 0;
                this.finished = false;
                this.segmentSize = 15;
                this.springs = [];
                this.files = [];
                this.droplets = [];
                this.splashTime = 0;
            }
            Object.defineProperty(DropCanvas, "Instance", {
                get: function () {
                    if (!DropCanvas._instance) {
                        DropCanvas._instance = new DropCanvas();
                    }
                    return DropCanvas._instance;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DropCanvas.prototype, "canvas", {
                get: function () {
                    if (!this._canvas) {
                        this._canvas = document.getElementById("drag-drop-canvas");
                    }
                    return this._canvas;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DropCanvas.prototype, "ctx", {
                get: function () {
                    if (!this._ctx) {
                        this._ctx = this.canvas.getContext("2d");
                    }
                    return this._ctx;
                },
                enumerable: true,
                configurable: true
            });
            DropCanvas.prototype.start = function () {
                if (this.running == true) {
                    return;
                }
                this.running = true;
                this.dropped = false;
                this.splashed = false;
                this.splashCounter = 0;
                this.finished = false;
                if (Inknote.Landing.Landing.Instance.ended === false) {
                    Inknote.Landing.Landing.Instance.hide();
                }
                FrontEnd.showElement(document.getElementById("drag-drop"));
                this.canvas.width = this.canvas.parentElement.clientWidth;
                this.canvas.height = this.canvas.parentElement.clientHeight;
                var segments = Math.floor(this.canvas.width / this.segmentSize);
                this.springs = [];
                this.files = [];
                this.droplets = [];
                this.springBaseSize = this.canvas.height / 6;
                for (var i = 0; i <= segments + 1; i++) {
                    this.springs.push(new _DropCanvas.Spring(i * this.segmentSize, this.springBaseSize, this.canvas.height, i));
                }
                var self = this;
                this.draw(self);
            };
            DropCanvas.prototype.draw = function (self) {
                if (self.running == false) {
                    FrontEnd.hideElement(document.getElementById("drag-drop"));
                    return;
                }
                self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
                var splashes = _DropCanvas.updateFiles(self.files, self.springs, self.canvas.height - self.springBaseSize);
                for (var i = 0; i < splashes.length; i++) {
                    self.splash(splashes[i].index, splashes[i].strength);
                }
                var newFiles = [];
                for (var i = 0; i < self.files.length; i++) {
                    if (self.files[i].y < self.canvas.height) {
                        newFiles.push(self.files[i]);
                    }
                    else {
                        self.splashed = true;
                    }
                }
                if (self.splashed == true) {
                    self.splashCounter++;
                    if (self.splashCounter > self.maxSplashTime) {
                        self.finished = true;
                        self.stop();
                    }
                }
                self.files = newFiles;
                _DropCanvas.drawFiles(self.files, self.ctx);
                var newDroplets = [];
                for (var i = 0; i < self.droplets.length; i++) {
                    self.droplets[i].update();
                    self.droplets[i].draw(self.ctx);
                    if (self.droplets[i].position.y < self.canvas.height) {
                        newDroplets.push(self.droplets[i]);
                    }
                }
                self.droplets = newDroplets;
                if (self.splashTime == 0) {
                    self.splash(Math.floor(Math.random() * self.springs.length), 2 * Math.random());
                }
                self.splashTime = (self.splashTime + 1) % 4;
                self.ctx.beginPath();
                self.ctx.moveTo(0, self.canvas.height);
                _DropCanvas.updateSprings(self.springs);
                for (var i = 0; i < self.springs.length; i++) {
                    self.ctx.lineTo(self.springs[i].x, self.springs[i].bottomY - self.springs[i].baseY - self.springs[i].y);
                }
                self.ctx.lineTo(self.canvas.width, self.canvas.height);
                self.ctx.lineTo(0, self.canvas.height);
                self.ctx.fillStyle = Inknote.Drawing.Colours.black;
                self.ctx.strokeStyle = Inknote.Drawing.Colours.black;
                self.ctx.fill();
                self.ctx.stroke();
                if (self.running == true) {
                    window.requestAnimationFrame(function () {
                        self.draw(self);
                    });
                }
                else {
                    FrontEnd.hideElement(document.getElementById("drag-drop"));
                }
            };
            DropCanvas.prototype.drop = function (x, y) {
                this.dropped = true;
                this.files.push(new _DropCanvas.DropFile(x, y));
            };
            DropCanvas.prototype.stop = function () {
                if (this.dropped && !this.finished) {
                    return;
                }
                this.running = false;
                FrontEnd.hideElement(document.getElementById("drag-drop"));
            };
            DropCanvas.prototype.splash = function (index, speed) {
                if (index >= 0 && index < this.springs.length) {
                    this.springs[index].velocity = -speed;
                }
                if (speed > 10) {
                    for (var i = 0; i < Math.floor(speed / 2); i++) {
                        var pos = new Inknote.Maths.Vector2(index * this.segmentSize, this.canvas.height);
                        var vel = new Inknote.Maths.Vector2(10 * Math.random() - 5, -speed * Math.random() / 4);
                        var droplet = new _DropCanvas.Droplet(pos, vel, 5 * Math.random());
                        this.droplets.push(droplet);
                    }
                }
            };
            return DropCanvas;
        })();
        _DropCanvas.DropCanvas = DropCanvas;
    })(DropCanvas = Inknote.DropCanvas || (Inknote.DropCanvas = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var NoteControlBackground = (function () {
            function NoteControlBackground() {
                this.ID = Inknote.getID();
                this.x = 0;
                this.y = 500;
                this.width = 500;
                this.height = 100;
                this.order = 199;
            }
            NoteControlBackground.prototype.isOver = function () {
                return false;
            };
            NoteControlBackground.prototype.draw = function (ctx, canvas) {
                ctx.globalAlpha = 0.5;
                ctx.beginPath();
                ctx.fillStyle = Drawing.Colours.black;
                ctx.strokeStyle = Drawing.Colours.black;
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.fill();
                ctx.stroke();
                ctx.globalAlpha = 1;
                return true;
            };
            return NoteControlBackground;
        })();
        Drawing.NoteControlBackground = NoteControlBackground;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        (function (PianoKeyColour) {
            PianoKeyColour[PianoKeyColour["WHITE"] = 0] = "WHITE";
            PianoKeyColour[PianoKeyColour["BLACK"] = 1] = "BLACK";
            PianoKeyColour[PianoKeyColour["UNASSIGNED"] = 2] = "UNASSIGNED";
        })(Drawing.PianoKeyColour || (Drawing.PianoKeyColour = {}));
        var PianoKeyColour = Drawing.PianoKeyColour;
        function getKeyboardKeyFromNoteValue(val) {
            var key = "";
            switch (val) {
                case 0 /* A */:
                    key = "h";
                    break;
                case 1 /* Bb */:
                    key = "u";
                    break;
                case 2 /* B */:
                    key = "j";
                    break;
                case 3 /* C */:
                    key = "a";
                    break;
                case 4 /* Db */:
                    key = "w";
                    break;
                case 5 /* D */:
                    key = "s";
                    break;
                case 6 /* Eb */:
                    key = "e";
                    break;
                case 7 /* E */:
                    key = "d";
                    break;
                case 8 /* F */:
                    key = "f";
                    break;
                case 9 /* Gb */:
                    key = "t";
                    break;
                case 10 /* G */:
                    key = "g";
                    break;
                case 11 /* Ab */:
                    key = "y";
                    break;
            }
            return key.toUpperCase();
        }
        var PianoKey = (function () {
            function PianoKey(x, y, width, height, noteValue) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                this.noteValue = noteValue;
                this.colour = 2 /* UNASSIGNED */;
                this.hover = false;
            }
            PianoKey.prototype.isOver = function (x, y) {
                var isRight = x > this.x;
                var isLeft = x < this.x + this.width;
                var isBelow = y > this.y;
                var isAbove = y < this.y + this.height;
                return isRight && isLeft && isBelow && isAbove;
            };
            PianoKey.prototype.draw = function (ctx) {
                ctx.beginPath();
                ctx.fillStyle = Drawing.Colours.white;
                ctx.strokeStyle = Drawing.Colours.black;
                if (this.colour == 1 /* BLACK */) {
                    ctx.fillStyle = Drawing.Colours.black;
                }
                if (this.hover == true) {
                    ctx.fillStyle = Drawing.Colours.orange;
                }
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.fill();
                ctx.stroke();
                // key text
                if (Inknote.Managers.MachineManager.Instance.machineType == 0 /* Desktop */) {
                    ctx.beginPath();
                    var text = getKeyboardKeyFromNoteValue(this.noteValue);
                    ctx.textAlign = "center";
                    ctx.font = (Math.min((this.width * 12 / 20), this.height / 4)) + "px Arial";
                    if (this.colour == 0 /* WHITE */) {
                        ctx.fillStyle = Drawing.Colours.black;
                    }
                    else {
                        ctx.fillStyle = Drawing.Colours.white;
                    }
                    ctx.fillText(text, this.x + this.width / 2, this.y + this.height - 2);
                }
            };
            return PianoKey;
        })();
        Drawing.PianoKey = PianoKey;
        var WhiteKey = (function (_super) {
            __extends(WhiteKey, _super);
            function WhiteKey() {
                _super.apply(this, arguments);
                this.colour = 0 /* WHITE */;
            }
            return WhiteKey;
        })(PianoKey);
        Drawing.WhiteKey = WhiteKey;
        var BlackKey = (function (_super) {
            __extends(BlackKey, _super);
            function BlackKey() {
                _super.apply(this, arguments);
                this.colour = 1 /* BLACK */;
            }
            return BlackKey;
        })(PianoKey);
        Drawing.BlackKey = BlackKey;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var Piano = (function () {
            function Piano() {
                this.ID = Inknote.getID();
                this.x = 0;
                this.y = 500;
                this.width = 500;
                this.height = 100;
                this.order = 200;
                this.leftHover = false;
                this.rightHover = false;
                this.octave = 4;
                this.blackKeys = [];
                this.whiteKeys = [];
            }
            Object.defineProperty(Piano.prototype, "allKeys", {
                get: function () {
                    return this.whiteKeys.concat(this.blackKeys);
                },
                enumerable: true,
                configurable: true
            });
            Piano.prototype.isOver = function (x, y) {
                var result = y > this.y && y < this.y + this.height && x < this.x + this.width;
                this.leftHover = false;
                this.rightHover = false;
                if (result) {
                    if (x < this.width / 9) {
                        this.leftHover = true;
                    }
                    else if (x > this.width * 8 / 9) {
                        this.rightHover = true;
                    }
                    var isBlack = false;
                    for (var i = 0; i < this.blackKeys.length; i++) {
                        if (this.blackKeys[i].isOver(x, y)) {
                            this.blackKeys[i].hover = true;
                            isBlack = true;
                        }
                        else {
                            this.blackKeys[i].hover = false;
                        }
                    }
                    for (var i = 0; i < this.whiteKeys.length; i++) {
                        if (isBlack === false && this.whiteKeys[i].isOver(x, y)) {
                            this.whiteKeys[i].hover = true;
                        }
                        else {
                            this.whiteKeys[i].hover = false;
                        }
                    }
                }
                else {
                    for (var i = 0; i < this.allKeys.length; i++) {
                        this.allKeys[i].hover = false;
                    }
                }
                return result;
            };
            Piano.prototype.draw = function (ctx, canvas) {
                ctx.globalAlpha = 0.5;
                ctx.beginPath();
                ctx.fillStyle = Drawing.Colours.white;
                ctx.strokeStyle = Drawing.Colours.black;
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.fill();
                ctx.stroke();
                ctx.textBaseline = "base";
                var noteVal = 2;
                var whiteKeyNum = 0;
                var blackKeyNum = 0;
                for (var i = 1; i < 9; i++) {
                    ctx.beginPath();
                    ctx.strokeStyle = Drawing.Colours.black;
                    if (i == 1 && this.leftHover) {
                        ctx.beginPath();
                        ctx.fillStyle = Drawing.Colours.orange;
                        ctx.rect(0, this.y, this.width / 9, this.height);
                        ctx.fill();
                    }
                    else if (i == 8 && this.rightHover) {
                        ctx.beginPath();
                        ctx.fillStyle = Drawing.Colours.orange;
                        ctx.rect(this.width * 8 / 9, this.y, this.width / 9, this.height);
                        ctx.fill();
                    }
                    if (i != 8) {
                        noteVal = (noteVal + 1) % 12;
                        if (this.whiteKeys[whiteKeyNum] == null) {
                            this.whiteKeys.push(new Drawing.WhiteKey(this.width * i / 9, this.y, this.width / 9, this.height, noteVal));
                        }
                        this.whiteKeys[whiteKeyNum].x = this.width * i / 9;
                        this.whiteKeys[whiteKeyNum].y = this.y;
                        this.whiteKeys[whiteKeyNum].width = this.width / 9;
                        this.whiteKeys[whiteKeyNum].height = this.height;
                        whiteKeyNum++;
                    }
                    if (i == 1 || i == 2 || i == 4 || i == 5 || i == 6) {
                        noteVal = (noteVal + 1) % 12;
                        if (this.blackKeys[blackKeyNum] == null) {
                            this.blackKeys.push(new Drawing.BlackKey(this.width * (i + 1) / 9 - this.width / 24, this.y, this.width / 12, this.height / 2, noteVal));
                        }
                        this.blackKeys[blackKeyNum].x = this.width * (i + 1) / 9 - this.width / 24;
                        this.blackKeys[blackKeyNum].y = this.y;
                        this.blackKeys[blackKeyNum].width = this.width / 12;
                        this.blackKeys[blackKeyNum].height = this.height / 2;
                        blackKeyNum++;
                    }
                }
                for (var i = 0; i < this.whiteKeys.length; i++) {
                    this.whiteKeys[i].draw(ctx);
                }
                for (var i = 0; i < this.blackKeys.length; i++) {
                    ctx.globalAlpha = 1;
                    this.blackKeys[i].draw(ctx);
                    ctx.globalAlpha = 0.5;
                }
                ctx.strokeStyle = Drawing.Colours.black;
                // left arrow
                ctx.beginPath();
                ctx.moveTo(this.width / 15, this.y + this.height * 3 / 4);
                ctx.lineTo(this.width / 20, this.y + this.height / 2);
                ctx.lineTo(this.width / 15, this.y + this.height / 4);
                ctx.stroke();
                // right arrow
                ctx.beginPath();
                ctx.moveTo(this.width - this.width / 15, this.y + this.height * 3 / 4);
                ctx.lineTo(this.width - this.width / 20, this.y + this.height / 2);
                ctx.lineTo(this.width - this.width / 15, this.y + this.height / 4);
                ctx.stroke();
                // text
                ctx.beginPath();
                ctx.textAlign = "center";
                ctx.fillStyle = Drawing.Colours.black;
                ctx.font = (Math.min((this.width / 20), this.height / 4)) + "px Arial";
                ctx.fillText("C" + this.octave, this.width * 1 / 6, this.y + this.height * 3 / 4);
                ctx.globalAlpha = 1;
                return true;
            };
            Piano.prototype.click = function (e) {
                if (e.clientX < this.width / 9) {
                    this.octave--;
                }
                else if (e.clientX > this.width * 8 / 9) {
                    this.octave++;
                }
                else {
                    for (var i = 0; i < this.allKeys.length; i++) {
                        if (this.allKeys[i].hover == true) {
                            if (Inknote.ScoringService.Instance.selectID == null) {
                                Inknote.NoteControlService.Instance.addNote(new Inknote.Model.Note(this.allKeys[i].noteValue, this.octave, Inknote.NoteControlService.Instance.lengthControl.selectedLength));
                            }
                            else {
                                Inknote.NoteControlService.Instance.editNoteValueAndOctave(this.allKeys[i].noteValue, this.octave);
                            }
                        }
                    }
                }
            };
            return Piano;
        })();
        Drawing.Piano = Piano;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var LengthControlBar = (function () {
            function LengthControlBar() {
                this.ID = Inknote.getID();
                this.x = 0;
                this.y = 500;
                this.width = 500;
                this.height = 100;
                this.order = 200;
                this.attached = [];
                this.selectedLength = 3;
                this.attached.push(new Drawing.Breve(true));
                this.attached.push(new Drawing.SemiBreve(true));
                this.attached.push(new Drawing.Minim(true));
                this.attached.push(new Drawing.Crotchet(true));
                this.attached.push(new Drawing.Quaver(true));
                this.attached.push(new Drawing.SemiQuaver(true));
                this.attached.push(new Drawing.DemiSemiQuaver(true));
                this.attached.push(new Drawing.HemiDemiSemiQuaver(true));
            }
            LengthControlBar.prototype.isOver = function (x, y) {
                var result = y > this.y && y < this.y + this.height && x < this.x + this.width;
                return result;
            };
            LengthControlBar.prototype.click = function (e) {
                var x = e.clientX;
                var oneEighth = this.width / 8;
                for (var i = 0; i < 8; i++) {
                    if (x > i * oneEighth && x < (i + 1) * oneEighth) {
                        this.selectedLength = i;
                    }
                }
                var selectedItem = Inknote.ScoringService.Instance.SelectedItem;
                if (selectedItem != null) {
                    if (selectedItem instanceof Drawing.Note || selectedItem instanceof Drawing.Rest) {
                        Inknote.NoteControlService.Instance.editNoteLength();
                    }
                }
            };
            LengthControlBar.prototype.draw = function (ctx, canvas) {
                ctx.globalAlpha = 0.5;
                ctx.beginPath();
                ctx.fillStyle = Drawing.Colours.white;
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.fill();
                var totalWidth = this.width;
                var oneEighth = totalWidth / 8;
                for (var i = 0; i < 8; i++) {
                    ctx.beginPath();
                    ctx.fillStyle = Drawing.Colours.white;
                    if (this.selectedLength == i) {
                        ctx.fillStyle = Drawing.Colours.orange;
                    }
                    ctx.strokeStyle = Drawing.Colours.black;
                    ctx.rect(i * oneEighth, this.y, oneEighth, this.height);
                    ctx.fill();
                    ctx.stroke();
                    this.attached[i].y = this.y + this.height * 3 / 4;
                    this.attached[i].x = i * oneEighth + oneEighth / 2;
                    this.attached[i].draw(ctx, canvas);
                }
                ctx.globalAlpha = 1;
                return true;
            };
            return LengthControlBar;
        })();
        Drawing.LengthControlBar = LengthControlBar;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var RestControl = (function () {
            function RestControl() {
                this.x = 0;
                this.y = 500;
                this.width = 500;
                this.height = 100;
                this.order = 200;
                this.attached = [];
                this.ID = "note_control";
                this.selectedLength = 3;
            }
            RestControl.prototype.isOver = function (x, y) {
                var result = y > this.y && y < this.y + this.height && x < this.x + this.width && x > this.x;
                this.hover = result;
                return result;
            };
            RestControl.prototype.click = function (e) {
                var x = e.clientX;
                Inknote.NoteControlService.Instance.addRest();
            };
            RestControl.prototype.draw = function (ctx, canvas) {
                ctx.globalAlpha = 0.5;
                ctx.beginPath();
                ctx.fillStyle = Drawing.Colours.white;
                if (this.hover) {
                    ctx.fillStyle = Drawing.Colours.orange;
                }
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.fill();
                var modelRest = new Inknote.Model.Rest(Inknote.NoteControlService.Instance.lengthControl.selectedLength);
                var rest = Inknote.getDrawingItemFromRest(modelRest);
                rest.y = this.y + this.height / 2;
                rest.x = this.x + this.width / 2;
                rest.draw(ctx);
                return true;
            };
            return RestControl;
        })();
        Drawing.RestControl = RestControl;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var DeleteNoteControl = (function () {
            function DeleteNoteControl() {
                this.x = 0;
                this.y = 500;
                this.width = 500;
                this.height = 100;
                this.order = 200;
                this.attached = [];
                this.ID = "note_control";
                this.selectedLength = 3;
            }
            DeleteNoteControl.prototype.isOver = function (x, y) {
                var result = y > this.y && y < this.y + this.height && x < this.x + this.width && x > this.x;
                this.hover = result;
                return result;
            };
            DeleteNoteControl.prototype.click = function (e) {
                Inknote.NoteControlService.Instance.deleteSelected();
            };
            DeleteNoteControl.prototype.draw = function (ctx, canvas) {
                ctx.globalAlpha = 0.5;
                ctx.beginPath();
                ctx.fillStyle = Drawing.Colours.white;
                if (this.hover) {
                    ctx.globalAlpha = 0.7;
                }
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.fill();
                ctx.beginPath();
                var lineLength = 10;
                ctx.lineWidth = 4;
                if (this.hover) {
                    ctx.lineWidth = 6;
                    lineLength = 12;
                }
                ctx.globalAlpha = 255;
                ctx.strokeStyle = Drawing.Colours.brightRed;
                ctx.moveTo(this.x + this.width / 2 - lineLength, this.y + this.height / 2 - lineLength);
                ctx.lineTo(this.x + this.width / 2 + lineLength, this.y + this.height / 2 + lineLength);
                ctx.moveTo(this.x + this.width / 2 - lineLength, this.y + this.height / 2 + lineLength);
                ctx.lineTo(this.x + this.width / 2 + lineLength, this.y + this.height / 2 - lineLength);
                ctx.stroke();
                ctx.lineWidth = 1;
                return true;
            };
            return DeleteNoteControl;
        })();
        Drawing.DeleteNoteControl = DeleteNoteControl;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var Minimise = (function () {
            function Minimise() {
                this.ID = Inknote.getID();
                this.x = 0;
                this.y = 0;
                this.width = 0;
                this.height = 0;
                this.order = 200;
            }
            Minimise.prototype.isOver = function (x, y) {
                var isLeft = x < this.x + this.width;
                var isRight = x > this.x;
                var isAbove = y < this.y + this.height;
                var isBelow = y > this.y;
                var result = isLeft && isRight && isAbove && isBelow;
                this.hover = result;
                return result;
            };
            Minimise.prototype.click = function (e) {
                if (Inknote.NoteControlService.Instance.hidden) {
                    Inknote.NoteControlService.Instance.show();
                }
                else {
                    Inknote.NoteControlService.Instance.hide();
                }
            };
            Minimise.prototype.draw = function (ctx, canvas) {
                ctx.beginPath();
                ctx.fillStyle = Drawing.Colours.black;
                if (this.hover) {
                    ctx.fillStyle = Drawing.Colours.orange;
                }
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.fill();
                // text
                ctx.beginPath();
                ctx.fillStyle = Drawing.Colours.white;
                ctx.textAlign = "center";
                ctx.font = Drawing.Fonts.standard;
                ctx.textBaseline = "middle";
                if (Inknote.NoteControlService.Instance.hidden) {
                    ctx.fillText("+", this.x + this.width / 2, this.y + this.height / 2);
                }
                else {
                    ctx.fillText("-", this.x + this.width / 2, this.y + this.height / 2);
                }
                ctx.textBaseline = "bottom";
                return true;
            };
            return Minimise;
        })();
        Drawing.Minimise = Minimise;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Storage;
    (function (Storage) {
        var defaults = {
            settings: "settings",
            projects: "projects",
            plugins: "plugins"
        };
        function getLocal(key) {
            if (typeof localStorage == "undefined") {
                Inknote.log("Local storage is undefined", 0 /* Error */);
                return null;
            }
            return JSON.parse(localStorage.getItem("inknote-" + key));
        }
        function saveLocal(key, item) {
            if (Inknote.Managers.SettingsManager.Current.testMode) {
                return;
            }
            if (!localStorage) {
                Inknote.log("Local storage is undefined", 0 /* Error */);
                return null;
            }
            localStorage.setItem("inknote-" + key, JSON.stringify(item));
        }
        function getSettings() {
            if (Inknote.Managers.SettingsManager.Current.testMode) {
                return [];
            }
            var result = getLocal(defaults.settings);
            if (result instanceof Array === true && Inknote.allItemsAre(result, function (item) {
                return item instanceof Inknote.Setting;
            })) {
                return result;
            }
            Inknote.log("localStorage settings are not saved in the correct format", 2 /* Warning */);
            return [];
        }
        Storage.getSettings = getSettings;
        function getProjects() {
            if (Inknote.Managers.SettingsManager.Current.testMode) {
                return [Inknote.Testing.$TEST$_compressedProject];
            }
            var result = getLocal(defaults.projects);
            if (result instanceof Array === true && Inknote.allItemsAre(result, function (item) {
                return !!item.ID && !!item.name;
            })) {
                return result;
            }
            Inknote.log("localStorage projects are not saved in the correct format");
            return [];
        }
        Storage.getProjects = getProjects;
        function saveProjects(projects) {
            saveLocal(defaults.projects, projects);
            // ensure is there to deal with dependency
            if (Inknote.Managers.PluginManager) {
                var plugins = Inknote.getItemsWhere(Inknote.Managers.PluginManager.Instance.plugins, function (item) {
                    return item.active && item.allowOnSave && item.onSave != null;
                });
                for (var i = 0; i < plugins.length; i++) {
                    plugins[i].onSave();
                }
            }
        }
        Storage.saveProjects = saveProjects;
        function savePlugins() {
            saveLocal(defaults.plugins, Inknote.Managers.PluginManager.Instance.getCompressedPlugins());
            Inknote.log("saved plugins");
        }
        Storage.savePlugins = savePlugins;
        function getPlugins() {
            var result = getLocal(defaults.plugins);
            if (result == null || result == undefined) {
                return [];
            }
            return result;
        }
        Storage.getPlugins = getPlugins;
    })(Storage = Inknote.Storage || (Inknote.Storage = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Storage;
    (function (Storage) {
        if (typeof document != "undefined") {
            document.body.ondrag = function (e) {
                //e.preventDefault();
                return false;
            };
            document.body.ondrop = function (e) {
                e.preventDefault();
                Inknote.DropCanvas.DropCanvas.Instance.drop(e.clientX, e.clientY);
                var files = e.dataTransfer.files;
                var blah = e.dataTransfer.getData("utf8");
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        console.log(e.target);
                        Inknote.log("loaded");
                        var thisFile = file;
                        var fileText = e.target.result;
                        if (thisFile.name.indexOf(".score") == -1) {
                            Inknote.log("incorrect file type", 0 /* Error */);
                            Inknote.check("'" + file.name + "' is of an incorrect fileType. Only .score files are accepted", null);
                        }
                        else {
                            try {
                                var innerScore = JSON.parse(fileText);
                                var decompressedInnerScore = Inknote.ProjectConverter.decompress(innerScore);
                                Inknote.Managers.ProjectManager.Instance.addProject(decompressedInnerScore, function (item) {
                                    Inknote.Managers.ProjectManager.Instance.setCurrentProject(item.ID);
                                });
                            }
                            catch (e) {
                                Inknote.log("incorrect file format", 0 /* Error */);
                            }
                        }
                    };
                    reader.readAsText(file);
                }
                return false;
            };
            document.body.ondragend = function (e) {
                e.preventDefault();
                Inknote.DropCanvas.DropCanvas.Instance.drop(e.clientX, e.clientY);
                return false;
            };
            var inCorrectFiles = false;
            document.body.ondragstart = function (e) {
                e.preventDefault();
                return false;
            };
            document.body.ondragenter = function (e) {
                e.preventDefault();
                return false;
            };
            document.body.ondragover = function (e) {
                e.preventDefault();
                Inknote.DropCanvas.DropCanvas.Instance.start();
                return false;
            };
            document.getElementById("drag-drop-canvas").ondragleave = function (e) {
                e.preventDefault();
                Inknote.DropCanvas.DropCanvas.Instance.stop();
                return false;
            };
        }
        function download(filename, text) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
        Storage.download = download;
    })(Storage = Inknote.Storage || (Inknote.Storage = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    Inknote.CONFIRM_IS_OPEN = false;
    function check(text, onTrue, onFalse) {
        Inknote.CONFIRM_IS_OPEN = true;
        var confirmCover = document.getElementById("confirm-cover");
        FrontEnd.showElement(confirmCover);
        var confirmBox = document.getElementById("confirm-box");
        FrontEnd.showElement(confirmBox);
        var textDiv = document.getElementById("confirm-text");
        textDiv.innerText = text;
        var ok = document.getElementById("confirm-ok");
        var listener = function () {
            FrontEnd.hideElement(confirmBox);
            FrontEnd.hideElement(confirmCover);
            onTrue();
            setTimeout(function () {
                Inknote.CONFIRM_IS_OPEN = false;
            }, 300);
        };
        ok.onclick = listener;
        ok.onmouseup = function () {
            ok.removeEventListener("click", listener);
        };
        ok.focus();
        var cancel = document.getElementById("confirm-cancel");
        var cancelBlurListener = function (e) {
            e.preventDefault();
            ok.focus();
        };
        cancel.onblur = cancelBlurListener;
        var cancelListener = function () {
            FrontEnd.hideElement(confirmBox);
            FrontEnd.hideElement(confirmCover);
            if (onFalse) {
                onFalse();
            }
            setTimeout(function () {
                Inknote.CONFIRM_IS_OPEN = false;
            }, 300);
        };
        cancel.onclick = cancelListener;
        cancel.onmouseup = function () {
            cancel.removeEventListener("click", cancelListener);
            cancel.removeEventListener("blur", cancelBlurListener);
        };
        //if (confirm(text)) {
        //    onTrue();
        //    return;
        //}
        //onFalse();
    }
    Inknote.check = check;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    (function (MessageType) {
        MessageType[MessageType["Error"] = 0] = "Error";
        MessageType[MessageType["Text"] = 1] = "Text";
        MessageType[MessageType["Warning"] = 2] = "Warning";
    })(Inknote.MessageType || (Inknote.MessageType = {}));
    var MessageType = Inknote.MessageType;
    function log(message, msgType) {
        if (msgType == 0 /* Error */) {
            console.log("%c" + message, "color:red");
        }
        else if (msgType == 2 /* Warning */) {
            console.log("%c" + message, "color: orange");
        }
        else {
            console.log(message);
        }
    }
    Inknote.log = log;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    function getIndexFromID(items, ID) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].ID == ID) {
                return i;
            }
        }
        return null;
    }
    Inknote.getIndexFromID = getIndexFromID;
    function getItemFromID(items, ID) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].ID == ID) {
                return items[i];
            }
        }
        return null;
    }
    Inknote.getItemFromID = getItemFromID;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    function canScroll(up) {
        if (up && ScrollService.Instance.y - ScrollService.Instance.scrollSpeed < 0) {
            ScrollService.Instance.y = 0;
            return false;
        }
        else if (up) {
            return true;
        }
        switch (Inknote.Managers.PageManager.Current.page) {
            case 2 /* File */:
                var projects = Inknote.Managers.ProjectManager.Instance.allProjects.length;
                var canvas = { x: window.innerWidth, y: window.innerHeight - 100 };
                var maxRowNo = Math.floor(canvas.x / 200);
                var maxHeight = Math.ceil(projects / maxRowNo) * 200 + 100;
                return maxHeight > ScrollService.Instance.y + ScrollService.Instance.scrollSpeed + canvas.y;
                break;
            case 0 /* Score */:
                return ScrollService.Instance.y < Inknote.ScoringService.Instance.maxScrollPosition;
                break;
            default:
                return false;
        }
    }
    Inknote.canScroll = canScroll;
    var ScrollService = (function () {
        function ScrollService() {
            this.x = 0;
            this.y = 0;
            this.scrollSpeed = 30;
        }
        Object.defineProperty(ScrollService, "Instance", {
            get: function () {
                if (!ScrollService._instance) {
                    ScrollService._instance = new ScrollService();
                }
                return ScrollService._instance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollService, "ScrollBar", {
            get: function () {
                if (Inknote.Managers.PageManager.Current.page != ScrollService._lastPageType) {
                    ScrollService._lastPageType = Inknote.Managers.PageManager.Current.page;
                    switch (ScrollService._lastPageType) {
                        case 2 /* File */:
                            ScrollService._scrollBar = new Inknote.Drawing.ScrollBar.FileScroll();
                            break;
                        case 0 /* Score */:
                            ScrollService._scrollBar = new Inknote.Drawing.ScrollBar.ProjectScroll();
                            break;
                        case 1 /* Form */:
                        case 3 /* List */:
                        default:
                            ScrollService._scrollBar = new Inknote.Drawing.ScrollBar.ScrollBar();
                    }
                }
                return ScrollService._scrollBar;
            },
            enumerable: true,
            configurable: true
        });
        ScrollService.prototype.showScrollBar = function () {
            return false;
        };
        ScrollService.prototype.up = function () {
            if (canScroll(true)) {
                this.y = this.y - this.scrollSpeed;
            }
        };
        ScrollService.prototype.down = function () {
            if (canScroll(false)) {
                this.y = Math.max(0, this.scrollSpeed + this.y);
            }
        };
        return ScrollService;
    })();
    Inknote.ScrollService = ScrollService;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var LicenceService = (function () {
        function LicenceService() {
            this.drawing = new Inknote.Drawing.Licence();
        }
        Object.defineProperty(LicenceService, "Instance", {
            get: function () {
                if (!LicenceService._instance) {
                    LicenceService._instance = new LicenceService();
                }
                return LicenceService._instance;
            },
            enumerable: true,
            configurable: true
        });
        return LicenceService;
    })();
    Inknote.LicenceService = LicenceService;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    function sortByOrder(items) {
        items.sort(function (a, b) {
            return (a.order - b.order);
        });
        return items;
    }
    Inknote.sortByOrder = sortByOrder;
    function mouseIsOver(item, me, canvas) {
        var scroll = Inknote.ScrollService.Instance;
        //console.log("item: (" + item.x + "," + item.y + ")");
        //console.log("mouse: (" + me.clientX + "," + me.clientY + ")");
        return item.isOver(me.clientX - scroll.x, me.clientY - 50, canvas);
    }
    Inknote.mouseIsOver = mouseIsOver;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var RightClickMenuService = (function () {
        function RightClickMenuService() {
        }
        Object.defineProperty(RightClickMenuService, "Instance", {
            get: function () {
                if (!RightClickMenuService._instance) {
                    RightClickMenuService._instance = new RightClickMenuService();
                }
                return RightClickMenuService._instance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RightClickMenuService.prototype, "Menu", {
            get: function () {
                if (!this._menu) {
                    this._menu = new Inknote.Drawing.RightClickMenus.RightClickMenu();
                }
                return this._menu;
            },
            enumerable: true,
            configurable: true
        });
        RightClickMenuService.prototype.openMenu = function (x, y, canvas) {
            var newMenu = new Inknote.Drawing.RightClickMenus.RightClickMenu();
            if (Inknote.Managers.PageManager.Current.page == 2 /* File */ && Inknote.anyItemIs(Inknote.Managers.ProjectManager.Instance.allProjects, function (item) {
                return item.ID == Inknote.Managers.ProjectManager.Instance.hoverID;
            })) {
                newMenu = new Inknote.Drawing.RightClickMenus.RightClickFile(Inknote.Managers.ProjectManager.Instance.hoverID);
                Inknote.Managers.ProjectManager.Instance.selectID = Inknote.Managers.ProjectManager.Instance.hoverID;
            }
            if (Inknote.Managers.PageManager.Current.page == 0 /* Score */) {
                newMenu = new Inknote.Drawing.RightClickMenus.RightClickScore();
            }
            var tooFarRight = canvas.width > (x + newMenu.width);
            newMenu.x = tooFarRight ? x : x - newMenu.width;
            newMenu.y = canvas.height > (y + newMenu.height) ? y : y - newMenu.height;
            this._menu = newMenu;
            this.visible = true;
        };
        return RightClickMenuService;
    })();
    Inknote.RightClickMenuService = RightClickMenuService;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var DrawService = (function () {
        function DrawService(canvasID) {
            this._items = [];
            this._canvas = document.getElementById(canvasID);
            this._ctx = this._canvas.getContext("2d");
            var self = this;
            this.draw = function () {
                // if landing open, don't draw;
                if (Inknote.Landing.Landing.Instance.ended === false) {
                    requestAnimationFrame(self.draw);
                    return;
                }
                self._canvas.width = self._canvas.parentElement.clientWidth;
                self._canvas.height = self._canvas.parentElement.clientHeight - 50;
                self.arrange();
                self._items.push(Inknote.LicenceService.Instance.drawing);
                if (Inknote.Managers.MachineManager.Instance.machineType == 0 /* Desktop */ && Inknote.ScrollService.Instance.showScrollBar()) {
                    self._items.push(Inknote.ScrollService.ScrollBar);
                    if (Inknote.ScrollService.ScrollBar.scrollThumbnail.visible) {
                        self._items.push(Inknote.ScrollService.ScrollBar.scrollThumbnail);
                    }
                }
                if (Inknote.RightClickMenuService.Instance.visible == true) {
                    self._items.push(Inknote.RightClickMenuService.Instance.Menu);
                }
                Inknote.sortByOrder(self._items);
                // ensure is there to deal with dependency
                if (Inknote.Managers.PluginManager) {
                    var plugins = Inknote.getItemsWhere(Inknote.Managers.PluginManager.Instance.plugins, function (item) {
                        return item.active && item.allowBeforeDraw && item.beforeDraw != null;
                    });
                    for (var i = 0; i < plugins.length; i++) {
                        plugins[i].beforeDraw(self._ctx, self._canvas);
                    }
                }
                for (var i = 0; i < self._items.length; i++) {
                    if (self._items[i].draw(self._ctx, self._canvas) === false) {
                        Inknote.log("Drawing failed on item " + self._items[i].ID);
                        return;
                    }
                }
                // ensure is there to deal with dependency
                if (Inknote.Managers.PluginManager) {
                    var plugins = Inknote.getItemsWhere(Inknote.Managers.PluginManager.Instance.plugins, function (item) {
                        return item.active && item.allowOnDraw && item.onDraw != null;
                    });
                    for (var i = 0; i < plugins.length; i++) {
                        plugins[i].onDraw(self._ctx, self._canvas);
                    }
                }
                requestAnimationFrame(self.draw);
            };
            self.draw();
            DrawService._instance = self;
        }
        Object.defineProperty(DrawService, "Instance", {
            get: function () {
                return DrawService._instance;
            },
            enumerable: true,
            configurable: true
        });
        DrawService.prototype.setItems = function (items) {
            this._items = items;
        };
        Object.defineProperty(DrawService.prototype, "canvas", {
            get: function () {
                return this._canvas;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawService.prototype, "items", {
            get: function () {
                return this._items;
            },
            enumerable: true,
            configurable: true
        });
        DrawService.prototype.arrange = function () {
            switch (Inknote.Managers.PageManager.Current.page) {
                case 0 /* Score */:
                    this._items = Inknote.ProjectConverter.toDrawing(this);
                    break;
                case 2 /* File */:
                    this._items = Inknote.FileConverter.toDrawing(this);
                    break;
            }
            this.items.push(Inknote.Drawing.Background.Instance);
        };
        return DrawService;
    })();
    Inknote.DrawService = DrawService;
})(Inknote || (Inknote = {}));
// this file is for drawing score.
var Inknote;
(function (Inknote) {
    function getBarLength(bar) {
        var length = 20;
        for (var i = 0; i < bar.items.length; i++) {
            var item = bar.items[i];
            if (item instanceof Inknote.Model.Clef) {
                length += Inknote.requiredClefSpace(item, 10);
            }
            if (item instanceof Inknote.Model.Note) {
                length += Inknote.requiredNoteSpace(item, 10);
            }
            if (item instanceof Inknote.Model.Rest) {
                length += Inknote.requiredRestSpace(item, 10);
            }
            if (item instanceof Inknote.Model.TimeSignature) {
                length += Inknote.requiredTimeSignatureSpace(item, 10);
            }
        }
        return length;
    }
    function getMinBarLengths(instruments) {
        var barLengths = [];
        for (var i = 0; i < instruments[0].bars.length; i++) {
            var maxBarLength = 0;
            for (var j = 0; j < instruments.length; j++) {
                var barLength = getBarLength(instruments[j].bars[i]);
                maxBarLength = Math.max(maxBarLength, barLength);
            }
            barLengths.push(maxBarLength);
        }
        return barLengths;
    }
    var BarLine = (function () {
        function BarLine() {
            this.minLength = 0;
            this.barLengths = [];
            this.barIndices = [];
        }
        return BarLine;
    })();
    function splitBarsToLines(barLengths, splitLength) {
        var barLines = [];
        var tempBarLine = new BarLine();
        for (var i = 0; i < barLengths.length; i++) {
            if (tempBarLine.minLength + barLengths[i] > splitLength) {
                barLines.push(tempBarLine);
                tempBarLine = new BarLine();
            }
            tempBarLine.minLength += barLengths[i];
            tempBarLine.barIndices.push(i);
            tempBarLine.barLengths.push(barLengths[i]);
        }
        barLines.push(tempBarLine);
        return barLines;
    }
    // will store all score drawable items and update when necessary.
    var ScoringService = (function () {
        function ScoringService() {
            this._refresh = false;
            this._items = [];
            this.maxScrollPosition = 0;
            this.oldScrollY = 0;
            this.refresh();
        }
        Object.defineProperty(ScoringService, "Instance", {
            get: function () {
                if (!ScoringService._instance) {
                    ScoringService._instance = new ScoringService();
                }
                return ScoringService._instance;
            },
            enumerable: true,
            configurable: true
        });
        // use this instead of normal push.
        ScoringService.prototype.addItem = function (item) {
            this._items.push(item);
        };
        // todo: ensure
        // should refresh on:
        // change of window size -- actions -> windowResize.
        // change of project -- Done in here inside getItems().
        // change of score.
        // (but not on change of hover/select
        // -- that should be handled in individual objects).
        ScoringService.prototype.refresh = function () {
            this._refresh = true;
        };
        ScoringService.prototype.updateItems = function () {
            if (!Inknote.DrawService.Instance) {
                // depends on drawservice.
                Inknote.log("draw service not instantiated", 0 /* Error */);
                return;
            }
            // scrolling is handled in get items function.
            this.oldScrollY = 0;
            var currentProject = Inknote.Managers.ProjectManager.Instance.currentProject;
            this._projectID = currentProject.ID;
            // must clear items!
            this._items = [];
            var visibleInstruments = Inknote.getItemsWhere(currentProject.instruments, function (instrument) {
                return instrument.visible;
            });
            var barMinLengths = getMinBarLengths(visibleInstruments);
            var topLineHeight = 180;
            var marginLeft = 50;
            if (Inknote.DrawService.Instance.canvas.width < 600) {
                marginLeft = 0;
            }
            var barX = 0;
            var barIndex = 0;
            var maxWidth = Inknote.DrawService.Instance.canvas.width - 2 * marginLeft;
            var clefAdditionalPosition = 0;
            var lines = splitBarsToLines(barMinLengths, maxWidth);
            for (var i = 0; i < lines.length; i++) {
                var tempLine = lines[i];
                for (var j = 0; j < visibleInstruments.length; j++) {
                    var tempInstrument = visibleInstruments[j];
                    // add stave
                    var drawStave = new Inknote.Drawing.Stave(topLineHeight, tempInstrument.name);
                    drawStave.x = marginLeft;
                    drawStave.width = maxWidth;
                    this.addItem(drawStave);
                    for (var k = 0; k < tempLine.barIndices.length; k++) {
                        var tempBarLength = tempLine.barLengths[k];
                        var bar = tempInstrument.bars[tempLine.barIndices[k]];
                        // add bar drawing.
                        var drawBar = new Inknote.Drawing.Bar();
                        drawBar.ID = bar.ID;
                        drawBar.height = 40;
                        drawBar.y = topLineHeight;
                        drawBar.x = marginLeft + barX;
                        drawBar.width = tempBarLength;
                        this.addItem(drawBar);
                        // for getting note position.
                        var itemX = 20;
                        for (var l = 0; l < bar.items.length; l++) {
                            var item = bar.items[l];
                            if (item instanceof Inknote.Model.Clef) {
                                var drawClefItem = Inknote.Drawing.getDrawingFromClef(item);
                                drawClefItem.ID = item.ID;
                                drawClefItem.x = marginLeft + barX + itemX;
                                drawClefItem.y = topLineHeight + 5 * drawClefItem.drawPosition;
                                clefAdditionalPosition = 5 * item.positionFromTreble;
                                this.addItem(drawClefItem);
                                itemX += Inknote.requiredClefSpace(item, 10);
                            }
                            if (item instanceof Inknote.Model.TimeSignature) {
                                var timeSignatureItem = item;
                                var drawTimeSignatureItem = new Inknote.Drawing.TimeSignature(timeSignatureItem.top, timeSignatureItem.bottom);
                                drawTimeSignatureItem.ID = timeSignatureItem.ID;
                                drawTimeSignatureItem.x = marginLeft + barX + itemX;
                                drawTimeSignatureItem.y = topLineHeight + 20;
                                this.addItem(drawTimeSignatureItem);
                                itemX += Inknote.requiredTimeSignatureSpace(item, 10);
                            }
                            if (item instanceof Inknote.Model.Note) {
                                var isBlack = Inknote.Model.IsBlackKey(item.value);
                                var intervalDistance = Inknote.getIntervalDistance(new Inknote.Model.Note(8 /* F */, 5, 3 /* Crotchet */), item);
                                if (isBlack) {
                                    var drawBlack = new Inknote.Drawing.Flat();
                                    drawBlack.x = marginLeft + barX + itemX;
                                    drawBlack.y = topLineHeight - 5 * intervalDistance + clefAdditionalPosition;
                                    this.addItem(drawBlack);
                                    // move forwards.
                                    itemX += 10;
                                }
                                // add note drawing.
                                var drawNoteItem = Inknote.getDrawingItemFromNote(item);
                                drawNoteItem.x = marginLeft + barX + itemX;
                                drawNoteItem.y = topLineHeight - 5 * intervalDistance + clefAdditionalPosition;
                                drawNoteItem.stemUp = intervalDistance <= -4;
                                if (isBlack) {
                                    drawNoteItem.attach(drawBlack);
                                }
                                this.addItem(drawNoteItem);
                                // move forwards
                                itemX += Inknote.requiredNoteSpace(item, 10);
                                if (isBlack) {
                                    // move back a bit if sharp or flat.
                                    itemX -= 10;
                                }
                            }
                            if (item instanceof Inknote.Model.Rest) {
                                // add rest drawing.
                                var drawRestItem = Inknote.getDrawingItemFromRest(item);
                                drawRestItem.x = marginLeft + barX + itemX;
                                drawRestItem.y = topLineHeight + 20;
                                this.addItem(drawRestItem);
                                // move forwards.
                                itemX += Inknote.requiredRestSpace(item, 10);
                            }
                            if (item instanceof Inknote.Model.Chord) {
                            }
                        }
                        // increase bar position after looping through items.
                        barX += tempBarLength;
                    }
                    // iterate height between instruments;
                    topLineHeight += 100;
                    barX = 0;
                }
                // next group of staves quite a bit lower.
                topLineHeight += 40;
            }
            this.maxScrollPosition = topLineHeight - 200;
        };
        Object.defineProperty(ScoringService.prototype, "SelectedItem", {
            get: function () {
                for (var i = 0; i < this._items.length; i++) {
                    if (this._items[i].ID == this.selectID) {
                        if (this._items[i]["attachedToID"] == null) {
                            return this._items[i];
                        }
                    }
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        ScoringService.prototype.getItems = function () {
            if (this._projectID != Inknote.Managers.ProjectManager.Instance.currentProject.ID) {
                this.refresh();
            }
            if (this._refresh) {
                // get items from project
                this.updateItems();
            }
            var visibleItems = [];
            for (var i = 0; i < this._items.length; i++) {
                this._items[i].y = this._items[i].y + this.oldScrollY - Inknote.ScrollService.Instance.y;
                if (this._items[i].y > 0 && this._items[i].y < Inknote.DrawService.Instance.canvas.height) {
                    visibleItems.push(this._items[i]);
                }
            }
            this.oldScrollY = Inknote.ScrollService.Instance.y;
            this._refresh = false;
            return visibleItems;
        };
        ScoringService.prototype.cursorLeft = function () {
            var lastID = null;
            for (var i = 0; i < this._items.length; i++) {
                if (this._items[i] instanceof Inknote.Drawing.Stave) {
                    continue;
                }
                var id = this._items[i].ID;
                if (id == this.selectID) {
                    this.selectID = lastID;
                    break;
                }
                lastID = id;
            }
        };
        ScoringService.prototype.cursorRight = function () {
            var lastID = null;
            var gone = false;
            for (var i = 0; i < this._items.length; i++) {
                if (this._items[i] instanceof Inknote.Drawing.Stave) {
                    continue;
                }
                var id = this._items[i].ID;
                if (lastID == this.selectID && id != lastID) {
                    this.selectID = id;
                    gone = true;
                    break;
                }
                lastID = id;
            }
            if (!gone) {
                this.selectID = null;
            }
        };
        return ScoringService;
    })();
    Inknote.ScoringService = ScoringService;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var ProjectConverter;
    (function (ProjectConverter) {
        var splash = new Inknote.Drawing.LoadingSplash();
        ProjectConverter.name = new Inknote.Drawing.Name("");
        function toDrawing(drawer) {
            var project = Inknote.Managers.ProjectManager.Instance.currentProject;
            var items = [];
            var scoreItems = Inknote.ScoringService.Instance.getItems();
            for (var i = 0; i < scoreItems.length; i++) {
                var isHover = scoreItems[i].ID === Inknote.ScoringService.Instance.hoverID;
                var isSelect = scoreItems[i].ID === Inknote.ScoringService.Instance.selectID;
                scoreItems[i].hover = isHover;
                scoreItems[i].select = isSelect;
                if (scoreItems[i] instanceof Inknote.Notation) {
                    for (var j = 0; j < scoreItems[i].attached.length; j++) {
                        scoreItems[i].attached[j].hover = isHover;
                        scoreItems[i].attached[j].select = isSelect;
                    }
                }
                items.push(scoreItems[i]);
            }
            // if (ScoringService.Instance.selectID != null){
            var noteControls = Inknote.NoteControlService.Instance.getItems(drawer);
            items = items.concat(noteControls);
            // }
            if (!project) {
                items.push(splash);
                return items;
            }
            // project name
            ProjectConverter.name.name = project.name;
            ProjectConverter.name.ID = project.ID;
            ProjectConverter.name.hover = ProjectConverter.name.ID === Inknote.Managers.ProjectManager.Instance.hoverID;
            ProjectConverter.name.select = ProjectConverter.name.ID === Inknote.Managers.ProjectManager.Instance.selectID;
            // keyboard for changing name
            if (ProjectConverter.name.select && Inknote.Managers.MachineManager.Instance.machineType !== 0 /* Desktop */) {
                items.push(Inknote.Drawing.Keyboard.Instance);
            }
            items.push(ProjectConverter.name);
            if (project.pause) {
                items.push(splash);
            }
            return items;
        }
        ProjectConverter.toDrawing = toDrawing;
        function compress(project) {
            var compressed = new Inknote.Compressed.CompressedProject(project.name);
            compressed.ID = project.ID;
            compressed.name = project.name;
            compressed.inknoteVersion = Inknote.Managers.VersionManager.Instance.version;
            compressed.colour = project.colour;
            compressed.composer = project.composer;
            compressed.arrangedBy = project.arrangedBy;
            compressed.notes = project.notes;
            for (var i = 0; i < project.instruments.length; i++) {
                compressed.instruments.push(compressInstrument(project.instruments[i]));
            }
            return compressed;
        }
        ProjectConverter.compress = compress;
        function compressInstrument(instrument) {
            var result = new Inknote.Compressed.Instrument(instrument.name);
            for (var i = 0; i < instrument.bars.length; i++) {
                result.bars.push(compressBar(instrument.bars[i]));
            }
            return result;
        }
        function compressBar(bar) {
            var result = new Inknote.Compressed.Bar();
            for (var i = 0; i < bar.items.length; i++) {
                if (bar.items[i] instanceof Inknote.Model.Note) {
                    var compressedNote = compressNote(bar.items[i]);
                    result.items.push(compressedNote);
                }
                if (bar.items[i] instanceof Inknote.Model.Rest) {
                    var compressedRest = compressRest(bar.items[i]);
                    result.items.push(compressedRest);
                }
                if (bar.items[i] instanceof Inknote.Model.Chord) {
                    var compressedChord = compressChord(bar.items[i]);
                    result.items.push(compressedChord);
                }
                if (bar.items[i] instanceof Inknote.Model.Clef) {
                    var compressedClef = compressClef(bar.items[i]);
                    result.items.push(compressedClef);
                }
                if (bar.items[i] instanceof Inknote.Model.TimeSignature) {
                    var compressedTimeSignature = compressTimeSignature(bar.items[i]);
                    result.items.push(compressedTimeSignature);
                }
            }
            return result;
        }
        function compressChord(chord) {
            var notes = [];
            for (var i = 0; i < chord.notes.length; i++) {
                var fullNote = chord.notes[i];
                var cmprsdNote = new Inknote.Compressed.CompressedNote(fullNote.value, fullNote.octave, fullNote.length);
                notes.push(cmprsdNote);
            }
            var result = new Inknote.Compressed.CompressedChord(notes);
            return result;
        }
        function compressNote(note) {
            var result = new Inknote.Compressed.CompressedNote(note.value, note.octave, note.length);
            return result;
        }
        function compressRest(rest) {
            var result = new Inknote.Compressed.CompressedRest(rest.length);
            return result;
        }
        function compressClef(clef) {
            var resultType;
            var result;
            if (clef instanceof Inknote.Model.FrenchViolinClef) {
                resultType = 0 /* FRENCH_VIOLIN */;
            }
            if (clef instanceof Inknote.Model.TrebleClef) {
                resultType = 1 /* TREBLE */;
            }
            if (clef instanceof Inknote.Model.SopranoClef) {
                resultType = 2 /* SOPRANO */;
            }
            if (clef instanceof Inknote.Model.MezzoSopranoClef) {
                resultType = 3 /* MEZZ_SOPRANO */;
            }
            if (clef instanceof Inknote.Model.AltoClef) {
                resultType = 4 /* ALTO */;
            }
            if (clef instanceof Inknote.Model.TenorClef) {
                resultType = 5 /* TENOR */;
            }
            if (clef instanceof Inknote.Model.BaritoneClef) {
                resultType = 6 /* BARITONE */;
            }
            if (clef instanceof Inknote.Model.BassClef) {
                resultType = 7 /* BASS */;
            }
            if (clef instanceof Inknote.Model.SubbassClef) {
                resultType = 8 /* SUBBASS */;
            }
            result = new Inknote.Compressed.CompressedClef(resultType);
            return result;
        }
        function compressTimeSignature(timeSignature) {
            return new Inknote.Compressed.CompressedTimeSignature(timeSignature.top, timeSignature.bottom);
        }
        function compressAll(projects) {
            var result = [];
            for (var i = 0; i < projects.length; i++) {
                var compressed = compress(projects[i]);
                result.push(compressed);
            }
            return result;
        }
        ProjectConverter.compressAll = compressAll;
        function decompress(project) {
            if (project.inknoteVersion !== Inknote.Managers.VersionManager.Instance.version) {
                Inknote.log("project: " + project.name + " is of version " + project.inknoteVersion, 2 /* Warning */);
                Inknote.log("this may cause errors when decompressing this saved files", 2 /* Warning */);
            }
            var result = new Inknote.Project(project.name);
            result.ID = project.ID;
            result.instruments = [];
            result.colour = project.colour;
            result.composer = project.composer;
            result.arrangedBy = project.arrangedBy;
            result.notes = project.notes;
            if (project.instruments) {
                for (var i = 0; i < project.instruments.length; i++) {
                    result.instruments.push(decompressInstrument(project.instruments[i]));
                }
            }
            return result;
        }
        ProjectConverter.decompress = decompress;
        function decompressInstrument(instrument) {
            var result = new Inknote.Model.Instrument(instrument.name);
            result.visible = true;
            for (var i = 0; i < instrument.bars.length; i++) {
                result.bars.push(decompressBar(instrument.bars[i]));
            }
            return result;
        }
        function decompressBar(bar) {
            var result = new Inknote.Model.Bar();
            for (var i = 0; i < bar.items.length; i++) {
                if (bar.items[i].i == 0 /* NOTE */) {
                    var decompressedNote = decompressNote(bar.items[i]);
                    result.items.push(decompressedNote);
                }
                else if (bar.items[i].i == 1 /* REST */) {
                    var decompressedRest = decompressRest(bar.items[i]);
                    result.items.push(decompressedRest);
                }
                else if (bar.items[i].i == 2 /* CHORD */) {
                    var decompressedChord = decompressChord(bar.items[i]);
                    result.items.push(decompressedChord);
                }
                else if (bar.items[i].i == 3 /* CLEF */) {
                    var decompressedClef = decompressClef(bar.items[i]);
                    result.items.push(decompressedClef);
                }
                else if (bar.items[i].i == 4 /* TIMESIGNATURE */) {
                    var decompressedTimeSignature = decompressTimeSignature(bar.items[i]);
                    result.items.push(decompressedTimeSignature);
                }
                else {
                    Inknote.log("object in bar unidentified", 2 /* Warning */);
                    console.log(bar.items[i]);
                }
            }
            return result;
        }
        function decompressChord(chord) {
            var notes = [];
            for (var i = 0; i < chord.notes.length; i++) {
                var theNote = chord.notes[i];
                var realNote = new Inknote.Model.Note(theNote.v, theNote.o, theNote.l);
                notes.push(realNote);
            }
            var result = new Inknote.Model.Chord(notes);
            return result;
        }
        function decompressNote(note) {
            var result = new Inknote.Model.Note(note.v, note.o, note.l);
            return result;
        }
        function decompressRest(rest) {
            var result = new Inknote.Model.Rest(rest.l);
            return result;
        }
        function decompressClef(clef) {
            var result;
            if (clef.v == 0 /* FRENCH_VIOLIN */) {
                result = new Inknote.Model.FrenchViolinClef();
            }
            if (clef.v == 1 /* TREBLE */) {
                result = new Inknote.Model.TrebleClef();
            }
            if (clef.v == 2 /* SOPRANO */) {
                result = new Inknote.Model.SopranoClef();
            }
            if (clef.v == 3 /* MEZZ_SOPRANO */) {
                result = new Inknote.Model.MezzoSopranoClef();
            }
            if (clef.v == 4 /* ALTO */) {
                result = new Inknote.Model.AltoClef();
            }
            if (clef.v == 5 /* TENOR */) {
                result = new Inknote.Model.TenorClef();
            }
            if (clef.v == 6 /* BARITONE */) {
                result = new Inknote.Model.BaritoneClef();
            }
            if (clef.v == 7 /* BASS */) {
                result = new Inknote.Model.BassClef();
            }
            if (clef.v == 8 /* SUBBASS */) {
                result = new Inknote.Model.SubbassClef();
            }
            return result;
        }
        function decompressTimeSignature(timeSignature) {
            return new Inknote.Model.TimeSignature(timeSignature.t, timeSignature.b);
        }
        function decompressAll(projects) {
            var result = [];
            for (var i = 0; i < projects.length; i++) {
                var decompressed = decompress(projects[i]);
                result.push(decompressed);
            }
            return result;
        }
        ProjectConverter.decompressAll = decompressAll;
    })(ProjectConverter = Inknote.ProjectConverter || (Inknote.ProjectConverter = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var FileConverter;
    (function (FileConverter) {
        var splash = new Inknote.Drawing.LoadingSplash();
        function toDrawing(drawer) {
            var items = [];
            var projects = Inknote.Managers.ProjectManager.Instance.allProjects;
            var canvas = drawer.canvas;
            var maxFiles = Math.floor(canvas.width / 200);
            var column = 0;
            var row = 0;
            var anySelected = false;
            for (var i = 0; i < projects.length; i++) {
                var file = new Inknote.Drawing.File(projects[i].name);
                file.ID = projects[i].ID;
                if (projects[i].ID == Inknote.Managers.ProjectManager.Instance.hoverID) {
                    file.hover = true;
                }
                if (projects[i].ID == Inknote.Managers.ProjectManager.Instance.selectID) {
                    file.select = true;
                    anySelected = true;
                }
                file.x = column * 200 + 100;
                file.y = row * 200 + 100 - Inknote.ScrollService.Instance.y;
                file.colour = projects[i].colour;
                items.push(file);
                column++;
                if (column >= maxFiles) {
                    column = 0;
                    row++;
                }
            }
            if (anySelected && Inknote.Managers.MachineManager.Instance.machineType != 0 /* Desktop */) {
                items.push(Inknote.Drawing.BottomMenu.Instance);
            }
            if (Inknote.Managers.ProjectManager.Instance.currentProject.pause) {
                items.push(splash);
            }
            return items;
        }
        FileConverter.toDrawing = toDrawing;
    })(FileConverter = Inknote.FileConverter || (Inknote.FileConverter = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    // returns a new note that is # semitones away from note. + is higher
    function getNoteOfDistance(note, semitones) {
        var correctSemitones = semitones;
        while (correctSemitones < 0) {
            correctSemitones += 12;
        }
        var tempNote = new Inknote.Model.Note(note.value, note.octave, note.length);
        if (Math.round(semitones) != semitones) {
            throw new Error("Number of semitones must be an integer");
        }
        tempNote.value = ((note.value + correctSemitones) % 12);
        if (semitones > 0) {
            for (var i = 1; i <= semitones; i++) {
                var norm = (note.value + i) % 12;
                if (norm == 3 /* C */) {
                    tempNote.octave++;
                }
            }
        }
        if (semitones < 0) {
            for (var i = 1; i >= semitones; i--) {
                var norm = note.value + i;
                while (norm < 0) {
                    norm += 12;
                }
                if (norm == 2 /* B */) {
                    tempNote.octave--;
                }
            }
        }
        return tempNote;
    }
    Inknote.getNoteOfDistance = getNoteOfDistance;
    function getThird(note) {
        return getNoteOfDistance(note, 4);
    }
    Inknote.getThird = getThird;
    function getMajorThird(note) {
        return getThird(note);
    }
    Inknote.getMajorThird = getMajorThird;
    function getMinorThird(note) {
        return getNoteOfDistance(note, 3);
    }
    Inknote.getMinorThird = getMinorThird;
    function getFlatFifth(note) {
        return getNoteOfDistance(note, 6);
    }
    Inknote.getFlatFifth = getFlatFifth;
    function getFifth(note) {
        return getNoteOfDistance(note, 7);
    }
    Inknote.getFifth = getFifth;
    function getSeventh(note) {
        return getNoteOfDistance(note, 10);
    }
    Inknote.getSeventh = getSeventh;
    function getMajorSeventh(note) {
        return getNoteOfDistance(note, 11);
    }
    Inknote.getMajorSeventh = getMajorSeventh;
    function getIntervalDistance(note, note2) {
        var distanceFromOctave = (note2.octave - note.octave) * 7;
        var note1Value = note.value;
        var norm1 = note.value < 3 /* C */ ? note.value + 12 : note.value;
        var norm2 = note2.value < 3 /* C */ ? note2.value + 12 : note2.value;
        var diff = norm2 - norm1;
        var distanceOfNote = 0;
        if (diff > 0) {
            for (var i = 0; i < diff; i++) {
                if (!Inknote.Model.IsBlackKey((i + note1Value) % 12)) {
                    distanceOfNote++;
                }
            }
        }
        else {
            for (var i = 0; i > diff; i--) {
                if (!Inknote.Model.IsBlackKey((i + 11 + note1Value) % 12)) {
                    distanceOfNote--;
                }
            }
        }
        return distanceFromOctave + distanceOfNote;
    }
    Inknote.getIntervalDistance = getIntervalDistance;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    // transposes specified note
    // note: transposes existing note.
    function transposeNote(note, semitones) {
        var tempNote = Inknote.getNoteOfDistance(note, semitones);
        note.value = tempNote.value;
        note.octave = tempNote.octave;
    }
    Inknote.transposeNote = transposeNote;
    // transposes specified chord
    // note: transposes existing chord.
    function transposeChord(chord, semitones) {
        for (var i = 0; i < chord.notes.length; i++) {
            transposeNote(chord.notes[i], semitones);
        }
    }
    Inknote.transposeChord = transposeChord;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    function requiredRestSpace(rest, lineHeight) {
        var spaceNeeded = lineHeight;
        // padding;
        spaceNeeded += lineHeight;
        return spaceNeeded;
    }
    Inknote.requiredRestSpace = requiredRestSpace;
    function getDrawingItemFromRest(rest) {
        var result = null;
        switch (rest.length) {
            case 0 /* Breve */:
                result = new Inknote.Drawing.BreveRest();
                break;
            case 1 /* SemiBreve */:
                result = new Inknote.Drawing.SemiBreveRest();
                break;
            case 2 /* Minim */:
                result = new Inknote.Drawing.MinimRest();
                break;
            case 3 /* Crotchet */:
                result = new Inknote.Drawing.CrotchetRest();
                break;
            case 4 /* Quaver */:
                result = new Inknote.Drawing.QuaverRest();
                break;
            case 5 /* SemiQuaver */:
                result = new Inknote.Drawing.SemiQuaverRest();
                break;
            case 6 /* DemiSemiQuaver */:
                result = new Inknote.Drawing.DemiSemiQuaverRest();
                break;
            case 7 /* HemiDemiSemiQuaver */:
                result = new Inknote.Drawing.HemiDemiSemiQuaverRest();
                break;
        }
        result.ID = rest.ID;
        return result;
    }
    Inknote.getDrawingItemFromRest = getDrawingItemFromRest;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    function notesAreEqual(note1, note2) {
        return note1.value == note2.value && note1.octave == note2.octave && note1.length == note2.length;
    }
    Inknote.notesAreEqual = notesAreEqual;
    function notePitchesAreEqual(note1, note2) {
        return note1.value == note2.value && note1.octave == note2.octave;
    }
    Inknote.notePitchesAreEqual = notePitchesAreEqual;
    function requiredNoteSpace(note, lineHeight) {
        // width of head.
        var spaceNeeded = lineHeight;
        if (note.length > 3 /* Crotchet */) {
            spaceNeeded += lineHeight;
        }
        if (Inknote.Model.IsBlackKey(note.value)) {
            spaceNeeded += 10;
        }
        //padding
        spaceNeeded += lineHeight;
        return spaceNeeded;
    }
    Inknote.requiredNoteSpace = requiredNoteSpace;
    // ID is set correctly. x and y currently not.
    // x and y to be set after getting?
    // todo: check if stem up or down.
    function getDrawingItemFromNote(note) {
        var tempDrawing = null;
        var stemUp = true;
        switch (note.length) {
            case 0 /* Breve */:
                tempDrawing = new Inknote.Drawing.Breve(stemUp);
                break;
            case 1 /* SemiBreve */:
                tempDrawing = new Inknote.Drawing.SemiBreve(stemUp);
                break;
            case 2 /* Minim */:
                tempDrawing = new Inknote.Drawing.Minim(stemUp);
                break;
            case 3 /* Crotchet */:
                tempDrawing = new Inknote.Drawing.Crotchet(stemUp);
                break;
            case 4 /* Quaver */:
                tempDrawing = new Inknote.Drawing.Quaver(stemUp);
                break;
            case 5 /* SemiQuaver */:
                tempDrawing = new Inknote.Drawing.SemiQuaver(stemUp);
                break;
            case 6 /* DemiSemiQuaver */:
                tempDrawing = new Inknote.Drawing.DemiSemiQuaver(stemUp);
                break;
            case 7 /* HemiDemiSemiQuaver */:
                tempDrawing = new Inknote.Drawing.HemiDemiSemiQuaver(stemUp);
                break;
            default:
                tempDrawing = new Inknote.Drawing.Crotchet(stemUp);
                break;
        }
        tempDrawing.ID = note.ID;
        return tempDrawing;
    }
    Inknote.getDrawingItemFromNote = getDrawingItemFromNote;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    function requiredClefSpace(item, lineHeight) {
        return 40;
    }
    Inknote.requiredClefSpace = requiredClefSpace;
    function areSameClefs(clef, clef2) {
        var sameClefType = clef.clefType == clef2.clefType;
        var sameDrawLocation = clef.drawLocation == clef2.drawLocation;
        var samePositionFromTreble = clef.positionFromTreble == clef2.positionFromTreble;
        return sameClefType && sameDrawLocation && samePositionFromTreble;
    }
    Inknote.areSameClefs = areSameClefs;
    function getNextClef(clef, goUp) {
        var clefs = [];
        clefs.push(new Inknote.Model.FrenchViolinClef());
        clefs.push(new Inknote.Model.TrebleClef());
        clefs.push(new Inknote.Model.SopranoClef());
        clefs.push(new Inknote.Model.MezzoSopranoClef());
        clefs.push(new Inknote.Model.AltoClef());
        clefs.push(new Inknote.Model.TenorClef());
        clefs.push(new Inknote.Model.BaritoneClef());
        clefs.push(new Inknote.Model.BassClef());
        clefs.push(new Inknote.Model.SubbassClef());
        var resultClef = null;
        for (var i = 0; i < clefs.length; i++) {
            var tempClef = clefs[i];
            if (areSameClefs(clef, tempClef)) {
                if (goUp === true) {
                    var index = i == 0 ? i = clefs.length - 1 : i - 1;
                    resultClef = clefs[index];
                }
                else {
                    resultClef = clefs[(i + 1) % clefs.length];
                }
            }
        }
        resultClef.ID = clef.ID;
        return resultClef;
    }
    Inknote.getNextClef = getNextClef;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    function requiredTimeSignatureSpace(item, lineHeight) {
        return 30;
    }
    Inknote.requiredTimeSignatureSpace = requiredTimeSignatureSpace;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    // note: actually only checks pitches, not note length.
    function noteIsInChord(note, chord) {
        for (var i = 0; i < chord.notes.length; i++) {
            if (Inknote.notePitchesAreEqual(note, chord.notes[i])) {
                return true;
            }
        }
        return false;
    }
    Inknote.noteIsInChord = noteIsInChord;
    function getMajorTriad(startNote) {
        var tempNotes = [
            startNote,
            Inknote.getMajorThird(startNote),
            Inknote.getFifth(startNote)
        ];
        return new Inknote.Model.Chord(tempNotes);
    }
    Inknote.getMajorTriad = getMajorTriad;
    function getMinorTriad(startNote) {
        var tempNotes = [
            startNote,
            Inknote.getMinorThird(startNote),
            Inknote.getFifth(startNote)
        ];
        return new Inknote.Model.Chord(tempNotes);
    }
    Inknote.getMinorTriad = getMinorTriad;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    function getCurrentChordNotation(baseNote, rootNote, minor, annotations) {
        switch (Inknote.Managers.SettingsManager.Instance.getCurrentSetting().notationType) {
            case 0 /* Standard */:
                return new Inknote.ChordNotation.StandardChordNotation(baseNote, rootNote, minor, annotations);
                break;
            case 1 /* UPPER_lower */:
                return new Inknote.ChordNotation.UPPER_lowerChordNotation(baseNote, rootNote, minor, annotations);
                break;
            case 2 /* DoReMi */:
                return new Inknote.ChordNotation.DoReMiChordNotation(baseNote, rootNote, minor, annotations);
                break;
            default:
                return new Inknote.ChordNotation.StandardChordNotation(baseNote, rootNote, minor, annotations);
        }
    }
    Inknote.getCurrentChordNotation = getCurrentChordNotation;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    function identifyChord(chord) {
        throw new Error("Not fully implemented");
        return Inknote.getCurrentChordNotation(chord.notes[0], chord.notes[0], true, "#5");
    }
    Inknote.identifyChord = identifyChord;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var NoteControlService = (function () {
        function NoteControlService() {
            this.piano = new Inknote.Drawing.Piano();
            this.background = new Inknote.Drawing.NoteControlBackground();
            this.lengthControl = new Inknote.Drawing.LengthControlBar();
            this.minimise = new Inknote.Drawing.Minimise();
            this.restControl = new Inknote.Drawing.RestControl();
            this.deleteNoteControl = new Inknote.Drawing.DeleteNoteControl();
            this.x = 0;
            this.hidden = false;
            this.hiddenY = 0;
            this.ID = "note_control";
            this.piano.ID = this.ID;
            this.background.ID = this.ID;
            this.lengthControl.ID = this.ID;
            this.minimise.ID = this.ID;
        }
        Object.defineProperty(NoteControlService, "Instance", {
            get: function () {
                if (!NoteControlService._instance) {
                    NoteControlService._instance = new NoteControlService();
                }
                return NoteControlService._instance;
            },
            enumerable: true,
            configurable: true
        });
        NoteControlService.prototype.hide = function () {
            this.hidden = true;
        };
        NoteControlService.prototype.show = function () {
            this.hidden = false;
        };
        NoteControlService.prototype.getItems = function (drawer) {
            if (this.hidden) {
                if (this.hiddenY > drawer.canvas.height / 2) {
                    this.hiddenY = drawer.canvas.height / 2;
                }
                else if (this.hiddenY < drawer.canvas.height / 2) {
                    this.hiddenY += 10;
                }
            }
            else {
                if (this.hiddenY > 0) {
                    this.hiddenY -= 10;
                }
                else {
                    this.hiddenY = 0;
                }
            }
            this.y = drawer.canvas.height / 2 + this.hiddenY;
            this.width = Math.min(drawer.canvas.width, 800);
            this.height = drawer.canvas.height / 2;
            var noteControls = [];
            this.background.width = this.width;
            this.background.height = this.height;
            this.background.y = this.y;
            noteControls.push(this.background);
            this.restControl.y = this.y;
            this.restControl.width = this.width / 8;
            this.restControl.height = this.height / 4;
            noteControls.push(this.restControl);
            this.deleteNoteControl.y = this.y;
            this.deleteNoteControl.x = this.x + this.width * 7 / 8;
            this.deleteNoteControl.width = this.width / 8;
            this.deleteNoteControl.height = this.height / 4;
            noteControls.push(this.deleteNoteControl);
            this.lengthControl.y = this.y + this.height / 4;
            this.lengthControl.width = this.width;
            this.lengthControl.height = this.height / 4;
            noteControls.push(this.lengthControl);
            this.piano.width = this.width;
            this.piano.height = this.height / 2;
            this.piano.y = this.y + this.height / 2;
            noteControls.push(this.piano);
            this.minimise.width = 40;
            this.minimise.height = 20;
            this.minimise.x = this.x;
            this.minimise.y = this.y - this.minimise.height;
            noteControls.push(this.minimise);
            return noteControls;
        };
        NoteControlService.prototype.addInstrument = function (name) {
            var project = Inknote.Managers.ProjectManager.Instance.currentProject;
            var barsCount = project.instruments[0].bars.length;
            var newInstrument = new Inknote.Model.Instrument(name);
            for (var i = 0; i < barsCount; i++) {
                newInstrument.bars.push(new Inknote.Model.Bar());
            }
            project.instruments.push(newInstrument);
            Inknote.ScoringService.Instance.refresh();
        };
        NoteControlService.prototype.addBar = function () {
            var project = Inknote.Managers.ProjectManager.Instance.currentProject;
            for (var i = 0; i < project.instruments.length; i++) {
                project.instruments[i].bars.push(new Inknote.Model.Bar());
            }
        };
        NoteControlService.prototype.addNote = function (note) {
            var project = Inknote.Managers.ProjectManager.Instance.currentProject;
            var instrument = project.instruments[0];
            if (instrument.bars.length == 0) {
                this.addBar();
                instrument.bars[0].items.push(new Inknote.Model.TrebleClef());
                instrument.bars[0].items.push(new Inknote.Model.TimeSignature(4, 4));
            }
            var bar = instrument.bars[instrument.bars.length - 1];
            if (bar.items.length > 3) {
                this.addBar();
                bar = instrument.bars[instrument.bars.length - 1];
            }
            bar.items.push(note);
            Inknote.ScoringService.Instance.refresh();
        };
        NoteControlService.prototype.addRest = function () {
            var project = Inknote.Managers.ProjectManager.Instance.currentProject;
            var instrument = project.instruments[0];
            if (instrument.bars.length == 0) {
                this.addBar();
                instrument.bars[instrument.bars.length - 1].items.push(new Inknote.Model.TrebleClef());
            }
            var bar = instrument.bars[instrument.bars.length - 1];
            if (bar.items.length > 3) {
                this.addBar();
                bar = instrument.bars[instrument.bars.length - 1];
            }
            var rest = new Inknote.Model.Rest(this.lengthControl.selectedLength);
            bar.items.push(rest);
            Inknote.ScoringService.Instance.refresh();
        };
        NoteControlService.prototype.editNoteLength = function () {
            var project = Inknote.Managers.ProjectManager.Instance.currentProject;
            for (var i = 0; i < project.instruments.length; i++) {
                for (var j = 0; j < project.instruments[i].bars.length; j++) {
                    var bar = project.instruments[i].bars[j];
                    for (var k = 0; k < bar.items.length; k++) {
                        var item = bar.items[k];
                        if (item.ID == Inknote.ScoringService.Instance.selectID) {
                            if (item instanceof Inknote.Model.Note) {
                                item.length = this.lengthControl.selectedLength;
                            }
                            else if (item instanceof Inknote.Model.Rest) {
                                item.length = this.lengthControl.selectedLength;
                            }
                            else if (item instanceof Inknote.Model.Chord) {
                                for (var l = 0; l < item.notes.length; l++) {
                                    item.notes[l].length = this.lengthControl.selectedLength;
                                }
                            }
                        }
                    }
                }
            }
            Inknote.ScoringService.Instance.refresh();
        };
        NoteControlService.prototype.editCurrentClef = function (goUp) {
            var project = Inknote.Managers.ProjectManager.Instance.currentProject;
            for (var i = 0; i < project.instruments.length; i++) {
                for (var j = 0; j < project.instruments[i].bars.length; j++) {
                    var bar = project.instruments[i].bars[j];
                    for (var k = 0; k < bar.items.length; k++) {
                        var item = bar.items[k];
                        if (item.ID == Inknote.ScoringService.Instance.selectID) {
                            if (item instanceof Inknote.Model.Clef) {
                                bar.items[k] = Inknote.getNextClef(item, goUp);
                            }
                        }
                    }
                }
            }
            Inknote.ScoringService.Instance.refresh();
        };
        NoteControlService.prototype.deleteSelected = function () {
            if (Inknote.ScoringService.Instance.SelectedItem instanceof Inknote.Drawing.Note) {
                NoteControlService.Instance.deleteItem();
            }
            else if (Inknote.ScoringService.Instance.SelectedItem instanceof Inknote.Drawing.Bar) {
                Inknote.BarService.Instance.deleteSelectedBar();
            }
        };
        NoteControlService.prototype.deleteItem = function () {
            var project = Inknote.Managers.ProjectManager.Instance.currentProject;
            for (var i = 0; i < project.instruments.length; i++) {
                var previousItem = null;
                for (var j = 0; j < project.instruments[i].bars.length; j++) {
                    var bar = project.instruments[i].bars[j];
                    var newItems = [];
                    for (var k = 0; k < bar.items.length; k++) {
                        var item = bar.items[k];
                        if (item.ID == Inknote.ScoringService.Instance.selectID) {
                            // have it......... dealt with
                            if (previousItem) {
                                Inknote.ScoringService.Instance.selectID = previousItem.ID;
                            }
                            else {
                                Inknote.ScoringService.Instance.selectID = null;
                            }
                        }
                        else {
                            newItems.push(item);
                        }
                        previousItem = item;
                    }
                    bar.items = newItems;
                }
            }
            Inknote.ScoringService.Instance.refresh();
        };
        NoteControlService.prototype.editNoteValueAndOctave = function (value, octave) {
            var project = Inknote.Managers.ProjectManager.Instance.currentProject;
            for (var i = 0; i < project.instruments.length; i++) {
                for (var j = 0; j < project.instruments[i].bars.length; j++) {
                    var bar = project.instruments[i].bars[j];
                    for (var k = 0; k < bar.items.length; k++) {
                        var item = bar.items[k];
                        if (item.ID == Inknote.ScoringService.Instance.selectID) {
                            if (item instanceof Inknote.Model.Note) {
                                item.value = value;
                                item.octave = octave;
                                item.length = this.lengthControl.selectedLength;
                            }
                            else if (item instanceof Inknote.Model.Rest) {
                            }
                            else if (item instanceof Inknote.Model.Chord) {
                            }
                        }
                    }
                }
            }
            Inknote.ScoringService.Instance.refresh();
        };
        NoteControlService.prototype.noteValueUp = function () {
            var project = Inknote.Managers.ProjectManager.Instance.currentProject;
            for (var i = 0; i < project.instruments.length; i++) {
                for (var j = 0; j < project.instruments[i].bars.length; j++) {
                    var bar = project.instruments[i].bars[j];
                    for (var k = 0; k < bar.items.length; k++) {
                        var item = bar.items[k];
                        if (item.ID == Inknote.ScoringService.Instance.selectID) {
                            if (item instanceof Inknote.Model.Note) {
                                var newVal = item.value + 1;
                                item.value = newVal % 12;
                                item.octave = newVal % 12 == 3 /* C */ ? item.octave + 1 : item.octave;
                            }
                            else if (item instanceof Inknote.Model.Rest) {
                            }
                            else if (item instanceof Inknote.Model.Chord) {
                            }
                        }
                    }
                }
            }
            Inknote.ScoringService.Instance.refresh();
        };
        NoteControlService.prototype.noteValueDown = function () {
            var project = Inknote.Managers.ProjectManager.Instance.currentProject;
            for (var i = 0; i < project.instruments.length; i++) {
                for (var j = 0; j < project.instruments[i].bars.length; j++) {
                    var bar = project.instruments[i].bars[j];
                    for (var k = 0; k < bar.items.length; k++) {
                        var item = bar.items[k];
                        if (item.ID == Inknote.ScoringService.Instance.selectID) {
                            if (item instanceof Inknote.Model.Note) {
                                var newVal = item.value + 11;
                                item.value = newVal % 12;
                                item.octave = newVal % 12 == 2 /* B */ ? item.octave - 1 : item.octave;
                            }
                            else if (item instanceof Inknote.Model.Rest) {
                            }
                            else if (item instanceof Inknote.Model.Chord) {
                            }
                        }
                    }
                }
            }
            Inknote.ScoringService.Instance.refresh();
        };
        return NoteControlService;
    })();
    Inknote.NoteControlService = NoteControlService;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var BarService = (function () {
        function BarService() {
        }
        Object.defineProperty(BarService, "Instance", {
            get: function () {
                if (!BarService._instance) {
                    BarService._instance = new BarService();
                }
                return BarService._instance;
            },
            enumerable: true,
            configurable: true
        });
        BarService.prototype.deleteSelectedBar = function () {
            var runRemove = false;
            var removeIndex = 0;
            var previousItem = null;
            var instruments = Inknote.Managers.ProjectManager.Instance.currentProject.instruments;
            for (var i = 0; i < instruments.length; i++) {
                for (var j = 0; j < instruments[i].bars.length; j++) {
                    var bar = instruments[i].bars[j];
                    if (bar.ID == Inknote.ScoringService.Instance.SelectedItem.ID) {
                        if (bar.items.length == 0) {
                            runRemove = true;
                            if (previousItem) {
                                Inknote.ScoringService.Instance.selectID = previousItem.ID;
                            }
                            else {
                                Inknote.ScoringService.Instance.selectID = null;
                            }
                            for (var k = 0; k < instruments.length; k++) {
                                if (instruments[k].bars[j].items.length > 0) {
                                    runRemove = false;
                                }
                            }
                            if (runRemove == true) {
                                removeIndex = j;
                            }
                        }
                        else {
                            bar.items = [];
                            Inknote.ScoringService.Instance.refresh();
                        }
                        break;
                    }
                    previousItem = bar;
                }
            }
            if (runRemove === true) {
                for (var i = 0; i < instruments.length; i++) {
                    instruments[i].bars.splice(removeIndex, 1);
                    Inknote.ScoringService.Instance.refresh();
                }
            }
        };
        return BarService;
    })();
    Inknote.BarService = BarService;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var ProjectOptionsService = (function () {
        function ProjectOptionsService() {
            this.currentProject = null;
            this.container = document.getElementById("project-options-details");
        }
        Object.defineProperty(ProjectOptionsService, "Instance", {
            get: function () {
                if (!ProjectOptionsService._instance) {
                    ProjectOptionsService._instance = new ProjectOptionsService();
                }
                return ProjectOptionsService._instance;
            },
            enumerable: true,
            configurable: true
        });
        ProjectOptionsService.prototype.addRowWithData = function (label, startValue, onChange) {
            var formRow = document.createElement("div");
            formRow.className = "form-row";
            var rowLabel = document.createElement("span");
            rowLabel.className = "label";
            rowLabel.textContent = label;
            formRow.appendChild(rowLabel);
            var rowInput = document.createElement("input");
            rowInput.value = startValue;
            rowInput.onchange = onChange;
            formRow.appendChild(rowInput);
            this.container.appendChild(formRow);
        };
        ProjectOptionsService.prototype.open = function (project) {
            this.currentProject = project;
            this.container.innerHTML = "";
            var header = document.createElement("h1");
            header.textContent = project.name;
            this.container.appendChild(header);
            var colourRow = document.createElement("div");
            colourRow.className = "form-row";
            var colourLabel = document.createElement("span");
            colourLabel.className = "label";
            colourLabel.textContent = "tag colour:";
            colourRow.appendChild(colourLabel);
            var colour = document.createElement("input");
            colour.type = "color";
            colour.value = project.colour;
            colour.onchange = function (e) {
                ProjectOptionsService.Instance.currentProject.colour = colour.value;
            };
            colourRow.appendChild(colour);
            this.container.appendChild(colourRow);
            this.addRowWithData("composed by:", project.composer, function (e) {
                ProjectOptionsService.Instance.currentProject.composer = e.target.value;
            });
            this.addRowWithData("arranged by:", project.arrangedBy, function (e) {
                ProjectOptionsService.Instance.currentProject.arrangedBy = e.target.value;
            });
            this.addRowWithData("notes:", project.notes, function (e) {
                ProjectOptionsService.Instance.currentProject.notes = e.target.value;
            });
            Modal.toggle("project-options");
        };
        return ProjectOptionsService;
    })();
    Inknote.ProjectOptionsService = ProjectOptionsService;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Testing;
    (function (Testing) {
        var _compressedProject = new Inknote.Compressed.CompressedProject("TestCompressed");
        _compressedProject.ID = "42";
        var _compressedInstrument1 = new Inknote.Compressed.Instrument("Violin");
        var _compressedInstrument2 = new Inknote.Compressed.Instrument("Guitar");
        _compressedProject.instruments = [
            _compressedInstrument1,
            _compressedInstrument2
        ];
        Testing.$TEST$_compressedProject = _compressedProject;
    })(Testing = Inknote.Testing || (Inknote.Testing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Managers;
    (function (Managers) {
        var VersionManager = (function () {
            function VersionManager() {
                this.version = "0.1";
            }
            Object.defineProperty(VersionManager, "Instance", {
                get: function () {
                    if (!VersionManager._instance) {
                        VersionManager._instance = new VersionManager();
                    }
                    return this._instance;
                },
                enumerable: true,
                configurable: true
            });
            return VersionManager;
        })();
        Managers.VersionManager = VersionManager;
    })(Managers = Inknote.Managers || (Inknote.Managers = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Managers;
    (function (Managers) {
        if (typeof screen != "undefined") {
            screen.lockOrientationUniversal = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation;
            if (screen.lockOrientationUniversal) {
                if (screen.lockOrientationUniversal("landscape-primary")) {
                }
                else {
                    // orientation lock failed
                    Inknote.log("orientation lock failed in this browser", 2 /* Warning */);
                }
            }
            else {
                Inknote.log("lockOrientation undefined in this browser", 2 /* Warning */);
            }
        }
        (function (MachineType) {
            MachineType[MachineType["Desktop"] = 0] = "Desktop";
            MachineType[MachineType["Tablet"] = 1] = "Tablet";
            MachineType[MachineType["Mobile"] = 2] = "Mobile";
        })(Managers.MachineType || (Managers.MachineType = {}));
        var MachineType = Managers.MachineType;
        var MachineManager = (function () {
            function MachineManager() {
                var isMobile = false;
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
                    isMobile = true;
                if (isMobile) {
                    this.machineType = 2 /* Mobile */;
                }
                else {
                    this.machineType = 0 /* Desktop */;
                }
            }
            Object.defineProperty(MachineManager, "Instance", {
                get: function () {
                    if (!MachineManager._instance) {
                        MachineManager._instance = new MachineManager();
                    }
                    return MachineManager._instance;
                },
                enumerable: true,
                configurable: true
            });
            return MachineManager;
        })();
        Managers.MachineManager = MachineManager;
    })(Managers = Inknote.Managers || (Inknote.Managers = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Managers;
    (function (Managers) {
        (function (Page) {
            Page[Page["Score"] = 0] = "Score";
            Page[Page["Form"] = 1] = "Form";
            Page[Page["File"] = 2] = "File";
            Page[Page["List"] = 3] = "List";
            Page[Page["Licence"] = 4] = "Licence";
        })(Managers.Page || (Managers.Page = {}));
        var Page = Managers.Page;
        function pageName(page) {
            switch (page) {
                case 0 /* Score */:
                    return "Score";
                case 1 /* Form */:
                    return "Form";
                case 2 /* File */:
                    return "File";
                case 3 /* List */:
                    return "List";
                case 4 /* Licence */:
                    return "Licence";
            }
        }
        var PageManager = (function () {
            function PageManager() {
                this.openPageFromURL();
            }
            Object.defineProperty(PageManager.prototype, "page", {
                get: function () {
                    return this._page;
                },
                set: function (item) {
                    var pageURL = "?" + pageName(item);
                    if (Inknote.ScrollService && Inknote.ScrollService.Instance) {
                        Inknote.ScrollService.Instance.x = 0;
                        Inknote.ScrollService.Instance.y = 0;
                    }
                    switch (item) {
                        case 2 /* File */:
                            break;
                        case 1 /* Form */:
                            break;
                        case 3 /* List */:
                            break;
                        case 0 /* Score */:
                            pageURL += "=" + Managers.ProjectManager.Instance.currentProject.ID;
                            break;
                        case 4 /* Licence */:
                            window.location.href = "./licence";
                            return;
                    }
                    window.history.pushState(null, pageURL, pageURL);
                    this._page = item;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PageManager, "Current", {
                get: function () {
                    if (!PageManager._current) {
                        PageManager._current = new PageManager();
                    }
                    return PageManager._current;
                },
                enumerable: true,
                configurable: true
            });
            PageManager.prototype.openNewPage = function (page, ID) {
                var newURL = "?";
                console.log(newURL);
                newURL += pageName(page);
                newURL += "=";
                newURL += ID;
                window.open(newURL);
            };
            PageManager.prototype.openPageFromURL = function () {
                var search = window.location.search.replace("?", "");
                var searches = search.split("&");
                for (var i = 0; i < searches.length; i++) {
                    var keyValue = searches[i].split("=");
                    if (Page[keyValue[0]]) {
                        this.page = Page[keyValue[0]];
                    }
                }
                if (this._page == null) {
                    this.page = 0 /* Score */;
                }
            };
            return PageManager;
        })();
        Managers.PageManager = PageManager;
    })(Managers = Inknote.Managers || (Inknote.Managers = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Managers;
    (function (Managers) {
        var SettingsManager = (function () {
            function SettingsManager() {
                this._settings = [];
                if (SettingsManager._instance) {
                    Inknote.log("Error: Instantiation failed. Use SettingsManager.Current() instead of new.");
                }
                SettingsManager._instance = this;
            }
            Object.defineProperty(SettingsManager, "Current", {
                get: function () {
                    return SettingsManager.Instance.getCurrentSetting();
                },
                enumerable: true,
                configurable: true
            });
            SettingsManager.prototype.getCurrentSetting = function () {
                var inst = SettingsManager.Instance;
                if (!inst._currentSetting) {
                    if (!inst._settings || inst._settings.length < 1) {
                        inst.addSetting(new Inknote.Setting("Default"));
                    }
                    inst.setCurrentSetting(inst.getSettings()[0]);
                }
                return inst._currentSetting;
            };
            SettingsManager.prototype.setCurrentSetting = function (setting) {
                this._currentSetting = setting;
            };
            SettingsManager.prototype.getSettings = function () {
                return this._settings;
            };
            SettingsManager.prototype.setSettings = function (settings) {
                this._settings = settings;
            };
            SettingsManager.prototype.addSettings = function (settings) {
                this._settings = this._settings.concat(settings);
            };
            SettingsManager.prototype.addSetting = function (setting) {
                this._settings = this._settings.concat(setting);
            };
            Object.defineProperty(SettingsManager, "Instance", {
                get: function () {
                    if (!this._instance) {
                        this._instance = new SettingsManager();
                    }
                    return SettingsManager._instance;
                },
                enumerable: true,
                configurable: true
            });
            return SettingsManager;
        })();
        Managers.SettingsManager = SettingsManager;
    })(Managers = Inknote.Managers || (Inknote.Managers = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Managers;
    (function (Managers) {
        var ProjectManager = (function () {
            function ProjectManager() {
                this._projects = [];
            }
            ProjectManager.prototype.addProjects = function (items) {
                this._projects = this._projects.concat(items);
            };
            // synchronous call.
            ProjectManager.prototype.addProject = function (item, callback) {
                var self = this;
                var itemAlreadyExists = Inknote.anyItemIs(this._projects, function (proj) {
                    return proj.ID == item.ID;
                });
                if (itemAlreadyExists) {
                    Inknote.check("an item already exists with this ID. Change this project's ID and continue?", function () {
                        item.ID = Inknote.getID();
                        self._projects.push(item);
                        if (callback) {
                            callback(item);
                        }
                    }, function () {
                        return;
                    });
                }
                else {
                    this._projects.push(item);
                    if (callback) {
                        callback(item);
                    }
                }
            };
            ProjectManager.prototype.setCurrentProject = function (ID) {
                this._currentProject = Inknote.getItemFromID(this._projects, ID);
            };
            Object.defineProperty(ProjectManager, "Instance", {
                get: function () {
                    if (!ProjectManager._instance) {
                        ProjectManager._instance = new ProjectManager();
                    }
                    return ProjectManager._instance;
                },
                enumerable: true,
                configurable: true
            });
            ProjectManager.prototype.openProjectFromURL = function () {
                var search = window.location.search.replace("?", "");
                var searches = search.split("&");
                for (var i = 0; i < searches.length; i++) {
                    var keyValue = searches[i].split("=");
                    if (keyValue[0] == "Score") {
                        this.setCurrentProject(keyValue[1]);
                    }
                }
            };
            Object.defineProperty(ProjectManager.prototype, "currentProject", {
                get: function () {
                    if (!this._currentProject) {
                        this._currentProject = new Inknote.Project();
                    }
                    return this._currentProject;
                },
                enumerable: true,
                configurable: true
            });
            ProjectManager.prototype.save = function () {
                if (this._projects.indexOf(this._currentProject) == -1) {
                    this._projects.push(this._currentProject);
                }
                var compressed = Inknote.ProjectConverter.compressAll(this._projects);
                Inknote.Storage.saveProjects(compressed);
            };
            Object.defineProperty(ProjectManager.prototype, "allProjects", {
                get: function () {
                    return this._projects;
                },
                enumerable: true,
                configurable: true
            });
            ProjectManager.prototype.deleteSelectedProject = function () {
                this.deleteProjectByID(this.selectID);
            };
            ProjectManager.prototype.deleteProjectByID = function (ID) {
                var index = Inknote.getIndexFromID(this._projects, ID);
                var proj = Inknote.getItemFromID(this._projects, ID);
                var projName = proj.name;
                var self = this;
                Inknote.check("Are you sure you want to delete project \"" + projName + "\"", function () {
                    if (index != null) {
                        self._projects.splice(index, 1);
                    }
                    if (proj.ID == self._currentProject.ID) {
                        if (self._projects.length > 0) {
                            self._currentProject = Inknote.last(self._projects);
                        }
                        else {
                            self._currentProject = null;
                        }
                    }
                    setTimeout(function () {
                        self.currentProject.pause = false;
                    }, 100);
                }, function () {
                    Inknote.log("\"" + projName + "\" deletion cancelled");
                });
            };
            ProjectManager.prototype.openSelectedProject = function () {
                this.setCurrentProject(this.selectID);
                Managers.PageManager.Current.page = 0 /* Score */;
                Managers.ProjectManager.Instance._currentProject.pause = false;
                this.selectID = null;
            };
            ProjectManager.prototype.openProjectFromID = function (ID) {
                this.setCurrentProject(ID);
                Managers.PageManager.Current.page = 0 /* Score */;
                Managers.ProjectManager.Instance._currentProject.pause = false;
                this.selectID = null;
            };
            ProjectManager.prototype.next = function () {
                var projects = this._projects;
                if (projects.length < 2) {
                    this.selectID = projects[0].ID;
                    return;
                }
                var index = Inknote.getIndexFromID(projects, this.selectID);
                if (index == projects.length - 1 || index == null) {
                    this.selectID = projects[0].ID;
                }
                else {
                    this.selectID = projects[index + 1].ID;
                }
            };
            ProjectManager.prototype.previous = function () {
                var projects = this._projects;
                if (projects.length < 2) {
                    this.selectID = projects[0].ID;
                    return;
                }
                var index = Inknote.getIndexFromID(projects, this.selectID);
                if (index == 0 || index == null) {
                    var lastProject = Inknote.last(projects);
                    this.selectID = lastProject.ID;
                }
                else {
                    this.selectID = projects[index - 1].ID;
                }
            };
            return ProjectManager;
        })();
        Managers.ProjectManager = ProjectManager;
    })(Managers = Inknote.Managers || (Inknote.Managers = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Managers;
    (function (Managers) {
        var PluginManager = (function () {
            function PluginManager() {
                this._plugins = [];
                this._pluginNames = [];
            }
            Object.defineProperty(PluginManager, "Instance", {
                get: function () {
                    if (!PluginManager._instance) {
                        PluginManager._instance = new PluginManager();
                    }
                    return PluginManager._instance;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PluginManager.prototype, "plugins", {
                get: function () {
                    return this._plugins;
                },
                enumerable: true,
                configurable: true
            });
            PluginManager.prototype.getCompressedPlugins = function () {
                var plugins = this.plugins;
                var compressedPlugins = [];
                for (var i = 0; i < plugins.length; i++) {
                    var newPlugin = new Inknote.Plugins.Compressed.InknotePlugin(plugins[i].name);
                    newPlugin.ID = plugins[i].ID;
                    newPlugin.active = plugins[i].active;
                    newPlugin.allowOnDraw = plugins[i].allowOnDraw;
                    newPlugin.allowOnSave = plugins[i].allowOnSave;
                    var pluginName = this.findPluginNameByName(plugins[i].name);
                    newPlugin.URL = pluginName.URL;
                    newPlugin.description = pluginName.description;
                    compressedPlugins.push(newPlugin);
                }
                return compressedPlugins;
            };
            PluginManager.prototype.addPlugin = function (plugin) {
                this._plugins.push(plugin);
            };
            Object.defineProperty(PluginManager.prototype, "pluginNames", {
                get: function () {
                    return this._pluginNames;
                },
                enumerable: true,
                configurable: true
            });
            PluginManager.prototype.addPluginName = function (pluginName, multipleUse) {
                this._pluginNames.push(pluginName);
                if (multipleUse !== true) {
                    this.generatePluginHtml();
                }
            };
            PluginManager.prototype.addPluginNames = function (pluginNames) {
                for (var pluginName in pluginNames) {
                    this.addPluginName(pluginNames[pluginName], true);
                }
                this.generatePluginHtml();
            };
            PluginManager.prototype.removePlugin = function (ID) {
                var newPlugins = [];
                for (var i = 0; i < this._plugins.length; i++) {
                    if (this._plugins[i].ID != ID) {
                        newPlugins.push(this._plugins[i]);
                    }
                }
                this._plugins = newPlugins;
            };
            PluginManager.prototype.setPluginNameVal = function (name, val) {
                this._pluginNames[name].active = val;
                this.generatePluginHtml();
                setTimeout(function () {
                    Inknote.Storage.savePlugins();
                }, 200);
            };
            PluginManager.prototype.generateListHtml = function () {
                var self = this;
                var div = document.getElementById("plugin-list-items");
                // clear html
                div.innerHTML = "";
                for (var plugin in this._pluginNames) {
                    var pluginName = this._pluginNames[plugin];
                    var plugDiv = document.createElement("div");
                    plugDiv.className = "plugin-list-item";
                    var plugDivText = document.createElement("div");
                    plugDivText.innerText = pluginName.name + " - " + pluginName.description;
                    plugDivText.style.display = "inline-block";
                    var plugCheck = document.createElement("input");
                    plugCheck.type = "checkbox";
                    plugCheck.checked = pluginName.active;
                    plugCheck.id = "plugin-" + plugin;
                    plugCheck.onclick = function (ev) {
                        var target = ev.target;
                        if (target.checked) {
                            Inknote.check("Are you sure you want this plugin?", function () {
                                self.setPluginNameVal(target.id.split("-")[1], target.checked);
                            }, function () {
                                target.checked = !target.checked;
                            });
                        }
                        else {
                            self.setPluginNameVal(target.id.split("-")[1], target.checked);
                        }
                    };
                    plugDiv.appendChild(plugCheck);
                    plugDiv.appendChild(plugDivText);
                    div.appendChild(plugDiv);
                }
            };
            PluginManager.prototype.getPluginsWithEvents = function () {
                var plugins = Inknote.getItemsWhere(this._plugins, function (item) {
                    return item.active;
                });
                var result = [];
                for (var i = 0; i < plugins.length; i++) {
                    var existingFns = plugins[i].getExistingFunctions();
                    if (existingFns.length > 0) {
                        result.push({
                            name: plugins[i].name,
                            functions: existingFns
                        });
                    }
                }
                return result;
            };
            PluginManager.prototype.getPluginsByEvents = function () {
                var sortedPluginEvents = [];
                var plugins = this.getPluginsWithEvents();
                for (var i = 0; i < plugins.length; i++) {
                    var tmp = plugins[i];
                    for (var j = 0; j < tmp.functions.length; j++) {
                        var tmpFn = tmp.functions[j];
                        var added = false;
                        for (var k = 0; k < sortedPluginEvents.length; k++) {
                            var sortedPlugin = sortedPluginEvents[k];
                            if (sortedPlugin.event == tmpFn) {
                                sortedPlugin.plugins.push(tmp.name);
                                added = true;
                            }
                        }
                        if (added == false) {
                            sortedPluginEvents.push({
                                event: tmpFn,
                                plugins: [tmp.name]
                            });
                        }
                    }
                }
                return sortedPluginEvents;
            };
            PluginManager.prototype.setPluginOnSaveAllow = function (ID, value) {
                var name = ID.split("...")[1];
                var plugin = this.findPluginByName(name);
                plugin.allowOnSave = value;
                setTimeout(function () {
                    Inknote.Storage.savePlugins();
                }, 200);
            };
            PluginManager.prototype.setPluginOnDrawAllow = function (ID, value) {
                var name = ID.split("...")[1];
                var plugin = this.findPluginByName(name);
                plugin.allowOnDraw = value;
                setTimeout(function () {
                    Inknote.Storage.savePlugins();
                }, 200);
            };
            PluginManager.prototype.setPluginOnBeforeDrawAllow = function (ID, value) {
                var name = ID.split("...")[1];
                var plugin = this.findPluginByName(name);
                plugin.allowBeforeDraw = value;
                setTimeout(function () {
                    Inknote.Storage.savePlugins();
                }, 200);
            };
            PluginManager.prototype.generateEventListHtml = function () {
                var self = this;
                var pluginsByEvents = this.getPluginsByEvents();
                var div = document.getElementById("plugin-event-list");
                // clear html
                div.innerHTML = "<h3>Events</h3>";
                for (var i = 0; i < pluginsByEvents.length; i++) {
                    var event = pluginsByEvents[i].event;
                    var plgs = pluginsByEvents[i].plugins;
                    var eventDiv = document.createElement("div");
                    eventDiv.innerText = event;
                    eventDiv.className = "plugin-list-item";
                    div.appendChild(eventDiv);
                    var pluginsDiv = document.createElement("div");
                    for (var j = 0; j < plgs.length; j++) {
                        var plugin = this.findPluginByName(plgs[j]);
                        if (plugin != null) {
                            var plgCheck = document.createElement("input");
                            plgCheck.type = "checkbox";
                            switch (event) {
                                case null:
                                    break;
                                case "before draw":
                                    plgCheck.checked = plugin.allowBeforeDraw;
                                    var pluginName = plugin.name;
                                    plgCheck.id = "ondraw..." + pluginName;
                                    plgCheck.onclick = function (ev) {
                                        var target = ev.target;
                                        self.setPluginOnBeforeDrawAllow(target.id, target.checked);
                                    };
                                    break;
                                case "on draw":
                                    plgCheck.checked = plugin.allowOnDraw;
                                    var pluginName = plugin.name;
                                    plgCheck.id = "ondraw..." + pluginName;
                                    plgCheck.onclick = function (ev) {
                                        var target = ev.target;
                                        self.setPluginOnDrawAllow(target.id, target.checked);
                                    };
                                    break;
                                case "on save":
                                    plgCheck.checked = plugin.allowOnSave;
                                    var pluginName = plugin.name;
                                    plgCheck.id = "onsave..." + pluginName;
                                    plgCheck.onclick = function (ev) {
                                        var target = ev.target;
                                        self.setPluginOnSaveAllow(target.id, target.checked);
                                    };
                                    break;
                            }
                            var plgRow = document.createElement("div");
                            plgRow.appendChild(plgCheck);
                            var plgSpan = document.createElement("span");
                            plgSpan.innerText = plgs[j];
                            plgRow.appendChild(plgSpan);
                            pluginsDiv.appendChild(plgRow);
                        }
                    }
                    div.appendChild(pluginsDiv);
                }
            };
            PluginManager.prototype.generateAdvancedHtml = function () {
            };
            PluginManager.prototype.generatePluginHtml = function () {
                if (typeof document != "undefined") {
                    this.generateListHtml();
                    this.generateEventListHtml();
                    this.generateAdvancedHtml();
                }
            };
            PluginManager.prototype.findPluginByName = function (name) {
                var items = Inknote.getItemsWhere(this._plugins, function (item) {
                    return item.name == name;
                });
                if (items.length == 0) {
                    return null;
                }
                return items[0];
            };
            PluginManager.prototype.findPluginNameByName = function (name) {
                var items = Inknote.getItemsWhere(this._pluginNames, function (item) {
                    return item.name == name;
                });
                if (items.length == 0) {
                    return null;
                }
                return items[0];
            };
            return PluginManager;
        })();
        Managers.PluginManager = PluginManager;
    })(Managers = Inknote.Managers || (Inknote.Managers = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Plugins;
    (function (Plugins) {
        var Compressed;
        (function (Compressed) {
            var InknotePlugin = (function () {
                function InknotePlugin(name) {
                    this.name = name;
                    this.ID = Inknote.getID();
                    this.allowOnSave = true;
                    this.allowOnDraw = true;
                }
                return InknotePlugin;
            })();
            Compressed.InknotePlugin = InknotePlugin;
        })(Compressed = Plugins.Compressed || (Plugins.Compressed = {}));
    })(Plugins = Inknote.Plugins || (Inknote.Plugins = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Plugins;
    (function (Plugins) {
        var InknotePluginName = (function () {
            function InknotePluginName(name, URL, description) {
                this.name = name;
                this.URL = URL;
                this.description = description;
                this._active = false;
                this.hasOpenedURL = false;
            }
            Object.defineProperty(InknotePluginName.prototype, "active", {
                get: function () {
                    return this._active;
                },
                set: function (newValue) {
                    if (this.hasOpenedURL) {
                        var plugin = Inknote.Managers.PluginManager.Instance.findPluginByName(this.name);
                        plugin.active = newValue;
                        // if loaded, needs to refresh sync.
                        Inknote.Managers.PluginManager.Instance.generatePluginHtml();
                    }
                    else {
                        var script = document.createElement("script");
                        script.src = this.URL;
                        script.onload = function () {
                            // needs to be called on load to be async.
                            Inknote.Managers.PluginManager.Instance.generatePluginHtml();
                            return false;
                        };
                        var head = document.getElementsByTagName("head")[0];
                        head.appendChild(script);
                        this.hasOpenedURL = true;
                    }
                    this._active = newValue;
                },
                enumerable: true,
                configurable: true
            });
            return InknotePluginName;
        })();
        Plugins.InknotePluginName = InknotePluginName;
        var InknotePlugin = (function () {
            function InknotePlugin(name) {
                this.name = name;
                this.ID = Inknote.getID();
                this._active = true;
                this.allowOnSave = true;
                this.allowBeforeDraw = true;
                this.allowOnDraw = true;
                var existingName = Inknote.Managers.PluginManager.Instance.findPluginNameByName(name);
                if (existingName) {
                    if (existingName.allowOnDraw != null) {
                        this.allowOnDraw = existingName.allowOnDraw;
                    }
                    if (existingName.allowOnSave != null) {
                        this.allowOnSave = existingName.allowOnSave;
                    }
                    if (existingName.allowBeforeDraw != null) {
                        this.allowBeforeDraw = existingName.allowBeforeDraw;
                    }
                    this.active = existingName.active;
                }
                else {
                    this.active = false;
                }
            }
            Object.defineProperty(InknotePlugin.prototype, "active", {
                get: function () {
                    return this._active;
                },
                set: function (newValue) {
                    this._active = newValue;
                    if (newValue) {
                        this.allowOnDraw = true;
                        this.allowOnSave = true;
                        this.allowBeforeDraw = true;
                    }
                },
                enumerable: true,
                configurable: true
            });
            InknotePlugin.prototype.getExistingFunctions = function () {
                var fns = [];
                if (this.onSave) {
                    fns.push("on save");
                }
                if (this.onDraw) {
                    fns.push("on draw");
                }
                if (this.beforeDraw) {
                    fns.push("before draw");
                }
                return fns;
            };
            return InknotePlugin;
        })();
        Plugins.InknotePlugin = InknotePlugin;
    })(Plugins = Inknote.Plugins || (Inknote.Plugins = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Plugins;
    (function (Plugins) {
        var pluginList = [
            new Plugins.InknotePluginName("snow background", "./scripts/plugins/instances/snow-back.js", "covers the background with snow"),
            new Plugins.InknotePluginName("plugin2", "./scripts/plugins/instances/plugin2.js", "testing on draw"),
            new Plugins.InknotePluginName("data storage", "./scripts/plugins/instances/data-storage.js", "testing on save")
        ];
        Inknote.Managers.PluginManager.Instance.addPluginNames(pluginList);
        function getPluginNameFromCompressed(compressed) {
            var result = new Plugins.InknotePluginName(compressed.name, compressed.URL, compressed.description);
            return result;
        }
        var compressedPlugins = Inknote.Storage.getPlugins();
        for (var i = 0; i < compressedPlugins.length; i++) {
            var decompressed = getPluginNameFromCompressed(compressedPlugins[i]);
            var existing = Inknote.Managers.PluginManager.Instance.findPluginNameByName(decompressed.name);
            if (!existing) {
                Inknote.Managers.PluginManager.Instance.addPluginName(decompressed);
            }
            var plugged = Inknote.Managers.PluginManager.Instance.findPluginNameByName(compressedPlugins[i].name);
            var compressed = compressedPlugins[i];
            plugged.active = compressedPlugins[i].active;
            plugged.allowOnDraw = compressed.allowOnDraw;
            plugged.allowOnSave = compressed.allowOnSave;
        }
        if (typeof document != "undefined") {
            setTimeout(function () {
                Inknote.Managers.PluginManager.Instance.generatePluginHtml();
            }, 300);
        }
    })(Plugins = Inknote.Plugins || (Inknote.Plugins = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    (function (ActionType) {
        ActionType[ActionType["NewProject"] = 0] = "NewProject";
        ActionType[ActionType["OpenProject"] = 1] = "OpenProject";
        ActionType[ActionType["SaveProject"] = 2] = "SaveProject";
        ActionType[ActionType["ToPage"] = 3] = "ToPage";
    })(Inknote.ActionType || (Inknote.ActionType = {}));
    var ActionType = Inknote.ActionType;
    function Action(aType, page) {
        //Managers.ProjectManager
        Inknote.ScrollService.Instance.x = 0;
        Inknote.ScrollService.Instance.y = 0;
        Inknote.Managers.ProjectManager.Instance.currentProject.pause = true;
        Inknote.Managers.ProjectManager.Instance.selectID = "";
        switch (aType) {
            case 0 /* NewProject */:
                newProject();
                break;
            case 1 /* OpenProject */:
                openProject();
                break;
            case 2 /* SaveProject */:
                saveProject();
                break;
            case 3 /* ToPage */:
                if (!page) {
                    page = 0 /* Score */;
                }
                moveToPage(page);
                break;
            default:
                Inknote.log("Unknown action type", 0 /* Error */);
        }
        // project manager needs to be static.
        setTimeout(function () {
            Inknote.Managers.ProjectManager.Instance.currentProject.pause = false;
        }, 100);
    }
    Inknote.Action = Action;
    function newProject() {
        var newProj = new Inknote.Project("Untitled");
        Inknote.Managers.ProjectManager.Instance.addProject(newProj, function (item) {
            Inknote.Managers.ProjectManager.Instance.setCurrentProject(item.ID);
            Inknote.Managers.PageManager.Current.page = 0 /* Score */;
            Inknote.Managers.ProjectManager.Instance.currentProject.pause = true;
        });
    }
    function openProject() {
        Inknote.Managers.PageManager.Current.page = 2 /* File */;
    }
    function saveProject() {
        Inknote.Managers.ProjectManager.Instance.save();
    }
    function moveToPage(page) {
        Inknote.Managers.PageManager.Current.page = page;
    }
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    ;
    ;
    var TouchCopy = (function () {
        function TouchCopy(identifier, pageX, pageY) {
            this.identifier = identifier;
            this.pageX = pageX;
            this.pageY = pageY;
        }
        return TouchCopy;
    })();
    function copyTouch(touch) {
        return new TouchCopy(touch.identifier, touch.pageX, touch.pageY);
    }
    var CanvasControl = (function () {
        function CanvasControl(drawService) {
            this.drawService = drawService;
            this.touchCopies = [];
            var self = this;
            this.drawService.canvas.onmouseover = function (e) {
                self.drawService.canvas.onmousemove = function (me) {
                    self.hover(me);
                };
            };
            this.drawService.canvas.onmouseout = function (e) {
                self.drawService.canvas.onmousemove = null;
            };
            this.drawService.canvas.onclick = function (e) {
                self.click(e);
            };
            this.drawService.canvas.ondblclick = function (e) {
                self.dblClick(e);
            };
            this.drawService.canvas.onmousedown = function (e) {
                self.mouseDown(e, drawService);
            };
            // right click
            this.drawService.canvas.oncontextmenu = function (e) {
                self.rightClick(e);
            };
            this.drawService.canvas.addEventListener("touchstart", function (e) {
                self.touchStart(e, self.drawService);
            }, false);
        }
        CanvasControl.prototype.hover = function (e) {
            var allItems = this.drawService.items;
            var hovered = false;
            var scoreItems = [];
            for (var i = 0; i < allItems.length; i++) {
                if (Inknote.mouseIsOver(allItems[i], e, this.drawService.canvas)) {
                    // log(allItems[i].y + ":" + e.clientY + ":" + ScrollService.Instance.y);
                    if (Inknote.Managers.PageManager.Current.page == 0 /* Score */) {
                        if (allItems[i] instanceof Inknote.Notation) {
                            scoreItems.push(allItems[i]);
                        }
                    }
                    var hoverID = allItems[i].ID;
                    Inknote.Managers.ProjectManager.Instance.hoverID = hoverID;
                    hovered = true;
                    this.drawService.canvas.style.cursor = "pointer";
                }
            }
            var sortedScoreItems = scoreItems.sort(function (a, b) {
                return b.order - a.order;
            });
            if (sortedScoreItems.length > 0) {
                Inknote.ScoringService.Instance.hoverID = sortedScoreItems[0].ID;
            }
            else {
                Inknote.ScoringService.Instance.hoverID = null;
            }
            if (!hovered) {
                Inknote.Managers.ProjectManager.Instance.hoverID = null;
                this.drawService.canvas.style.cursor = "";
            }
        };
        CanvasControl.prototype.click = function (e) {
            var allItems = this.drawService.items;
            var selected = false;
            var scoreItems = [];
            var sortedItems = [];
            for (var i = 0; i < allItems.length; i++) {
                sortedItems.push(allItems[i]);
            }
            sortedItems.sort(function (a, b) {
                return b.order - a.order;
            });
            for (var i = 0; i < sortedItems.length; i++) {
                if (Inknote.mouseIsOver(sortedItems[i], e, this.drawService.canvas)) {
                    var selectedID = sortedItems[i].ID;
                    // rightClick menu
                    if (selectedID == Inknote.RightClickMenuService.Instance.Menu.ID) {
                        Inknote.RightClickMenuService.Instance.Menu.click(e);
                        Inknote.RightClickMenuService.Instance.visible = false;
                        return;
                    }
                    // note control.
                    if (selectedID == Inknote.NoteControlService.Instance.ID) {
                        if (e.clientY - 50 > Inknote.NoteControlService.Instance.piano.y) {
                            Inknote.NoteControlService.Instance.piano.click(e);
                        }
                        else if (e.clientY - 50 < Inknote.NoteControlService.Instance.y) {
                            Inknote.NoteControlService.Instance.minimise.click(e);
                        }
                        else if (Inknote.NoteControlService.Instance.restControl.isOver(e.clientX, e.clientY - 50)) {
                            Inknote.NoteControlService.Instance.restControl.click(e);
                        }
                        else if (Inknote.NoteControlService.Instance.deleteNoteControl.isOver(e.clientX, e.clientY - 50)) {
                            Inknote.NoteControlService.Instance.deleteNoteControl.click(e);
                        }
                        else {
                            Inknote.NoteControlService.Instance.lengthControl.click(e);
                        }
                        return;
                    }
                    // if keyboard clicked, do keyboard action.
                    if (selectedID == Inknote.Drawing.Keyboard.Instance.ID) {
                        Inknote.Drawing.Keyboard.Instance.click(e);
                        return;
                    }
                    // " " bottom menu
                    if (selectedID == Inknote.Drawing.BottomMenu.Instance.ID) {
                        Inknote.Drawing.BottomMenu.Instance.click(e);
                        return;
                    }
                    // scroll bar
                    if (selectedID == Inknote.ScrollService.ScrollBar.ID) {
                        Inknote.ScrollService.ScrollBar.click(e);
                        return;
                    }
                    // scroll thumbnail
                    if (selectedID == Inknote.ScrollService.ScrollBar.scrollThumbnail.ID) {
                        Inknote.ScrollService.ScrollBar.scrollThumbnail.click(e);
                        return;
                    }
                    // licence
                    if (selectedID == Inknote.LicenceService.Instance.drawing.ID) {
                        Inknote.LicenceService.Instance.drawing.click(e);
                        return;
                    }
                    if (Inknote.Managers.PageManager.Current.page == 0 /* Score */) {
                        if (sortedItems[i] instanceof Inknote.Notation) {
                            scoreItems.push(sortedItems[i]);
                        }
                    }
                    Inknote.Managers.ProjectManager.Instance.selectID = selectedID;
                    selected = true;
                }
            }
            var sortedScoreItems = scoreItems.sort(function (a, b) {
                return b.order - a.order;
            });
            if (sortedScoreItems.length > 0) {
                Inknote.ScoringService.Instance.selectID = sortedScoreItems[0].ID;
            }
            else {
                Inknote.ScoringService.Instance.selectID = null;
            }
            if (!selected) {
                // clear
                Inknote.ScrollService.ScrollBar.scrollThumbnail.visible = false;
                Inknote.Managers.ProjectManager.Instance.selectID = null;
                Inknote.RightClickMenuService.Instance.visible = false;
            }
        };
        CanvasControl.prototype.dblClick = function (e) {
            if (Inknote.Managers.PageManager.Current.page == 2 /* File */) {
                if (Inknote.Managers.ProjectManager.Instance.selectID) {
                    Inknote.Managers.ProjectManager.Instance.openSelectedProject();
                }
            }
        };
        CanvasControl.prototype.mouseDown = function (e, drawService) {
            var onMove = function (e) {
                // ScrollService.Instance.x += e.movementX;
                if (e.movementY > 0 && Inknote.canScroll(true) || e.movementY < 0 && Inknote.canScroll(false)) {
                    Inknote.ScrollService.Instance.y -= e.movementY;
                }
                drawService.canvas.style.cursor = "-webkit-grabbing";
            };
            drawService.canvas.addEventListener("mousemove", onMove, false);
            drawService.canvas.onmouseup = function (e) {
                drawService.canvas.removeEventListener("mousemove", onMove, false);
            };
            drawService.canvas.onmouseout = function (e) {
                drawService.canvas.removeEventListener("mousemove", onMove, false);
            };
        };
        CanvasControl.prototype.getTouchCopyByID = function (ID) {
            for (var i = 0; i < this.touchCopies.length; i++) {
                if (this.touchCopies[i].identifier == ID) {
                    return this.touchCopies[i];
                }
            }
            return null;
        };
        CanvasControl.prototype.touchStart = function (e, drawService) {
            var touches = e.touches;
            this.touchCopies = [];
            for (var i = 0; i < touches.length; i++) {
                this.touchCopies.push(copyTouch(touches[i]));
            }
            var self = this;
            var onMove = function (e) {
                var touches = e.changedTouches;
                for (var i = 0; i < touches.length; i++) {
                    var touch = touches[i];
                    var lastTouch = self.getTouchCopyByID(touch.identifier);
                    var movementX = touch.pageX - lastTouch.pageX;
                    var movementY = touch.pageY - lastTouch.pageY;
                    if (movementY > 0 && Inknote.canScroll(true) || movementY < 0 && Inknote.canScroll(false)) {
                        Inknote.ScrollService.Instance.y -= movementY;
                    }
                    lastTouch.pageX = touch.pageX;
                    lastTouch.pageY = touch.pageY;
                }
            };
            drawService.canvas.addEventListener("touchmove", onMove, false);
            drawService.canvas.addEventListener("touchend", function (e) {
                drawService.canvas.removeEventListener("touchmove", onMove, false);
            }, false);
            drawService.canvas.addEventListener("touchleave", function (e) {
                drawService.canvas.removeEventListener("touchmove", onMove, false);
            }, false);
        };
        CanvasControl.prototype.rightClick = function (e) {
            Inknote.RightClickMenuService.Instance.openMenu(e.clientX, e.clientY - 50, this.drawService.canvas);
            e.preventDefault();
        };
        return CanvasControl;
    })();
    Inknote.CanvasControl = CanvasControl;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    if (typeof window != "undefined") {
        window.onmousewheel = function (ev) {
            var isUp = false;
            if (ev.wheelDelta > 0) {
                isUp = true;
            }
            if (isUp) {
                Inknote.ScrollService.Instance.up();
            }
            else {
                Inknote.ScrollService.Instance.down();
            }
        };
    }
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    if (typeof document != "undefined" && typeof window != "undefined") {
        document.onkeydown = function (e) {
            if (Inknote.CONFIRM_IS_OPEN) {
                return;
            }
            if (e.keyCode == 8) {
                e.preventDefault();
            }
        };
        window.onkeyup = function (ev) {
            if (Inknote.CONFIRM_IS_OPEN) {
                return;
            }
            switch (Inknote.Managers.PageManager.Current.page) {
                case 2 /* File */:
                    fileType(ev);
                    break;
                case 0 /* Score */:
                    scoreType(ev);
                    break;
                default:
                    break;
            }
        };
    }
    function scoreType(e) {
        var inst = Inknote.Managers.ProjectManager.Instance;
        var proj = inst.currentProject;
        // name is selected
        var noteVal = null;
        if (!Inknote.ProjectConverter.name.select) {
            switch (e.keyCode) {
                case 65:
                    noteVal = 3 /* C */;
                    break;
                case 87:
                    noteVal = 4 /* Db */;
                    break;
                case 83:
                    noteVal = 5 /* D */;
                    break;
                case 69:
                    noteVal = 6 /* Eb */;
                    break;
                case 68:
                    noteVal = 7 /* E */;
                    break;
                case 70:
                    noteVal = 8 /* F */;
                    break;
                case 84:
                    noteVal = 9 /* Gb */;
                    break;
                case 71:
                    noteVal = 10 /* G */;
                    break;
                case 89:
                    noteVal = 11 /* Ab */;
                    break;
                case 72:
                    noteVal = 0 /* A */;
                    break;
                case 85:
                    noteVal = 1 /* Bb */;
                    break;
                case 74:
                    noteVal = 2 /* B */;
                    break;
                case 37:
                    Inknote.ScoringService.Instance.cursorLeft();
                    break;
                case 39:
                    Inknote.ScoringService.Instance.cursorRight();
                    break;
                case 38:
                    Inknote.NoteControlService.Instance.noteValueUp();
                    break;
                case 40:
                    Inknote.NoteControlService.Instance.noteValueDown();
                    break;
                case 46:
                    Inknote.NoteControlService.Instance.deleteSelected();
            }
        }
        if (noteVal != null) {
            if (Inknote.ScoringService.Instance.selectID == null) {
                Inknote.NoteControlService.Instance.addNote(new Inknote.Model.Note(noteVal, Inknote.NoteControlService.Instance.piano.octave, Inknote.NoteControlService.Instance.lengthControl.selectedLength));
            }
            else {
                Inknote.NoteControlService.Instance.editNoteValueAndOctave(noteVal, Inknote.NoteControlService.Instance.piano.octave);
            }
        }
        if (Inknote.ScoringService.Instance.SelectedItem instanceof Inknote.Drawing.Clef) {
            switch (e.keyCode) {
                case 38:
                    Inknote.NoteControlService.Instance.editCurrentClef(true);
                    break;
                case 40:
                    Inknote.NoteControlService.Instance.editCurrentClef(false);
                    break;
            }
        }
        if (inst.selectID == proj.ID) {
            if (e.keyCode == 13) {
                // enter
                inst.selectID = null;
            }
            else if (Inknote.countWhere([16, 17, 18, 20], function (item) {
                return item == e.keyCode;
            }) > 0) {
            }
            else if (e.keyCode == 8) {
                // backspace
                proj.name = proj.name.substr(0, proj.name.length - 1);
            }
            else if (e.keyCode == 46) {
                // delete
                proj.name = "";
            }
            else {
                proj.name = Inknote.pascalCase(proj.name + String.fromCharCode(e.keyCode));
            }
        }
        e.preventDefault();
    }
    function fileType(e) {
        var inst = Inknote.Managers.ProjectManager.Instance;
        var proj = inst.currentProject;
        if (e.keyCode == 13) {
            // enter
            inst.openSelectedProject();
        }
        else if (e.keyCode == 38) {
            // up
            Inknote.ScrollService.Instance.up();
        }
        else if (e.keyCode == 40) {
            // down
            Inknote.ScrollService.Instance.down();
        }
        else if (e.keyCode == 37) {
            // left
            inst.previous();
        }
        else if (e.keyCode == 39) {
            // right
            inst.next();
        }
        else if (e.keyCode == 46) {
            // delete
            inst.deleteSelectedProject();
        }
    }
})(Inknote || (Inknote = {}));
var FrontEnd;
(function (FrontEnd) {
    function toggleElement(item) {
        var classes = item.className;
        var isHidden = classes.indexOf("hidden") != -1;
        if (isHidden) {
            showElement(item);
        }
        else {
            hideElement(item);
        }
    }
    FrontEnd.toggleElement = toggleElement;
    function hideElement(item) {
        var classes = item.className;
        var isHidden = classes.indexOf("hidden") != -1;
        if (!isHidden) {
            item.className = item.className.trim();
            item.className = item.className + " hidden";
        }
    }
    FrontEnd.hideElement = hideElement;
    function showElement(item) {
        var classes = item.className;
        var isHidden = classes.indexOf("hidden") != -1;
        if (isHidden) {
            item.className = item.className.replace("hidden", "");
        }
    }
    FrontEnd.showElement = showElement;
    function deSelect(item) {
        var classes = item.className;
        var isHidden = classes.indexOf("select") != -1;
        if (isHidden) {
            item.className = item.className.replace("select", "");
        }
    }
    FrontEnd.deSelect = deSelect;
    function select(item) {
        var classes = item.className;
        var isHidden = classes.indexOf("select") != -1;
        if (!isHidden) {
            item.className = item.className + " select";
        }
    }
    FrontEnd.select = select;
})(FrontEnd || (FrontEnd = {}));
var Modal;
(function (Modal) {
    function toggle(ID) {
        var item = document.getElementById(ID);
        FrontEnd.toggleElement(item);
        FrontEnd.toggleElement(document.getElementById("modal-cover"));
    }
    Modal.toggle = toggle;
    function hideAllModals() {
        var modals = document.getElementsByClassName("modal");
        for (var i = 0; i < modals.length; i++) {
            if (modals[i].className.indexOf("hidden") == -1) {
                FrontEnd.hideElement(modals[i]);
            }
        }
        FrontEnd.hideElement(document.getElementById("modal-cover"));
    }
    Modal.hideAllModals = hideAllModals;
    function hide(ID) {
        var item = document.getElementById(ID);
        FrontEnd.hideElement(item);
        FrontEnd.hideElement(document.getElementById("modal-cover"));
    }
    Modal.hide = hide;
    function show(ID) {
        var item = document.getElementById(ID);
        FrontEnd.showElement(item);
        FrontEnd.showElement(document.getElementById("modal-cover"));
    }
    Modal.show = show;
    function cancelReport() {
        var textElement = document.getElementById("report-text");
        var checkElement = document.getElementById("report-checkbox");
        textElement.value = "";
        checkElement.checked = false;
        hide("report");
    }
    Modal.cancelReport = cancelReport;
    function submitReport() {
        var textElement = document.getElementById("report-text");
        var checkElement = document.getElementById("report-checkbox");
        var text = textElement.value;
        var check = checkElement.checked;
        textElement.value = "";
        checkElement.checked = false;
        hide("report");
    }
    Modal.submitReport = submitReport;
})(Modal || (Modal = {}));
var Actions;
(function (Actions) {
    var Plugins;
    (function (Plugins) {
        function PluginMenuClick(ev, ID) {
            var target = ev;
            var menuItems = document.getElementsByClassName("plugin-menu-item");
            var pageItems = [
                "plugin-list",
                "plugin-event-list",
                "plugin-advanced"
            ];
            for (var item = 0; item < menuItems.length; item++) {
                FrontEnd.deSelect(menuItems[item]);
            }
            for (var item = 0; item < pageItems.length; item++) {
                var pageItem = document.getElementById(pageItems[item]);
                FrontEnd.hideElement(pageItem);
            }
            var openItem = document.getElementById(ID);
            FrontEnd.showElement(openItem);
            FrontEnd.select(target);
        }
        Plugins.PluginMenuClick = PluginMenuClick;
    })(Plugins = Actions.Plugins || (Actions.Plugins = {}));
})(Actions || (Actions = {}));
var Inknote;
(function (Inknote) {
    if (typeof window != "undefined") {
        window.onresize = function () {
            Inknote.ScoringService.Instance.refresh();
            if (Inknote.ScoringService.Instance.maxScrollPosition < Inknote.ScrollService.Instance.y) {
                Inknote.ScrollService.Instance.y = Inknote.ScoringService.Instance.maxScrollPosition - 100;
            }
        };
    }
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Main;
    (function (Main) {
        Main.x;
        if (typeof document != "undefined") {
            // load setting manager
            var settingsManager = Inknote.Managers.SettingsManager.Instance;
            var appSetting = new Inknote.Setting("Default");
            // ***********************************************
            // ** comment out the following line when live. **
            // appSetting.testMode = true;
            // ***********************************************
            // ***********************************************
            // *** uncomment the following to test mobile  ***
            // Managers.MachineManager.Instance.machineType = Managers.MachineType.Mobile;
            // ***********************************************
            settingsManager.addSetting(appSetting);
            settingsManager.addSettings(Inknote.Storage.getSettings());
            // load drawing settings
            var drawing = Inknote.DrawingSettings.Instance;
            // load project manager
            var projectManager = Inknote.Managers.ProjectManager.Instance;
            var decompressedProjects = Inknote.ProjectConverter.decompressAll(Inknote.Storage.getProjects());
            projectManager.addProjects(decompressedProjects);
            projectManager.openProjectFromURL();
            Main.x = new Inknote.DrawService("my-canvas");
            var y = new Inknote.CanvasControl(Main.x);
        }
    })(Main = Inknote.Main || (Inknote.Main = {}));
})(Inknote || (Inknote = {}));
if (typeof window != "undefined") {
    if (Inknote.Managers.SettingsManager.Current.testMode) {
        console.log("%cWARNING", "color: white; border: 1px solid black; font-size: 40px; padding: 0 10px; background: red; text-shadow: 1px 1px 0 black;");
        console.log("%cthis app is running in test mode", "font-size: 15px; font-family: 'Courier New'");
    }
    else {
        console.log("%cWARNING", "color: white; border: 1px solid black; font-size: 40px; padding: 0 10px; background: red; text-shadow: 1px 1px 0 black;");
        console.log("%cthis is the developer console", "font-size: 15px; font-family: 'Courier New'");
        console.log("%conly use this if you know what you are doing", "font-size: 15px; font-family: 'Courier New'");
    }
}
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
/// <reference path="scripts/model/compressed/compressedclef.ts" />
/// <reference path="scripts/model/compressed/compressedtimesignature.ts" />
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
/// <reference path="scripts/services/clefservice.ts" />
/// <reference path="scripts/services/timesignatureservice.ts" />
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
//# sourceMappingURL=@script.js.map