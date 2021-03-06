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
    function maxOutOf(items, xAndY) {
        if (items === null || items === undefined) {
            return -Infinity;
        }
        var max = -Infinity;
        for (var i = 0; i < items.length; i++) {
            var val = xAndY(items[i]);
            if (val > max) {
                max = val;
            }
        }
        return max;
    }
    Inknote.maxOutOf = maxOutOf;
    function minOutOf(items, xAndY) {
        if (items === null || items === undefined) {
            return Infinity;
        }
        var max = Infinity;
        for (var i = 0; i < items.length; i++) {
            var val = xAndY(items[i]);
            if (val < max) {
                max = val;
            }
        }
        return max;
    }
    Inknote.minOutOf = minOutOf;
    function getItemWithMax(items, xAndY) {
        var maxValue = -Infinity;
        var maxIndex;
        if (items == null) {
            return null;
        }
        for (var i = 0; i < items.length; i++) {
            var val = xAndY(items[i]);
            if (val > maxValue) {
                maxValue = val;
                maxIndex = i;
            }
        }
        return items[maxIndex];
    }
    Inknote.getItemWithMax = getItemWithMax;
    function getItemWithMin(items, xAndY) {
        var minValue = Infinity;
        var minIndex;
        if (items == null) {
            return null;
        }
        for (var i = 0; i < items.length; i++) {
            var val = xAndY(items[i]);
            if (val < minValue) {
                minValue = val;
                minIndex = i;
            }
        }
        return items[minIndex];
    }
    Inknote.getItemWithMin = getItemWithMin;
    function getFirstItemWhere(items, xAndY) {
        if (items === null || items === undefined) {
            return null;
        }
        for (var i = 0; i < items.length; i++) {
            if (xAndY(items[i])) {
                return items[i];
            }
        }
    }
    Inknote.getFirstItemWhere = getFirstItemWhere;
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
                newString += textArray[i];
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
        Maths.permutateSimpleNumberArray = permutateSimpleNumberArray;
        function alignSimilarArrayTo(toBeAligned, toAlignTo) {
            var permutation = Inknote.copySimpleArrayFrom(toBeAligned);
            var bestValue = Infinity;
            var bestPermutation = Inknote.copySimpleArrayFrom(permutation);
            var permutations = toBeAligned.length;
            for (var i = 0; i < permutations; i++) {
                permutation = permutateSimpleNumberArray(permutation);
                var score = 0;
                // todo: if difference is less than bestValue
                for (var j = 0; j < permutation.length; j++) {
                    score += Math.abs(permutation[j] - toAlignTo[j]);
                }
                if (score < bestValue) {
                    bestValue = score;
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
            this.displayID = false;
            this.staveColour = "black";
            this.noteColour = "red";
            this.textColour = "green";
            this.serverURL = "https://lit-basin-6551.herokuapp.com";
            this.ID = Inknote.getID();
            this.name = name;
            this.testMode = false;
            this.notationType = Inknote.NotationType.Standard;
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
                this.clefType = ClefType.GClef;
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
                this.clefType = ClefType.GClef;
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
                this.clefType = ClefType.CClef;
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
                this.clefType = ClefType.CClef;
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
                this.clefType = ClefType.CClef;
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
                this.clefType = ClefType.CClef;
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
                this.clefType = ClefType.FClef;
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
                this.clefType = ClefType.FClef;
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
                this.clefType = ClefType.FClef;
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
        function GetNoteNameFromNoteValue(value) {
            switch (value) {
                case NoteValue.A:
                    return "A";
                case NoteValue.Bb:
                    return "Bb";
                case NoteValue.B:
                    return "B";
                case NoteValue.C:
                    return "C";
                case NoteValue.Db:
                    return "Db";
                case NoteValue.D:
                    return "D";
                case NoteValue.Eb:
                    return "Eb";
                case NoteValue.E:
                    return "E";
                case NoteValue.F:
                    return "F";
                case NoteValue.Gb:
                    return "Gb";
                case NoteValue.G:
                    return "G";
                case NoteValue.Ab:
                    return "Ab";
            }
        }
        Model.GetNoteNameFromNoteValue = GetNoteNameFromNoteValue;
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
                case NoteValue.A:
                case NoteValue.B:
                case NoteValue.C:
                case NoteValue.D:
                case NoteValue.E:
                case NoteValue.F:
                case NoteValue.G:
                    return false;
                case NoteValue.Ab:
                case NoteValue.Bb:
                case NoteValue.Db:
                case NoteValue.Eb:
                case NoteValue.Gb:
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
                this.isPlaying = false;
                this.value = value;
                this.octave = octave;
                if (length === null || length === undefined) {
                    length = Model.NoteLength.Crotchet;
                }
                this.length = length;
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
        var Text = (function () {
            function Text(txt) {
                this.ID = Inknote.getID();
                this.content = txt;
            }
            return Text;
        })();
        Model.Text = Text;
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
            this.bpm = 120;
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
    var TempData = (function () {
        function TempData() {
            this.noteControlsHidden = false;
            this.loggingLevel = 2;
        }
        return TempData;
    })();
    Inknote.TempData = TempData;
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
            ItemIdentifier[ItemIdentifier["TEXT"] = 5] = "TEXT";
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
                this.i = Compressed.ItemIdentifier.NOTE;
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
                this.i = Compressed.ItemIdentifier.CHORD;
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
                this.i = Compressed.ItemIdentifier.REST;
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
                this.i = Compressed.ItemIdentifier.CLEF;
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
                this.i = Compressed.ItemIdentifier.TIMESIGNATURE;
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
        var CompressedText = (function () {
            function CompressedText() {
                this.i = Compressed.ItemIdentifier.TEXT;
            }
            return CompressedText;
        })();
        Compressed.CompressedText = CompressedText;
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
                this.v = true;
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
            Model.NoteValue.C, Model.NoteValue.D, Model.NoteValue.E,
            Model.NoteValue.F, Model.NoteValue.G, Model.NoteValue.A, Model.NoteValue.B
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
                    // note: low priority.
                    // todo: finish naming system;
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
                Inknote.Managers.PageManager.Current.page = Inknote.Managers.Page.Licence;
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
            negativeHoverRed: "rgb(255,150,150)",
            green: "rgb(50,200,50)"
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
                case Inknote.Model.ClefType.GClef:
                    drawing = new Drawing.GClef(clef.drawLocation);
                    break;
                case Inknote.Model.ClefType.CClef:
                    drawing = new Drawing.CClef(clef.drawLocation);
                    break;
                case Inknote.Model.ClefType.FClef:
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
            if (note.isPlaying) {
                ctx.strokeStyle = Drawing.Colours.green;
                ctx.fillStyle = Drawing.Colours.green;
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
            if (note.noteLength == Inknote.Model.NoteLength.Breve) {
                ctx.lineWidth = 2;
                return;
            }
            //draw the note
            ctx.beginPath();
            ctx.arc(x, y, lineHeight / 2, 0, 2 * Math.PI, false);
            if (note.noteLength == Inknote.Model.NoteLength.SemiBreve) {
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.lineWidth = 1;
            }
            else {
                if (note.noteLength == Inknote.Model.NoteLength.Minim) {
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
                    if (note.noteLength > Inknote.Model.NoteLength.Crotchet) {
                        var tailX = x + lineHeight / 2 - 0.5;
                        var tailY = y - lineHeight * 7 / 2;
                        var tailController = note.noteLength - Inknote.Model.NoteLength.Crotchet;
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
                    if (note.noteLength > Inknote.Model.NoteLength.Crotchet) {
                        var tailX = x + 0.5 - lineHeight / 2;
                        var tailY = y + lineHeight * 7 / 2;
                        var tailController = note.noteLength - Inknote.Model.NoteLength.Crotchet;
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
                this.isPlaying = false;
            }
            return Note;
        })(Inknote.Notation);
        Drawing.Note = Note;
        var Breve = (function (_super) {
            __extends(Breve, _super);
            function Breve() {
                _super.apply(this, arguments);
                this.noteLength = Inknote.Model.NoteLength.Breve;
            }
            Breve.prototype.draw = function (ctx) {
                ctx.beginPath();
                ctx.fillStyle = Drawing.Colours.white;
                ctx.strokeStyle = Drawing.Colours.black;
                if (this.isPlaying) {
                    ctx.strokeStyle = Drawing.Colours.green;
                }
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
                this.noteLength = Inknote.Model.NoteLength.SemiBreve;
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
                this.noteLength = Inknote.Model.NoteLength.Minim;
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
                this.noteLength = Inknote.Model.NoteLength.Crotchet;
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
                this.noteLength = Inknote.Model.NoteLength.Quaver;
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
                this.noteLength = Inknote.Model.NoteLength.SemiQuaver;
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
                this.noteLength = Inknote.Model.NoteLength.DemiSemiQuaver;
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
                this.noteLength = Inknote.Model.NoteLength.HemiDemiSemiQuaver;
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
        var LedgerLine = (function (_super) {
            __extends(LedgerLine, _super);
            function LedgerLine(x, y) {
                _super.call(this);
                this.order = 45;
                this.x = x;
                this.y = y;
            }
            LedgerLine.prototype.draw = function (ctx) {
                ctx.beginPath;
                ctx.lineWidth = 1;
                ctx.strokeStyle = Drawing.Colours.black;
                if (this.hover || this.select) {
                    ctx.strokeStyle = Drawing.Colours.orange;
                }
                ctx.moveTo(this.x - 10, this.y);
                ctx.lineTo(this.x + 10, this.y);
                ctx.stroke();
                return true;
            };
            return LedgerLine;
        })(Inknote.Notation);
        Drawing.LedgerLine = LedgerLine;
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
        var DrawText = (function (_super) {
            __extends(DrawText, _super);
            function DrawText() {
                _super.apply(this, arguments);
            }
            DrawText.prototype.draw = function (ctx) {
                ctx.fillStyle = Drawing.Colours.black;
                if (this.select) {
                    ctx.fillStyle = Drawing.Colours.orange;
                }
                ctx.font = Drawing.Fonts.small;
                if (this.font != null && this.font != "") {
                    ctx.font = this.font;
                }
                ctx.beginPath();
                ctx.fillText(this.content, this.x, this.y);
                return true;
            };
            return DrawText;
        })(Inknote.Notation);
        Drawing.DrawText = DrawText;
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
                this.hasError = false;
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
                if (this.hover || this.select) {
                    ctx.strokeStyle = Drawing.Colours.orange;
                }
                else {
                    ctx.strokeStyle = Drawing.Colours.black;
                }
                if (this.select) {
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
                if (this.hasError) {
                    ctx.beginPath();
                    ctx.globalAlpha = 0.2;
                    ctx.fillStyle = Drawing.Colours.negativeRed;
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                    ctx.globalAlpha = 1;
                }
                if (this.barNumber) {
                    ctx.beginPath();
                    ctx.fillStyle = Drawing.Colours.black;
                    ctx.fillText(this.barNumber + "", this.x, this.y - 5);
                }
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
                this.order = 210;
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
                                text: "Open", click: function () {
                                    Inknote.Managers.ProjectManager.Instance.openSelectedProject();
                                }
                            },
                            {
                                text: "<", click: function () {
                                    Inknote.Managers.ProjectManager.Instance.previous();
                                }
                            },
                            {
                                text: ">", click: function () {
                                    Inknote.Managers.ProjectManager.Instance.next();
                                }
                            },
                            {
                                text: "Delete", click: function () {
                                    var inst = Inknote.Managers.ProjectManager.Instance;
                                    inst.deleteSelectedProject();
                                }, negative: true
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
                        if (e instanceof MouseEvent) {
                            e.preventDefault();
                        }
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
        var TempoMark = (function () {
            function TempoMark() {
                this.ID = Inknote.getID();
                this.x = 0;
                this.order = 90;
                this.hover = false;
                this.select = false;
            }
            Object.defineProperty(TempoMark, "Instance", {
                get: function () {
                    if (!TempoMark._instance) {
                        TempoMark._instance = new TempoMark();
                    }
                    return TempoMark._instance;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TempoMark.prototype, "y", {
                get: function () {
                    return -Inknote.ScrollService.Instance.y;
                },
                set: function (val) {
                    return;
                },
                enumerable: true,
                configurable: true
            });
            TempoMark.prototype.isOver = function (x, y) {
                return false;
            };
            TempoMark.prototype.draw = function () {
                return true;
            };
            return TempoMark;
        })();
        Drawing.TempoMark = TempoMark;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var ScrollBar;
        (function (ScrollBar_1) {
            var ScrollBar = (function () {
                function ScrollBar() {
                    this.ID = Inknote.getID();
                    this.y = 50;
                    this.width = 25;
                    this.order = 200;
                    this.buttonHeight = 20;
                    this.scrollThumbnail = new ScrollBar_1.ScrollThumbnail();
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
            ScrollBar_1.ScrollBar = ScrollBar;
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
                            Inknote.Action(Inknote.ActionType.SaveProject);
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
                    get: function () { return 25; },
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
                    ctx.globalAlpha = 1;
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
                            Inknote.Managers.PageManager.Current.openNewPage(Inknote.Managers.Page.Score, Inknote.RightClickMenuService.Instance.Menu.fileID);
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
                    this.items.unshift(new RightClickMenus.ClickableMenuItem("edit instruments", function () {
                        Inknote.InstrumentService.Instance.openInstrumentEditor();
                    }));
                    this.items.unshift(new RightClickMenus.ClickableMenuItem("add instrument", function () {
                        Inknote.InstrumentService.Instance.addInstrument();
                    }));
                    this.items.push(new RightClickMenus.ClickableMenuItem("print", function () {
                        Inknote.PrintService.Instance.print();
                    }));
                    this.items.push(new RightClickMenus.ClickableMenuItem("note count", function () {
                        Modal.generateProjectReport();
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
                delete imageData.data;
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
    (function (Landing_1) {
        var Landing = (function () {
            function Landing() {
                this.ended = false;
                this.canvas = document.getElementById("landing-canvas");
                this.ctx = this.canvas.getContext("2d");
                if (Inknote.Managers.MachineManager.Instance.machineType != Inknote.Managers.MachineType.Desktop) {
                    return;
                }
                this.canvas.width = this.canvas.parentElement.clientWidth;
                this.canvas.height = this.canvas.parentElement.clientHeight;
                this.metaballs = new Landing_1.MetaballList(20, this.canvas);
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
                if (Inknote.Managers.MachineManager.Instance.machineType != Inknote.Managers.MachineType.Desktop) {
                    this.canvas.parentElement.className += " hidden";
                }
                this.ended = true;
                if (Inknote.Managers.MachineManager.Instance.machineType == Inknote.Managers.MachineType.Desktop) {
                    this.metaballs.end();
                    this.canvas.parentElement.className += " faded";
                }
            };
            return Landing;
        })();
        Landing_1.Landing = Landing;
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
    (function (DropCanvas_1) {
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
                    this.springs.push(new DropCanvas_1.Spring(i * this.segmentSize, this.springBaseSize, this.canvas.height, i));
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
                var splashes = DropCanvas_1.updateFiles(self.files, self.springs, self.canvas.height - self.springBaseSize);
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
                DropCanvas_1.drawFiles(self.files, self.ctx);
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
                DropCanvas_1.updateSprings(self.springs);
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
                    window.requestAnimationFrame(function () { self.draw(self); });
                }
                else {
                    FrontEnd.hideElement(document.getElementById("drag-drop"));
                }
            };
            DropCanvas.prototype.drop = function (x, y) {
                this.dropped = true;
                this.files.push(new DropCanvas_1.DropFile(x, y));
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
                        var droplet = new DropCanvas_1.Droplet(pos, vel, 5 * Math.random());
                        this.droplets.push(droplet);
                    }
                }
            };
            return DropCanvas;
        })();
        DropCanvas_1.DropCanvas = DropCanvas;
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
                case Inknote.Model.NoteValue.A:
                    key = "h";
                    break;
                case Inknote.Model.NoteValue.Bb:
                    key = "u";
                    break;
                case Inknote.Model.NoteValue.B:
                    key = "j";
                    break;
                case Inknote.Model.NoteValue.C:
                    key = "a";
                    break;
                case Inknote.Model.NoteValue.Db:
                    key = "w";
                    break;
                case Inknote.Model.NoteValue.D:
                    key = "s";
                    break;
                case Inknote.Model.NoteValue.Eb:
                    key = "e";
                    break;
                case Inknote.Model.NoteValue.E:
                    key = "d";
                    break;
                case Inknote.Model.NoteValue.F:
                    key = "f";
                    break;
                case Inknote.Model.NoteValue.Gb:
                    key = "t";
                    break;
                case Inknote.Model.NoteValue.G:
                    key = "g";
                    break;
                case Inknote.Model.NoteValue.Ab:
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
                this.colour = PianoKeyColour.UNASSIGNED;
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
                if (this.colour == PianoKeyColour.BLACK) {
                    ctx.fillStyle = Drawing.Colours.black;
                }
                if (this.hover == true) {
                    ctx.fillStyle = Drawing.Colours.orange;
                }
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.fill();
                ctx.stroke();
                // key text
                if (Inknote.Managers.MachineManager.Instance.machineType == Inknote.Managers.MachineType.Desktop) {
                    ctx.beginPath();
                    var text = getKeyboardKeyFromNoteValue(this.noteValue);
                    ctx.textAlign = "center";
                    ctx.font = (Math.min((this.width * 12 / 20), this.height / 4)) + "px Arial";
                    if (this.colour == PianoKeyColour.WHITE) {
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
                this.colour = PianoKeyColour.WHITE;
            }
            return WhiteKey;
        })(PianoKey);
        Drawing.WhiteKey = WhiteKey;
        var BlackKey = (function (_super) {
            __extends(BlackKey, _super);
            function BlackKey() {
                _super.apply(this, arguments);
                this.colour = PianoKeyColour.BLACK;
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
                            if (Inknote.ScoringService.Instance.selectID == null || Inknote.ScoringService.Instance.SelectedItem instanceof Drawing.Bar) {
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
    (function (MessageType) {
        MessageType[MessageType["Error"] = 0] = "Error";
        MessageType[MessageType["Text"] = 1] = "Text";
        MessageType[MessageType["Warning"] = 2] = "Warning";
    })(Inknote.MessageType || (Inknote.MessageType = {}));
    var MessageType = Inknote.MessageType;
    function logLive(message, className) {
        if (typeof (window) != typeof (undefined)) {
            var logContainer = document.getElementById("log");
            var entry = document.createElement("div");
            entry.className = className;
            entry.textContent = message;
            entry.onclick = function (e) {
                var target = e.target;
                target.remove();
            };
            logContainer.appendChild(entry);
            setTimeout(function () {
                if (logContainer.hasChildNodes()) {
                    var firstChild = logContainer.childNodes[0];
                    logContainer.removeChild(firstChild);
                }
            }, 3000);
        }
    }
    function log(message, msgType) {
        if (msgType == MessageType.Error) {
            console.log("%c" + message, "color:red");
            logLive(message, "error");
            return;
        }
        var logLevel = Inknote.TempDataService ? Inknote.TempDataService.Instance.currentData.loggingLevel : 3;
        if (msgType == MessageType.Warning) {
            console.log("%c" + message, "color: orange");
            if (logLevel >= 2) {
                logLive(message, "warning");
            }
        }
        else {
            console.log(message);
            if (logLevel >= 3) {
                logLive(message, "entry");
            }
        }
    }
    Inknote.log = log;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Storage;
    (function (Storage) {
        var CookieManager = (function () {
            function CookieManager() {
            }
            Object.defineProperty(CookieManager, "Instance", {
                get: function () {
                    if (!CookieManager._instance) {
                        CookieManager._instance = new CookieManager();
                    }
                    return CookieManager._instance;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CookieManager.prototype, "_cookieJSON", {
                get: function () {
                    if (typeof (document) == typeof (undefined)) {
                        return {};
                    }
                    var cookieString = document.cookie;
                    if (cookieString == "" || cookieString == null) {
                        return {};
                    }
                    var jsonObject = JSON.parse(cookieString);
                    if (typeof (jsonObject) != typeof ({})) {
                        return {};
                    }
                    return jsonObject;
                },
                enumerable: true,
                configurable: true
            });
            CookieManager.prototype.getItem = function (key) {
                return this._cookieJSON[key];
            };
            CookieManager.prototype._setStringItem = function (key, value) {
                var cookieObject = this._cookieJSON;
                cookieObject[key] = value;
                document.cookie = JSON.stringify(cookieObject);
                Inknote.log("saved " + key);
            };
            CookieManager.prototype.setItem = function (key, value) {
                if (typeof (value) != typeof ("")) {
                    value = JSON.stringify(value);
                }
                try {
                    this._setStringItem(key, value);
                }
                catch (e) {
                    Inknote.log("saving cookie failed.", Inknote.MessageType.Error);
                    console.log(e);
                }
            };
            return CookieManager;
        })();
        Storage.CookieManager = CookieManager;
    })(Storage = Inknote.Storage || (Inknote.Storage = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Storage;
    (function (Storage) {
        var IDBTable = (function () {
            function IDBTable(objectStore) {
                this.objectStore = objectStore;
            }
            IDBTable.prototype.setStringItem = function (key, value) {
                if (!key) {
                    Inknote.log("you must have a key when setting a value", Inknote.MessageType.Error);
                    return;
                }
                var getRequest = this.objectStore.get(key);
                var self = this;
                // if doesn't exist
                getRequest.onerror = function (e) {
                    self.objectStore.add(value, key);
                };
                // if exists
                getRequest.onsuccess = function (e) {
                    self.objectStore.delete(key);
                    self.objectStore.add(value, key);
                };
            };
            IDBTable.prototype.setItem = function (key, value) {
                if (typeof (value) != typeof ("")) {
                    value = JSON.stringify(value);
                }
                this.setStringItem(key, value);
            };
            IDBTable.prototype.getItemThen = function (key, callback) {
                if (!key) {
                    Inknote.log("you can only retrieve items if you have their keys", Inknote.MessageType.Error);
                }
                var getRequest = this.objectStore.get(key);
                getRequest.onerror = function (e) {
                    callback(null);
                };
                getRequest.onsuccess = function (e) {
                    callback(getRequest.result);
                };
            };
            return IDBTable;
        })();
        Storage.IDBTable = IDBTable;
        var IDBDB = (function () {
            function IDBDB(database) {
                this.database = database;
            }
            IDBDB.prototype.createTable = function (key) {
                this.database.createObjectStore(key);
            };
            IDBDB.prototype.getTableThen = function (key, callback) {
                this.createTable(key);
                var objectStore = this.database.transaction(key).objectStore(key);
                var table = new IDBTable(objectStore);
                callback(table);
            };
            return IDBDB;
        })();
        Storage.IDBDB = IDBDB;
        var IDBManager = (function () {
            function IDBManager() {
            }
            Object.defineProperty(IDBManager, "Instance", {
                get: function () {
                    if (!IDBManager._instance) {
                        IDBManager._instance = new IDBManager();
                    }
                    return IDBManager._instance;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(IDBManager.prototype, "isIDBWorking", {
                get: function () {
                    return typeof (IDBDatabase) == "function";
                },
                enumerable: true,
                configurable: true
            });
            IDBManager.prototype.getDBThen = function (key, callBack) {
                var DBOpenRequest = window.indexedDB.open(key);
                DBOpenRequest.onerror = function (e) {
                    Inknote.log("error loading indexedDB '" + key + "'", Inknote.MessageType.Error);
                };
                DBOpenRequest.onsuccess = function (e) {
                    var db = DBOpenRequest.result;
                    var idbdb = new IDBDB(db);
                    callBack(idbdb);
                };
            };
            return IDBManager;
        })();
        Storage.IDBManager = IDBManager;
    })(Storage = Inknote.Storage || (Inknote.Storage = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Storage;
    (function (Storage) {
        var defaults = {
            settings: "settings",
            projects: "projects",
            plugins: "plugins",
            synths: "synths",
            temp: "temp"
        };
        function getLocal(key) {
            if (typeof localStorage == "undefined") {
                Inknote.log("Local storage is undefined", Inknote.MessageType.Error);
                return null;
            }
            return JSON.parse(localStorage.getItem("inknote-" + key));
        }
        function saveLocal(key, item) {
            if (Inknote.Managers.SettingsManager.Current.testMode) {
                return;
            }
            if (!localStorage) {
                Inknote.log("Local storage is undefined", Inknote.MessageType.Error);
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
            Inknote.log("localStorage settings are not saved in the correct format", Inknote.MessageType.Warning);
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
            Inknote.log("saved projects");
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
        function saveSynths() {
            saveLocal(defaults.synths, Inknote.Audio.SynthManager.Instance.getSynths());
            Inknote.log("saved synths");
        }
        Storage.saveSynths = saveSynths;
        function getSynths() {
            var result = getLocal(defaults.synths);
            if (result == null || result == undefined) {
                return [];
            }
            var synthResult = [];
            for (var i = 0; i < result.length; i++) {
                var item = new Inknote.Audio.Synth(result[i].name);
                item.gain = result[i].gain;
                item.ID = result[i].ID;
                item.name = result[i].name;
                item.oscillatorType = result[i].oscillatorType;
                synthResult.push(item);
            }
            return synthResult;
        }
        Storage.getSynths = getSynths;
        function saveTemp() {
            saveLocal(defaults.temp, Inknote.TempDataService.Instance.currentData);
            Inknote.log("saved temp data");
        }
        Storage.saveTemp = saveTemp;
        function getTemp() {
            var result = getLocal(defaults.temp);
            if (result == null || result == undefined) {
                return new Inknote.TempData();
            }
            return result;
        }
        Storage.getTemp = getTemp;
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
                            Inknote.log("incorrect file type", Inknote.MessageType.Error);
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
                                Inknote.log("incorrect file format", Inknote.MessageType.Error);
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
    var TempDataService = (function () {
        function TempDataService() {
        }
        Object.defineProperty(TempDataService, "Instance", {
            get: function () {
                if (!TempDataService._instance) {
                    TempDataService._instance = new TempDataService();
                }
                return TempDataService._instance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TempDataService.prototype, "currentData", {
            get: function () {
                if (!this._currentData) {
                    this._currentData = Inknote.Storage.getTemp();
                }
                return this._currentData;
            },
            enumerable: true,
            configurable: true
        });
        TempDataService.prototype.update = function () {
            Inknote.Storage.saveTemp();
        };
        return TempDataService;
    })();
    Inknote.TempDataService = TempDataService;
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
            if (onTrue) {
                onTrue();
            }
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
            case Inknote.Managers.Page.File:
                var projects = Inknote.Managers.ProjectManager.Instance.allProjects.length;
                var canvas = { x: window.innerWidth, y: window.innerHeight - 100 };
                var maxRowNo = Math.floor(canvas.x / 200);
                var maxHeight = Math.ceil(projects / maxRowNo) * 200 + 100;
                return maxHeight > ScrollService.Instance.y + ScrollService.Instance.scrollSpeed + canvas.y;
                break;
            case Inknote.Managers.Page.Score:
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
                        case Inknote.Managers.Page.File:
                            ScrollService._scrollBar = new Inknote.Drawing.ScrollBar.FileScroll();
                            break;
                        case Inknote.Managers.Page.Score:
                            ScrollService._scrollBar = new Inknote.Drawing.ScrollBar.ProjectScroll();
                            break;
                        case Inknote.Managers.Page.Form:
                        case Inknote.Managers.Page.List:
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
    var ClipboardService = (function () {
        function ClipboardService() {
        }
        Object.defineProperty(ClipboardService, "Instance", {
            get: function () {
                if (!ClipboardService._instance) {
                    ClipboardService._instance = new ClipboardService();
                }
                return ClipboardService._instance;
            },
            enumerable: true,
            configurable: true
        });
        ClipboardService.prototype.copyItem = function (item) {
            var result = null;
            if (item instanceof Inknote.Model.Note) {
                return Inknote.getNoteOfDistance(item, 0);
            }
            if (item instanceof Inknote.Model.Rest) {
                return new Inknote.Model.Rest(item.length);
            }
            if (item instanceof Inknote.Model.Text) {
                return new Inknote.Model.Text(item.content);
            }
            return result;
        };
        ClipboardService.prototype.copyDrawItem = function (selectedItem) {
            var result = null;
            var project = Inknote.Managers.ProjectManager.Instance.currentProject;
            for (var i = 0; i < project.instruments.length; i++) {
                for (var j = 0; j < project.instruments[i].bars.length; j++) {
                    var tempBar = project.instruments[i].bars[j];
                    for (var k = 0; k < tempBar.items.length; k++) {
                        var tempItem = project.instruments[i].bars[j].items[k];
                        if (tempItem.ID == selectedItem.ID) {
                            return this.copyItem(tempItem);
                        }
                    }
                }
            }
            return result;
        };
        ClipboardService.prototype.copy = function () {
            this.clipboard = [];
            var selectedItem = Inknote.ScoringService.Instance.SelectedItem;
            if (selectedItem instanceof Inknote.Drawing.Bar) {
                var bar = new Inknote.Model.Bar();
                var project = Inknote.Managers.ProjectManager.Instance.currentProject;
                var selectedBar = null;
                for (var i = 0; i < project.instruments.length; i++) {
                    selectedBar = Inknote.getItemFromID(project.instruments[i].bars, selectedItem.ID);
                    if (selectedBar != null) {
                        break;
                    }
                }
                for (var i = 0; i < selectedBar.items.length; i++) {
                    var tempItem = this.copyItem(selectedBar.items[i]);
                    if (tempItem) {
                        bar.items.push(tempItem);
                    }
                }
                this.clipboard.push(bar);
                return;
            }
            else {
                this.clipboard.push(this.copyDrawItem(selectedItem));
                return;
            }
        };
        ClipboardService.prototype.cut = function () {
            this.copy();
            Inknote.NoteControlService.Instance.deleteSelected();
        };
        ClipboardService.prototype.pasteItem = function (item) {
            var selectedItem = Inknote.ScoringService.Instance.SelectedItem;
            if (Inknote.ScoringService.Instance.SelectedItem instanceof Inknote.Drawing.Bar) {
                var project = Inknote.Managers.ProjectManager.Instance.currentProject;
                var selectedBar = null;
                for (var i = 0; i < project.instruments.length; i++) {
                    selectedBar = Inknote.getItemFromID(project.instruments[i].bars, selectedItem.ID);
                    if (selectedBar != null) {
                        break;
                    }
                }
                selectedBar.items = [];
                if (item instanceof Inknote.Model.Bar) {
                    for (var i = 0; i < item.items.length; i++) {
                        selectedBar.items.push(this.copyItem(item.items[i]));
                    }
                }
            }
        };
        ClipboardService.prototype.paste = function () {
            Inknote.UndoService.Instance.store();
            for (var i = 0; i < this.clipboard.length; i++) {
                this.pasteItem(this.clipboard[i]);
            }
            Inknote.ScoringService.Instance.refresh();
        };
        return ClipboardService;
    })();
    Inknote.ClipboardService = ClipboardService;
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
            if (Inknote.Managers.PageManager.Current.page == Inknote.Managers.Page.File && Inknote.anyItemIs(Inknote.Managers.ProjectManager.Instance.allProjects, function (item) { return item.ID == Inknote.Managers.ProjectManager.Instance.hoverID; })) {
                newMenu = new Inknote.Drawing.RightClickMenus.RightClickFile(Inknote.Managers.ProjectManager.Instance.hoverID);
                Inknote.Managers.ProjectManager.Instance.selectID = Inknote.Managers.ProjectManager.Instance.hoverID;
            }
            if (Inknote.Managers.PageManager.Current.page == Inknote.Managers.Page.Score) {
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
                if (Inknote.Managers.SettingsManager.Current.displayID === true) {
                    if (Inknote.Managers.PageManager.Current.page == Inknote.Managers.Page.Score) {
                        self._ctx.fillText(Inknote.ScoringService.Instance.selectID, 10, 10);
                    }
                }
                self.arrange();
                self._items.push(Inknote.LicenceService.Instance.drawing);
                if (Inknote.Managers.MachineManager.Instance.machineType == Inknote.Managers.MachineType.Desktop && Inknote.ScrollService.Instance.showScrollBar()) {
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
                if (Inknote.Audio.AudioService) {
                    Inknote.Audio.AudioService.Instance.update();
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
                case Inknote.Managers.Page.Score:
                    this._items = Inknote.ProjectConverter.toDrawing(this);
                    break;
                case Inknote.Managers.Page.File:
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
                Inknote.log("draw service not instantiated", Inknote.MessageType.Error);
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
            if (visibleInstruments.length === 0) {
                return;
            }
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
            // loop through lines
            for (var i = 0; i < lines.length; i++) {
                var tempLine = lines[i];
                // loop through instruments
                for (var j = 0; j < visibleInstruments.length; j++) {
                    var tempInstrument = visibleInstruments[j];
                    if (tempInstrument["clefAdditionalPosition"]) {
                        clefAdditionalPosition = tempInstrument["clefAdditionalPosition"];
                    }
                    else {
                        clefAdditionalPosition = 0;
                    }
                    // add stave
                    var drawStave = new Inknote.Drawing.Stave(topLineHeight, tempInstrument.name);
                    drawStave.x = marginLeft;
                    drawStave.width = maxWidth;
                    this.addItem(drawStave);
                    // loop through bars in line
                    // warning: do not use k. use the barIndex values.
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
                        if (j == 0 && tempLine.barIndices[k] % 5 == 4) {
                            drawBar.barNumber = tempLine.barIndices[k] + 1;
                        }
                        if (Inknote.TimeSignatureService.Instance.barHasError(bar, tempInstrument)) {
                            drawBar.hasError = true;
                        }
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
                                tempInstrument["clefAdditionalPosition"] = clefAdditionalPosition;
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
                                var intervalDistance = Inknote.getIntervalDistance(new Inknote.Model.Note(Inknote.Model.NoteValue.F, 5, Inknote.Model.NoteLength.Crotchet), item);
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
                                for (var lineSpace = 5 * intervalDistance - clefAdditionalPosition; lineSpace <= -50; lineSpace += 5) {
                                    if (lineSpace / 10 === Math.round(lineSpace / 10)) {
                                        var ledgerLine = new Inknote.Drawing.LedgerLine(drawNoteItem.x, topLineHeight - lineSpace);
                                        this.addItem(ledgerLine);
                                        drawNoteItem.attach(ledgerLine);
                                    }
                                }
                                for (var lineSpace = 5 * intervalDistance - clefAdditionalPosition; lineSpace >= 10; lineSpace -= 5) {
                                    if (lineSpace / 10 === Math.round(lineSpace / 10)) {
                                        var ledgerLine = new Inknote.Drawing.LedgerLine(drawNoteItem.x, topLineHeight - lineSpace);
                                        this.addItem(ledgerLine);
                                        drawNoteItem.attach(ledgerLine);
                                    }
                                }
                                drawNoteItem.isPlaying = item.isPlaying;
                                drawNoteItem.stemUp = -5 * intervalDistance + clefAdditionalPosition >= 20;
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
                            if (item instanceof Inknote.Model.Text) {
                                var scoreText = new Inknote.Drawing.DrawText();
                                scoreText.content = item.content;
                                scoreText.ID = item.ID;
                                var lastItem = this._items[this._items.length - 1];
                                scoreText.x = lastItem.x;
                                scoreText.y = Math.max(lastItem.y + 20, topLineHeight + 70);
                                this.addItem(scoreText);
                            }
                        }
                        // increase bar position after looping through items.
                        barX += tempBarLength;
                    }
                    // iterate height between instruments;
                    topLineHeight += 120;
                    barX = 0;
                }
                // next group of staves quite a bit lower.
                topLineHeight += 60;
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
            set: function (item) {
                this.selectID = item.ID;
            },
            enumerable: true,
            configurable: true
        });
        ScoringService.prototype.getPrintItems = function () {
            if (this._projectID != Inknote.Managers.ProjectManager.Instance.currentProject.ID) {
                this.refresh();
            }
            if (this.refresh) {
                this.updateItems();
            }
            return this._items;
        };
        ScoringService.prototype.getItems = function () {
            if (this._projectID != Inknote.Managers.ProjectManager.Instance.currentProject.ID) {
                this.refresh();
            }
            if (this._refresh) {
                // get items from project
                this.updateItems();
            }
            var visibleItems = [];
            // deals with scrolling.
            for (var i = 0; i < this._items.length; i++) {
                this._items[i].y = this._items[i].y + this.oldScrollY - Inknote.ScrollService.Instance.y;
                if (this._items[i].y > -50 && this._items[i].y < Inknote.DrawService.Instance.canvas.height + 50) {
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
            if (ProjectConverter.name.select && Inknote.Managers.MachineManager.Instance.machineType !== Inknote.Managers.MachineType.Desktop) {
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
            compressed.bpm = project.bpm;
            for (var i = 0; i < project.instruments.length; i++) {
                compressed.instruments.push(compressInstrument(project.instruments[i]));
            }
            return compressed;
        }
        ProjectConverter.compress = compress;
        function compressInstrument(instrument) {
            var result = new Inknote.Compressed.Instrument(instrument.name);
            result.v = instrument.visible;
            result.synthID = instrument.synthID;
            result.synthName = instrument.synthName;
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
                if (bar.items[i] instanceof Inknote.Model.Text) {
                    var compressedText = compressText(bar.items[i]);
                    result.items.push(compressedText);
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
                resultType = Inknote.Compressed.CompressedClefType.FRENCH_VIOLIN;
            }
            if (clef instanceof Inknote.Model.TrebleClef) {
                resultType = Inknote.Compressed.CompressedClefType.TREBLE;
            }
            if (clef instanceof Inknote.Model.SopranoClef) {
                resultType = Inknote.Compressed.CompressedClefType.SOPRANO;
            }
            if (clef instanceof Inknote.Model.MezzoSopranoClef) {
                resultType = Inknote.Compressed.CompressedClefType.MEZZ_SOPRANO;
            }
            if (clef instanceof Inknote.Model.AltoClef) {
                resultType = Inknote.Compressed.CompressedClefType.ALTO;
            }
            if (clef instanceof Inknote.Model.TenorClef) {
                resultType = Inknote.Compressed.CompressedClefType.TENOR;
            }
            if (clef instanceof Inknote.Model.BaritoneClef) {
                resultType = Inknote.Compressed.CompressedClefType.BARITONE;
            }
            if (clef instanceof Inknote.Model.BassClef) {
                resultType = Inknote.Compressed.CompressedClefType.BASS;
            }
            if (clef instanceof Inknote.Model.SubbassClef) {
                resultType = Inknote.Compressed.CompressedClefType.SUBBASS;
            }
            result = new Inknote.Compressed.CompressedClef(resultType);
            return result;
        }
        function compressTimeSignature(timeSignature) {
            return new Inknote.Compressed.CompressedTimeSignature(timeSignature.top, timeSignature.bottom);
        }
        function compressText(txt) {
            var result = new Inknote.Compressed.CompressedText();
            result.c = txt.content;
            return result;
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
                Inknote.log("project: " + project.name + " is of version " + project.inknoteVersion, Inknote.MessageType.Warning);
                Inknote.log("this may cause errors when decompressing this saved files", Inknote.MessageType.Warning);
            }
            var result = new Inknote.Project(project.name);
            result.ID = project.ID;
            result.instruments = [];
            result.colour = project.colour;
            result.composer = project.composer;
            result.arrangedBy = project.arrangedBy;
            result.notes = project.notes;
            if (project.bpm) {
                result.bpm = project.bpm;
            }
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
            result.visible = instrument.v;
            result.synthID = instrument.synthID;
            result.synthName = instrument.synthName;
            for (var i = 0; i < instrument.bars.length; i++) {
                result.bars.push(decompressBar(instrument.bars[i]));
            }
            return result;
        }
        function decompressBar(bar) {
            var result = new Inknote.Model.Bar();
            for (var i = 0; i < bar.items.length; i++) {
                if (bar.items[i].i == Inknote.Compressed.ItemIdentifier.NOTE) {
                    var decompressedNote = decompressNote(bar.items[i]);
                    result.items.push(decompressedNote);
                }
                else if (bar.items[i].i == Inknote.Compressed.ItemIdentifier.REST) {
                    var decompressedRest = decompressRest(bar.items[i]);
                    result.items.push(decompressedRest);
                }
                else if (bar.items[i].i == Inknote.Compressed.ItemIdentifier.CHORD) {
                    var decompressedChord = decompressChord(bar.items[i]);
                    result.items.push(decompressedChord);
                }
                else if (bar.items[i].i == Inknote.Compressed.ItemIdentifier.CLEF) {
                    var decompressedClef = decompressClef(bar.items[i]);
                    result.items.push(decompressedClef);
                }
                else if (bar.items[i].i == Inknote.Compressed.ItemIdentifier.TIMESIGNATURE) {
                    var decompressedTimeSignature = decompressTimeSignature(bar.items[i]);
                    result.items.push(decompressedTimeSignature);
                }
                else if (bar.items[i].i == Inknote.Compressed.ItemIdentifier.TEXT) {
                    var decompressedText = decompressText(bar.items[i]);
                    result.items.push(decompressedText);
                }
                else {
                    Inknote.log("object in bar unidentified", Inknote.MessageType.Warning);
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
            if (clef.v == Inknote.Compressed.CompressedClefType.FRENCH_VIOLIN) {
                result = new Inknote.Model.FrenchViolinClef();
            }
            if (clef.v == Inknote.Compressed.CompressedClefType.TREBLE) {
                result = new Inknote.Model.TrebleClef();
            }
            if (clef.v == Inknote.Compressed.CompressedClefType.SOPRANO) {
                result = new Inknote.Model.SopranoClef();
            }
            if (clef.v == Inknote.Compressed.CompressedClefType.MEZZ_SOPRANO) {
                result = new Inknote.Model.MezzoSopranoClef();
            }
            if (clef.v == Inknote.Compressed.CompressedClefType.ALTO) {
                result = new Inknote.Model.AltoClef();
            }
            if (clef.v == Inknote.Compressed.CompressedClefType.TENOR) {
                result = new Inknote.Model.TenorClef();
            }
            if (clef.v == Inknote.Compressed.CompressedClefType.BARITONE) {
                result = new Inknote.Model.BaritoneClef();
            }
            if (clef.v == Inknote.Compressed.CompressedClefType.BASS) {
                result = new Inknote.Model.BassClef();
            }
            if (clef.v == Inknote.Compressed.CompressedClefType.SUBBASS) {
                result = new Inknote.Model.SubbassClef();
            }
            return result;
        }
        function decompressText(txt) {
            var result = new Inknote.Model.Text(txt.c);
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
        var noneFound = new Inknote.Drawing.DrawText();
        noneFound.content = "no items found";
        noneFound.x = 40;
        noneFound.y = 60;
        noneFound.font = Inknote.Drawing.Fonts.large;
        function toDrawing(drawer) {
            var items = [];
            var projects = Inknote.Managers.ProjectManager.Instance.allProjects;
            var fileSearch = document.getElementById("file-search");
            var fileSearchText = fileSearch.value;
            if (!FrontEnd.isHidden(document.getElementById("search-bar"))) {
                projects = Inknote.getItemsWhere(projects, function (project) {
                    return project.name.toLowerCase().indexOf(fileSearchText.toLowerCase()) != -1;
                });
            }
            if (projects.length == 0) {
                items.push(noneFound);
            }
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
            if (anySelected && Inknote.Managers.MachineManager.Instance.machineType != Inknote.Managers.MachineType.Desktop) {
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
                if (norm == Inknote.Model.NoteValue.C) {
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
                if (norm == Inknote.Model.NoteValue.B) {
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
        var norm1 = note.value < Inknote.Model.NoteValue.C ? note.value + 12 : note.value;
        var norm2 = note2.value < Inknote.Model.NoteValue.C ? note2.value + 12 : note2.value;
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
    function getNoteFromStaveDifference(note, staveDifference) {
        var semiToneCounter = 0;
        var resultNote;
        if (staveDifference >= 0) {
            for (var i = 0; i < staveDifference; i++) {
                var gotAWhiteNote = false;
                while (!gotAWhiteNote) {
                    resultNote = getNoteOfDistance(note, semiToneCounter);
                    gotAWhiteNote = Inknote.Model.IsWhiteKey(resultNote.value);
                    semiToneCounter++;
                }
            }
        }
        else {
            for (var i = 0; i > staveDifference; i--) {
                var gotAWhiteNote = false;
                while (!gotAWhiteNote) {
                    resultNote = getNoteOfDistance(note, semiToneCounter);
                    gotAWhiteNote = Inknote.Model.IsWhiteKey(resultNote.value);
                    semiToneCounter--;
                }
            }
        }
        return resultNote;
    }
    Inknote.getNoteFromStaveDifference = getNoteFromStaveDifference;
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
            case Inknote.Model.NoteLength.Breve:
                result = new Inknote.Drawing.BreveRest();
                break;
            case Inknote.Model.NoteLength.SemiBreve:
                result = new Inknote.Drawing.SemiBreveRest();
                break;
            case Inknote.Model.NoteLength.Minim:
                result = new Inknote.Drawing.MinimRest();
                break;
            case Inknote.Model.NoteLength.Crotchet:
                result = new Inknote.Drawing.CrotchetRest();
                break;
            case Inknote.Model.NoteLength.Quaver:
                result = new Inknote.Drawing.QuaverRest();
                break;
            case Inknote.Model.NoteLength.SemiQuaver:
                result = new Inknote.Drawing.SemiQuaverRest();
                break;
            case Inknote.Model.NoteLength.DemiSemiQuaver:
                result = new Inknote.Drawing.DemiSemiQuaverRest();
                break;
            case Inknote.Model.NoteLength.HemiDemiSemiQuaver:
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
        return note1.value == note2.value
            && note1.octave == note2.octave
            && note1.length == note2.length;
    }
    Inknote.notesAreEqual = notesAreEqual;
    function notePitchesAreEqual(note1, note2) {
        return note1.value == note2.value
            && note1.octave == note2.octave;
    }
    Inknote.notePitchesAreEqual = notePitchesAreEqual;
    function requiredNoteSpace(note, lineHeight) {
        // width of head.
        var spaceNeeded = lineHeight;
        if (note.length > Inknote.Model.NoteLength.Crotchet) {
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
            case Inknote.Model.NoteLength.Breve:
                tempDrawing = new Inknote.Drawing.Breve(stemUp);
                break;
            case Inknote.Model.NoteLength.SemiBreve:
                tempDrawing = new Inknote.Drawing.SemiBreve(stemUp);
                break;
            case Inknote.Model.NoteLength.Minim:
                tempDrawing = new Inknote.Drawing.Minim(stemUp);
                break;
            case Inknote.Model.NoteLength.Crotchet:
                tempDrawing = new Inknote.Drawing.Crotchet(stemUp);
                break;
            case Inknote.Model.NoteLength.Quaver:
                tempDrawing = new Inknote.Drawing.Quaver(stemUp);
                break;
            case Inknote.Model.NoteLength.SemiQuaver:
                tempDrawing = new Inknote.Drawing.SemiQuaver(stemUp);
                break;
            case Inknote.Model.NoteLength.DemiSemiQuaver:
                tempDrawing = new Inknote.Drawing.DemiSemiQuaver(stemUp);
                break;
            case Inknote.Model.NoteLength.HemiDemiSemiQuaver:
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
    function getCrotchetsFromNoteLength(nl) {
        switch (nl) {
            case Inknote.Model.NoteLength.Breve:
                return 8;
            case Inknote.Model.NoteLength.SemiBreve:
                return 4;
            case Inknote.Model.NoteLength.Minim:
                return 2;
            case Inknote.Model.NoteLength.Crotchet:
                return 1;
            case Inknote.Model.NoteLength.Quaver:
                return 1 / 2;
            case Inknote.Model.NoteLength.SemiQuaver:
                return 1 / 4;
            case Inknote.Model.NoteLength.DemiSemiQuaver:
                return 1 / 8;
            case Inknote.Model.NoteLength.HemiDemiSemiQuaver:
                return 1 / 16;
        }
        return 0;
    }
    Inknote.getCrotchetsFromNoteLength = getCrotchetsFromNoteLength;
    var TimeSignatureService = (function () {
        function TimeSignatureService() {
        }
        Object.defineProperty(TimeSignatureService, "Instance", {
            get: function () {
                if (!TimeSignatureService._instance) {
                    TimeSignatureService._instance = new TimeSignatureService();
                }
                return TimeSignatureService._instance;
            },
            enumerable: true,
            configurable: true
        });
        TimeSignatureService.prototype.barIsFull = function (bar, instrument) {
            var timeSignature = new Inknote.Model.TimeSignature(4, 4);
            for (var i = 0; i < instrument.bars.length; i++) {
                for (var j = 0; j < instrument.bars[i].items.length; j++) {
                    if (instrument.bars[i].items[j] instanceof Inknote.Model.TimeSignature) {
                        timeSignature = instrument.bars[i].items[j];
                    }
                }
                if (instrument.bars[i].ID === bar.ID) {
                    break;
                }
            }
            var countables = Inknote.getItemsWhere(bar.items, function (item) {
                var isRest = item instanceof Inknote.Model.Rest;
                var isNote = item instanceof Inknote.Model.Note;
                var isChord = item instanceof Inknote.Model.Chord;
                return isRest || isNote;
            });
            var count = Inknote.sum(countables, function (item) {
                return getCrotchetsFromNoteLength(item.length);
            });
            return count >= timeSignature.top;
        };
        TimeSignatureService.prototype.barHasError = function (bar, instrument) {
            var timeSignature = new Inknote.Model.TimeSignature(4, 4);
            for (var i = 0; i < instrument.bars.length; i++) {
                for (var j = 0; j < instrument.bars[i].items.length; j++) {
                    if (instrument.bars[i].items[j] instanceof Inknote.Model.TimeSignature) {
                        timeSignature = instrument.bars[i].items[j];
                    }
                }
                if (instrument.bars[i].ID === bar.ID) {
                    break;
                }
            }
            var countables = Inknote.getItemsWhere(bar.items, function (item) {
                var isRest = item instanceof Inknote.Model.Rest;
                var isNote = item instanceof Inknote.Model.Note;
                var isChord = item instanceof Inknote.Model.Chord;
                return isRest || isNote;
            });
            var count = Inknote.sum(countables, function (item) {
                return getCrotchetsFromNoteLength(item.length);
            });
            return count != timeSignature.top;
        };
        return TimeSignatureService;
    })();
    Inknote.TimeSignatureService = TimeSignatureService;
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
            case Inknote.NotationType.Standard:
                return new Inknote.ChordNotation.StandardChordNotation(baseNote, rootNote, minor, annotations);
                break;
            case Inknote.NotationType.UPPER_lower:
                return new Inknote.ChordNotation.UPPER_lowerChordNotation(baseNote, rootNote, minor, annotations);
                break;
            case Inknote.NotationType.DoReMi:
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
        // todo: finish this off.
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
            this.hidden = Inknote.TempDataService.Instance.currentData.noteControlsHidden;
            this.hiddenY = 0;
            this.firstOpen = true;
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
            Inknote.TempDataService.Instance.currentData.noteControlsHidden = true;
            Inknote.TempDataService.Instance.update();
        };
        NoteControlService.prototype.show = function () {
            this.hidden = false;
            Inknote.TempDataService.Instance.currentData.noteControlsHidden = false;
            Inknote.TempDataService.Instance.update();
        };
        NoteControlService.prototype.getItems = function (drawer) {
            if (this.hidden) {
                if (this.hiddenY > drawer.canvas.height / 2 || this.firstOpen) {
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
            //if (Managers.MachineManager.Instance.machineType == Managers.MachineType.Desktop) {
            //    this.y = drawer.canvas.height - 220; + this.hiddenY;
            //    this.width = 360;
            //    this.height = 220;
            //}
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
            this.firstOpen = false;
            return noteControls;
        };
        NoteControlService.prototype.addInstrument = function (name) {
            Inknote.UndoService.Instance.store();
            var project = Inknote.Managers.ProjectManager.Instance.currentProject;
            var barsCount = project.instruments[0].bars.length;
            var newInstrument = new Inknote.Model.Instrument(name);
            for (var i = 0; i < barsCount; i++) {
                this.addBarToInstrument(newInstrument);
            }
            project.instruments.push(newInstrument);
            Inknote.ScoringService.Instance.refresh();
        };
        NoteControlService.prototype.addBarToInstrument = function (instrument) {
            var newBar = new Inknote.Model.Bar();
            if (instrument.bars.length == 0) {
                newBar.items.push(new Inknote.Model.TrebleClef());
                newBar.items.push(new Inknote.Model.TimeSignature(4, 4));
            }
            instrument.bars.push(newBar);
        };
        NoteControlService.prototype.addBar = function () {
            var project = Inknote.Managers.ProjectManager.Instance.currentProject;
            for (var i = 0; i < project.instruments.length; i++) {
                this.addBarToInstrument(project.instruments[i]);
            }
        };
        NoteControlService.prototype.addNoteToBar = function (heightFromTopLine, barID) {
            Inknote.UndoService.Instance.store();
            // due to top line starting at 0;
            heightFromTopLine += 5;
            var project = Inknote.Managers.ProjectManager.Instance.currentProject;
            for (var i = 0; i < project.instruments.length; i++) {
                var clef = new Inknote.Model.TrebleClef();
                for (var j = 0; j < project.instruments[i].bars.length; j++) {
                    // loop through items looking for clef
                    for (var k = 0; k < project.instruments[i].bars[j].items.length; k++) {
                        var barItem = project.instruments[i].bars[j].items[k];
                        if (barItem instanceof Inknote.Model.Clef) {
                            clef = barItem;
                        }
                    }
                    if (project.instruments[i].bars[j].ID == barID) {
                        var dif = clef.positionFromTreble;
                        var distRound5 = Math.round(heightFromTopLine / 5);
                        var topNoteOnTreble = new Inknote.Model.Note(Inknote.Model.NoteValue.F, 5, this.lengthControl.selectedLength);
                        var note = Inknote.getNoteFromStaveDifference(topNoteOnTreble, dif - distRound5);
                        project.instruments[i].bars[j].items.push(note);
                    }
                }
            }
            Inknote.ScoringService.Instance.refresh();
        };
        NoteControlService.prototype.addNote = function (note) {
            Inknote.UndoService.Instance.store();
            var project = Inknote.Managers.ProjectManager.Instance.currentProject;
            if (Inknote.Audio.AudioService) {
                var playInstrument = project.instruments[0];
                if (Inknote.ScoringService.Instance.SelectedItem instanceof Inknote.Drawing.Bar) {
                    for (var i = 0; i < project.instruments.length; i++) {
                        for (var j = 0; j < project.instruments[i].bars.length; j++) {
                            if (project.instruments[i].bars[j].ID == Inknote.ScoringService.Instance.selectID) {
                                playInstrument = project.instruments[i];
                                break;
                            }
                        }
                    }
                }
                var synth = playInstrument.synthID ? Inknote.Audio.SynthManager.Instance.getSynth(playInstrument.synthID, playInstrument.synthName) : null;
                Inknote.Audio.AudioService.Instance.playNote(note, synth);
            }
            if (Inknote.ScoringService.Instance.SelectedItem instanceof Inknote.Drawing.Bar) {
                for (var i = 0; i < project.instruments.length; i++) {
                    for (var j = 0; j < project.instruments[i].bars.length; j++) {
                        var currentBar = project.instruments[i].bars[j];
                        if (currentBar.ID == Inknote.ScoringService.Instance.selectID) {
                            if (Inknote.TimeSignatureService.Instance.barIsFull(currentBar, project.instruments[i])) {
                                if (project.instruments[i].bars[j + 1]) {
                                    if (project.instruments[i].bars[j + 1].items.length == 0) {
                                        currentBar = project.instruments[i].bars[j + 1];
                                    }
                                    else {
                                        return;
                                    }
                                }
                                else {
                                    this.addBar();
                                    currentBar = project.instruments[i].bars[j + 1];
                                }
                            }
                            currentBar.items.push(note);
                            Inknote.ScoringService.Instance.selectID = currentBar.ID;
                            Inknote.ScoringService.Instance.refresh();
                            return;
                        }
                    }
                }
            }
            var instrument = project.instruments[0];
            if (instrument.bars.length == 0) {
                this.addBar();
            }
            var bar = instrument.bars[instrument.bars.length - 1];
            if (Inknote.TimeSignatureService.Instance.barIsFull(bar, instrument)) {
                this.addBar();
                bar = instrument.bars[instrument.bars.length - 1];
            }
            bar.items.push(note);
            Inknote.ScoringService.Instance.refresh();
        };
        NoteControlService.prototype.addRest = function () {
            Inknote.UndoService.Instance.store();
            var project = Inknote.Managers.ProjectManager.Instance.currentProject;
            var rest = new Inknote.Model.Rest(this.lengthControl.selectedLength);
            if (Inknote.ScoringService.Instance.SelectedItem instanceof Inknote.Drawing.Bar) {
                for (var i = 0; i < project.instruments.length; i++) {
                    for (var j = 0; j < project.instruments[i].bars.length; j++) {
                        var currentBar = project.instruments[i].bars[j];
                        if (currentBar.ID == Inknote.ScoringService.Instance.selectID) {
                            if (Inknote.TimeSignatureService.Instance.barIsFull(currentBar, project.instruments[i])) {
                                if (project.instruments[i].bars[j + 1]) {
                                    if (project.instruments[i].bars[j + 1].items.length == 0) {
                                        currentBar = project.instruments[i].bars[j + 1];
                                    }
                                    else {
                                        return;
                                    }
                                }
                                else {
                                    this.addBar();
                                    currentBar = project.instruments[i].bars[j + 1];
                                }
                            }
                            currentBar.items.push(rest);
                            Inknote.ScoringService.Instance.selectID = currentBar.ID;
                            Inknote.ScoringService.Instance.refresh();
                            return;
                        }
                    }
                }
            }
            var instrument = project.instruments[0];
            if (instrument.bars.length == 0) {
                this.addBar();
            }
            var bar = instrument.bars[instrument.bars.length - 1];
            if (Inknote.TimeSignatureService.Instance.barIsFull(bar, instrument)) {
                this.addBar();
                bar = instrument.bars[instrument.bars.length - 1];
            }
            bar.items.push(rest);
            Inknote.ScoringService.Instance.refresh();
        };
        NoteControlService.prototype.editNoteLength = function () {
            Inknote.UndoService.Instance.store();
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
            Inknote.UndoService.Instance.store();
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
            Inknote.UndoService.Instance.store();
            if (Inknote.ScoringService.Instance.SelectedItem instanceof Inknote.Drawing.Note
                || Inknote.ScoringService.Instance.SelectedItem instanceof Inknote.Drawing.Rest
                || Inknote.ScoringService.Instance.SelectedItem instanceof Inknote.Drawing.DrawText
                || Inknote.ScoringService.Instance.SelectedItem instanceof Inknote.Drawing.TimeSignature
                || Inknote.ScoringService.Instance.SelectedItem instanceof Inknote.Drawing.Clef) {
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
            Inknote.UndoService.Instance.store();
            var project = Inknote.Managers.ProjectManager.Instance.currentProject;
            var playInstrument = project.instruments[0];
            var playedNotes = [];
            for (var i = 0; i < project.instruments.length; i++) {
                for (var j = 0; j < project.instruments[i].bars.length; j++) {
                    var bar = project.instruments[i].bars[j];
                    for (var k = 0; k < bar.items.length; k++) {
                        var item = bar.items[k];
                        if (item.ID == Inknote.ScoringService.Instance.selectID) {
                            playInstrument = project.instruments[i];
                            if (item instanceof Inknote.Model.Note) {
                                item.value = value;
                                item.octave = octave;
                                item.length = this.lengthControl.selectedLength;
                                playedNotes.push(item);
                            }
                            else if (item instanceof Inknote.Model.Rest) {
                            }
                            else if (item instanceof Inknote.Model.Chord) {
                                for (var ci = 0; ci < item.notes.length; ci++) {
                                    playedNotes.push(item.notes[ci]);
                                }
                            }
                        }
                    }
                }
            }
            if (Inknote.Audio.AudioService) {
                var synth = playInstrument.synthID ? Inknote.Audio.SynthManager.Instance.getSynth(playInstrument.synthID, playInstrument.synthName) : null;
                for (var i = 0; i < playedNotes.length; i++) {
                    Inknote.Audio.AudioService.Instance.playNote(playedNotes[i], synth);
                }
            }
            Inknote.ScoringService.Instance.refresh();
        };
        NoteControlService.prototype.noteValueUp = function () {
            Inknote.UndoService.Instance.store();
            var project = Inknote.Managers.ProjectManager.Instance.currentProject;
            for (var i = 0; i < project.instruments.length; i++) {
                for (var j = 0; j < project.instruments[i].bars.length; j++) {
                    var bar = project.instruments[i].bars[j];
                    for (var k = 0; k < bar.items.length; k++) {
                        var item = bar.items[k];
                        if (item.ID == Inknote.ScoringService.Instance.selectID || Inknote.ScoringService.Instance.selectID == bar.ID) {
                            if (item instanceof Inknote.Model.Note) {
                                var newVal = item.value + 1;
                                item.value = newVal % 12;
                                item.octave = newVal % 12 == Inknote.Model.NoteValue.C ? item.octave + 1 : item.octave;
                            }
                            else if (item instanceof Inknote.Model.Rest) {
                            }
                            else if (item instanceof Inknote.Model.Chord) {
                                for (var l = 0; l < item.notes.length; l++) {
                                    var newVal = item.notes[l].value + 1;
                                    item.notes[l].value = newVal % 12;
                                    item.notes[l].octave = newVal % 12 == Inknote.Model.NoteValue.C ? item.notes[l].octave + 1 : item.notes[l].octave;
                                }
                            }
                        }
                    }
                }
            }
            Inknote.ScoringService.Instance.refresh();
        };
        NoteControlService.prototype.noteValueDown = function () {
            Inknote.UndoService.Instance.store();
            var project = Inknote.Managers.ProjectManager.Instance.currentProject;
            for (var i = 0; i < project.instruments.length; i++) {
                for (var j = 0; j < project.instruments[i].bars.length; j++) {
                    var bar = project.instruments[i].bars[j];
                    for (var k = 0; k < bar.items.length; k++) {
                        var item = bar.items[k];
                        if (item.ID == Inknote.ScoringService.Instance.selectID || Inknote.ScoringService.Instance.selectID == bar.ID) {
                            if (item instanceof Inknote.Model.Note) {
                                var newVal = item.value + 11;
                                item.value = newVal % 12;
                                item.octave = newVal % 12 == Inknote.Model.NoteValue.B ? item.octave - 1 : item.octave;
                            }
                            else if (item instanceof Inknote.Model.Rest) {
                            }
                            else if (item instanceof Inknote.Model.Chord) {
                                for (var l = 0; l < item.notes.length; l++) {
                                    var newVal = item.notes[l].value + 11;
                                    item.notes[l].value = newVal % 12;
                                    item.notes[l].octave = newVal % 12 == Inknote.Model.NoteValue.B ? item.notes[l].octave - 1 : item.notes[l].octave;
                                }
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
                            // do not run remove if any items in any parallel bars
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
        BarService.prototype.changeBarTimeSignature = function () {
            Inknote.UndoService.Instance.store();
            var top = prompt("amount of beats in the bar");
            while (~~top == 0) {
                top = prompt("amount of beats in the bar? must be a number greater than 0");
            }
            var bottom = prompt("length of beat");
            while (~~bottom % 2 != 0 || ~~bottom == 0) {
                bottom = prompt("what is the length of the new beat? this must be a power of 2");
            }
            var barNumber = null;
            var currentProject = Inknote.Managers.ProjectManager.Instance.currentProject;
            for (var i = 0; i < currentProject.instruments.length; i++) {
                var tempInstrument = currentProject.instruments[i];
                for (var j = 0; j < tempInstrument.bars.length; j++) {
                    var tempBar = tempInstrument.bars[j];
                    if (tempBar.ID == Inknote.ScoringService.Instance.selectID) {
                        barNumber = j;
                    }
                }
            }
            if (barNumber == null) {
                return;
            }
            for (var i = 0; i < currentProject.instruments.length; i++) {
                var tempInstrument = currentProject.instruments[i];
                var tempBar = tempInstrument.bars[barNumber];
                var replaced = false;
                for (var j = 0; j < tempBar.items.length; j++) {
                    if (tempBar.items[j] instanceof Inknote.Model.TimeSignature) {
                        replaced = true;
                        tempBar.items[j] = new Inknote.Model.TimeSignature(~~top, ~~bottom);
                    }
                }
                if (replaced == false) {
                    tempBar.items.unshift(new Inknote.Model.TimeSignature(~~top, ~~bottom));
                }
            }
            Inknote.ScoringService.Instance.refresh();
        };
        BarService.prototype.addClef = function () {
            var currentProject = Inknote.Managers.ProjectManager.Instance.currentProject;
            if (!Inknote.ScoringService.Instance.selectID || !(Inknote.ScoringService.Instance.SelectedItem instanceof Inknote.Drawing.Bar)) {
                var currentInstrument = currentProject.instruments[0];
                if (currentInstrument.bars.length == 0) {
                    Inknote.NoteControlService.Instance.addBar();
                }
                var currentBar = currentInstrument.bars[currentInstrument.bars.length - 1];
                currentBar.items.push(new Inknote.Model.TrebleClef());
                Inknote.ScoringService.Instance.refresh();
                return;
            }
            for (var i = 0; i < currentProject.instruments.length; i++) {
                for (var j = 0; j < currentProject.instruments[i].bars.length; j++) {
                    if (currentProject.instruments[i].bars[j].ID == Inknote.ScoringService.Instance.selectID) {
                        currentProject.instruments[i].bars[j].items.push(new Inknote.Model.TrebleClef());
                        Inknote.ScoringService.Instance.refresh();
                        return;
                    }
                }
            }
        };
        BarService.prototype.changeKey = function () {
            // todo: implement this;
            Inknote.log("change key not implemented", Inknote.MessageType.Error);
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
        ProjectOptionsService.prototype.addRowWithData = function (label, startValue, onChange, isNumber) {
            var formRow = document.createElement("div");
            formRow.className = "form-row";
            var rowLabel = document.createElement("span");
            rowLabel.className = "label";
            rowLabel.textContent = label;
            formRow.appendChild(rowLabel);
            var rowInput = document.createElement("input");
            rowInput.value = startValue;
            rowInput.onchange = onChange;
            if (isNumber == true) {
                rowInput.type = "number";
            }
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
            this.addRowWithData("tempo:", project.bpm, function (e) {
                ProjectOptionsService.Instance.currentProject.bpm = parseInt(e.target.value);
            }, true);
            Modal.toggle("project-options");
        };
        return ProjectOptionsService;
    })();
    Inknote.ProjectOptionsService = ProjectOptionsService;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var InstrumentService = (function () {
        function InstrumentService() {
        }
        Object.defineProperty(InstrumentService, "Instance", {
            get: function () {
                if (!InstrumentService._instance) {
                    InstrumentService._instance = new InstrumentService();
                }
                return InstrumentService._instance;
            },
            enumerable: true,
            configurable: true
        });
        InstrumentService.prototype.addInstrument = function () {
            var name = prompt("What is the name of the new instrument?");
            if (name != "" && name != null) {
                Inknote.NoteControlService.Instance.addInstrument(name);
            }
            if (name == "") {
                Inknote.check("Your instrument name cannot be empty", null, null);
            }
        };
        InstrumentService.prototype.openInstrumentEditor = function () {
            Modal.toggle("instruments");
            function drawInstrumentEditModal() {
                var instrumentList = document.getElementById("instrument-list");
                instrumentList.innerHTML = "";
                var instruments = Inknote.Managers.ProjectManager.Instance.currentProject.instruments;
                for (var i = 0; i < instruments.length; i++) {
                    var formRow = document.createElement("div");
                    formRow.className = "form-row";
                    var instrumentHolder = document.createElement("input");
                    instrumentHolder.value = instruments[i].name;
                    instrumentHolder.setAttribute("data-id", instruments[i].ID);
                    instrumentHolder.onkeyup = function (e) {
                        var ele = e.target;
                        var id = ele.getAttribute("data-id");
                        var proj = Inknote.Managers.ProjectManager.Instance.currentProject;
                        for (var j = 0; j < proj.instruments.length; j++) {
                            if (proj.instruments[j].ID == id) {
                                proj.instruments[j].name = ele.value;
                            }
                        }
                        Inknote.ScoringService.Instance.refresh();
                    };
                    var synthSelect = document.createElement("select");
                    synthSelect.setAttribute("data-id", instruments[i].ID);
                    var synthList = Inknote.Audio.SynthManager.Instance.getSynths();
                    var emptyOption = document.createElement("option");
                    emptyOption.value = "";
                    emptyOption.text = "none";
                    if (!instruments[i].synthName && !instruments[i].synthID) {
                        emptyOption.selected = true;
                    }
                    synthSelect.appendChild(emptyOption);
                    synthSelect.onchange = function (ev) {
                        var ele = ev.target;
                        var id = ele.getAttribute("data-id");
                        var proj = Inknote.Managers.ProjectManager.Instance.currentProject;
                        for (var j = 0; j < proj.instruments.length; j++) {
                            if (proj.instruments[j].ID == id) {
                                if (ele.value == "") {
                                    proj.instruments[j].synthName = null;
                                    proj.instruments[j].synthID = null;
                                }
                                else {
                                    var breakPoint = ele.value.indexOf("|");
                                    var synthID = ele.value.substring(0, breakPoint);
                                    var synthName = ele.value.substring(breakPoint + 1);
                                    proj.instruments[j].synthName = synthName;
                                    proj.instruments[j].synthID = synthID;
                                }
                            }
                        }
                    };
                    for (var j = 0; j < synthList.length; j++) {
                        var optionItem = document.createElement("option");
                        optionItem.value = synthList[j].ID + "|" + synthList[j].name;
                        optionItem.textContent = synthList[j].name;
                        synthSelect.appendChild(optionItem);
                        if (synthList[j].ID == instruments[i].synthID) {
                            optionItem.selected = true;
                            synthSelect.value = optionItem.value;
                        }
                    }
                    var isVisible = document.createElement("input");
                    isVisible.type = "checkbox";
                    isVisible.checked = instruments[i].visible;
                    isVisible.setAttribute("data-id", instruments[i].ID);
                    isVisible.className += " small-width";
                    isVisible.onclick = function (e) {
                        var ele = e.target;
                        var id = ele.getAttribute("data-id");
                        var proj = Inknote.Managers.ProjectManager.Instance.currentProject;
                        for (var j = 0; j < proj.instruments.length; j++) {
                            if (proj.instruments[j].ID == id) {
                                proj.instruments[j].visible = ele.checked;
                            }
                        }
                        Inknote.ScoringService.Instance.refresh();
                    };
                    var up = document.createElement("span");
                    var down = document.createElement("span");
                    up.textContent = "▲";
                    down.textContent = "▼";
                    up.className += " button";
                    down.className += " button";
                    up.setAttribute("data-id", instruments[i].ID);
                    down.setAttribute("data-id", instruments[i].ID);
                    up.onclick = function (e) {
                        var ele = e.target;
                        var id = ele.getAttribute("data-id");
                        InstrumentService.Instance.moveUpFromID(id);
                        drawInstrumentEditModal();
                    };
                    down.onclick = function (e) {
                        var ele = e.target;
                        var id = ele.getAttribute("data-id");
                        InstrumentService.Instance.moveDownFromID(id);
                        drawInstrumentEditModal();
                    };
                    var deleteBtn = document.createElement("span");
                    deleteBtn.textContent = "x";
                    deleteBtn.className += " button negative";
                    deleteBtn.setAttribute("data-id", instruments[i].ID);
                    deleteBtn.onclick = function (e) {
                        var ele = e.target;
                        var id = ele.getAttribute("data-id");
                        InstrumentService.Instance.deleteFromID(id, function () {
                            drawInstrumentEditModal();
                        });
                    };
                    formRow.appendChild(instrumentHolder);
                    formRow.appendChild(synthSelect);
                    formRow.appendChild(isVisible);
                    formRow.appendChild(up);
                    formRow.appendChild(down);
                    formRow.appendChild(deleteBtn);
                    instrumentList.appendChild(formRow);
                }
            }
            drawInstrumentEditModal();
        };
        InstrumentService.prototype.moveUpFromID = function (id) {
            var proj = Inknote.Managers.ProjectManager.Instance.currentProject;
            var newInstruments = [];
            for (var j = 0; j < proj.instruments.length; j++) {
                if (proj.instruments[j + 1] && proj.instruments[j + 1].ID == id) {
                    newInstruments.push(proj.instruments[j + 1]);
                    newInstruments.push(proj.instruments[j]);
                    j++;
                }
                else {
                    newInstruments.push(proj.instruments[j]);
                }
            }
            proj.instruments = newInstruments;
            Inknote.ScoringService.Instance.refresh();
        };
        InstrumentService.prototype.moveDownFromID = function (id) {
            var proj = Inknote.Managers.ProjectManager.Instance.currentProject;
            var newInstruments = [];
            for (var j = 0; j < proj.instruments.length; j++) {
                if (proj.instruments[j].ID == id && proj.instruments[j + 1]) {
                    newInstruments.push(proj.instruments[j + 1]);
                    newInstruments.push(proj.instruments[j]);
                    j++;
                }
                else {
                    newInstruments.push(proj.instruments[j]);
                }
            }
            proj.instruments = newInstruments;
            Inknote.ScoringService.Instance.refresh();
        };
        InstrumentService.prototype.deleteFromID = function (id, then) {
            Inknote.check("Are you sure you want to delete this instrument?", function () {
                var proj = Inknote.Managers.ProjectManager.Instance.currentProject;
                var newInstruments = [];
                for (var j = 0; j < proj.instruments.length; j++) {
                    if (proj.instruments[j].ID != id) {
                        newInstruments.push(proj.instruments[j]);
                    }
                }
                proj.instruments = newInstruments;
                then();
                Inknote.ScoringService.Instance.refresh();
            });
        };
        return InstrumentService;
    })();
    Inknote.InstrumentService = InstrumentService;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var UndoService = (function () {
        function UndoService() {
            this._storage = [];
        }
        Object.defineProperty(UndoService, "Instance", {
            get: function () {
                if (!UndoService._instance) {
                    UndoService._instance = new UndoService();
                }
                return UndoService._instance;
            },
            enumerable: true,
            configurable: true
        });
        UndoService.prototype.store = function () {
            var currentProject = Inknote.Managers.ProjectManager.Instance.currentProject;
            var compressedCurrentProject = Inknote.ProjectConverter.compress(currentProject);
            this._storage.push(compressedCurrentProject);
            // maximum of 10 undos - more undos means more storage space is needed.
            while (this._storage.length > 10) {
                this._storage.shift();
            }
        };
        UndoService.prototype.undo = function () {
            if (this._storage.length > 0) {
                var decompressedStoredProject = Inknote.ProjectConverter.decompress(this._storage.pop());
                Inknote.Managers.ProjectManager.Instance.currentProjectOverride = decompressedStoredProject;
                Inknote.ScoringService.Instance.refresh();
            }
            else {
                Inknote.log("You have reached the maximum number of undos", Inknote.MessageType.Warning);
            }
        };
        return UndoService;
    })();
    Inknote.UndoService = UndoService;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var HttpService = (function () {
        function HttpService() {
        }
        Object.defineProperty(HttpService, "Instance", {
            get: function () {
                if (!HttpService._instance) {
                    HttpService._instance = new HttpService();
                }
                return HttpService._instance;
            },
            enumerable: true,
            configurable: true
        });
        HttpService.prototype.$get = function (url, callback, onerror) {
            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.onload = callback;
            request.onerror = onerror;
            request.send();
        };
        HttpService.prototype.post = function (url, data, callback, onerror) {
            var request = new XMLHttpRequest();
            request.open("POST", url, true);
            request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            request.setRequestHeader("content-type", "application/json");
            request.onload = callback;
            request.onerror = onerror;
            request.send(data);
        };
        return HttpService;
    })();
    Inknote.HttpService = HttpService;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var PrintService = (function () {
        function PrintService() {
        }
        Object.defineProperty(PrintService, "Instance", {
            get: function () {
                if (!PrintService._instance) {
                    PrintService._instance = new PrintService();
                }
                return PrintService._instance;
            },
            enumerable: true,
            configurable: true
        });
        PrintService.prototype.print = function () {
            Inknote.check("open printable version?", function () {
                var currentProject = Inknote.Managers.ProjectManager.Instance.currentProject;
                var newPage = Inknote.Managers.PageManager.Current.openNewPage(Inknote.Managers.Page.Print, currentProject.ID);
                var htmlPage = document.createElement("html");
                var body = document.createElement("body");
                htmlPage.appendChild(body);
                var container = document.createElement("div");
                container.id = "main";
                body.appendChild(container);
                var title = document.createElement("h1");
                title.textContent = currentProject.name;
                container.appendChild(title);
                newPage.document.write(htmlPage.outerHTML);
                newPage.document.title = "print " + currentProject.name;
                var main = newPage.document.getElementById("main");
                var canvas = document.createElement("canvas");
                main.appendChild(canvas);
                var context = canvas.getContext("2d");
                canvas.width = Inknote.DrawService.Instance.canvas.width;
                var items = Inknote.ScoringService.Instance.getPrintItems();
                canvas.height = Inknote.maxOutOf(items, function (item) {
                    return item.y;
                }) + 100;
                for (var i = 0; i < items.length; i++) {
                    items[i].draw(context, canvas, 1);
                }
            }, function () {
                Inknote.log("print cancelled");
            });
        };
        return PrintService;
    })();
    Inknote.PrintService = PrintService;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var SmartSearchResult = (function () {
        function SmartSearchResult(projectIndex, instrumentIndex, barIndex, itemIndex) {
            this.projectIndex = projectIndex;
            this.instrumentIndex = instrumentIndex;
            this.barIndex = barIndex;
            this.itemIndex = itemIndex;
        }
        return SmartSearchResult;
    })();
    Inknote.SmartSearchResult = SmartSearchResult;
    (function (SearchRange) {
        SearchRange[SearchRange["CURRENT_PROJECT"] = 0] = "CURRENT_PROJECT";
        SearchRange[SearchRange["ALL_PROJECTS"] = 1] = "ALL_PROJECTS";
    })(Inknote.SearchRange || (Inknote.SearchRange = {}));
    var SearchRange = Inknote.SearchRange;
    var SmartSearchSettings = (function () {
        function SmartSearchSettings() {
        }
        Object.defineProperty(SmartSearchSettings.prototype, "searchRange", {
            get: function () {
                if (Inknote.Managers.PageManager.Current.page == Inknote.Managers.Page.Score) {
                    return SearchRange.CURRENT_PROJECT;
                }
                return SearchRange.ALL_PROJECTS;
            },
            enumerable: true,
            configurable: true
        });
        return SmartSearchSettings;
    })();
    Inknote.SmartSearchSettings = SmartSearchSettings;
    var SmartSearchService = (function () {
        function SmartSearchService() {
            this.settings = new SmartSearchSettings();
        }
        Object.defineProperty(SmartSearchService, "Instance", {
            get: function () {
                if (!SmartSearchService._instance) {
                    SmartSearchService._instance = new SmartSearchService();
                }
                return SmartSearchService._instance;
            },
            enumerable: true,
            configurable: true
        });
        SmartSearchService.prototype.find = function () {
        };
        SmartSearchService.prototype.findByTextAndMusic = function (text, music) {
            var textResults = [];
            var musicResults = [];
            if (text == null || text == "") {
                return this.findMusic(music);
            }
            if (music == null || music.length == 0) {
                return this.findText(text);
            }
            textResults = this.findText(text);
            musicResults = this.findMusic(music);
            var finalResults = [];
            for (var i = 0; i < musicResults.length; i++) {
                if (Inknote.anyItemIs(textResults, function (item) {
                    var sameProject = musicResults[i].projectIndex == item.projectIndex;
                    var sameInstrument = musicResults[i].instrumentIndex == item.instrumentIndex;
                    var sameBar = musicResults[i].barIndex == item.barIndex;
                    var similarIndex = musicResults[i].itemIndex == item.itemIndex - 1;
                    return sameProject && sameInstrument && sameBar;
                })) {
                    finalResults.push(musicResults[i]);
                }
            }
            return finalResults;
        };
        SmartSearchService.prototype.findTextInProject = function (text, project) {
            var results = [];
            var projectIndex = Inknote.getIndexFromID(Inknote.Managers.ProjectManager.Instance.allProjects, project.ID);
            for (var i = 0; i < project.instruments.length; i++) {
                for (var j = 0; j < project.instruments[i].bars.length; j++) {
                    for (var k = 0; k < project.instruments[i].bars[j].items.length; k++) {
                        var tempItem = project.instruments[i].bars[j].items[k];
                        if (tempItem instanceof Inknote.Model.Text) {
                            if (tempItem.content.indexOf(text) != -1) {
                                results.push(new SmartSearchResult(projectIndex, i, j, k));
                            }
                        }
                    }
                }
            }
            return results;
        };
        SmartSearchService.prototype.findText = function (text) {
            var results = [];
            if (this.settings.searchRange == SearchRange.ALL_PROJECTS) {
                var projects = Inknote.Managers.ProjectManager.Instance.allProjects;
                for (var i = 0; i < projects.length; i++) {
                    results = results.concat(this.findTextInProject(text, projects[i]));
                }
            }
            else {
                results = this.findTextInProject(text, Inknote.Managers.ProjectManager.Instance.currentProject);
            }
            return results;
        };
        SmartSearchService.prototype.musicMatchesWithBar = function (music, bar) {
            var musicIndex = 0;
            var barIndex = 0;
            if (music.length > bar.items.length) {
                return false;
            }
            while (musicIndex < music.length && barIndex < bar.items.length) {
                if (bar.items[barIndex] instanceof Inknote.Model.Note
                    || bar.items[barIndex] instanceof Inknote.Model.Rest) {
                    if (bar.items[barIndex] instanceof Inknote.Model.Note) {
                        var barNote = bar.items[barIndex];
                        if (music[musicIndex] instanceof Inknote.Model.Rest) {
                            return false;
                        }
                        var musicNote = music[musicIndex];
                        // with notes, not necessarily going for specific rhythm
                        if (musicNote.value != barNote.value) {
                            return false;
                        }
                    }
                    else {
                        var barRest = bar.items[barIndex];
                        if (music[musicIndex] instanceof Inknote.Model.Note) {
                            return false;
                        }
                        var musicRest = music[musicIndex];
                        // with rests, can only be going for length.
                        if (musicRest.length != barRest.length) {
                            return false;
                        }
                    }
                    musicIndex++;
                }
                else {
                }
                barIndex++;
            }
            return true;
        };
        SmartSearchService.prototype.findMusicInProject = function (music, project) {
            var results = [];
            var projectIndex = Inknote.getIndexFromID(Inknote.Managers.ProjectManager.Instance.allProjects, project.ID);
            for (var i = 0; i < project.instruments.length; i++) {
                for (var j = 0; j < project.instruments[i].bars.length; j++) {
                    if (this.musicMatchesWithBar(music, project.instruments[i].bars[j])) {
                        results.push(new SmartSearchResult(projectIndex, i, j, 0));
                    }
                }
            }
            return results;
        };
        SmartSearchService.prototype.findMusic = function (music) {
            var results = [];
            if (this.settings.searchRange == SearchRange.ALL_PROJECTS) {
                var projects = Inknote.Managers.ProjectManager.Instance.allProjects;
                for (var i = 0; i < projects.length; i++) {
                    results = results.concat(this.findMusicInProject(music, projects[i]));
                }
            }
            else {
                results = this.findMusicInProject(music, Inknote.Managers.ProjectManager.Instance.currentProject);
            }
            return results;
        };
        return SmartSearchService;
    })();
    Inknote.SmartSearchService = SmartSearchService;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var GoToService = (function () {
        function GoToService() {
        }
        Object.defineProperty(GoToService, "Instance", {
            get: function () {
                if (!GoToService._instance) {
                    GoToService._instance = new GoToService();
                }
                return GoToService._instance;
            },
            enumerable: true,
            configurable: true
        });
        GoToService.prototype.goToDrawingItem = function (item) {
            Inknote.ScrollService.Instance.y = item.y - 80;
            Inknote.ScoringService.Instance.selectID = item.ID;
            Inknote.ScoringService.Instance.refresh();
        };
        GoToService.prototype.goToID = function (id) {
            var scoreItems = Inknote.ScoringService.Instance.getPrintItems();
            var item = Inknote.getFirstItemWhere(scoreItems, function (item) {
                return id == item.ID;
            });
            if (item == null) {
                Inknote.log("no scoreable item with this id, so cannot go to it", Inknote.MessageType.Error);
                return;
            }
            this.goToDrawingItem(item);
        };
        GoToService.prototype.goToModelItem = function (item) {
            this.goToID(item.ID);
        };
        return GoToService;
    })();
    Inknote.GoToService = GoToService;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Audio;
    (function (Audio) {
        (function (SoundType) {
            SoundType[SoundType["sine"] = 0] = "sine";
            SoundType[SoundType["sawtooth"] = 1] = "sawtooth";
            SoundType[SoundType["triangle"] = 2] = "triangle";
            SoundType[SoundType["square"] = 3] = "square";
            SoundType[SoundType["custome"] = 4] = "custome";
        })(Audio.SoundType || (Audio.SoundType = {}));
        var SoundType = Audio.SoundType;
        function getSoundType(soundType) {
            switch (soundType) {
                case SoundType.sine:
                    return "sine";
                case SoundType.sawtooth:
                    return "sawtooth";
                case SoundType.triangle:
                    return "triangle";
                case SoundType.square:
                    return "square";
                default:
                    return "sine";
            }
        }
        Audio.getSoundType = getSoundType;
        var Sound = (function () {
            function Sound(freq, time, soundType) {
                this.isSilent = false;
                this.finished = false;
                this.note = null;
                this.soundType = SoundType.sine;
                this.frequency = freq;
                this.playTime = time;
                this.lifeTime = time + 1000;
                if (soundType) {
                    this.soundType = soundType;
                }
            }
            Sound.prototype.play = function (ctx, connectTo) {
                this.oscillator = ctx.createOscillator();
                this.oscillator.type = getSoundType(this.soundType);
                if (this.synth) {
                    this.oscillator.type = getSoundType(this.synth.oscillatorType);
                }
                this.gain = ctx.createGain();
                this.gain.gain.value = 0.3;
                this.oscillator.connect(this.gain);
                if (this.synth) {
                    var synth = this.synth;
                    synth.setInput(this.gain);
                    synth.connectTo(connectTo, ctx);
                }
                else {
                    this.gain.connect(connectTo);
                }
                //this.gain.connect(connectTo);
                this.oscillator.frequency.value = this.frequency;
                this.oscillator.start(0);
                this.startTime = new Date();
                this.note.isPlaying = true;
                Inknote.ScoringService.Instance.refresh();
            };
            Sound.prototype.mute = function () {
                // seperated from stop && disconnecting functions to reduce clipping.
                this.isSilent = true;
                this.gain.gain.value = 0;
                this.note.isPlaying = false;
                Inknote.ScoringService.Instance.refresh();
            };
            Sound.prototype.stop = function () {
                // by only decreasing gain, removes popping.
                // this.oscillator.disconnect();
                this.finished = true;
                this.oscillator.disconnect();
                this.gain.disconnect();
                this.gain.numberOfOutputs;
            };
            Sound.prototype.update = function () {
                var currentTime = (new Date()).getTime();
                var start = this.startTime.getTime();
                if (currentTime - start > this.playTime) {
                    this.mute();
                }
                else if (currentTime - start > this.lifeTime) {
                    this.stop();
                }
                else {
                    this.gain.gain.value *= 0.95;
                }
            };
            return Sound;
        })();
        Audio.Sound = Sound;
    })(Audio = Inknote.Audio || (Inknote.Audio = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Audio;
    (function (Audio) {
        function getFrequencyFromNote(note) {
            var result;
            var noteVal = note.value;
            // case for octave 4.
            switch (noteVal) {
                case Inknote.Model.NoteValue.C:
                    result = 261.63;
                    break;
                case Inknote.Model.NoteValue.Db:
                    result = 277.18;
                    break;
                case Inknote.Model.NoteValue.D:
                    result = 293.66;
                    break;
                case Inknote.Model.NoteValue.Eb:
                    result = 311.13;
                    break;
                case Inknote.Model.NoteValue.E:
                    result = 329.63;
                    break;
                case Inknote.Model.NoteValue.F:
                    result = 349.23;
                    break;
                case Inknote.Model.NoteValue.Gb:
                    result = 369.99;
                    break;
                case Inknote.Model.NoteValue.G:
                    result = 392.00;
                    break;
                case Inknote.Model.NoteValue.Ab:
                    result = 415.30;
                    break;
                case Inknote.Model.NoteValue.A:
                    result = 440.00;
                    break;
                case Inknote.Model.NoteValue.Bb:
                    result = 466.16;
                    break;
                case Inknote.Model.NoteValue.B:
                    result = 493.88;
                    break;
            }
            var octave = note.octave;
            result *= Math.pow(2, octave - 4);
            return result;
        }
        Audio.getFrequencyFromNote = getFrequencyFromNote;
    })(Audio = Inknote.Audio || (Inknote.Audio = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Audio;
    (function (Audio) {
        function getPlayingTimeFromNoteLength(val, bpm) {
            var second = 1000;
            var minute = second * 60;
            var beatLength = minute / bpm;
            // bpm has to be given from crotchet!
            var crotchets = Inknote.getCrotchetsFromNoteLength(val);
            return crotchets * beatLength;
        }
        Audio.getPlayingTimeFromNoteLength = getPlayingTimeFromNoteLength;
        function getPlayingTime(note, bpm) {
            return getPlayingTimeFromNoteLength(note.length, bpm);
        }
        Audio.getPlayingTime = getPlayingTime;
    })(Audio = Inknote.Audio || (Inknote.Audio = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Audio;
    (function (Audio) {
        function makeDistortionCurve(amount) {
            var k = typeof amount === 'number' ? amount : 50, n_samples = 44100, curve = new Float32Array(n_samples), deg = Math.PI / 180, i = 0, x;
            for (; i < n_samples; ++i) {
                x = i * 2 / n_samples - 1;
                curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
            }
            return curve;
        }
        ;
        function toMinimumSizeIndex(items) {
            var result = [];
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var num = 0;
                if (item instanceof Inknote.Model.Note) {
                    num = Inknote.getCrotchetsFromNoteLength(item.length) * 16;
                    result.push(item);
                    num--;
                }
                else if (item instanceof Inknote.Model.Rest) {
                    num = Inknote.getCrotchetsFromNoteLength(item.length) * 16;
                }
                else if (item instanceof Inknote.Model.Chord) {
                    num = Inknote.getCrotchetsFromNoteLength(item.notes[0].length) * 16;
                    result.push(item);
                    num--;
                }
                for (var j = 0; j < num; j++) {
                    result.push(null);
                }
            }
            return result;
        }
        var AudioService = (function () {
            function AudioService() {
                this.context = this.isAudioWorking ? new AudioContext() : null;
                this.playing = false;
                this.init();
            }
            Object.defineProperty(AudioService, "Instance", {
                get: function () {
                    if (!AudioService._instance) {
                        AudioService._instance = new AudioService();
                    }
                    return AudioService._instance;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AudioService.prototype, "isAudioWorking", {
                get: function () {
                    return (typeof (AudioContext) == "function");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AudioService.prototype, "bpm", {
                get: function () {
                    var currentProject = Inknote.Managers.ProjectManager.Instance.currentProject;
                    return currentProject ? currentProject.bpm : 120;
                },
                enumerable: true,
                configurable: true
            });
            AudioService.prototype.init = function () {
                if (!this.isAudioWorking) {
                    return;
                }
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
                this.timeSignature = new Inknote.Model.TimeSignature(4, 4);
                this.playing = false;
                this.barIndex = 0;
                this.beatIndex = 0;
                this.indexChanged = null;
            };
            AudioService.prototype.toggle = function () {
                if (this.playing) {
                    this.stop();
                }
                else {
                    this.play();
                }
            };
            AudioService.prototype.play = function () {
                if (!this.isAudioWorking) {
                    return;
                }
                if (Inknote.Managers.PageManager.Current.page != Inknote.Managers.Page.Score) {
                    return;
                }
                this.playing = true;
                // run from selected item.
                var selectedID = Inknote.ScoringService.Instance.selectID;
                var proj = Inknote.Managers.ProjectManager.Instance.currentProject;
                for (var i = 0; i < proj.instruments.length; i++) {
                    if (proj.instruments[i].visible === true) {
                        for (var j = 0; j < proj.instruments[i].bars.length; j++) {
                            if (proj.instruments[i].bars[j].ID === selectedID) {
                                this.barIndex = j;
                                return;
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
            };
            AudioService.prototype.playSound = function (sound) {
                if (!this.isAudioWorking) {
                    return;
                }
                this.sounds.push(sound);
                sound.play(this.context, this.masterGain);
            };
            AudioService.prototype.playNote = function (note, synth) {
                if (!this.isAudioWorking) {
                    return;
                }
                var frequency = Audio.getFrequencyFromNote(note);
                var playTime = Audio.getPlayingTime(note, this.bpm);
                var newSound = new Audio.Sound(frequency, playTime);
                if (synth) {
                    newSound.synth = synth;
                }
                newSound.note = note;
                this.playSound(newSound);
            };
            AudioService.prototype.playNotes = function () {
                if (!this.isAudioWorking) {
                    return;
                }
                var minDifferenceTime = Audio.getPlayingTimeFromNoteLength(Inknote.Model.NoteLength.HemiDemiSemiQuaver, this.bpm);
                var currentTime = new Date();
                if (this.indexChanged && (currentTime.getTime() - this.indexChanged.getTime() < minDifferenceTime)) {
                    return;
                }
                var proj = Inknote.Managers.ProjectManager.Instance.currentProject;
                if (this.barIndex >= proj.instruments[0].bars.length) {
                    this.stop();
                    return;
                }
                for (var i = 0; i < proj.instruments.length; i++) {
                    var tempBar = proj.instruments[i].bars[this.barIndex];
                    var currentInstrument = proj.instruments[i];
                    var synth = currentInstrument.synthID ? Audio.SynthManager.Instance.getSynth(currentInstrument.synthID, currentInstrument.synthName) : null;
                    var tempItems = Inknote.getItemsWhere(tempBar.items, function (item) {
                        return item instanceof Inknote.Model.Note || item instanceof Inknote.Model.Rest;
                    });
                    var minimumSizeTempItems = toMinimumSizeIndex(tempItems);
                    var tempItem = minimumSizeTempItems[this.beatIndex];
                    if (tempItem instanceof Inknote.Model.Note) {
                        this.playNote(tempItem, synth);
                    }
                }
                if (this.beatIndex + 1 >= this.timeSignature.top * 16) {
                    this.barIndex++;
                }
                this.beatIndex = (this.beatIndex + 1) % (this.timeSignature.top * 16);
                this.indexChanged = new Date();
            };
            AudioService.prototype.updateSounds = function () {
                if (!this.isAudioWorking) {
                    return;
                }
                for (var i = 0; i < this.sounds.length; i++) {
                    this.sounds[i].update();
                }
            };
            AudioService.prototype.removeFinishedSounds = function () {
                if (!this.isAudioWorking) {
                    return;
                }
                var newSounds = [];
                for (var i = 0; i < this.sounds.length; i++) {
                    if (!this.sounds[i].finished) {
                        newSounds.push(this.sounds[i]);
                    }
                }
                this.sounds = newSounds;
            };
            AudioService.prototype.pause = function () {
                this.playing = false;
            };
            AudioService.prototype.clearSounds = function () {
                if (!this.isAudioWorking) {
                    return;
                }
                for (var i = 0; i < this.sounds.length; i++) {
                    this.sounds[i].stop();
                }
            };
            AudioService.prototype.stop = function () {
                if (!this.isAudioWorking) {
                    return;
                }
                this.playing = false;
                this.clearSounds();
                this.init();
            };
            AudioService.prototype.update = function () {
                if (!this.isAudioWorking) {
                    return;
                }
                if (Inknote.Managers.PageManager.Current.page != Inknote.Managers.Page.Score && this.playing === true) {
                    this.stop();
                }
                if (this.playing === true) {
                    this.playNotes();
                }
                this.updateSounds();
                this.removeFinishedSounds();
            };
            return AudioService;
        })();
        Audio.AudioService = AudioService;
    })(Audio = Inknote.Audio || (Inknote.Audio = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Audio;
    (function (Audio) {
        var Synth = (function () {
            function Synth(name) {
                this.name = name;
                this.ID = Inknote.getID();
                this.oscillatorType = Audio.SoundType.sine;
                if (!name) {
                    throw new Error("A synth must have a name!");
                }
            }
            Synth.prototype.setInput = function (node) {
                this.input = node;
            };
            Object.defineProperty(Synth.prototype, "gain", {
                get: function () {
                    return this.mixGain ? this.mixGain.gain.value : 1;
                },
                set: function (newGain) {
                    if (!this.mixGain) {
                        return;
                    }
                    this.mixGain.gain.value = newGain;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Synth.prototype, "delay", {
                get: function () {
                    return this.delayNode ? this.delayNode.delayTime.value : 0.1;
                },
                set: function (delayTime) {
                    if (!this.delayNode) {
                        return;
                    }
                    this.delayNode.delayTime.value = delayTime;
                },
                enumerable: true,
                configurable: true
            });
            Synth.prototype.connectTo = function (node, audioContext) {
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
                 *                |         |
                 *                |     compressor
                 *                |         |
                 *                |---<-----|
                 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
                this.input.connect(this.dryGain);
                this.input.connect(this.delayNode);
                this.delayNode.connect(wetGain);
                var compressor = audioContext.createDynamicsCompressor();
                compressor.threshold.value = 0.5;
                compressor.attack.value *= 5;
                compressor.knee.value *= 4;
                wetGain.connect(compressor);
                compressor.connect(this.delayNode);
                this.dryGain.connect(this.mixGain);
                wetGain.connect(this.mixGain);
                this.mixGain.connect(node);
            };
            return Synth;
        })();
        Audio.Synth = Synth;
    })(Audio = Inknote.Audio || (Inknote.Audio = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Audio;
    (function (Audio) {
        var SynthManager = (function () {
            function SynthManager() {
                this.synths = [];
                this.synths = Inknote.Storage.getSynths();
                if (this.synths.length == 0) {
                    var newSynth = new Audio.Synth("Standard synth");
                    newSynth.oscillatorType = Audio.SoundType.sine;
                    newSynth.gain = 1;
                    this.synths.push(newSynth);
                }
            }
            Object.defineProperty(SynthManager, "Instance", {
                get: function () {
                    if (!SynthManager._instance) {
                        SynthManager._instance = new SynthManager();
                    }
                    return SynthManager._instance;
                },
                enumerable: true,
                configurable: true
            });
            SynthManager.prototype.addSynth = function (synth) {
                this.synths.push(synth);
            };
            SynthManager.prototype.getSynths = function () {
                return this.synths;
            };
            SynthManager.prototype.deleteSynth = function (id, name, callback) {
                var self = this;
                Inknote.check("are you sure you want to delete this synth?", function () {
                    var relevantSynth = self.getSynth(id, name);
                    if (!relevantSynth) {
                        return;
                    }
                    var newSynthList = [];
                    newSynthList = Inknote.getItemsWhere(self.synths, function (item) {
                        return item != relevantSynth;
                    });
                    self.synths = newSynthList;
                    callback();
                });
            };
            SynthManager.prototype.getSynthFromID = function (id) {
                return Inknote.getItemFromID(this.synths, id);
            };
            SynthManager.prototype.getSynthFromName = function (name) {
                for (var i = 0; i < this.synths.length; i++) {
                    if (this.synths[i].name == name) {
                        return this.synths[i];
                    }
                }
                return null;
            };
            SynthManager.prototype.getSynth = function (id, name) {
                // gets by id
                var result = this.getSynthFromID(id);
                // otherwise gets from name
                if (!result) {
                    result = this.getSynthFromName(name);
                }
                // else creates a new synth with this name
                if (!result) {
                    var synth = new Audio.Synth(name);
                    this.addSynth(synth);
                    return synth;
                }
                return result;
            };
            return SynthManager;
        })();
        Audio.SynthManager = SynthManager;
    })(Audio = Inknote.Audio || (Inknote.Audio = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Audio;
    (function (Audio) {
        var SynthService = (function () {
            function SynthService() {
            }
            Object.defineProperty(SynthService, "Instance", {
                get: function () {
                    if (!SynthService._instance) {
                        SynthService._instance = new SynthService();
                    }
                    return SynthService._instance;
                },
                enumerable: true,
                configurable: true
            });
            SynthService.setSynth = function (id, name) {
                SynthService.Instance.synth = Audio.SynthManager.Instance.getSynth(id, name);
            };
            SynthService.prototype.changeWaveShape = function (value) {
                this.synth.oscillatorType = Audio.SoundType[value];
            };
            SynthService.prototype.changeGain = function (value) {
                this.synth.gain = value;
            };
            SynthService.prototype.changeDelay = function (value) {
                this.synth.delay = value;
            };
            return SynthService;
        })();
        Audio.SynthService = SynthService;
    })(Audio = Inknote.Audio || (Inknote.Audio = {}));
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
                    Inknote.log("orientation lock failed in this browser", Inknote.MessageType.Warning);
                }
            }
            else {
                Inknote.log("lockOrientation undefined in this browser", Inknote.MessageType.Warning);
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
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
                    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
                    isMobile = true;
                if (isMobile) {
                    this.machineType = MachineType.Mobile;
                }
                else {
                    this.machineType = MachineType.Desktop;
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
            Page[Page["Print"] = 5] = "Print";
        })(Managers.Page || (Managers.Page = {}));
        var Page = Managers.Page;
        function pageName(page) {
            switch (page) {
                case Page.Score:
                    return "Score";
                case Page.Form:
                    return "Form";
                case Page.File:
                    return "File";
                case Page.List:
                    return "List";
                case Page.Licence:
                    return "Licence";
                case Page.Print:
                    return "Print";
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
                    if (Menu.isMenuOpen) {
                        Menu.toggle();
                    }
                    Menu.closeAllSubMenus();
                    Inknote.RightClickMenuService.Instance.visible = false;
                    if (Inknote.ScrollService && Inknote.ScrollService.Instance) {
                        Inknote.ScrollService.Instance.x = 0;
                        Inknote.ScrollService.Instance.y = 0;
                    }
                    if (item == Page.Score) {
                        FrontEnd.showElement(document.getElementById("play"));
                        FrontEnd.showElement(document.getElementById("mouse-control"));
                    }
                    else {
                        FrontEnd.hideElement(document.getElementById("play"));
                        FrontEnd.hideElement(document.getElementById("mouse-control"));
                        MouseControl.SelectMouseType(0);
                    }
                    var pagePrefix = "page-item-";
                    for (var i = 0; i < 6; i++) {
                        var pageItemsToHide = document.getElementsByClassName(pagePrefix + pageName(i));
                        for (var j = 0; j < pageItemsToHide.length; j++) {
                            FrontEnd.hideElement(pageItemsToHide[j]);
                        }
                    }
                    var pageItems = document.getElementsByClassName(pagePrefix + pageName(item));
                    for (var i = 0; i < pageItems.length; i++) {
                        FrontEnd.showElement(pageItems[i]);
                    }
                    switch (item) {
                        case Page.File:
                            break;
                        case Page.Form:
                            break;
                        case Page.List:
                            break;
                        case Page.Print:
                        case Page.Score:
                            pageURL += "=" + Managers.ProjectManager.Instance.currentProject.ID;
                            break;
                        case Page.Licence:
                            window.location.href = "./licence";
                            return;
                    }
                    if (window.location.origin != "file://") {
                        window.history.pushState(null, pageURL, pageURL);
                    }
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
                return window.open(newURL);
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
                    this.page = Page.Score;
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
            Object.defineProperty(ProjectManager.prototype, "currentProjectOverride", {
                set: function (project) {
                    Inknote.log("current project overriden", Inknote.MessageType.Warning);
                    this._currentProject = project;
                    var self = this;
                    // for fixing undo, then save issue.
                    var projectListItemToOverride = Inknote.getFirstItemWhere(this._projects, function (project) {
                        return project.ID == self._currentProject.ID;
                    });
                    var itemIndex = this._projects.indexOf(projectListItemToOverride);
                    this._projects[itemIndex] = project;
                },
                enumerable: true,
                configurable: true
            });
            ProjectManager.prototype.save = function () {
                var self = this;
                var projectAlreadyExists = Inknote.anyItemIs(this._projects, function (project) {
                    return project.ID == self._currentProject.ID;
                });
                if (projectAlreadyExists === true) {
                    // overwrite item with this ID.
                    // * fixes issue with undoing then saving *
                    var currentProjectInHere = Inknote.getFirstItemWhere(this._projects, function (project) {
                        return project.ID == self._currentProject.ID;
                    });
                    var itemIndex = this._projects.indexOf(currentProjectInHere);
                    this._projects[itemIndex] = this._currentProject;
                }
                else {
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
                Managers.PageManager.Current.page = Managers.Page.Score;
                Managers.ProjectManager.Instance._currentProject.pause = false;
                this.selectID = null;
            };
            ProjectManager.prototype.openProjectFromID = function (ID) {
                this.setCurrentProject(ID);
                Managers.PageManager.Current.page = Managers.Page.Score;
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
                // add plugin list.
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
                        var pNameIndex = +target.id.split("-")[1];
                        if (target.checked) {
                            Inknote.check("Are you sure you want this plugin?", function () {
                                self.setPluginNameVal(pNameIndex + "", target.checked);
                                self.findPluginByName(self._pluginNames[pNameIndex].name).active = target.checked;
                            }, function () {
                                target.checked = !target.checked;
                            });
                        }
                        else {
                            self.setPluginNameVal(pNameIndex + "", target.checked);
                            self.findPluginByName(self._pluginNames[pNameIndex].name).active = target.checked;
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
            PluginManager.prototype.setPluginOnLoadPlugin = function (ID, value) {
                var name = ID.split("...")[1];
                var plugin = this.findPluginByName(name);
                plugin.allowOnPluginLoad = value;
                setTimeout(function () {
                    Inknote.Storage.savePlugins();
                }, 200);
            };
            PluginManager.prototype.setPluginOnUnloadPlugin = function (ID, value) {
                var name = ID.split("...")[1];
                var plugin = this.findPluginByName(name);
                plugin.allowOnPluginUnload = value;
                setTimeout(function () {
                    Inknote.Storage.savePlugins();
                }, 200);
            };
            PluginManager.prototype.setPluginOnAppStart = function (ID, value) {
                var name = ID.split("...")[1];
                var plugin = this.findPluginByName(name);
                plugin.allowOnAppStart = value;
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
                // add event list.
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
                                case "on plugin load":
                                    plgCheck.checked = plugin.allowOnPluginLoad;
                                    var pluginName = plugin.name;
                                    plgCheck.id = "onpluginload..." + pluginName;
                                    plgCheck.onclick = function (ev) {
                                        var target = ev.target;
                                        self.setPluginOnLoadPlugin(target.id, target.checked);
                                    };
                                    break;
                                case "on plugin unload":
                                    plgCheck.checked = plugin.allowOnPluginUnload;
                                    var pluginName = plugin.name;
                                    plgCheck.id = "onpluginunload..." + pluginName;
                                    plgCheck.onclick = function (ev) {
                                        var target = ev.target;
                                        self.setPluginOnUnloadPlugin(target.id, target.checked);
                                    };
                                    break;
                                case "on app start":
                                    plgCheck.checked = plugin.allowOnAppStart;
                                    var pluginName = plugin.name;
                                    plgCheck.id = "onappstart..." + pluginName;
                                    plgCheck.onclick = function (ev) {
                                        var target = ev.target;
                                        self.setPluginOnAppStart(target.id, target.checked);
                                    };
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
                var items = Inknote.getItemsWhere(this._plugins, function (item) { return item.name == name; });
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
    var Managers;
    (function (Managers) {
        (function (MouseType) {
            MouseType[MouseType["NORMAL"] = 0] = "NORMAL";
            MouseType[MouseType["PENCIL"] = 1] = "PENCIL";
            MouseType[MouseType["TEXT"] = 2] = "TEXT";
        })(Managers.MouseType || (Managers.MouseType = {}));
        var MouseType = Managers.MouseType;
        var MouseManager = (function () {
            function MouseManager() {
                this._currentMouse = MouseType.NORMAL;
            }
            Object.defineProperty(MouseManager, "Instance", {
                get: function () {
                    if (!MouseManager._instance) {
                        MouseManager._instance = new MouseManager();
                    }
                    return MouseManager._instance;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MouseManager.prototype, "currentMouse", {
                get: function () {
                    return this._currentMouse;
                },
                set: function (mouseType) {
                    if (mouseType == MouseType.PENCIL) {
                        Inknote.DrawService.Instance.canvas.className = Inknote.DrawService.Instance.canvas.className.replace(/textMode/g, "");
                        if (Inknote.DrawService.Instance.canvas.className.indexOf("pencilMode") == -1) {
                            Inknote.DrawService.Instance.canvas.className += " pencilMode";
                        }
                    }
                    else if (mouseType == MouseType.TEXT) {
                        Inknote.DrawService.Instance.canvas.className = Inknote.DrawService.Instance.canvas.className.replace(/pencilMode/g, "");
                        if (Inknote.DrawService.Instance.canvas.className.indexOf("textMode") == -1) {
                            Inknote.DrawService.Instance.canvas.className += " textMode";
                        }
                    }
                    else {
                        Inknote.DrawService.Instance.canvas.className = Inknote.DrawService.Instance.canvas.className.replace(/pencilMode/g, "").replace(/textMode/g, "");
                    }
                    this._currentMouse = mouseType;
                },
                enumerable: true,
                configurable: true
            });
            return MouseManager;
        })();
        Managers.MouseManager = MouseManager;
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
                this.allowOnPluginLoad = true;
                this.allowOnPluginUnload = true;
                this.allowOnAppStart = true;
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
                    if (existingName.allowOnPluginLoad != null) {
                        this.allowOnPluginLoad = existingName.allowOnPluginLoad;
                    }
                    if (existingName.allowOnPluginUnload != null) {
                        this.allowOnPluginUnload = existingName.allowOnPluginUnload;
                    }
                    if (existingName.allowOnAppStart != null) {
                        this.allowOnAppStart = existingName.allowOnAppStart;
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
                        if (this.onPluginLoad) {
                            this.onPluginLoad();
                        }
                    }
                    else {
                        if (this.onPluginUnload) {
                            this.onPluginUnload();
                        }
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
                if (this.onPluginLoad) {
                    fns.push("on plugin load");
                }
                if (this.onPluginUnload) {
                    fns.push("on plugin unload");
                }
                if (this.onAppStart) {
                    fns.push("on app start");
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
            new Plugins.InknotePluginName("snow background", "./plugins/snow-back.js", "covers the background with snow"),
            new Plugins.InknotePluginName("plugin2", "./plugins/plugin2.js", "testing on draw"),
            new Plugins.InknotePluginName("data storage", "./plugins/data-storage.js", "testing on save"),
            new Plugins.InknotePluginName("fire background", "./plugins/fire-bground.js", "covers the background with flames")
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
        try {
            Inknote.ScrollService.Instance.x = 0;
            Inknote.ScrollService.Instance.y = 0;
            Inknote.Managers.ProjectManager.Instance.currentProject.pause = true;
            Inknote.Managers.ProjectManager.Instance.selectID = "";
            switch (aType) {
                case ActionType.NewProject:
                    newProject();
                    break;
                case ActionType.OpenProject:
                    openProject();
                    break;
                case ActionType.SaveProject:
                    saveProject();
                    break;
                case ActionType.ToPage:
                    if (!page) {
                        page = Inknote.Managers.Page.Score;
                    }
                    moveToPage(page);
                    break;
                default:
                    Inknote.log("Unknown action type", Inknote.MessageType.Error);
            }
            // project manager needs to be static.
            setTimeout(function () {
                Inknote.Managers.ProjectManager.Instance.currentProject.pause = false;
            }, 100);
        }
        catch (e) {
            if (Inknote.log) {
                Inknote.log(e, Inknote.MessageType.Error);
            }
        }
    }
    Inknote.Action = Action;
    function newProject() {
        var newProj = new Inknote.Project("Untitled");
        Inknote.Managers.ProjectManager.Instance.addProject(newProj, function (item) {
            Inknote.Managers.ProjectManager.Instance.setCurrentProject(item.ID);
            Inknote.Managers.PageManager.Current.page = Inknote.Managers.Page.Score;
            Inknote.Managers.ProjectManager.Instance.currentProject.pause = true;
        });
    }
    function openProject() {
        Inknote.Managers.PageManager.Current.page = Inknote.Managers.Page.File;
    }
    function saveProject() {
        Inknote.Managers.ProjectManager.Instance.save();
        Inknote.Storage.saveSynths();
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
                if (Inknote.Managers.MachineManager.Instance.machineType == Inknote.Managers.MachineType.Desktop) {
                    try {
                        self.click(e);
                    }
                    catch (e) {
                        if (Inknote.log) {
                            Inknote.log(e, Inknote.MessageType.Error);
                        }
                    }
                }
            };
            this.drawService.canvas.ondblclick = function (e) {
                try {
                    self.dblClick(e);
                }
                catch (e) {
                    if (Inknote.log) {
                        Inknote.log(e, Inknote.MessageType.Error);
                    }
                }
            };
            this.drawService.canvas.onmousedown = function (e) {
                try {
                    self.mouseDown(e, drawService);
                }
                catch (e) {
                    if (Inknote.log) {
                        Inknote.log(e, Inknote.MessageType.Error);
                    }
                }
            };
            // right click
            this.drawService.canvas.oncontextmenu = function (e) {
                try {
                    self.rightClick(e);
                }
                catch (e) {
                    if (Inknote.log) {
                        Inknote.log(e, Inknote.MessageType.Error);
                    }
                }
            };
            this.drawService.canvas.addEventListener("touchstart", function (e) {
                try {
                    self.touchStart(e, self.drawService);
                    //var me = new MouseEvent(null);
                    // todo: get correct touch object.
                    var touch = e.touches[0];
                    self.click(touch);
                }
                catch (e) {
                    if (Inknote.log) {
                        Inknote.log(e, Inknote.MessageType.Error);
                    }
                }
            }, false);
        }
        CanvasControl.prototype.hover = function (e) {
            if (Inknote.Managers.MouseManager.Instance.currentMouse == Inknote.Managers.MouseType.PENCIL
                || Inknote.Managers.MouseManager.Instance.currentMouse === Inknote.Managers.MouseType.TEXT) {
                return;
            }
            var allItems = this.drawService.items;
            var hovered = false;
            var scoreItems = [];
            for (var i = 0; i < allItems.length; i++) {
                if (Inknote.mouseIsOver(allItems[i], e, this.drawService.canvas)) {
                    // log(allItems[i].y + ":" + e.clientY + ":" + ScrollService.Instance.y);
                    if (Inknote.Managers.PageManager.Current.page == Inknote.Managers.Page.Score) {
                        if (allItems[i] instanceof Inknote.Notation) {
                            scoreItems.push(allItems[i]);
                        }
                    }
                    var hoverID = allItems[i].ID;
                    Inknote.Managers.ProjectManager.Instance.hoverID = hoverID;
                    hovered = true;
                    this.drawService.canvas.style.cursor = "url('assets/pointer.png'), pointer";
                }
            }
            var sortedScoreItems = scoreItems.sort(function (a, b) { return b.order - a.order; });
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
        CanvasControl.prototype.pencilClick = function (e) {
            var scoreItems = Inknote.ScoringService.Instance.getItems();
            var bars = Inknote.getItemsWhere(scoreItems, function (item) {
                return item instanceof Inknote.Drawing.Bar;
            });
            var inBar = Inknote.getFirstItemWhere(bars, function (item) {
                return item.isOver(e.clientX, e.clientY - 50);
            });
            if (inBar) {
                Inknote.NoteControlService.Instance.addNoteToBar(e.clientY - 50 - inBar.y, inBar.ID);
            }
            if (!inBar) {
                Inknote.log("the pencil can only be used to place notes within a bar");
            }
        };
        CanvasControl.prototype.textClick = function (e) {
            var scoreItems = Inknote.ScoringService.Instance.getItems();
            var notes = Inknote.getItemsWhere(scoreItems, function (item) {
                return item instanceof Inknote.Drawing.Note;
            });
            var closestNote = Inknote.getItemWithMin(notes, function (item) {
                return Inknote.Maths.pythagoras(e.clientX - item.x, e.clientY - 50 - item.y);
            });
            var addText = new Inknote.Model.Text("add text");
            var currentProject = Inknote.Managers.ProjectManager.Instance.currentProject;
            for (var i = 0; i < currentProject.instruments.length; i++) {
                for (var j = 0; j < currentProject.instruments[i].bars.length; j++) {
                    for (var k = 0; k < currentProject.instruments[i].bars[j].items.length; k++) {
                        var tempBar = currentProject.instruments[i].bars[j];
                        var tempItem = tempBar.items[k];
                        if (tempItem.ID == closestNote.ID) {
                            var textToAdd = prompt("text to be added:", addText.content);
                            if (textToAdd == null) {
                                Inknote.log("adding text cancelled", Inknote.MessageType.Warning);
                                return;
                            }
                            addText.content = textToAdd;
                            tempBar.items.splice(k + 1, 0, addText);
                            Inknote.ScoringService.Instance.refresh();
                            return;
                        }
                    }
                }
            }
            Inknote.log("text click not registered", Inknote.MessageType.Error);
        };
        CanvasControl.prototype.click = function (e) {
            if (Inknote.Managers.MouseManager.Instance.currentMouse == Inknote.Managers.MouseType.PENCIL) {
                this.pencilClick(e);
                return;
            }
            if (Inknote.Managers.MouseManager.Instance.currentMouse == Inknote.Managers.MouseType.TEXT) {
                this.textClick(e);
                return;
            }
            var allItems = this.drawService.items;
            var selected = false;
            var scoreItems = [];
            var sortedItems = [];
            for (var i = 0; i < allItems.length; i++) {
                sortedItems.push(allItems[i]);
            }
            sortedItems.sort(function (a, b) { return b.order - a.order; });
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
                    if (selectedID === Inknote.Drawing.Keyboard.Instance.ID) {
                        Inknote.Drawing.Keyboard.Instance.click(e);
                        return;
                    }
                    // " " bottom menu
                    if (selectedID === Inknote.Drawing.BottomMenu.Instance.ID) {
                        Inknote.Drawing.BottomMenu.Instance.click(e);
                        return;
                    }
                    // scroll bar
                    if (selectedID === Inknote.ScrollService.ScrollBar.ID) {
                        Inknote.ScrollService.ScrollBar.click(e);
                        return;
                    }
                    // scroll thumbnail
                    if (selectedID === Inknote.ScrollService.ScrollBar.scrollThumbnail.ID) {
                        Inknote.ScrollService.ScrollBar.scrollThumbnail.click(e);
                        return;
                    }
                    // licence
                    if (selectedID === Inknote.LicenceService.Instance.drawing.ID) {
                        Inknote.LicenceService.Instance.drawing.click(e);
                        return;
                    }
                    if (Inknote.Managers.PageManager.Current.page == Inknote.Managers.Page.Score) {
                        if (sortedItems[i] instanceof Inknote.Notation) {
                            scoreItems.push(sortedItems[i]);
                        }
                    }
                    Inknote.Managers.ProjectManager.Instance.selectID = selectedID;
                    selected = true;
                }
            }
            var sortedScoreItems = scoreItems.sort(function (a, b) { return b.order - a.order; });
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
            if (Inknote.Managers.PageManager.Current.page == Inknote.Managers.Page.File) {
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
                drawService.canvas.style.cursor = "url('assets/grabbing.png'), -webkit-grabbing";
            };
            drawService.canvas.addEventListener("mousemove", onMove, false);
            drawService.canvas.onmouseup = function (e) {
                drawService.canvas.removeEventListener("mousemove", onMove, false);
                drawService.canvas.style.cursor = "";
            };
            drawService.canvas.onmouseout = function (e) {
                drawService.canvas.removeEventListener("mousemove", onMove, false);
                drawService.canvas.style.cursor = "";
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
            if (Modal.isModalOpen === true) {
                return;
            }
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
    var keysDown = [];
    if (typeof document != "undefined" && typeof window != "undefined") {
        document.onkeydown = function (e) {
            if (e.target == document.getElementById("file-search") && e.keyCode != 27) {
                return;
            }
            if (e.target == document.getElementById("smart-search-text") && e.keyCode != 27) {
                return;
            }
            keysDown.push(e.keyCode);
            if (Inknote.CONFIRM_IS_OPEN) {
                return;
            }
            if (Modal.isModalOpen === true) {
                return;
            }
            // ctrl
            if (Inknote.anyItemIs(keysDown, function (item) {
                return item == 17;
            })) {
                // c
                // copy
                if (e.keyCode == 67) {
                    Inknote.ClipboardService.Instance.copy();
                }
                // v
                // paste
                if (e.keyCode == 86) {
                    Inknote.ClipboardService.Instance.paste();
                }
                // x
                // cut
                if (e.keyCode == 88) {
                    Inknote.ClipboardService.Instance.cut();
                }
                // z
                // undo
                if (e.keyCode == 90) {
                    Inknote.UndoService.Instance.undo();
                }
                // s
                // save
                if (e.keyCode == 83) {
                    Inknote.Action(Inknote.ActionType.SaveProject);
                    e.preventDefault();
                }
                // p
                // print
                if (e.keyCode == 80) {
                    Inknote.PrintService.Instance.print();
                    e.preventDefault();
                }
                // f
                // find
                if (e.keyCode == 70) {
                    FrontEnd.SmartSearch.openSearch();
                    e.preventDefault();
                }
            }
            if (e.keyCode == 8) {
                e.preventDefault();
            }
        };
        window.onkeyup = function (ev) {
            if (ev.target == document.getElementById("file-search") && ev.keyCode != 27) {
                return;
            }
            if (ev.target == document.getElementById("smart-search-text") && ev.keyCode != 27) {
                return;
            }
            keysDown = Inknote.getItemsWhere(keysDown, function (item) {
                return item != ev.keyCode;
            });
            if (Inknote.anyItemIs(keysDown, function (item) {
                return item == 17;
            })) {
                return;
            }
            if (Inknote.CONFIRM_IS_OPEN) {
                return;
            }
            if (Modal.isModalOpen === true && ev.keyCode != 27) {
                return;
            }
            switch (Inknote.Managers.PageManager.Current.page) {
                case Inknote.Managers.Page.File:
                    fileType(ev);
                    break;
                case Inknote.Managers.Page.Score:
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
                // esc
                case 27:
                    Inknote.Action(Inknote.ActionType.ToPage, Inknote.Managers.Page.File);
                    Modal.cancelReport();
                    Modal.hideAllModals();
                    FrontEnd.SmartSearch.closeSearch();
                    break;
                // a
                case 65:
                    noteVal = Inknote.Model.NoteValue.C;
                    break;
                // w
                case 87:
                    noteVal = Inknote.Model.NoteValue.Db;
                    break;
                // s
                case 83:
                    noteVal = Inknote.Model.NoteValue.D;
                    break;
                // e
                case 69:
                    noteVal = Inknote.Model.NoteValue.Eb;
                    break;
                // d
                case 68:
                    noteVal = Inknote.Model.NoteValue.E;
                    break;
                // f
                case 70:
                    noteVal = Inknote.Model.NoteValue.F;
                    break;
                // t
                case 84:
                    noteVal = Inknote.Model.NoteValue.Gb;
                    break;
                // g
                case 71:
                    noteVal = Inknote.Model.NoteValue.G;
                    break;
                // y
                case 89:
                    noteVal = Inknote.Model.NoteValue.Ab;
                    break;
                // h
                case 72:
                    noteVal = Inknote.Model.NoteValue.A;
                    break;
                // u
                case 85:
                    noteVal = Inknote.Model.NoteValue.Bb;
                    break;
                // j
                case 74:
                    noteVal = Inknote.Model.NoteValue.B;
                    break;
                // left
                case 37:
                    Inknote.ScoringService.Instance.cursorLeft();
                    break;
                // right
                case 39:
                    Inknote.ScoringService.Instance.cursorRight();
                    break;
                // up
                case 38:
                    Inknote.NoteControlService.Instance.noteValueUp();
                    break;
                // down
                case 40:
                    Inknote.NoteControlService.Instance.noteValueDown();
                    break;
                // delete
                case 8:
                case 46:
                    Inknote.NoteControlService.Instance.deleteSelected();
                    break;
                // SPACE
                case 32:
                    Inknote.Audio.AudioService.Instance.toggle();
                    break;
                // <
                case 188:
                // [
                case 219:
                    Inknote.NoteControlService.Instance.piano.octave--;
                    break;
                // >
                case 190:
                // ]
                case 221:
                    Inknote.NoteControlService.Instance.piano.octave++;
                    break;
                // +
                case 107:
                    Inknote.NoteControlService.Instance.show();
                    break;
                // -
                case 109:
                    Inknote.NoteControlService.Instance.hide();
                    break;
                default:
                    Inknote.log("key pressed: " + e.keyCode);
            }
        }
        if (noteVal != null) {
            if (Inknote.ScoringService.Instance.selectID == null || Inknote.ScoringService.Instance.SelectedItem instanceof Inknote.Drawing.Bar) {
                Inknote.NoteControlService.Instance.addNote(new Inknote.Model.Note(noteVal, Inknote.NoteControlService.Instance.piano.octave, Inknote.NoteControlService.Instance.lengthControl.selectedLength));
            }
            else {
                Inknote.NoteControlService.Instance.editNoteValueAndOctave(noteVal, Inknote.NoteControlService.Instance.piano.octave);
            }
        }
        if (Inknote.ScoringService.Instance.SelectedItem instanceof Inknote.Drawing.Clef) {
            switch (e.keyCode) {
                // up
                case 38:
                    Inknote.NoteControlService.Instance.editCurrentClef(true);
                    break;
                // down
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
            else if (Inknote.countWhere([16, 17, 18, 20], function (item) { return item == e.keyCode; }) > 0) {
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
            e.preventDefault();
            return;
        }
        e.preventDefault();
        switch (e.keyCode) {
            // m
            case 77:
                Menu.toggle();
                return;
            case 78:
                Inknote.Action(Inknote.ActionType.NewProject, Inknote.Managers.Page.Score);
                return;
        }
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
        switch (e.keyCode) {
            // esc
            case 27:
                Menu.closeAllSubMenus();
                if (Menu.isMenuOpen) {
                    Menu.toggle();
                }
                Modal.cancelReport();
                Modal.hideAllModals();
                Inknote.RightClickMenuService.Instance.visible = false;
                FrontEnd.hideElement(document.getElementById("search-bar"));
                FrontEnd.SmartSearch.closeSearch();
                return;
            // SPACE
            case 32:
                FrontEnd.showElement(document.getElementById("search-bar"));
                return;
            // m
            case 77:
                Menu.toggle();
                return;
            // n
            case 78:
                Inknote.Action(Inknote.ActionType.NewProject, Inknote.Managers.Page.Score);
                return;
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
    function isHidden(item) {
        var classes = item.className;
        return classes.indexOf("hidden") != -1;
    }
    FrontEnd.isHidden = isHidden;
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
            item.className = item.className.replace(/hidden/g, "");
        }
    }
    FrontEnd.showElement = showElement;
    function deSelect(item) {
        var classes = item.className;
        var isHidden = classes.indexOf("select") != -1;
        if (isHidden) {
            item.className = item.className.replace(/select/g, "");
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
    function addClass(item, className) {
        var classes = item.className;
        var isClass = classes.indexOf(className) != -1;
        if (!isClass) {
            item.className = item.className + " " + className;
        }
    }
    FrontEnd.addClass = addClass;
    function removeClass(item, className) {
        var classes = item.className;
        var isClass = classes.indexOf(className) != -1;
        if (isClass) {
            item.className = item.className.replace(className, "");
        }
    }
    FrontEnd.removeClass = removeClass;
    function toggleClass(item, className) {
        var classes = item.className;
        var isClass = classes.indexOf(className) != -1;
        if (isClass) {
            item.className = item.className.replace(className, "");
        }
        else {
            item.className = item.className + " " + className;
        }
    }
    FrontEnd.toggleClass = toggleClass;
})(FrontEnd || (FrontEnd = {}));
var Menu;
(function (Menu) {
    Menu.isMenuOpen = false;
    var menuButton;
    var menu;
    if (typeof (window) != typeof (undefined)) {
        Menu.scoreItems = document.getElementsByClassName("score-item");
        Menu.desktopItems = document.getElementsByClassName("desktop-item");
        menuButton = document.getElementsByClassName("menu-button")[0];
        menu = document.getElementById("main-menu");
    }
    function updateMenuItems() {
        for (var i = 0; i < Menu.scoreItems.length; i++) {
            if (Inknote.Managers.PageManager.Current.page == Inknote.Managers.Page.Score) {
                FrontEnd.showElement(Menu.scoreItems[i]);
            }
            else {
                FrontEnd.hideElement(Menu.scoreItems[i]);
            }
        }
        for (var i = 0; i < Menu.desktopItems.length; i++) {
            if (Inknote.Managers.MachineManager.Instance.machineType == Inknote.Managers.MachineType.Desktop) {
                FrontEnd.showElement(Menu.desktopItems[i]);
            }
            else {
                FrontEnd.hideElement(Menu.desktopItems[i]);
            }
        }
    }
    Menu.updateMenuItems = updateMenuItems;
    function toggle() {
        if (!Menu.isMenuOpen) {
            closeAllSubMenus();
        }
        Menu.isMenuOpen = !Menu.isMenuOpen;
        updateMenuItems();
        FrontEnd.toggleClass(menuButton, "open");
        FrontEnd.toggleClass(menu, "open");
    }
    Menu.toggle = toggle;
    function closeAllSubMenus(e) {
        if (e && e.currentTarget != e.target) {
            return;
        }
        var subs = document.getElementsByClassName("sub-menu");
        for (var i = 0; i < subs.length; i++) {
            FrontEnd.removeClass(subs[i], "open");
        }
    }
    Menu.closeAllSubMenus = closeAllSubMenus;
    function openSubMenu(id) {
        FrontEnd.addClass(document.getElementById(id), "open");
    }
    Menu.openSubMenu = openSubMenu;
    function closeSubMenu(id) {
        FrontEnd.removeClass(menu, "open");
        FrontEnd.removeClass(menuButton, "open");
        FrontEnd.removeClass(document.getElementById(id), "open");
    }
    Menu.closeSubMenu = closeSubMenu;
})(Menu || (Menu = {}));
var Modal;
(function (Modal) {
    Modal.isModalOpen = false;
    function toggle(ID) {
        var item = document.getElementById(ID);
        Modal.isModalOpen = !Modal.isModalOpen;
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
        Modal.isModalOpen = false;
        FrontEnd.hideElement(document.getElementById("modal-cover"));
    }
    Modal.hideAllModals = hideAllModals;
    function hide(ID) {
        var item = document.getElementById(ID);
        Modal.isModalOpen = false;
        FrontEnd.hideElement(item);
        FrontEnd.hideElement(document.getElementById("modal-cover"));
    }
    Modal.hide = hide;
    function show(ID) {
        var item = document.getElementById(ID);
        Modal.isModalOpen = true;
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
        if (!check) {
            Inknote.log("a robot is trying to submit a bug report", Inknote.MessageType.Warning);
            return;
        }
        if (!text) {
            Inknote.check("You cannot send a bug report without a description. Please try again.", function () { }, function () { cancelReport(); });
            return;
        }
        var relevantThreadID = Inknote.getID();
        var threadObject = {
            id: relevantThreadID,
            subject: "Bug: #" + relevantThreadID,
            posts: []
        };
        var postObject = {
            user: "Anonymous",
            threadID: relevantThreadID,
            message: text,
            time: (new Date()).toISOString().replace(/T/, ' ').replace(/\..+/, '')
        };
        var stringThread = JSON.stringify(threadObject);
        var stringPost = JSON.stringify(postObject);
        Inknote.HttpService.Instance.post(Inknote.Managers.SettingsManager.Current.serverURL + "/threads", stringThread, function (e) {
            Inknote.log("bug report thread created", Inknote.MessageType.Text);
            Inknote.HttpService.Instance.post(Inknote.Managers.SettingsManager.Current.serverURL + "/posts", stringPost, function (e) {
                Inknote.log("bug report submitted", Inknote.MessageType.Text);
            }, function (e) {
                Inknote.log("sending bug report failed", Inknote.MessageType.Error);
            });
        }, function (e) {
            Inknote.log("failed to create thread", Inknote.MessageType.Error);
        });
        textElement.value = "";
        checkElement.checked = false;
        hide("report");
    }
    Modal.submitReport = submitReport;
    function generateProjectReport() {
        var currentProject = Inknote.Managers.ProjectManager.Instance.currentProject;
        var reportDetails = document.getElementById("project-report-details");
        reportDetails.innerHTML = "";
        var header = document.createElement("h2");
        header.textContent = currentProject.name + " report";
        reportDetails.appendChild(header);
        var barCount = document.createElement("div");
        barCount.className = "form-row";
        barCount.textContent = "bars: " + currentProject.instruments[0].bars.length;
        reportDetails.appendChild(barCount);
        var numberOfNotes = 0;
        var noteTypeCount = [];
        for (var i = 0; i < 12; i++) {
            noteTypeCount.push({ count: 0 });
        }
        for (var i = 0; i < currentProject.instruments.length; i++) {
            for (var j = 0; j < currentProject.instruments[i].bars.length; j++) {
                for (var k = 0; k < currentProject.instruments[i].bars[j].items.length; k++) {
                    var item = currentProject.instruments[i].bars[j].items[k];
                    if (item instanceof Inknote.Model.Note) {
                        numberOfNotes++;
                        noteTypeCount[item.value].count++;
                    }
                    else if (item instanceof Inknote.Model.Chord) {
                        numberOfNotes += item.notes.length;
                        for (var l = 0; l < item.notes.length; l++) {
                            noteTypeCount[item.notes[l].value].count++;
                        }
                    }
                }
            }
        }
        var noteCount = document.createElement("div");
        noteCount.className = "form-row";
        noteCount.textContent = "notes: " + numberOfNotes;
        reportDetails.appendChild(noteCount);
        var maxValue = Inknote.maxOutOf(noteTypeCount, function (x) {
            return x.count;
        });
        for (var i = 0; i < 12; i++) {
            var text = Inknote.Model.GetNoteNameFromNoteValue(i) + ": " + noteTypeCount[i].count;
            var divBlock = document.createElement("div");
            divBlock.className = "form-row";
            divBlock.style.clear = "both";
            divBlock.style.background = "rgba(190,190,190,0.1)";
            reportDetails.appendChild(divBlock);
            var labelBlock = document.createElement("span");
            labelBlock.style.display = "inline-block";
            labelBlock.textContent = text;
            divBlock.appendChild(labelBlock);
            var graphBlock = document.createElement("span");
            graphBlock.style.display = "inline-block";
            graphBlock.style.height = "18px";
            graphBlock.style.width = Math.round(200 * noteTypeCount[i].count / maxValue) + "px";
            ;
            graphBlock.style.background = "red";
            graphBlock.style.position = "absolute";
            graphBlock.style.right = "0";
            divBlock.appendChild(graphBlock);
        }
        Modal.show("project-report");
    }
    Modal.generateProjectReport = generateProjectReport;
})(Modal || (Modal = {}));
var Modal;
(function (Modal) {
    var SettingsModal;
    (function (SettingsModal) {
        if (typeof (window) != typeof (undefined)) {
            var logLevelRadioList = document.getElementsByName("logLevel");
            for (var i = 0; i < logLevelRadioList.length; i++) {
                if (logLevelRadioList[i].value == Inknote.TempDataService.Instance.currentData.loggingLevel + "") {
                    logLevelRadioList[i].checked = true;
                }
                logLevelRadioList[i].onclick = function (e) {
                    var target = e.target;
                    Inknote.TempDataService.Instance.currentData.loggingLevel = parseInt(target.value);
                    Inknote.TempDataService.Instance.update();
                };
            }
        }
    })(SettingsModal = Modal.SettingsModal || (Modal.SettingsModal = {}));
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
var SynthBindings;
(function (SynthBindings) {
    function getSynthValues() {
        var currentSynth = Inknote.Audio.SynthService.Instance.synth;
        var synthWaveShapeSelect = document.getElementById("synth-wave-shape");
        synthWaveShapeSelect.value = Inknote.Audio.getSoundType(currentSynth.oscillatorType);
        var synthGainInput = document.getElementById("synth-gain");
        synthGainInput.valueAsNumber = currentSynth.gain;
        var synthDelayInput = document.getElementById("synth-delay");
        synthDelayInput.valueAsNumber = currentSynth.delay;
    }
    SynthBindings.getSynthValues = getSynthValues;
    function loadSynthData() {
        var synths = Inknote.Audio.SynthManager.Instance.getSynths();
        var synthDiv = document.getElementById("synth-list");
        synthDiv.innerHTML = "";
        for (var i = 0; i < synths.length; i++) {
            var formRow = document.createElement("div");
            formRow.className = "form-row";
            var synthID = document.createElement("span");
            synthID.textContent = synths[i].ID;
            synthID.className = "list-column";
            formRow.appendChild(synthID);
            var synthName = document.createElement("span");
            synthName.textContent = synths[i].name;
            synthName.className = "list-column";
            formRow.appendChild(synthName);
            var editButton = document.createElement("div");
            editButton.className = "button";
            editButton.textContent = "edit";
            editButton.setAttribute("data-id", synths[i].ID);
            editButton.setAttribute("data-name", synths[i].name);
            editButton.onclick = function (e) {
                var target = e.target;
                var id = target.getAttribute("data-id");
                var name = target.getAttribute("data-name");
                Inknote.Audio.SynthService.setSynth(id, name);
                SynthBindings.getSynthValues();
                Modal.toggle('synth');
                Modal.toggle('synth-edit');
            };
            formRow.appendChild(editButton);
            var deleteButton = document.createElement("div");
            deleteButton.className = "button negative";
            deleteButton.textContent = "x";
            deleteButton.setAttribute("data-id", synths[i].ID);
            deleteButton.setAttribute("data-name", synths[i].name);
            deleteButton.onclick = function (e) {
                var target = e.target;
                var id = target.getAttribute("data-id");
                var name = target.getAttribute("data-name");
                Inknote.Audio.SynthManager.Instance.deleteSynth(id, name, function () {
                    SynthBindings.loadSynthData();
                });
            };
            formRow.appendChild(deleteButton);
            synthDiv.appendChild(formRow);
        }
    }
    SynthBindings.loadSynthData = loadSynthData;
    function addSynth() {
        var synthName = prompt("What is the name of your new synth?");
        var newSynth = new Inknote.Audio.Synth(synthName);
        Inknote.Audio.SynthManager.Instance.addSynth(newSynth);
        loadSynthData();
        Inknote.Audio.SynthService.setSynth(newSynth.ID, newSynth.name);
        SynthBindings.getSynthValues();
        Modal.toggle('synth');
        Modal.toggle('synth-edit');
    }
    SynthBindings.addSynth = addSynth;
    if (typeof (window) != typeof (undefined)) {
        var synthWaveShapeSelect = document.getElementById("synth-wave-shape");
        synthWaveShapeSelect.onchange = function (e) {
            var select = e.target;
            var value = select.value;
            Inknote.Audio.SynthService.Instance.changeWaveShape(value);
        };
        var synthGainInput = document.getElementById("synth-gain");
        synthGainInput.onchange = function (e) {
            var input = e.target;
            var value = input.valueAsNumber;
            Inknote.Audio.SynthService.Instance.changeGain(value);
        };
        var synthDelayInput = document.getElementById("synth-delay");
        synthDelayInput.onchange = function (e) {
            var input = e.target;
            var value = input.valueAsNumber;
            Inknote.Audio.SynthService.Instance.changeDelay(value);
        };
        loadSynthData();
    }
})(SynthBindings || (SynthBindings = {}));
var MouseControl;
(function (MouseControl) {
    function SelectMouseType(val) {
        var options = document.getElementsByClassName("mouse-option");
        for (var i = 0; i < options.length; i++) {
            FrontEnd.deSelect(options[i]);
            if (parseInt(options[i].getAttribute("data-val")) == val) {
                FrontEnd.select(options[i]);
            }
        }
        Inknote.Managers.MouseManager.Instance.currentMouse = val;
    }
    MouseControl.SelectMouseType = SelectMouseType;
    if (typeof (window) != typeof (undefined)) {
        var options = document.getElementsByClassName("mouse-option");
        for (var i = 0; i < options.length; i++) {
            options[i].onclick = function (e) {
                var target = e.target;
                var val = parseInt(target.getAttribute("data-val"));
                MouseControl.SelectMouseType(val);
            };
        }
    }
})(MouseControl || (MouseControl = {}));
var FrontEnd;
(function (FrontEnd) {
    var SmartSearch;
    (function (SmartSearch) {
        var musicSearchNotes = [];
        function drawMusicSearch() {
            var canvas = document.getElementById("smart-search-canvas");
            canvas.width = 214;
            canvas.height = 80;
            var context = canvas.getContext("2d");
            context.beginPath();
            for (var i = 0; i < 5; i++) {
                context.moveTo(0, i * 10 + 20);
                context.lineTo(214, i * 10 + 20);
            }
            context.strokeStyle = Inknote.Drawing.Colours.black;
            context.stroke();
            var clef = new Inknote.Drawing.GClef(0);
            clef.x = 20;
            clef.y = 50;
            clef.draw(context);
            for (var i = 0; i < musicSearchNotes.length; i++) {
                musicSearchNotes[i].draw(context, canvas);
            }
        }
        function generateSearchResults(results) {
            try {
                tryGenerateSearchResults(results);
            }
            catch (e) {
                if (Inknote.log) {
                    Inknote.log(e, Inknote.MessageType.Error);
                }
            }
        }
        function tryGenerateSearchResults(results) {
            var container = document.getElementById("smart-search-output");
            container.innerHTML = "";
            var title = document.createElement("h3");
            title.textContent = "results";
            container.appendChild(title);
            if (results.length == 0) {
                var resultsText = document.createElement("p");
                resultsText.textContent = "no results found";
                container.appendChild(resultsText);
                return;
            }
            var headerDiv = document.createElement("div");
            var col1 = document.createElement("span");
            col1.textContent = "project";
            var col2 = document.createElement("span");
            col2.textContent = "instr";
            var col3 = document.createElement("span");
            col3.textContent = "bar";
            var col4 = document.createElement("span");
            col4.textContent = "item";
            headerDiv.appendChild(col1);
            headerDiv.appendChild(col2);
            headerDiv.appendChild(col3);
            headerDiv.appendChild(col4);
            container.appendChild(headerDiv);
            for (var i = 0; i < results.length; i++) {
                var resultDiv = document.createElement("div");
                resultDiv.className = "lightgray-hover";
                var resCol1 = document.createElement("span");
                resCol1.textContent = results[i].projectIndex + "";
                var resCol2 = document.createElement("span");
                resCol2.textContent = results[i].instrumentIndex + "";
                var resCol3 = document.createElement("span");
                resCol3.textContent = results[i].barIndex + "";
                var resCol4 = document.createElement("span");
                resCol4.textContent = results[i].itemIndex + "";
                resultDiv.appendChild(resCol1);
                resultDiv.appendChild(resCol2);
                resultDiv.appendChild(resCol3);
                resultDiv.appendChild(resCol4);
                var proj = Inknote.Managers.ProjectManager.Instance.allProjects[results[i].projectIndex];
                var instr = proj.instruments[results[i].instrumentIndex];
                var bar = instr.bars[results[i].barIndex];
                var idToSet = "";
                if (results[i].itemIndex == null) {
                    idToSet = bar.ID;
                }
                else {
                    idToSet = bar.items[results[i].itemIndex].ID;
                }
                resultDiv.setAttribute("data-id", idToSet);
                resultDiv.setAttribute("data-proj", proj.ID);
                for (var j = 0; j < resultDiv.childNodes.length; j++) {
                    var tempSpan = resultDiv.childNodes[j];
                    tempSpan.setAttribute("data-proj", proj.ID);
                    tempSpan.setAttribute("data-id", idToSet);
                }
                resultDiv.onclick = function (e) {
                    var targetItem = e.target;
                    var projID = targetItem.getAttribute("data-proj");
                    if (projID != Inknote.Managers.ProjectManager.Instance.currentProject.ID) {
                        Inknote.Managers.ProjectManager.Instance.openProjectFromID(projID);
                    }
                    if (Inknote.Managers.PageManager.Current.page != Inknote.Managers.Page.Score) {
                        Inknote.Managers.PageManager.Current.page = Inknote.Managers.Page.Score;
                    }
                    var targetID = targetItem.getAttribute("data-id");
                    Inknote.GoToService.Instance.goToID(targetID);
                    FrontEnd.SmartSearch.closeSearch();
                };
                container.appendChild(resultDiv);
            }
        }
        function getModelledNoteFromDrawingNote(note) {
            var clef = new Inknote.Model.TrebleClef();
            var heightFromTopLine = note.y - 15;
            var dif = clef.positionFromTreble;
            var distRound5 = Math.round(heightFromTopLine / 5);
            var topNoteOnTreble = new Inknote.Model.Note(Inknote.Model.NoteValue.F, 5, Inknote.Model.NoteLength.Crotchet);
            var result = Inknote.getNoteFromStaveDifference(topNoteOnTreble, dif - distRound5);
            return result;
        }
        function getModelledMusicSearchItems() {
            var results = [];
            for (var i = 0; i < musicSearchNotes.length; i++) {
                results.push(getModelledNoteFromDrawingNote(musicSearchNotes[i]));
            }
            return results;
        }
        function search() {
            var text = document.getElementById("smart-search-text").value;
            var musicSearchItems = getModelledMusicSearchItems();
            var results = Inknote.SmartSearchService.Instance.findByTextAndMusic(text, musicSearchItems);
            generateSearchResults(results);
        }
        SmartSearch.search = search;
        function openSearch() {
            var searchContainer = document.getElementById("smart-search");
            FrontEnd.showElement(searchContainer);
            drawMusicSearch();
        }
        SmartSearch.openSearch = openSearch;
        function closeSearch() {
            var searchContainer = document.getElementById("smart-search");
            FrontEnd.hideElement(searchContainer);
        }
        SmartSearch.closeSearch = closeSearch;
        function clearSearch() {
            var searchText = document.getElementById("smart-search-text");
            searchText.value = "";
            var container = document.getElementById("smart-search-output");
            container.innerHTML = "";
            musicSearchNotes = [];
            drawMusicSearch();
        }
        SmartSearch.clearSearch = clearSearch;
        function addItemToMusicSearch(e) {
            if (musicSearchNotes.length >= 10) {
                Inknote.log("cannot search for a series of notes longer than 10", Inknote.MessageType.Warning);
                return;
            }
            var hPos = 5 * Math.round(e.offsetY / 5);
            var xPos = musicSearchNotes.length * 15 + 40;
            var newNote = new Inknote.Drawing.Crotchet(hPos > 35);
            newNote.x = xPos;
            newNote.y = hPos;
            musicSearchNotes.push(newNote);
            drawMusicSearch();
        }
        if (typeof (document) != typeof (undefined)) {
            var smartSearchCanvas = document.getElementById("smart-search-canvas");
            smartSearchCanvas.onclick = addItemToMusicSearch;
        }
    })(SmartSearch = FrontEnd.SmartSearch || (FrontEnd.SmartSearch = {}));
})(FrontEnd || (FrontEnd = {}));
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
        if (typeof document != "undefined") {
            // load setting manager
            var settingsManager = Inknote.Managers.SettingsManager.Instance;
            var appSetting = new Inknote.Setting("Default");
            // ***********************************************
            // ** comment out the following lines when live. **
            // appSetting.testMode = true;
            // appSetting.displayID = true;
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
            if (Inknote.Managers.PluginManager) {
                var plugins = Inknote.Managers.PluginManager.Instance.plugins.filter(function (plugin) {
                    return plugin.allowOnAppStart && !!plugin.onAppStart;
                });
                plugins.forEach(function (plugin) {
                    plugin.onAppStart();
                });
            }
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
/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />
var Inknote;
(function (Inknote) {
    var Tests;
    (function (Tests) {
        describe("a new vector2", function () {
            it("sets values correctly", function () {
                var x = 2.17;
                var y = 3.14;
                var testVector2 = new Inknote.Maths.Vector2(x, y);
                expect(testVector2.x).toBe(x);
                expect(testVector2.y).toBe(y);
            });
            it("calculates abs correctly", function () {
                var x = 3;
                var y = 4;
                var testVector2 = new Inknote.Maths.Vector2(x, y);
                expect(testVector2.abs).toBe(5);
            });
        });
    })(Tests = Inknote.Tests || (Inknote.Tests = {}));
})(Inknote || (Inknote = {}));
/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />
var Inknote;
(function (Inknote) {
    var Tests;
    (function (Tests) {
        var numbersList;
        beforeEach(function () {
            numbersList = [];
            for (var i = 0; i < 20; i++) {
                numbersList.push(i);
            }
        });
        describe("allItemsAre", function () {
            it("gets all true result as true", function () {
                expect(Inknote.allItemsAre(numbersList, function (num) {
                    return num < 30;
                })).toBe(true);
            });
            it("gets all false results as false", function () {
                expect(Inknote.allItemsAre(numbersList, function (num) {
                    return num > 30;
                })).toBe(false);
            });
            it("gets all but 1 false results as false", function () {
                expect(Inknote.allItemsAre(numbersList, function (num) {
                    return num == 0;
                })).toBe(false);
            });
            it("gets all but 1 true results as false", function () {
                expect(Inknote.allItemsAre(numbersList, function (num) {
                    return num != 17;
                })).toBe(false);
            });
            it("doesn't affect the original array", function () {
                Inknote.allItemsAre(numbersList, function (num) {
                    return num < 30;
                });
                for (var i = 0; i < 20; i++) {
                    expect(numbersList[i]).toBe(i);
                }
            });
            it("returns false if given an empty array", function () {
                expect(Inknote.allItemsAre([], function (num) {
                    return num < 30;
                })).toBe(false);
            });
            it("throws an error if given null", function () {
                expect(function () {
                    Inknote.allItemsAre(null, function (num) {
                        return num < 30;
                    });
                }).toThrowError();
            });
            it("throws an error if given null", function () {
                expect(function () {
                    Inknote.allItemsAre(undefined, function (num) {
                        return num < 30;
                    });
                }).toThrowError();
            });
        });
        describe("anyItemIs", function () {
            it("gets all true result as true", function () {
                expect(Inknote.anyItemIs(numbersList, function (num) {
                    return num < 30;
                })).toBe(true);
            });
            it("gets all false results as false", function () {
                expect(Inknote.anyItemIs(numbersList, function (num) {
                    return num > 30;
                })).toBe(false);
            });
            it("gets all but 1 false results as true", function () {
                expect(Inknote.anyItemIs(numbersList, function (num) {
                    return num == 0;
                })).toBe(true);
            });
            it("gets all but 1 true results as true", function () {
                expect(Inknote.anyItemIs(numbersList, function (num) {
                    return num != 17;
                })).toBe(true);
            });
            it("doesn't affect the original array", function () {
                Inknote.anyItemIs(numbersList, function (num) {
                    return num < 30;
                });
                for (var i = 0; i < 20; i++) {
                    expect(numbersList[i]).toBe(i);
                }
            });
            it("returns false if given an empty array", function () {
                expect(Inknote.anyItemIs([], function (num) {
                    return num < 30;
                })).toBe(false);
            });
            it("returns false if given null", function () {
                expect(Inknote.anyItemIs(null, function (num) {
                    return num < 30;
                })).toBe(false);
            });
            it("returns false if given undefined", function () {
                expect(Inknote.anyItemIs(undefined, function (num) {
                    return num < 30;
                })).toBe(false);
            });
        });
        describe("countWhere", function () {
            it("counts all true results", function () {
                expect(Inknote.countWhere(numbersList, function (num) {
                    return num < 30;
                })).toBe(numbersList.length);
            });
            it("counts none from all false results", function () {
                expect(Inknote.countWhere(numbersList, function (num) {
                    return num > 30;
                })).toBe(0);
            });
            it("counts 1 from all but 1 false results", function () {
                expect(Inknote.countWhere(numbersList, function (num) {
                    return num == 0;
                })).toBe(1);
            });
            it("counts all but 1 from all but 1 true results", function () {
                expect(Inknote.countWhere(numbersList, function (num) {
                    return num != 17;
                })).toBe(numbersList.length - 1);
            });
            it("doesn't affect the original array", function () {
                Inknote.countWhere(numbersList, function (num) {
                    return num < 30;
                });
                for (var i = 0; i < 20; i++) {
                    expect(numbersList[i]).toBe(i);
                }
            });
            it("returns 0 if given empty array", function () {
                expect(Inknote.countWhere([], function (num) {
                    return num < 30;
                })).toBe(0);
            });
            it("returns 0 if given null", function () {
                expect(Inknote.countWhere(null, function (num) {
                    return num < 30;
                })).toBe(0);
            });
            it("returns 0 if given undefined", function () {
                expect(Inknote.countWhere(undefined, function (num) {
                    return num < 30;
                })).toBe(0);
            });
        });
        describe("getItemsWhere", function () {
            it("gets all true results", function () {
                expect(Inknote.getItemsWhere(numbersList, function (num) {
                    return num < 30;
                }).length).toBe(numbersList.length);
            });
            it("gets none from all false results", function () {
                expect(Inknote.getItemsWhere(numbersList, function (num) {
                    return num > 30;
                }).length).toBe(0);
            });
            it("gets 1 from all but 1 false results", function () {
                expect(Inknote.getItemsWhere(numbersList, function (num) {
                    return num == 0;
                }).length).toBe(1);
            });
            it("gets all but 1 from all but 1 true results", function () {
                expect(Inknote.getItemsWhere(numbersList, function (num) {
                    return num != 17;
                }).length).toBe(numbersList.length - 1);
            });
            it("gets all the correct true results, in the correct order", function () {
                var result = Inknote.getItemsWhere(numbersList, function (num) {
                    return num >= 12;
                });
                for (var i = 0; i < result.length; i++) {
                    expect(result[i]).toBe(12 + i);
                }
            });
            it("doesn't affect the original array", function () {
                Inknote.getItemsWhere(numbersList, function (num) {
                    return num < 30;
                });
                for (var i = 0; i < 20; i++) {
                    expect(numbersList[i]).toBe(i);
                }
            });
            it("returns empty array if given empty array", function () {
                var result = Inknote.getItemsWhere([], function (num) {
                    return num < 30;
                });
                expect(result.length).toBe(0);
                expect(typeof result).toBe(typeof []);
            });
            it("returns empty array if given null", function () {
                var result = Inknote.getItemsWhere(null, function (num) {
                    return num < 30;
                });
                expect(result.length).toBe(0);
                expect(typeof result).toBe(typeof []);
            });
            it("returns empty array if given undefined", function () {
                var result = Inknote.getItemsWhere(undefined, function (num) {
                    return num < 30;
                });
                expect(result.length).toBe(0);
                expect(typeof result).toBe(typeof []);
            });
        });
        describe("sum", function () {
            it("adds items correctly", function () {
                expect(Inknote.sum(numbersList, function (num) {
                    return num;
                })).toBe(190);
            });
            it("adds numbers correctly with inline conditions", function () {
                expect(Inknote.sum(numbersList, function (num) {
                    return num < 4 ? num : 0;
                })).toBe(6);
            });
            it("adds constants correctly", function () {
                expect(Inknote.sum(numbersList, function (num) {
                    return 1;
                })).toBe(20);
            });
            it("doesn't affect the original array", function () {
                Inknote.sum(numbersList, function (num) {
                    return num;
                });
                for (var i = 0; i < 20; i++) {
                    expect(numbersList[i]).toBe(i);
                }
            });
            it("returns 0 if given empty array", function () {
                expect(Inknote.sum([], function (num) { return num; })).toBe(0);
            });
            it("returns 0 if given null", function () {
                expect(Inknote.sum(null, function (num) {
                    return num;
                })).toBe(0);
            });
            it("returns 0 if given null", function () {
                expect(Inknote.sum(undefined, function (num) {
                    return num;
                })).toBe(0);
            });
        });
        describe("last", function () {
            it("gets the last item from the array", function () {
                expect(Inknote.last(numbersList)).toBe(19);
            });
            it("returns null if given empty array", function () {
                expect(Inknote.last([])).toBe(null);
            });
            it("returns null if given null", function () {
                expect(Inknote.last(null)).toBe(null);
            });
            it("returns null if given undefined", function () {
                expect(Inknote.last(undefined)).toBe(null);
            });
        });
        describe("arraysAreEqual", function () {
            it("correctly tests true numerical arrays", function () {
                var otherTest = [];
                for (var i = 0; i < 20; i++) {
                    otherTest.push(i);
                }
                expect(Inknote.arraysAreEqual(numbersList, otherTest)).toBe(true);
            });
            it("correctly tests false numerical arrays of wrong length", function () {
                var otherTest = [];
                for (var i = 0; i < 21; i++) {
                    otherTest.push(i);
                }
                expect(Inknote.arraysAreEqual(numbersList, otherTest)).toBe(false);
            });
            it("correctly tests false numerical arrays", function () {
                var otherTest = [];
                for (var i = 0; i < 20; i++) {
                    otherTest.push(i + 1);
                }
                expect(Inknote.arraysAreEqual(numbersList, otherTest)).toBe(false);
            });
            it("correctly tests true text arrays", function () {
                var test1 = [];
                var test2 = [];
                for (var i = 0; i < 20; i++) {
                    var txt = "blah" + Math.random();
                    test1.push(txt);
                    test2.push(txt);
                }
                expect(Inknote.arraysAreEqual(test1, test2)).toBe(true);
            });
            it("correctly tests false text arrays", function () {
                var test1 = [];
                var test2 = [];
                for (var i = 0; i < 20; i++) {
                    var txt = "blah" + Math.random();
                    test1.push(txt);
                    test2.push(txt + "ha");
                }
                expect(Inknote.arraysAreEqual(test1, test2)).toBe(false);
            });
            it("correctly tests empty arrays", function () {
                var test1 = [], test2 = [];
                expect(Inknote.arraysAreEqual(test1, test2)).toBe(true);
            });
            it("correctly tests nested arrays", function () {
                var test1 = [];
                var test2 = [];
                for (var i = 0; i < 20; i++) {
                    var tempArray = [];
                    var tempArray2 = [];
                    for (var j = 0; j < 20; j++) {
                        tempArray.push(j);
                        tempArray2.push(j);
                    }
                    test1.push(tempArray);
                    test2.push(tempArray2);
                }
                expect(Inknote.arraysAreEqual(test1, test2)).toBe(true);
            });
        });
        describe("copySimpleArrayFrom", function () {
            it("copies numerical arrays correctly", function () {
                expect(Inknote.arraysAreEqual(Inknote.copySimpleArrayFrom(numbersList), numbersList)).toBe(true);
            });
            it("does not just assign the same array to a different variable", function () {
                expect(Inknote.copySimpleArrayFrom(numbersList) != numbersList);
            });
        });
        describe("maxOutOf", function () {
            it("returns -Infinity when given null", function () {
                expect(Inknote.maxOutOf(null, function () { return 8; })).toBe(-Infinity);
            });
            it("returns -Infinity when given undefined", function () {
                expect(Inknote.maxOutOf(undefined, function () { return 8; })).toBe(-Infinity);
            });
            it("returns correct value when straight numbers", function () {
                expect(Inknote.maxOutOf([1, 2, 3, 4, 5], function (x) { return x; })).toBe(5);
            });
            it("returns correct value when all same", function () {
                expect(Inknote.maxOutOf([5, 5, 5, 5, 5], function (x) { return x; })).toBe(5);
            });
            it("returns correct value from object", function () {
                expect(Inknote.maxOutOf([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }], function (x) {
                    return x.a;
                })).toBe(5);
            });
            it("returns correct calculated value", function () {
                expect(Inknote.maxOutOf([1, 2, 3, 4, 5, 6], function (x) { return x * x; })).toBe(36);
            });
        });
        describe("minOutOf", function () {
            it("returns Infinity when given null", function () {
                expect(Inknote.minOutOf(null, function () { return 8; })).toBe(Infinity);
            });
            it("returns Infinity when given undefined", function () {
                expect(Inknote.minOutOf(undefined, function () { return 8; })).toBe(Infinity);
            });
            it("returns correct value when straight numbers", function () {
                expect(Inknote.minOutOf([1, 2, 3, 4, 5], function (x) { return x; })).toBe(1);
            });
            it("returns correct value when all same", function () {
                expect(Inknote.minOutOf([5, 5, 5, 5, 5], function (x) { return x; })).toBe(5);
            });
            it("returns correct value from objects", function () {
                expect(Inknote.minOutOf([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }], function (x) {
                    return x.a;
                })).toBe(1);
            });
            it("returns correct value from calculated values", function () {
                expect(Inknote.minOutOf([2, 3, 4, 5, 6, 7, 8], function (x) {
                    return x * x;
                })).toBe(4);
            });
        });
        describe("getItemWithMax", function () {
            it("returns correct value from a number array", function () {
                expect(Inknote.getItemWithMax(numbersList, function (x) {
                    return x;
                })).toBe(19);
            });
            it("returns correct value from an object array", function () {
                var objectList = [];
                var resultNum;
                for (var i = 0; i < 20; i++) {
                    var num = { num: i + 10 };
                    if (num.num == 29) {
                        resultNum = num;
                    }
                    objectList.push(num);
                }
                expect(Inknote.getItemWithMax(objectList, function (x) {
                    return x.num;
                })).toBe(resultNum);
            });
            it("returns null if null array", function () {
                expect(Inknote.getItemWithMax(null, function (x) {
                    return x;
                })).toBe(null);
            });
            it("returns null if null array, even if expecting object", function () {
                expect(Inknote.getItemWithMax(null, function (x) {
                    return x.a.b.c.d.e.f;
                })).toBe(null);
            });
        });
        describe("getItemsWithMin", function () {
            it("returns correct value from a number array", function () {
                expect(Inknote.getItemWithMin([4, 4, 3, 7, 8], function (x) {
                    return x;
                })).toBe(3);
            });
            it("returns correct value from an object array", function () {
                var objectList = [];
                var resultNum;
                for (var i = 0; i < 20; i++) {
                    var num = { num: i + 10 };
                    if (num.num == 10) {
                        resultNum = num;
                    }
                    objectList.push(num);
                }
                expect(Inknote.getItemWithMin(objectList, function (x) {
                    return x.num;
                })).toBe(resultNum);
            });
            it("returns null if given null array", function () {
                expect(Inknote.getItemWithMin(null, function (x) {
                    return x;
                })).toBe(null);
            });
            it("returns null if given null array, even if expecting object", function () {
                expect(Inknote.getItemWithMin(null, function (x) {
                    return x.a.b.c.d;
                })).toBe(null);
            });
        });
        describe("getFirstItemWhere", function () {
            it("returns null if given null array", function () {
                expect(Inknote.getFirstItemWhere(null, function (x) {
                    return x == 5;
                })).toBe(null);
            });
            it("returns null if given null array when expecting an object", function () {
                expect(Inknote.getFirstItemWhere(null, function (x) {
                    return x.a.b.c.d == 5;
                })).toBe(null);
            });
            it("returns the first item from number array", function () {
                expect(Inknote.getFirstItemWhere([1, 2, 3, 4, 5, 4, 6, 2, 5], function (x) {
                    return x == 3;
                })).toBe(3);
            });
            it("returns the first item from string array", function () {
                expect(Inknote.getFirstItemWhere(["one", "two", "three", "four", "five"], function (x) {
                    return x.indexOf("f") != -1;
                })).toBe("four");
            });
            it("returns the first item from an object array", function () {
                var objectList = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }];
                var resultNum = { a: 7, b: 4 };
                objectList.push(resultNum);
                expect(Inknote.getFirstItemWhere(objectList, function (x) {
                    return x.b == 4;
                })).toBe(resultNum);
            });
        });
    })(Tests = Inknote.Tests || (Inknote.Tests = {}));
})(Inknote || (Inknote = {}));
/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />
var Inknote;
(function (Inknote) {
    var Tests;
    (function (Tests) {
        describe("isWithinRadius", function () {
            it("returns true when within", function () {
                expect(Inknote.Maths.isWithinRadius(5, 5, 5, 6, 2)).toBe(true);
            });
            it("returns false when without", function () {
                expect(Inknote.Maths.isWithinRadius(5, 5, 5, 6, 0.5)).toBe(false);
            });
            it("returns true when equal", function () {
                expect(Inknote.Maths.isWithinRadius(5, 5, 5, 6, 1)).toBe(true);
            });
        });
        describe("permutateSimpleNumberArray", function () {
            it("permutates a number array correctly", function () {
                var array = [1, 3, 5, 7];
                var permutatedArray = Inknote.Maths.permutateSimpleNumberArray(array);
                expect(permutatedArray[0]).toBe(array[3]);
                expect(permutatedArray[1]).toBe(array[0]);
                expect(permutatedArray[2]).toBe(array[1]);
                expect(permutatedArray[3]).toBe(array[2]);
            });
        });
        describe("pythagoras", function () {
            it("returns the correct value", function () {
                expect(Inknote.Maths.pythagoras(3, 4)).toBe(5);
                expect(Inknote.Maths.pythagoras(5, 12)).toBe(13);
            });
        });
        describe("align similar array to", function () {
            it("correctly aligns two arrays", function () {
                var arrayOne = [1, 2, 3, 4, 5, 6, 7];
                var arrayTwo = [2, 3, 4, 5, 6, 7, 1];
                var result = Inknote.Maths.alignSimilarArrayTo(arrayOne, arrayTwo);
                expect(result[0]).toBe(2);
                expect(result[1]).toBe(3);
                expect(result[2]).toBe(4);
                expect(result[3]).toBe(5);
                expect(result[4]).toBe(6);
                expect(result[5]).toBe(7);
                expect(result[6]).toBe(1);
            });
            it("correctly aligns slightly differing arrays", function () {
                var arrayOne = [1, 2, 3, 7];
                var arrayTwo = [3, 6, 1, 2];
                var result = Inknote.Maths.alignSimilarArrayTo(arrayOne, arrayTwo);
                expect(result[0]).toBe(3);
                expect(result[1]).toBe(7);
                expect(result[2]).toBe(1);
                expect(result[3]).toBe(2);
            });
            it("correctly aligns with all values out by one", function () {
                var arrayOne = [2, 3, 4, 5];
                var arrayTwo = [3, 4, 1, 2];
                var result = Inknote.Maths.alignSimilarArrayTo(arrayOne, arrayTwo);
                expect(result[0]).toBe(4);
                expect(result[1]).toBe(5);
                expect(result[2]).toBe(2);
                expect(result[3]).toBe(3);
            });
        });
    })(Tests = Inknote.Tests || (Inknote.Tests = {}));
})(Inknote || (Inknote = {}));
/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />
var Inknote;
(function (Inknote) {
    var Tests;
    (function (Tests) {
        describe("pascalCase", function () {
            it("returns pascal case string when given pascal case string", function () {
                expect(Inknote.pascalCase("AlreadyPascalCase")).toBe("AlreadyPascalCase");
            });
            it("returns pascal case string when not given pascal case string", function () {
                expect(Inknote.pascalCase("notAlreadyPascalCase")).toBe("NotAlreadyPascalCase");
            });
        });
    })(Tests = Inknote.Tests || (Inknote.Tests = {}));
})(Inknote || (Inknote = {}));
/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />
var Inknote;
(function (Inknote) {
    var Tests;
    (function (Tests) {
        describe("a new bar", function () {
            var newBar = new Inknote.Model.Bar();
            it("has an ID field", function () {
                expect(newBar.ID).toBeDefined();
            });
            it("has its ID field set", function () {
                expect(newBar.ID).toBeTruthy();
            });
            it("has an items field", function () {
                expect(newBar.items.length).toBe(0);
            });
        });
    })(Tests = Inknote.Tests || (Inknote.Tests = {}));
})(Inknote || (Inknote = {}));
/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />
var Inknote;
(function (Inknote) {
    var Tests;
    (function (Tests) {
        describe("new chord", function () {
            var newChord = new Inknote.Model.Chord([]);
            it("has an ID field", function () {
                expect(newChord.ID).toBeDefined();
            });
            it("has ID field set", function () {
                expect(newChord.ID).toBeTruthy();
            });
            it("has a notes field", function () {
                expect(newChord.notes).toBeDefined();
            });
            it("has notes correctly set", function () {
                expect(newChord.notes.length).toBe(0);
            });
        });
        describe("new chord with notes specified", function () {
            var note1 = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
            var note2 = new Inknote.Model.Note(Inknote.Model.NoteValue.E, 4, Inknote.Model.NoteLength.Crotchet);
            var note3 = new Inknote.Model.Note(Inknote.Model.NoteValue.G, 4, Inknote.Model.NoteLength.Crotchet);
            var newChord = new Inknote.Model.Chord([note1, note2, note3]);
            it("has notes correctly set", function () {
                expect(newChord.notes.length).toBe(3);
                expect(newChord.notes[0]).toBe(note1);
                expect(newChord.notes[1]).toBe(note2);
                expect(newChord.notes[2]).toBe(note3);
            });
        });
    })(Tests = Inknote.Tests || (Inknote.Tests = {}));
})(Inknote || (Inknote = {}));
/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />
var Inknote;
(function (Inknote) {
    var Tests;
    (function (Tests) {
        describe("french violin clef", function () {
            it("has the correct clef type", function () {
                expect((new Inknote.Model.FrenchViolinClef()).clefType).toBe(Inknote.Model.ClefType.GClef);
            });
            it("sets the correct position for notes", function () {
                expect((new Inknote.Model.FrenchViolinClef()).positionFromTreble).toBe(2);
            });
            it("has the correct drawing location value", function () {
                expect((new Inknote.Model.FrenchViolinClef()).drawLocation).toBe(8);
            });
        });
        describe("treble clef", function () {
            it("has the correct clef type", function () {
                expect((new Inknote.Model.TrebleClef()).clefType).toBe(Inknote.Model.ClefType.GClef);
            });
            it("sets the correct position for notes", function () {
                expect((new Inknote.Model.TrebleClef()).positionFromTreble).toBe(0);
            });
            it("has the correct drawing location value", function () {
                expect((new Inknote.Model.TrebleClef()).drawLocation).toBe(6);
            });
        });
        describe("soprano clef", function () {
            it("has the correct clef type", function () {
                expect((new Inknote.Model.SopranoClef()).clefType).toBe(Inknote.Model.ClefType.CClef);
            });
            it("sets the correct position for notes", function () {
                expect((new Inknote.Model.SopranoClef()).positionFromTreble).toBe(-2);
            });
            it("has the correct drawing location value", function () {
                expect((new Inknote.Model.SopranoClef()).drawLocation).toBe(8);
            });
        });
        describe("mezzo soprano clef", function () {
            it("has the correct clef type", function () {
                expect((new Inknote.Model.MezzoSopranoClef()).clefType).toBe(Inknote.Model.ClefType.CClef);
            });
            it("sets the correct position for notes", function () {
                expect((new Inknote.Model.MezzoSopranoClef()).positionFromTreble).toBe(-4);
            });
            it("has the correct drawing location value", function () {
                expect((new Inknote.Model.MezzoSopranoClef()).drawLocation).toBe(6);
            });
        });
        describe("alto clef", function () {
            it("has the correct clef type", function () {
                expect((new Inknote.Model.AltoClef()).clefType).toBe(Inknote.Model.ClefType.CClef);
            });
            it("sets the correct position for notes", function () {
                expect((new Inknote.Model.AltoClef()).positionFromTreble).toBe(-6);
            });
            it("has the correct drawing location value", function () {
                expect((new Inknote.Model.AltoClef()).drawLocation).toBe(4);
            });
        });
        describe("tenor clef", function () {
            it("has the correct clef type", function () {
                expect((new Inknote.Model.TenorClef()).clefType).toBe(Inknote.Model.ClefType.CClef);
            });
            it("sets the correct position for notes", function () {
                expect((new Inknote.Model.TenorClef()).positionFromTreble).toBe(-8);
            });
            it("has the correct drawing location value", function () {
                expect((new Inknote.Model.TenorClef()).drawLocation).toBe(2);
            });
        });
        describe("baritone clef", function () {
            it("has the correct clef type", function () {
                expect((new Inknote.Model.BaritoneClef()).clefType).toBe(Inknote.Model.ClefType.FClef);
            });
            it("sets the correct position for notes", function () {
                expect((new Inknote.Model.BaritoneClef()).positionFromTreble).toBe(-10);
            });
            it("has the correct drawing location value", function () {
                expect((new Inknote.Model.BaritoneClef()).drawLocation).toBe(4);
            });
        });
        describe("bass clef", function () {
            it("has the correct clef type", function () {
                expect((new Inknote.Model.BassClef()).clefType).toBe(Inknote.Model.ClefType.FClef);
            });
            it("sets the correct position for notes", function () {
                expect((new Inknote.Model.BassClef()).positionFromTreble).toBe(-12);
            });
            it("has the correct drawing location value", function () {
                expect((new Inknote.Model.BassClef()).drawLocation).toBe(2);
            });
        });
        describe("subbass clef", function () {
            it("has the correct clef type", function () {
                expect((new Inknote.Model.SubbassClef()).clefType).toBe(Inknote.Model.ClefType.FClef);
            });
            it("sets the correct position for notes", function () {
                expect((new Inknote.Model.SubbassClef()).positionFromTreble).toBe(-14);
            });
            it("has the correct drawing location value", function () {
                expect((new Inknote.Model.SubbassClef()).drawLocation).toBe(0);
            });
        });
    })(Tests = Inknote.Tests || (Inknote.Tests = {}));
})(Inknote || (Inknote = {}));
/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />
var Inknote;
(function (Inknote) {
    var Tests;
    (function (Tests) {
        describe("a new instrument", function () {
            var newInstrument = new Inknote.Model.Instrument("piano");
            it("has a bars field", function () {
                expect(newInstrument.bars).toBeDefined();
            });
            it("has a visible field", function () {
                expect(newInstrument.visible).toBeDefined();
            });
            it("has a name field", function () {
                expect(newInstrument.name).toBeDefined();
            });
            it("has name set correctly", function () {
                expect(newInstrument.name).toBe("piano");
            });
            it("has an ID field", function () {
                expect(newInstrument.ID).toBeDefined();
            });
            it("has ID field set", function () {
                expect(newInstrument.ID).toBeTruthy();
            });
        });
    })(Tests = Inknote.Tests || (Inknote.Tests = {}));
})(Inknote || (Inknote = {}));
/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />
var Inknote;
(function (Inknote) {
    var Tests;
    (function (Tests) {
        describe("note AccidentalType enum", function () {
            it("has sharp value in correct place", function () {
                expect(Inknote.Model.AccidentalType.Sharp).toBe(0);
            });
            it("has flat value in correct place", function () {
                expect(Inknote.Model.AccidentalType.Flat).toBe(1);
            });
            it("has natural value in correct place", function () {
                expect(Inknote.Model.AccidentalType.Natural).toBe(2);
            });
            it("has doubleSharp value in correct place", function () {
                expect(Inknote.Model.AccidentalType.DoubleSharp).toBe(3);
            });
            it("has doubleFlat value in correct place", function () {
                expect(Inknote.Model.AccidentalType.DoubleFlat).toBe(4);
            });
        });
        describe("a new note", function () {
            var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
            it("has a value field", function () {
                expect(newNote.value).toBeDefined();
            });
            it("has value field set correctly", function () {
                expect(newNote.value).toBe(Inknote.Model.NoteValue.C);
            });
            it("has an octave field", function () {
                expect(newNote.octave).toBeDefined();
            });
            it("has octave field set correctly", function () {
                expect(newNote.octave).toBe(4);
            });
            it("has a length field", function () {
                expect(newNote.length).toBeDefined();
            });
            it("has length field set correctly", function () {
                expect(newNote.length).toBe(Inknote.Model.NoteLength.Crotchet);
            });
            it("has an ID field", function () {
                expect(newNote.ID).toBeDefined();
            });
            it("has ID field set", function () {
                expect(newNote.ID).toBeTruthy();
            });
        });
    })(Tests = Inknote.Tests || (Inknote.Tests = {}));
})(Inknote || (Inknote = {}));
/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />
var Inknote;
(function (Inknote) {
    var Tests;
    (function (Tests) {
        describe("note length enum", function () {
            it("has breve value in correct place", function () {
                expect(Inknote.Model.NoteLength.Breve).toBe(0);
            });
            it("has semibreve value in correct place", function () {
                expect(Inknote.Model.NoteLength.SemiBreve).toBe(1);
            });
            it("has minim value in correct place", function () {
                expect(Inknote.Model.NoteLength.Minim).toBe(2);
            });
            it("has crotchet value in correct place", function () {
                expect(Inknote.Model.NoteLength.Crotchet).toBe(3);
            });
            it("has quaver value in correct place", function () {
                expect(Inknote.Model.NoteLength.Quaver).toBe(4);
            });
            it("has semiquaver value in correct place", function () {
                expect(Inknote.Model.NoteLength.SemiQuaver).toBe(5);
            });
            it("has demisemiquaver value in correct place", function () {
                expect(Inknote.Model.NoteLength.DemiSemiQuaver).toBe(6);
            });
            it("has hemidemisemiquaver value in correct place", function () {
                expect(Inknote.Model.NoteLength.HemiDemiSemiQuaver).toBe(7);
            });
        });
    })(Tests = Inknote.Tests || (Inknote.Tests = {}));
})(Inknote || (Inknote = {}));
/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />
var Inknote;
(function (Inknote) {
    var Tests;
    (function (Tests) {
        describe("noteValue enum", function () {
            it("has A value in correct place", function () {
                expect(Inknote.Model.NoteValue.A).toBe(0);
            });
            it("has Bb value in correct place", function () {
                expect(Inknote.Model.NoteValue.Bb).toBe(1);
            });
            it("has B value in correct place", function () {
                expect(Inknote.Model.NoteValue.B).toBe(2);
            });
            it("has C value in correct place", function () {
                expect(Inknote.Model.NoteValue.C).toBe(3);
            });
            it("has Db value in correct place", function () {
                expect(Inknote.Model.NoteValue.Db).toBe(4);
            });
            it("has D value in correct place", function () {
                expect(Inknote.Model.NoteValue.D).toBe(5);
            });
            it("has Eb value in correct place", function () {
                expect(Inknote.Model.NoteValue.Eb).toBe(6);
            });
            it("has E value in correct place", function () {
                expect(Inknote.Model.NoteValue.E).toBe(7);
            });
            it("has F value in correct place", function () {
                expect(Inknote.Model.NoteValue.F).toBe(8);
            });
            it("has Gb value in correct place", function () {
                expect(Inknote.Model.NoteValue.Gb).toBe(9);
            });
            it("has G value in correct place", function () {
                expect(Inknote.Model.NoteValue.G).toBe(10);
            });
            it("has Ab value in correct place", function () {
                expect(Inknote.Model.NoteValue.Ab).toBe(11);
            });
        });
        describe("is black key", function () {
            it("describes A correctly", function () {
                expect(Inknote.Model.IsBlackKey(Inknote.Model.NoteValue.A)).toBe(false);
            });
            it("describes Bb correctly", function () {
                expect(Inknote.Model.IsBlackKey(Inknote.Model.NoteValue.Bb)).toBe(true);
            });
            it("describes B correctly", function () {
                expect(Inknote.Model.IsBlackKey(Inknote.Model.NoteValue.B)).toBe(false);
            });
            it("describes C correctly", function () {
                expect(Inknote.Model.IsBlackKey(Inknote.Model.NoteValue.C)).toBe(false);
            });
            it("describes Db correctly", function () {
                expect(Inknote.Model.IsBlackKey(Inknote.Model.NoteValue.Db)).toBe(true);
            });
            it("describes D correctly", function () {
                expect(Inknote.Model.IsBlackKey(Inknote.Model.NoteValue.D)).toBe(false);
            });
            it("describes Eb correctly", function () {
                expect(Inknote.Model.IsBlackKey(Inknote.Model.NoteValue.Eb)).toBe(true);
            });
            it("describes E correctly", function () {
                expect(Inknote.Model.IsBlackKey(Inknote.Model.NoteValue.E)).toBe(false);
            });
            it("describes F correctly", function () {
                expect(Inknote.Model.IsBlackKey(Inknote.Model.NoteValue.F)).toBe(false);
            });
            it("describes Gb correctly", function () {
                expect(Inknote.Model.IsBlackKey(Inknote.Model.NoteValue.Gb)).toBe(true);
            });
            it("describes G correctly", function () {
                expect(Inknote.Model.IsBlackKey(Inknote.Model.NoteValue.G)).toBe(false);
            });
            it("describes Ab correctly", function () {
                expect(Inknote.Model.IsBlackKey(Inknote.Model.NoteValue.Ab)).toBe(true);
            });
        });
        describe("is white key", function () {
            it("describes A correctly", function () {
                expect(Inknote.Model.IsWhiteKey(Inknote.Model.NoteValue.A)).toBe(true);
            });
            it("describes Bb correctly", function () {
                expect(Inknote.Model.IsWhiteKey(Inknote.Model.NoteValue.Bb)).toBe(false);
            });
            it("describes B correctly", function () {
                expect(Inknote.Model.IsWhiteKey(Inknote.Model.NoteValue.B)).toBe(true);
            });
            it("describes C correctly", function () {
                expect(Inknote.Model.IsWhiteKey(Inknote.Model.NoteValue.C)).toBe(true);
            });
            it("describes Db correctly", function () {
                expect(Inknote.Model.IsWhiteKey(Inknote.Model.NoteValue.Db)).toBe(false);
            });
            it("describes D correctly", function () {
                expect(Inknote.Model.IsWhiteKey(Inknote.Model.NoteValue.D)).toBe(true);
            });
            it("describes Eb correctly", function () {
                expect(Inknote.Model.IsWhiteKey(Inknote.Model.NoteValue.Eb)).toBe(false);
            });
            it("describes E correctly", function () {
                expect(Inknote.Model.IsWhiteKey(Inknote.Model.NoteValue.E)).toBe(true);
            });
            it("describes F correctly", function () {
                expect(Inknote.Model.IsWhiteKey(Inknote.Model.NoteValue.F)).toBe(true);
            });
            it("describes Gb correctly", function () {
                expect(Inknote.Model.IsWhiteKey(Inknote.Model.NoteValue.Gb)).toBe(false);
            });
            it("describes G correctly", function () {
                expect(Inknote.Model.IsWhiteKey(Inknote.Model.NoteValue.G)).toBe(true);
            });
            it("describes Ab correctly", function () {
                expect(Inknote.Model.IsWhiteKey(Inknote.Model.NoteValue.Ab)).toBe(false);
            });
        });
    })(Tests = Inknote.Tests || (Inknote.Tests = {}));
})(Inknote || (Inknote = {}));
/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />
var Inknote;
(function (Inknote) {
    var Tests;
    (function (Tests) {
        describe("a new project", function () {
            var newProject = new Inknote.Project();
            it("has an ID", function () {
                expect(newProject.ID).toBeDefined();
            });
            it("has a name", function () {
                expect(newProject.name).toBeDefined();
            });
            it("has an instruments field", function () {
                expect(newProject.instruments).toBeDefined();
            });
            it("has 1 instrument", function () {
                expect(newProject.instruments.length).toBe(1);
            });
            it("has a hover field", function () {
                expect(newProject.hover).toBeDefined();
            });
            it("has a hover value of false", function () {
                expect(newProject.hover).toBeFalsy();
            });
            it("has a pause value", function () {
                expect(newProject.pause).toBeDefined();
            });
            it("has a pause value of false", function () {
                expect(newProject.pause).toBeFalsy();
            });
            it("has a colour field", function () {
                expect(newProject.colour).toBeDefined();
            });
            it("has colour set to white", function () {
                expect(newProject.colour).toBe("#FFFFFF");
            });
        });
        describe("A new project with a name specified", function () {
            it("has the correct name", function () {
                var namedProject = new Inknote.Project("Test project");
                expect(namedProject.name).toBe("Test project");
            });
            it("to have 'Untitled' as title if specified name empty", function () {
                var namedProject = new Inknote.Project("");
                expect(namedProject.name).toBe("Untitled");
            });
        });
    })(Tests = Inknote.Tests || (Inknote.Tests = {}));
})(Inknote || (Inknote = {}));
/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />
var Inknote;
(function (Inknote) {
    var Tests;
    (function (Tests) {
        describe("a new rest", function () {
            var newRest = new Inknote.Model.Rest(Inknote.Model.NoteLength.Crotchet);
            it("has an ID field", function () {
                expect(newRest.ID).toBeDefined();
            });
            it("has ID field set", function () {
                expect(newRest.ID).toBeTruthy();
            });
            it("has a length field", function () {
                expect(newRest.length).toBeDefined();
            });
            it("has length field set correctly", function () {
                expect(newRest.length).toBe(Inknote.Model.NoteLength.Crotchet);
            });
        });
    })(Tests = Inknote.Tests || (Inknote.Tests = {}));
})(Inknote || (Inknote = {}));
/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />
var Inknote;
(function (Inknote) {
    var Tests;
    (function (Tests) {
        describe("new time signature", function () {
            it("cannot have a top decimal", function () {
                expect(function () { new Inknote.Model.TimeSignature(1.1, 1); }).toThrow(new Error("Time signatures can only take integers"));
            });
            it("cannot have a bottom decimal", function () {
                expect(function () { new Inknote.Model.TimeSignature(1, 1.1); }).toThrow(new Error("Time signatures can only take integers"));
            });
            it("cannot take a 0 value in the top", function () {
                expect(function () {
                    new Inknote.Model.TimeSignature(0, 1);
                }).toThrow(new Error("Time signatures can only take integers"));
            });
            it("cannot take a 0 value in the bottom", function () {
                expect(function () {
                    new Inknote.Model.TimeSignature(1, 0);
                }).toThrow(new Error("Time signatures can only take integers"));
            });
        });
    })(Tests = Inknote.Tests || (Inknote.Tests = {}));
})(Inknote || (Inknote = {}));
/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />
var Inknote;
(function (Inknote) {
    var Tests;
    (function (Tests) {
        describe("getNextClef", function () {
            it("gets the correct clef going down from French violin clef", function () {
                var result = Inknote.getNextClef(new Inknote.Model.FrenchViolinClef(), false) instanceof Inknote.Model.TrebleClef;
                expect(result).toBe(true);
            });
            it("gets the right clef going down from Treble", function () {
                var result = Inknote.getNextClef(new Inknote.Model.TrebleClef(), false) instanceof Inknote.Model.SopranoClef;
                expect(result).toBe(true);
            });
            it("gets the right clef going down from soprano clef", function () {
                var result = Inknote.getNextClef(new Inknote.Model.SopranoClef(), false) instanceof Inknote.Model.MezzoSopranoClef;
                expect(result).toBe(true);
            });
            it("gets the right clef going down from mezzosoprano clef", function () {
                var result = Inknote.getNextClef(new Inknote.Model.MezzoSopranoClef(), false) instanceof Inknote.Model.AltoClef;
                expect(result).toBe(true);
            });
            it("gets the right clef going down from alto clef", function () {
                var result = Inknote.getNextClef(new Inknote.Model.AltoClef(), false) instanceof Inknote.Model.TenorClef;
                expect(result).toBe(true);
            });
            it("gets the right clef going down from tenor clef", function () {
                var result = Inknote.getNextClef(new Inknote.Model.TenorClef(), false) instanceof Inknote.Model.BaritoneClef;
                expect(result).toBe(true);
            });
            it("gets the right clef going down from baritone clef", function () {
                var result = Inknote.getNextClef(new Inknote.Model.BaritoneClef(), false) instanceof Inknote.Model.BassClef;
                expect(result).toBe(true);
            });
            it("gets the right clef going down from bass clef", function () {
                var result = Inknote.getNextClef(new Inknote.Model.BassClef(), false) instanceof Inknote.Model.SubbassClef;
                expect(result).toBe(true);
            });
            it("gets the right clef going down from subbass clef", function () {
                var result = Inknote.getNextClef(new Inknote.Model.SubbassClef(), false) instanceof Inknote.Model.FrenchViolinClef;
                expect(result).toBe(true);
            });
            it("gets the correct clef going up from French violin clef", function () {
                var result = Inknote.getNextClef(new Inknote.Model.FrenchViolinClef(), true) instanceof Inknote.Model.SubbassClef;
                expect(result).toBe(true);
            });
            it("gets the right clef going up from Treble", function () {
                var result = Inknote.getNextClef(new Inknote.Model.TrebleClef(), true) instanceof Inknote.Model.FrenchViolinClef;
                expect(result).toBe(true);
            });
            it("gets the right clef going up from soprano clef", function () {
                var result = Inknote.getNextClef(new Inknote.Model.SopranoClef(), true) instanceof Inknote.Model.TrebleClef;
                expect(result).toBe(true);
            });
            it("gets the right clef going up from mezzosoprano clef", function () {
                var result = Inknote.getNextClef(new Inknote.Model.MezzoSopranoClef(), true) instanceof Inknote.Model.SopranoClef;
                expect(result).toBe(true);
            });
            it("gets the right clef going up from alto clef", function () {
                var result = Inknote.getNextClef(new Inknote.Model.AltoClef(), true) instanceof Inknote.Model.MezzoSopranoClef;
                expect(result).toBe(true);
            });
            it("gets the right clef going up from tenor clef", function () {
                var result = Inknote.getNextClef(new Inknote.Model.TenorClef(), true) instanceof Inknote.Model.AltoClef;
                expect(result).toBe(true);
            });
            it("gets the right clef going up from baritone clef", function () {
                var result = Inknote.getNextClef(new Inknote.Model.BaritoneClef(), true) instanceof Inknote.Model.TenorClef;
                expect(result).toBe(true);
            });
            it("gets the right clef going up from bass clef", function () {
                var result = Inknote.getNextClef(new Inknote.Model.BassClef(), true) instanceof Inknote.Model.BaritoneClef;
                expect(result).toBe(true);
            });
            it("gets the right clef going up from subbass clef", function () {
                var result = Inknote.getNextClef(new Inknote.Model.SubbassClef(), true) instanceof Inknote.Model.BassClef;
                expect(result).toBe(true);
            });
        });
    })(Tests = Inknote.Tests || (Inknote.Tests = {}));
})(Inknote || (Inknote = {}));
/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />
var Inknote;
(function (Inknote) {
    var Tests;
    (function (Tests) {
        describe("getNoteOfDistance", function () {
            it("gets a different note", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 0) == newNote).toBe(false);
            });
            it("gets a note with a different ID", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 0).ID == newNote.ID).toBe(false);
            });
            it("gets the correct type of object", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 0) instanceof Inknote.Model.Note).toBe(true);
            });
            it("gets a note", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 0)).toBeTruthy();
            });
            it("gets a note with correct length breve", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Breve);
                expect(Inknote.getNoteOfDistance(newNote, 0).length).toBe(Inknote.Model.NoteLength.Breve);
            });
            it("gets a note with correct length semibreve", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.SemiBreve);
                expect(Inknote.getNoteOfDistance(newNote, 0).length).toBe(Inknote.Model.NoteLength.SemiBreve);
            });
            it("gets a note with correct length minim", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Minim);
                expect(Inknote.getNoteOfDistance(newNote, 0).length).toBe(Inknote.Model.NoteLength.Minim);
            });
            it("gets a note with correct length crotchet", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 0).length).toBe(Inknote.Model.NoteLength.Crotchet);
            });
            it("gets a note with correct length quaver", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Quaver);
                expect(Inknote.getNoteOfDistance(newNote, 0).length).toBe(Inknote.Model.NoteLength.Quaver);
            });
            it("gets a note with correct length semiquaver", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.SemiQuaver);
                expect(Inknote.getNoteOfDistance(newNote, 0).length).toBe(Inknote.Model.NoteLength.SemiQuaver);
            });
            it("gets a note with correct length demisemiquaver", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.DemiSemiQuaver);
                expect(Inknote.getNoteOfDistance(newNote, 0).length).toBe(Inknote.Model.NoteLength.DemiSemiQuaver);
            });
            it("gets a note with correct length hemidemisemiquaver", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.HemiDemiSemiQuaver);
                expect(Inknote.getNoteOfDistance(newNote, 0).length).toBe(Inknote.Model.NoteLength.HemiDemiSemiQuaver);
            });
            it("gets note distance 0 from A4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 0).value).toBe(Inknote.Model.NoteValue.A);
            });
            it("gets note distance 0 from A4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 0).octave).toBe(4);
            });
            it("gets note distance 1 from A4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 1).value).toBe(Inknote.Model.NoteValue.Bb);
            });
            it("gets note distance 1 from A4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 1).octave).toBe(4);
            });
            it("gets note distance 2 from A4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 2).value).toBe(Inknote.Model.NoteValue.B);
            });
            it("gets note distance 2 from A4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 2).octave).toBe(4);
            });
            it("gets note distance 3 from A4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 3).value).toBe(Inknote.Model.NoteValue.C);
            });
            it("gets note distance 3 from A4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 3).octave).toBe(5);
            });
            it("gets note distance 4 from A4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 4).value).toBe(Inknote.Model.NoteValue.Db);
            });
            it("gets note distance 4 from A4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 4).octave).toBe(5);
            });
            it("gets note distance 5 from A4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 5).value).toBe(Inknote.Model.NoteValue.D);
            });
            it("gets note distance 5 from A4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 5).octave).toBe(5);
            });
            it("gets note distance 6 from A4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 6).value).toBe(Inknote.Model.NoteValue.Eb);
            });
            it("gets note distance 6 from A4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 6).octave).toBe(5);
            });
            it("gets note distance 7 from A4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 7).value).toBe(Inknote.Model.NoteValue.E);
            });
            it("gets note distance 7 from A4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 7).octave).toBe(5);
            });
            it("gets note distance 8 from A4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 8).value).toBe(Inknote.Model.NoteValue.F);
            });
            it("gets note distance 8 from A4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 8).octave).toBe(5);
            });
            it("gets note distance 9 from A4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 9).value).toBe(Inknote.Model.NoteValue.Gb);
            });
            it("gets note distance 9 from A4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 9).octave).toBe(5);
            });
            it("gets note distance 10 from A4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 10).value).toBe(Inknote.Model.NoteValue.G);
            });
            it("gets note distance 10 from A4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 10).octave).toBe(5);
            });
            it("gets note distance 11 from A4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 11).value).toBe(Inknote.Model.NoteValue.Ab);
            });
            it("gets note distance 11 from A4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 11).octave).toBe(5);
            });
            it("gets note distance 12 from A4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 12).value).toBe(Inknote.Model.NoteValue.A);
            });
            it("gets note distance 12 from A4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 12).octave).toBe(5);
            });
            it("gets note distance 12 from Bb4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.Bb, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 12).value).toBe(Inknote.Model.NoteValue.Bb);
            });
            it("gets note distance 12 from Bb4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.Bb, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 12).octave).toBe(5);
            });
            it("gets note distance 12 from B4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.B, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 12).value).toBe(Inknote.Model.NoteValue.B);
            });
            it("gets note distance 12 from B4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.B, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 12).octave).toBe(5);
            });
            it("gets note distance 12 from C4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 12).value).toBe(Inknote.Model.NoteValue.C);
            });
            it("gets note distance 12 from C4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 12).octave).toBe(5);
            });
            it("gets note distance 12 from Db4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.Db, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 12).value).toBe(Inknote.Model.NoteValue.Db);
            });
            it("gets note distance 12 from Db4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.Db, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 12).octave).toBe(5);
            });
            it("gets note distance 12 from D4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.D, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 12).value).toBe(Inknote.Model.NoteValue.D);
            });
            it("gets note distance 12 from D4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.D, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 12).octave).toBe(5);
            });
            it("gets note distance 12 from Eb4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.Eb, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 12).value).toBe(Inknote.Model.NoteValue.Eb);
            });
            it("gets note distance 12 from Eb4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.Eb, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 12).octave).toBe(5);
            });
            it("gets note distance 12 from E4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.E, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 12).value).toBe(Inknote.Model.NoteValue.E);
            });
            it("gets note distance 12 from E4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.E, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 12).octave).toBe(5);
            });
            it("gets note distance 12 from F4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.F, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 12).value).toBe(Inknote.Model.NoteValue.F);
            });
            it("gets note distance 12 from F4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.F, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 12).octave).toBe(5);
            });
            it("gets note distance 12 from Gb4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.Gb, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 12).value).toBe(Inknote.Model.NoteValue.Gb);
            });
            it("gets note distance 12 from Gb4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.Gb, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 12).octave).toBe(5);
            });
            it("gets note distance 12 from G4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.G, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 12).value).toBe(Inknote.Model.NoteValue.G);
            });
            it("gets note distance 12 from G4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.G, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 12).octave).toBe(5);
            });
            it("gets note distance 12 from Ab4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.Ab, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 12).value).toBe(Inknote.Model.NoteValue.Ab);
            });
            it("gets note distance 12 from Ab4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.Ab, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 12).octave).toBe(5);
            });
            it("gets note distance 36 from Ab4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.Ab, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 36).value).toBe(Inknote.Model.NoteValue.Ab);
            });
            it("gets note distance 36 from Ab4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.Ab, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, 36).octave).toBe(7);
            });
            // test negative values.
            it("gets note distance -12 from A4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, -12).value).toBe(Inknote.Model.NoteValue.A);
            });
            it("gets note distance -12 from A4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, -12).octave).toBe(3);
            });
            it("gets note distance -24 from A4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, -24).value).toBe(Inknote.Model.NoteValue.A);
            });
            it("gets note distance -24 from A4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, -24).octave).toBe(2);
            });
            it("gets note distance -1 from A4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, -1).value).toBe(Inknote.Model.NoteValue.Ab);
            });
            it("gets note distance -1 from A4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, -1).octave).toBe(4);
            });
            it("gets note distance -1 from C4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, -1).value).toBe(Inknote.Model.NoteValue.B);
            });
            it("gets note distance -1 from C4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, -1).octave).toBe(3);
            });
            it("gets note distance -13 from C4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, -13).value).toBe(Inknote.Model.NoteValue.B);
            });
            it("gets note distance -13 from C4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, -13).octave).toBe(2);
            });
            // todo: more testing for negative cases
            it("gets note distance -4 from C4 with correct noteValue", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, -4).value).toBe(Inknote.Model.NoteValue.Ab);
            });
            it("gets note distance -4 from C4 with correct octave", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getNoteOfDistance(newNote, -4).octave).toBe(3);
            });
        });
        describe("getThird", function () {
            it("gets a correct third from A4", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getThird(newNote).value).toBe(Inknote.Model.NoteValue.Db);
                expect(Inknote.getThird(newNote).octave).toBe(5);
                expect(Inknote.getThird(newNote).length).toBe(Inknote.Model.NoteLength.Crotchet);
            });
            it("gets a correct third from C4", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getThird(newNote).value).toBe(Inknote.Model.NoteValue.E);
                expect(Inknote.getThird(newNote).octave).toBe(4);
                expect(Inknote.getThird(newNote).length).toBe(Inknote.Model.NoteLength.Crotchet);
            });
            it("gets a correct third from Ab4", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.Ab, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getThird(newNote).value).toBe(Inknote.Model.NoteValue.C);
                expect(Inknote.getThird(newNote).octave).toBe(5);
                expect(Inknote.getThird(newNote).length).toBe(Inknote.Model.NoteLength.Crotchet);
            });
        });
        describe("getMajorThird", function () {
            it("gets a correct third from A4", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getMajorThird(newNote).value).toBe(Inknote.Model.NoteValue.Db);
                expect(Inknote.getMajorThird(newNote).octave).toBe(5);
                expect(Inknote.getMajorThird(newNote).length).toBe(Inknote.Model.NoteLength.Crotchet);
            });
            it("gets a correct third from C4", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getMajorThird(newNote).value).toBe(Inknote.Model.NoteValue.E);
                expect(Inknote.getMajorThird(newNote).octave).toBe(4);
                expect(Inknote.getMajorThird(newNote).length).toBe(Inknote.Model.NoteLength.Crotchet);
            });
            it("gets a correct third from Ab4", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.Ab, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getMajorThird(newNote).value).toBe(Inknote.Model.NoteValue.C);
                expect(Inknote.getMajorThird(newNote).octave).toBe(5);
                expect(Inknote.getMajorThird(newNote).length).toBe(Inknote.Model.NoteLength.Crotchet);
            });
        });
        describe("getMinorThird", function () {
            it("gets a correct third from A4", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getMinorThird(newNote).value).toBe(Inknote.Model.NoteValue.C);
                expect(Inknote.getMinorThird(newNote).octave).toBe(5);
                expect(Inknote.getMinorThird(newNote).length).toBe(Inknote.Model.NoteLength.Crotchet);
            });
            it("gets a correct third from C4", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getMinorThird(newNote).value).toBe(Inknote.Model.NoteValue.Eb);
                expect(Inknote.getMinorThird(newNote).octave).toBe(4);
                expect(Inknote.getMinorThird(newNote).length).toBe(Inknote.Model.NoteLength.Crotchet);
            });
            it("gets a correct third from Ab4", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.Ab, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getMinorThird(newNote).value).toBe(Inknote.Model.NoteValue.B);
                expect(Inknote.getMinorThird(newNote).octave).toBe(4);
                expect(Inknote.getMinorThird(newNote).length).toBe(Inknote.Model.NoteLength.Crotchet);
            });
        });
        describe("getFlatFifth", function () {
            it("gets a correct note from A4", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getFlatFifth(newNote).value).toBe(Inknote.Model.NoteValue.Eb);
                expect(Inknote.getFlatFifth(newNote).octave).toBe(5);
                expect(Inknote.getFlatFifth(newNote).length).toBe(Inknote.Model.NoteLength.Crotchet);
            });
            it("gets a correct note from C4", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getFlatFifth(newNote).value).toBe(Inknote.Model.NoteValue.Gb);
                expect(Inknote.getFlatFifth(newNote).octave).toBe(4);
                expect(Inknote.getFlatFifth(newNote).length).toBe(Inknote.Model.NoteLength.Crotchet);
            });
            it("gets a correct note from Ab4", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.Ab, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getFlatFifth(newNote).value).toBe(Inknote.Model.NoteValue.D);
                expect(Inknote.getFlatFifth(newNote).octave).toBe(5);
                expect(Inknote.getFlatFifth(newNote).length).toBe(Inknote.Model.NoteLength.Crotchet);
            });
        });
        describe("getFifth", function () {
            it("gets a correct note from A4", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getFifth(newNote).value).toBe(Inknote.Model.NoteValue.E);
                expect(Inknote.getFifth(newNote).octave).toBe(5);
                expect(Inknote.getFifth(newNote).length).toBe(Inknote.Model.NoteLength.Crotchet);
            });
            it("gets a correct note from C4", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getFifth(newNote).value).toBe(Inknote.Model.NoteValue.G);
                expect(Inknote.getFifth(newNote).octave).toBe(4);
                expect(Inknote.getFifth(newNote).length).toBe(Inknote.Model.NoteLength.Crotchet);
            });
            it("gets a correct note from Ab4", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.Ab, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getFifth(newNote).value).toBe(Inknote.Model.NoteValue.Eb);
                expect(Inknote.getFifth(newNote).octave).toBe(5);
                expect(Inknote.getFifth(newNote).length).toBe(Inknote.Model.NoteLength.Crotchet);
            });
        });
        describe("getSeventh", function () {
            it("gets a correct note from A4", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getSeventh(newNote).value).toBe(Inknote.Model.NoteValue.G);
                expect(Inknote.getSeventh(newNote).octave).toBe(5);
                expect(Inknote.getSeventh(newNote).length).toBe(Inknote.Model.NoteLength.Crotchet);
            });
            it("gets a correct note from C4", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getSeventh(newNote).value).toBe(Inknote.Model.NoteValue.Bb);
                expect(Inknote.getSeventh(newNote).octave).toBe(4);
                expect(Inknote.getSeventh(newNote).length).toBe(Inknote.Model.NoteLength.Crotchet);
            });
            it("gets a correct note from Ab4", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.Ab, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getSeventh(newNote).value).toBe(Inknote.Model.NoteValue.Gb);
                expect(Inknote.getSeventh(newNote).octave).toBe(5);
                expect(Inknote.getSeventh(newNote).length).toBe(Inknote.Model.NoteLength.Crotchet);
            });
        });
        describe("getMajorSeventh", function () {
            it("gets a correct note from A4", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getMajorSeventh(newNote).value).toBe(Inknote.Model.NoteValue.Ab);
                expect(Inknote.getMajorSeventh(newNote).octave).toBe(5);
                expect(Inknote.getMajorSeventh(newNote).length).toBe(Inknote.Model.NoteLength.Crotchet);
            });
            it("gets a correct note from C4", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getMajorSeventh(newNote).value).toBe(Inknote.Model.NoteValue.B);
                expect(Inknote.getMajorSeventh(newNote).octave).toBe(4);
                expect(Inknote.getMajorSeventh(newNote).length).toBe(Inknote.Model.NoteLength.Crotchet);
            });
            it("gets a correct note from Ab4", function () {
                var newNote = new Inknote.Model.Note(Inknote.Model.NoteValue.Ab, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getMajorSeventh(newNote).value).toBe(Inknote.Model.NoteValue.G);
                expect(Inknote.getMajorSeventh(newNote).octave).toBe(5);
                expect(Inknote.getMajorSeventh(newNote).length).toBe(Inknote.Model.NoteLength.Crotchet);
            });
        });
        describe("getIntervalDistance", function () {
            it("gets correct distance between G4 and A4", function () {
                var g4 = new Inknote.Model.Note(Inknote.Model.NoteValue.G, 4, Inknote.Model.NoteLength.Crotchet);
                var a4 = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getIntervalDistance(g4, a4)).toBe(1);
            });
            it("gets correct distance between A4 and G4", function () {
                var g4 = new Inknote.Model.Note(Inknote.Model.NoteValue.G, 4, Inknote.Model.NoteLength.Crotchet);
                var a4 = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getIntervalDistance(a4, g4)).toBe(-1);
            });
            it("gets correct distance between C4 and D4", function () {
                var c4 = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
                var d4 = new Inknote.Model.Note(Inknote.Model.NoteValue.D, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getIntervalDistance(c4, d4)).toBe(1);
            });
            it("gets correct distance between D4 and C4", function () {
                var c4 = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
                var d4 = new Inknote.Model.Note(Inknote.Model.NoteValue.D, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getIntervalDistance(d4, c4)).toBe(-1);
            });
            it("gets correct distance between B3 and C4", function () {
                var b3 = new Inknote.Model.Note(Inknote.Model.NoteValue.B, 3, Inknote.Model.NoteLength.Crotchet);
                var c4 = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getIntervalDistance(b3, c4)).toBe(1);
            });
            it("gets correct distance between C4 and B3", function () {
                var b3 = new Inknote.Model.Note(Inknote.Model.NoteValue.B, 3, Inknote.Model.NoteLength.Crotchet);
                var c4 = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
                expect(Inknote.getIntervalDistance(c4, b3)).toBe(-1);
            });
        });
    })(Tests = Inknote.Tests || (Inknote.Tests = {}));
})(Inknote || (Inknote = {}));
/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />
var Inknote;
(function (Inknote) {
    var Tests;
    (function (Tests) {
        describe("compressing, then decompressing project", function () {
            var testProject;
            var compressedProject;
            var decompressedProject;
            beforeEach(function () {
                testProject = new Inknote.Project("Blob");
                testProject.colour = "#FF0000";
                testProject.composer = "Michal Paszkiewicz";
                testProject.arrangedBy = "Michal Paszkiewicz";
                testProject.notes = "6 * 9 base 13 = 42";
                var i0 = new Inknote.Model.Instrument("guitar");
                var i1 = new Inknote.Model.Instrument("piano");
                var i2 = new Inknote.Model.Instrument("violin");
                var i3 = new Inknote.Model.Instrument("charango");
                var i4 = new Inknote.Model.Instrument("double bass");
                var i5 = new Inknote.Model.Instrument("clarinet");
                for (var i = 0; i < 10; i++) {
                    i0.bars.push(new Inknote.Model.Bar());
                    i1.bars.push(new Inknote.Model.Bar());
                    i2.bars.push(new Inknote.Model.Bar());
                    i3.bars.push(new Inknote.Model.Bar());
                    i4.bars.push(new Inknote.Model.Bar());
                    i5.bars.push(new Inknote.Model.Bar());
                }
                testProject.instruments = [i0, i1, i2, i3, i4, i5];
                compressedProject = Inknote.ProjectConverter.compress(testProject);
                decompressedProject = Inknote.ProjectConverter.decompress(compressedProject);
            });
            it("maintains same number of instruments", function () {
                expect(decompressedProject.instruments.length).toBe(testProject.instruments.length);
            });
            it("maintains same number of bars in all instruments", function () {
                for (var i = 0; i < testProject.instruments.length; i++) {
                    expect(decompressedProject.instruments[i].bars.length).toBe(testProject.instruments[i].bars.length);
                }
            });
            it("keeps the same ID", function () {
                expect(decompressedProject.ID).toBe(testProject.ID);
            });
            it("keeps the same name", function () {
                expect(decompressedProject.name).toBe(testProject.name);
            });
            it("keeps the same colour", function () {
                expect(decompressedProject.colour).toBe(testProject.colour);
            });
            it("keeps the same composer", function () {
                expect(decompressedProject.composer).toBe(testProject.composer);
            });
            it("keeps the same arranger", function () {
                expect(decompressedProject.arrangedBy).toBe(testProject.arrangedBy);
            });
            it("keeps the same notes", function () {
                expect(decompressedProject.notes).toBe(testProject.notes);
            });
        });
    })(Tests = Inknote.Tests || (Inknote.Tests = {}));
})(Inknote || (Inknote = {}));
/// <reference path="../../../scripts/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />
var Inknote;
(function (Inknote) {
    describe("transposeNote", function () {
        it("transposes C4 by 0 semitones correctly", function () {
            var c4 = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
            Inknote.transposeNote(c4, 0);
            expect(c4.value).toBe(Inknote.Model.NoteValue.C);
            expect(c4.octave).toBe(4);
            expect(c4.length).toBe(Inknote.Model.NoteLength.Crotchet);
        });
        it("transposes C4 by 1 semitones correctly", function () {
            var c4 = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
            Inknote.transposeNote(c4, 1);
            expect(c4.value).toBe(Inknote.Model.NoteValue.Db);
            expect(c4.octave).toBe(4);
            expect(c4.length).toBe(Inknote.Model.NoteLength.Crotchet);
        });
        it("transposes C4 by 2 semitones correctly", function () {
            var c4 = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
            Inknote.transposeNote(c4, 2);
            expect(c4.value).toBe(Inknote.Model.NoteValue.D);
            expect(c4.octave).toBe(4);
            expect(c4.length).toBe(Inknote.Model.NoteLength.Crotchet);
        });
        it("transposes C4 by 3 semitones correctly", function () {
            var c4 = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
            Inknote.transposeNote(c4, 3);
            expect(c4.value).toBe(Inknote.Model.NoteValue.Eb);
            expect(c4.octave).toBe(4);
            expect(c4.length).toBe(Inknote.Model.NoteLength.Crotchet);
        });
        it("transposes C4 by 4 semitones correctly", function () {
            var c4 = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
            Inknote.transposeNote(c4, 4);
            expect(c4.value).toBe(Inknote.Model.NoteValue.E);
            expect(c4.octave).toBe(4);
            expect(c4.length).toBe(Inknote.Model.NoteLength.Crotchet);
        });
        it("transposes C4 by 5 semitones correctly", function () {
            var c4 = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
            Inknote.transposeNote(c4, 5);
            expect(c4.value).toBe(Inknote.Model.NoteValue.F);
            expect(c4.octave).toBe(4);
            expect(c4.length).toBe(Inknote.Model.NoteLength.Crotchet);
        });
        it("transposes C4 by 6 semitones correctly", function () {
            var c4 = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
            Inknote.transposeNote(c4, 6);
            expect(c4.value).toBe(Inknote.Model.NoteValue.Gb);
            expect(c4.octave).toBe(4);
            expect(c4.length).toBe(Inknote.Model.NoteLength.Crotchet);
        });
        it("transposes C4 by 7 semitones correctly", function () {
            var c4 = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
            Inknote.transposeNote(c4, 7);
            expect(c4.value).toBe(Inknote.Model.NoteValue.G);
            expect(c4.octave).toBe(4);
            expect(c4.length).toBe(Inknote.Model.NoteLength.Crotchet);
        });
        it("transposes C4 by 8 semitones correctly", function () {
            var c4 = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
            Inknote.transposeNote(c4, 8);
            expect(c4.value).toBe(Inknote.Model.NoteValue.Ab);
            expect(c4.octave).toBe(4);
            expect(c4.length).toBe(Inknote.Model.NoteLength.Crotchet);
        });
        it("transposes C4 by 9 semitones correctly", function () {
            var c4 = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
            Inknote.transposeNote(c4, 9);
            expect(c4.value).toBe(Inknote.Model.NoteValue.A);
            expect(c4.octave).toBe(4);
            expect(c4.length).toBe(Inknote.Model.NoteLength.Crotchet);
        });
        it("transposes C4 by 10 semitones correctly", function () {
            var c4 = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
            Inknote.transposeNote(c4, 10);
            expect(c4.value).toBe(Inknote.Model.NoteValue.Bb);
            expect(c4.octave).toBe(4);
            expect(c4.length).toBe(Inknote.Model.NoteLength.Crotchet);
        });
        it("transposes C4 by 11 semitones correctly", function () {
            var c4 = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
            Inknote.transposeNote(c4, 11);
            expect(c4.value).toBe(Inknote.Model.NoteValue.B);
            expect(c4.octave).toBe(4);
            expect(c4.length).toBe(Inknote.Model.NoteLength.Crotchet);
        });
        it("transposes C4 by 12 semitones correctly", function () {
            var c4 = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
            Inknote.transposeNote(c4, 12);
            expect(c4.value).toBe(Inknote.Model.NoteValue.C);
            expect(c4.octave).toBe(5);
            expect(c4.length).toBe(Inknote.Model.NoteLength.Crotchet);
        });
        it("transposes C4 by 13 semitones correctly", function () {
            var c4 = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
            Inknote.transposeNote(c4, 13);
            expect(c4.value).toBe(Inknote.Model.NoteValue.Db);
            expect(c4.octave).toBe(5);
            expect(c4.length).toBe(Inknote.Model.NoteLength.Crotchet);
        });
        it("transposes C4 by -1 semitones correctly", function () {
            var c4 = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
            Inknote.transposeNote(c4, -1);
            expect(c4.value).toBe(Inknote.Model.NoteValue.B);
            expect(c4.octave).toBe(3);
            expect(c4.length).toBe(Inknote.Model.NoteLength.Crotchet);
        });
        it("transposes A4 by -1 semitones correctly", function () {
            var a4 = new Inknote.Model.Note(Inknote.Model.NoteValue.A, 4, Inknote.Model.NoteLength.Crotchet);
            Inknote.transposeNote(a4, -1);
            expect(a4.value).toBe(Inknote.Model.NoteValue.Ab);
            expect(a4.octave).toBe(4);
            expect(a4.length).toBe(Inknote.Model.NoteLength.Crotchet);
        });
    });
    describe("transposeChord", function () {
        it("transposes a C4 major triad upwards correctly", function () {
            var c4 = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
            var e4 = new Inknote.Model.Note(Inknote.Model.NoteValue.E, 4, Inknote.Model.NoteLength.Crotchet);
            var g4 = new Inknote.Model.Note(Inknote.Model.NoteValue.G, 4, Inknote.Model.NoteLength.Crotchet);
            var Cmaj = new Inknote.Model.Chord([c4, e4, g4]);
            Inknote.transposeChord(Cmaj, 11);
            expect(c4.value).toBe(Inknote.Model.NoteValue.B);
            expect(c4.octave).toBe(4);
            expect(e4.value).toBe(Inknote.Model.NoteValue.Eb);
            expect(e4.octave).toBe(5);
            expect(g4.value).toBe(Inknote.Model.NoteValue.Gb);
            expect(g4.octave).toBe(5);
        });
        it("transposes a C4 major triad downwards correctly", function () {
            var c4 = new Inknote.Model.Note(Inknote.Model.NoteValue.C, 4, Inknote.Model.NoteLength.Crotchet);
            var e4 = new Inknote.Model.Note(Inknote.Model.NoteValue.E, 4, Inknote.Model.NoteLength.Crotchet);
            var g4 = new Inknote.Model.Note(Inknote.Model.NoteValue.G, 4, Inknote.Model.NoteLength.Crotchet);
            var Cmaj = new Inknote.Model.Chord([c4, e4, g4]);
            Inknote.transposeChord(Cmaj, -13);
            expect(c4.value).toBe(Inknote.Model.NoteValue.B);
            expect(c4.octave).toBe(2);
            expect(e4.value).toBe(Inknote.Model.NoteValue.Eb);
            expect(e4.octave).toBe(3);
            expect(g4.value).toBe(Inknote.Model.NoteValue.Gb);
            expect(g4.octave).toBe(3);
        });
    });
})(Inknote || (Inknote = {}));
//# sourceMappingURL=@tests.js.map