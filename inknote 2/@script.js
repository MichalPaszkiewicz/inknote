var Inknote;
(function (Inknote) {
    function allItemsAre(items, xAndY) {
        for (var i = 0; i < items.length; i++) {
            if (!xAndY(items[i])) {
                return false;
            }
        }
        return true;
    }
    Inknote.allItemsAre = allItemsAre;
    function countWhere(items, xAndY) {
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
        var total = 0;
        for (var i = 0; i < items.length; i++) {
            total += xAndY(items[i]);
        }
        return total;
    }
    Inknote.sum = sum;
    function last(items) {
        return items[items.length - 1];
    }
    Inknote.last = last;
    function arraysAreEqual(arrayOne, arrayTwo) {
        if (!arrayOne) {
            return false;
        }
        if (!arrayTwo) {
            return false;
        }
        if (arrayOne.length != arrayTwo.length) {
            return false;
        }
        for (var i = 0, l = this.length; i < l; i++) {
            if (arrayOne[i] instanceof Array && arrayTwo[i] instanceof Array) {
                if (!arraysAreEqual(arrayOne[i], arrayTwo[i])) {
                    return false;
                }
            }
            else if (arrayOne[i] != arrayTwo[i]) {
                return false;
            }
        }
        return true;
    }
    Inknote.arraysAreEqual = arraysAreEqual;
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
    })(Maths = Inknote.Maths || (Inknote.Maths = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Setting = (function () {
        function Setting(name) {
            this.staveColour = "black";
            this.noteColour = "red";
            this.textColour = "green";
            this.keypressFuncsOn = true;
            this.serverURL = "https://lit-basin-6551.herokuapp.com";
            this.ID = Inknote.getID();
            this.name = name;
            this.testMode = false;
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
var Inknote;
(function (Inknote) {
    var Model;
    (function (Model) {
        var TimeSignature = (function () {
            function TimeSignature(top, bottom) {
                this.top = top;
                this.bottom = bottom;
                if (Math.round(top) != top || Math.round(bottom) != bottom) {
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
            this.ID = Inknote.getID();
            this.order = 50;
        }
        Notation.prototype.draw = function (ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
            ctx.fill();
            return false;
        };
        Notation.prototype.isOver = function (x, y) {
            return Inknote.Maths.isWithinRadius(x, y, this.x, this.y, 10);
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
    })(Model = Inknote.Model || (Inknote.Model = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Model;
    (function (Model) {
        var NoteLength = (function () {
            function NoteLength() {
            }
            return NoteLength;
        })();
        Model.NoteLength = NoteLength;
    })(Model = Inknote.Model || (Inknote.Model = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Model;
    (function (Model) {
        var Note = (function () {
            function Note(value, octave, length) {
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
        var Bar = (function () {
            function Bar() {
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
                this.bars = [];
                this.visible = true;
                this.bars.push(new Model.Bar());
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
    var Compressed;
    (function (Compressed) {
        var Bar = (function () {
            function Bar() {
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
                this.bars.push(new Compressed.Bar());
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
                this.ID = Inknote.getID();
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
    var Drawing;
    (function (Drawing) {
        Drawing.Colours = {
            white: "white",
            orange: "orange",
            lightOrange: "rgba(255,150,0,0.5)",
            tan: "rgb(220, 142, 66)",
            lightTan: "rgb(240, 162, 86)",
            peach: "rgb(250, 222, 196)",
            black: "rgb(10,10,10)",
            watermarkGray: "rgba(120,120,120,0.1)",
            lightGray: "lightgray",
            gray: "darkgray",
            darkgray: "gray",
            darkerGray: "rgb(100,100,100)",
            darkestGray: "rgb(80,80,80)",
            translucentBlack: "rgba(0,0,0,0.2)",
            faintBlue: "rgb(245,245,255)",
            lightBlue: "lightblue",
            midBlue: "rgb(100,130,240)",
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
                for (var i = 0; i < canvas.width; i += 4) {
                    ctx.beginPath();
                    ctx.moveTo(i, 0);
                    ctx.lineTo(i, canvas.height);
                    ctx.strokeStyle = Drawing.Colours.faintBlue;
                    ctx.stroke();
                }
                this.t++;
                ctx.save();
                ctx.beginPath();
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(-Math.PI / 4);
                ctx.font = "42px Arial";
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
            function Stave(y) {
                this.y = y;
                this.order = 10;
                this.ID = Inknote.getID();
            }
            Stave.prototype.isOver = function (x, y) {
                return false;
            };
            Stave.prototype.draw = function (ctx, canvas) {
                for (var i = 0; i < 5; i++) {
                    ctx.beginPath();
                    ctx.strokeStyle = Drawing.Colours.black;
                    ctx.moveTo(30, this.y + 10 * i);
                    ctx.lineTo(canvas.width - 30, this.y + 10 * i);
                    ctx.stroke();
                }
                return true;
            };
            return Stave;
        })();
        Drawing.Stave = Stave;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var Note = (function (_super) {
            __extends(Note, _super);
            function Note(drawFunction) {
                _super.call(this, drawFunction);
            }
            return Note;
        })(Inknote.Notation);
        Drawing.Note = Note;
    })(Drawing = Inknote.Drawing || (Inknote.Drawing = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Drawing;
    (function (Drawing) {
        var Rest = (function (_super) {
            __extends(Rest, _super);
            function Rest(drawFunction) {
                _super.call(this, drawFunction);
            }
            return Rest;
        })(Inknote.Notation);
        Drawing.Rest = Rest;
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
                this.y = 0;
                this.order = 100;
                this.hover = false;
                this.select = false;
                this.name = name;
                this.x = 0;
                this.y = 0;
                var self = this;
                self.draw = function (ctx, canvas, scale) {
                    if (self.select) {
                        ctx.beginPath();
                        ctx.fillStyle = Drawing.Colours.white;
                        var width = Inknote.Managers.ProjectManager.Instance.currentProject.name.length * 30 + 100;
                        ctx.rect(canvas.width / 2 - width / 2, 60, width, 50);
                        ctx.strokeStyle = Drawing.Colours.lightOrange;
                        ctx.lineWidth = 10;
                        ctx.stroke();
                        if (this.name.length > 0) {
                            ctx.beginPath();
                            ctx.fillStyle = Drawing.Colours.black;
                            ctx.textAlign = "center";
                            ctx.fillText("Click delete to clear text", canvas.width / 2, 50);
                            ctx.fill();
                        }
                        else {
                            ctx.beginPath();
                            ctx.fillStyle = Drawing.Colours.black;
                            ctx.textAlign = "center";
                            ctx.fillText("Please type a project name", canvas.width / 2, 50);
                            ctx.fill();
                        }
                    }
                    ctx.beginPath();
                    ctx.fillStyle = Drawing.Colours.orange;
                    ctx.font = "40px Arial";
                    ctx.textAlign = "center";
                    ctx.fillText(self.name, canvas.width / 2, 100);
                    ctx.fill();
                    if (self.hover) {
                        ctx.beginPath();
                        ctx.rect(canvas.width / 2 - 50, 105, 100, 10);
                        ctx.fill();
                        if (!self.select) {
                            ctx.beginPath();
                            ctx.font = "10px Arial";
                            ctx.fillStyle = Drawing.Colours.black;
                            ctx.textAlign = "center";
                            ctx.fillText("Click to edit project name", canvas.width / 2, 50);
                            ctx.fill();
                        }
                    }
                    return true;
                };
            }
            Name.prototype.isOver = function (x, y, canvas) {
                return y < 100 && y > 65 && x > canvas.width / 2 - 150 && x < canvas.width / 2 + 150;
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
                    ctx.beginPath();
                    ctx.moveTo(self.x - (fold + 4), self.y - 45);
                    ctx.lineTo(self.x - 45, self.y - 45);
                    ctx.lineTo(self.x - 45, self.y - (fold + 4));
                    ctx.strokeStyle = Drawing.Colours.black;
                    ctx.fillStyle = Drawing.Colours.white;
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
                    grd.addColorStop(0, Drawing.Colours.gray);
                }
                grd.addColorStop(1, Drawing.Colours.white);
                ctx.fillStyle = grd;
                ctx.fill();
                ctx.beginPath();
                ctx.fillStyle = Drawing.Colours.black;
                ctx.textAlign = "center";
                ctx.fillText(this.name, this.x, this.y + 3);
            };
            KeyboardKey.prototype.isOver = function (x, y) {
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
                keys.push(new KeyboardKey(charArray[i], x + itemWidth * column + itemWidth / 2, y + itemHeight / 2, itemWidth - 3, itemHeight - 3));
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
                keys.push(new KeyboardKey(charArray[i], x + itemWidth * column + itemWidth / 2, y + itemHeight / 2, itemWidth - 3, itemHeight - 6));
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
                        self.keys = self.keys.concat(Drawing.keysFromArray(["", "", "", "|<", "Delete"], 0, canvas.height / 2, canvas.width, canvas.height / 12));
                        self.keys = self.keys.concat(Drawing.keysFromString("qwertyuiop", 0, canvas.height / 2 + canvas.height / 12, canvas.width, canvas.height / 12));
                        self.keys = self.keys.concat(Drawing.keysFromString("asdfghjkl-", 0, canvas.height / 2 + 2 * canvas.height / 12, canvas.width, canvas.height / 12));
                        self.keys = self.keys.concat(Drawing.keysFromString("zxcvbnm,./", 0, canvas.height / 2 + 3 * canvas.height / 12, canvas.width, canvas.height / 12));
                        self.keys = self.keys.concat(Drawing.keysFromString(" ", 0, canvas.height / 2 + 4 * canvas.height / 12, canvas.width, canvas.height / 12));
                    }
                    else {
                    }
                    ctx.font = "12px Arial";
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
                for (var i = 0; i < this.keys.length; i++) {
                    if (this.keys[i].isOver(x, y)) {
                        this.keys[i].hover = true;
                    }
                    else {
                        this.keys[i].hover = false;
                    }
                }
                return y > canvas.height / 2;
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
    var Storage;
    (function (Storage) {
        var defaults = {
            settings: "settings",
            projects: "projects"
        };
        function getLocal(key) {
            if (!localStorage) {
                Inknote.log("Local storage is undefined");
                return null;
            }
            return JSON.parse(localStorage.getItem("inknote-" + key));
        }
        function saveLocal(key, item) {
            if (Inknote.Managers.SettingsManager.Current.testMode) {
                return;
            }
            if (!localStorage) {
                Inknote.log("Local storage is undefined");
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
            Inknote.log("localStorage settings are not saved in the correct format");
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
        }
        Storage.saveProjects = saveProjects;
    })(Storage = Inknote.Storage || (Inknote.Storage = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    (function (MessageType) {
        MessageType[MessageType["Error"] = 0] = "Error";
        MessageType[MessageType["Text"] = 1] = "Text";
    })(Inknote.MessageType || (Inknote.MessageType = {}));
    var MessageType = Inknote.MessageType;
    function log(message, msgType) {
        console.log(message);
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
    var ScrollService = (function () {
        function ScrollService() {
            this.x = 0;
            this.y = 0;
            this.scrollSpeed = 20;
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
        ScrollService.prototype.up = function () {
            this.y = this.y - this.scrollSpeed;
        };
        ScrollService.prototype.down = function () {
            this.y = Math.max(0, this.scrollSpeed + this.y);
        };
        return ScrollService;
    })();
    Inknote.ScrollService = ScrollService;
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
        return item.isOver(me.clientX - scroll.x, me.clientY - 50, canvas);
    }
    Inknote.mouseIsOver = mouseIsOver;
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
                self._canvas.width = self._canvas.parentElement.clientWidth;
                self._canvas.height = self._canvas.parentElement.clientHeight - 50;
                self.arrange();
                Inknote.sortByOrder(self._items);
                for (var i = 0; i < self._items.length; i++) {
                    if (self._items[i].draw(self._ctx, self._canvas) === false) {
                        Inknote.log("Drawing failed on item " + self._items[i].ID);
                        return;
                    }
                }
                requestAnimationFrame(self.draw);
            };
            self.draw();
        }
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
var Inknote;
(function (Inknote) {
    var ProjectConverter;
    (function (ProjectConverter) {
        var splash = new Inknote.Drawing.LoadingSplash();
        var name = new Inknote.Drawing.Name("");
        function toDrawing(drawer) {
            var project = Inknote.Managers.ProjectManager.Instance.currentProject;
            var items = [];
            if (!project) {
                items.push(splash);
                return items;
            }
            name.name = project.name;
            name.ID = project.ID;
            name.hover = name.ID == Inknote.Managers.ProjectManager.Instance.hoverID;
            name.select = name.ID == Inknote.Managers.ProjectManager.Instance.selectID;
            if (name.select) {
                items.push(Inknote.Drawing.Keyboard.Instance);
            }
            var staveGroup = Inknote.getItemsWhere(project.instruments, function (instrument) {
                return instrument.visible;
            });
            var startHeight = 180;
            for (var i = 0; i < staveGroup.length; i++) {
                items.push(new Inknote.Drawing.Stave(startHeight));
                startHeight += 80;
            }
            items.push(name);
            if (project.pause) {
                items.push(splash);
            }
            return items;
        }
        ProjectConverter.toDrawing = toDrawing;
        function compress(project) {
            var compressed = new Inknote.Compressed.CompressedProject(project.name);
            compressed.ID = project.ID;
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
            var result = new Inknote.Project(project.name);
            result.ID = project.ID;
            result.instruments = [];
            for (var i = 0; i < project.instruments.length; i++) {
                result.instruments.push(decompressInstrument(project.instruments[i]));
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
            return result;
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
                items.push(file);
                column++;
                if (column >= maxFiles) {
                    column = 0;
                    row++;
                }
            }
            if (anySelected) {
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
    var Testing;
    (function (Testing) {
        var _compressedProject = new Inknote.Compressed.CompressedProject("TestCompressed");
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
        (function (Page) {
            Page[Page["Score"] = 0] = "Score";
            Page[Page["Form"] = 1] = "Form";
            Page[Page["File"] = 2] = "File";
            Page[Page["List"] = 3] = "List";
        })(Managers.Page || (Managers.Page = {}));
        var Page = Managers.Page;
        var PageManager = (function () {
            function PageManager() {
                this.page = 0 /* Score */;
            }
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
            ProjectManager.prototype.addProject = function (item) {
                this._projects.push(item);
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
                var index = null;
                index = Inknote.getIndexFromID(this._projects, this.selectID);
                var proj = Inknote.getItemFromID(this._projects, this.selectID);
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
            ProjectManager.prototype.next = function () {
                var projects = this._projects;
                if (projects.length < 2) {
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
    (function (ActionType) {
        ActionType[ActionType["NewProject"] = 0] = "NewProject";
        ActionType[ActionType["OpenProject"] = 1] = "OpenProject";
        ActionType[ActionType["SaveProject"] = 2] = "SaveProject";
    })(Inknote.ActionType || (Inknote.ActionType = {}));
    var ActionType = Inknote.ActionType;
    function Action(aType) {
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
            default:
                Inknote.log("Unknown action type", 0 /* Error */);
        }
        setTimeout(function () {
            Inknote.Managers.ProjectManager.Instance.currentProject.pause = false;
        }, 100);
    }
    Inknote.Action = Action;
    function newProject() {
        var newProj = new Inknote.Project("Untitled");
        Inknote.Managers.ProjectManager.Instance.addProject(newProj);
        Inknote.Managers.ProjectManager.Instance.setCurrentProject(newProj.ID);
        Inknote.Managers.PageManager.Current.page = 0 /* Score */;
        Inknote.Managers.ProjectManager.Instance.currentProject.pause = true;
    }
    function openProject() {
        Inknote.Managers.PageManager.Current.page = 2 /* File */;
    }
    function saveProject() {
        Inknote.Managers.ProjectManager.Instance.save();
    }
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var CanvasControl = (function () {
        function CanvasControl(drawService) {
            this.drawService = drawService;
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
        }
        CanvasControl.prototype.hover = function (e) {
            var allItems = this.drawService.items;
            var hovered = false;
            for (var i = 0; i < allItems.length; i++) {
                if (Inknote.mouseIsOver(allItems[i], e, this.drawService.canvas)) {
                    var hoverID = allItems[i].ID;
                    Inknote.Managers.ProjectManager.Instance.hoverID = hoverID;
                    hovered = true;
                    this.drawService.canvas.style.cursor = "pointer";
                }
            }
            if (!hovered) {
                Inknote.Managers.ProjectManager.Instance.hoverID = null;
                this.drawService.canvas.style.cursor = "";
            }
        };
        CanvasControl.prototype.click = function (e) {
            var allItems = this.drawService.items;
            var selected = false;
            for (var i = 0; i < allItems.length; i++) {
                if (Inknote.mouseIsOver(allItems[i], e, this.drawService.canvas)) {
                    var selectedID = allItems[i].ID;
                    if (selectedID == Inknote.Drawing.Keyboard.Instance.ID) {
                        Inknote.Drawing.Keyboard.Instance.click(e);
                        return;
                    }
                    if (selectedID == Inknote.Drawing.BottomMenu.Instance.ID) {
                        Inknote.Drawing.BottomMenu.Instance.click(e);
                        return;
                    }
                    Inknote.Managers.ProjectManager.Instance.selectID = selectedID;
                    selected = true;
                }
            }
            if (!selected) {
                Inknote.Managers.ProjectManager.Instance.selectID = null;
            }
        };
        CanvasControl.prototype.dblClick = function (e) {
        };
        return CanvasControl;
    })();
    Inknote.CanvasControl = CanvasControl;
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    function canScroll(up) {
        if (up && Inknote.ScrollService.Instance.y - Inknote.ScrollService.Instance.scrollSpeed < 0) {
            Inknote.ScrollService.Instance.y = 0;
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
                return maxHeight > Inknote.ScrollService.Instance.y + Inknote.ScrollService.Instance.scrollSpeed + canvas.y;
                break;
            case 0 /* Score */:
                return false;
                break;
            default:
                return false;
        }
    }
    Inknote.canScroll = canScroll;
    window.onmousewheel = function (ev) {
        var isUp = false;
        if (ev.wheelDelta > 0) {
            isUp = true;
        }
        if (canScroll(isUp)) {
            if (isUp) {
                Inknote.ScrollService.Instance.up();
            }
            else {
                Inknote.ScrollService.Instance.down();
            }
        }
    };
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    document.onkeydown = function (e) {
        if (e.keyCode == 8) {
            e.preventDefault();
        }
    };
    window.onkeyup = function (ev) {
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
    function scoreType(e) {
        var inst = Inknote.Managers.ProjectManager.Instance;
        var proj = inst.currentProject;
        if (inst.selectID == proj.ID) {
            if (e.keyCode == 13) {
                inst.selectID = null;
            }
            else if (Inknote.countWhere([16, 17, 18, 20], function (item) {
                return item == e.keyCode;
            }) > 0) {
            }
            else if (e.keyCode == 8) {
                proj.name = proj.name.substr(0, proj.name.length - 1);
            }
            else if (e.keyCode == 46) {
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
            inst.openSelectedProject();
        }
        else if (e.keyCode == 38) {
            if (Inknote.canScroll(true)) {
                Inknote.ScrollService.Instance.up();
            }
        }
        else if (e.keyCode == 40) {
            if (Inknote.canScroll(false)) {
                Inknote.ScrollService.Instance.down();
            }
        }
        else if (e.keyCode == 37) {
            inst.previous();
        }
        else if (e.keyCode == 39) {
            inst.next();
        }
        else if (e.keyCode == 46) {
            inst.deleteSelectedProject();
        }
    }
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Main;
    (function (Main) {
        var settingsManager = Inknote.Managers.SettingsManager.Instance;
        var appSetting = new Inknote.Setting("Default");
        appSetting.testMode = true;
        settingsManager.addSetting(appSetting);
        settingsManager.addSettings(Inknote.Storage.getSettings());
        var drawing = Inknote.DrawingSettings.Instance;
        var projectManager = Inknote.Managers.ProjectManager.Instance;
        var decompressedProjects = Inknote.ProjectConverter.decompressAll(Inknote.Storage.getProjects());
        projectManager.addProjects(decompressedProjects);
        var x = new Inknote.DrawService("my-canvas");
        var y = new Inknote.CanvasControl(x);
    })(Main = Inknote.Main || (Inknote.Main = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    function check(text, onTrue, onFalse) {
        if (confirm(text)) {
            onTrue();
            return;
        }
        onFalse();
    }
    Inknote.check = check;
})(Inknote || (Inknote = {}));
//# sourceMappingURL=@script.js.map