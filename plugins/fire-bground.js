/// <reference path="defs.ts" />
var Inknote;
(function (Inknote) {
    var Plugins;
    (function (Plugins) {
        var fireBackground = new Plugins.InknotePlugin("fire background");
        var Flame = (function () {
            function Flame(x, y) {
                this.startPos = { x: null, y: null };
                this.position = { x: null, y: null };
                this.velocity = { x: null, y: null };
                this.k = 0.01;
                this.life = 200 + Math.random() * 500 | 0;
                this._colour = { r: null, g: null, b: null, a: null };
                this.startPos.x = x;
                this.startPos.y = y;
                this.position.x = x;
                this.position.y = y + 20;
                this.radius = 10 + Math.random() * 20;
                var red = 100 + Math.random() * 155 | 0;
                var green = Math.random() * (red - 60) | 0;
                this.setColour(red, green, Math.random() * 25 | 0, 0.7);
                this.velocity = { x: Math.random() * 2 - 1, y: 1 + Math.random() * 2 };
            }
            Flame.prototype.acceleration = function () {
                var k = this.k;
                var x = -k * (this.position.x - this.startPos.x);
                var y = 0;
                return { x: x, y: y };
            };
            ;
            Flame.prototype.setColour = function (r, g, b, a) {
                this._colour.r = r;
                this._colour.g = g;
                this._colour.b = b;
                this._colour.a = a;
            };
            Flame.prototype.getColour = function () {
                return "rgba(" + this._colour.r + "," + this._colour.g + "," + this._colour.b + "," + this._colour.a + ")";
            };
            Flame.prototype.update = function () {
                this.radius = this.life > 300 ? this.radius * 0.995 : this.radius * (95 / 100);
                this._colour.a = Math.max(0.1, this._colour.a * 99 / 100);
                this._colour.r = Math.min(255, this._colour.r + 1);
                this._colour.g = Math.max(0, this._colour.g - (Math.random() | 0));
                this._colour.b = Math.max(0, this._colour.b - 1);
                if (this.radius < 3) {
                    this._colour.r = 255;
                    this._colour.g = 255;
                    this._colour.b = 0;
                    this._colour.a = 0.8;
                }
                if (Math.random() > 0.5) {
                    this.k = this.k * 99 / 100;
                }
                if (this.position.y > this.startPos.y - 50) {
                    this.position.y -= Math.random() * 2;
                }
                this.startPos.x += Math.random() * 3 - 1;
                this.position.x += this.velocity.x;
                this.position.y -= this.velocity.y;
                this.velocity.x += this.acceleration().x;
                this.velocity.y -= this.acceleration().y;
                this.life--;
            };
            Flame.prototype.draw = function (ctx, canvas) {
                ctx.beginPath();
                ctx.fillStyle = this.getColour();
                ctx.strokeStyle = this.getColour();
                ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            };
            return Flame;
        })();
        var Fire = (function () {
            function Fire(minX, minY, maxX, maxY) {
                this.flames = [];
                var flamesToAdd = 10;
                if (maxX - minX > 800) {
                    flamesToAdd = 20;
                }
                this.addXFlames(flamesToAdd, minX, minY, maxX, maxY);
            }
            Fire.Instance = function (minX, minY, maxX, maxY) {
                if (!Fire._instance) {
                    Fire._instance = new Fire(minX, minY, maxX, maxY);
                }
                return Fire._instance;
            };
            Fire.prototype.addXFlames = function (x, minX, minY, maxX, maxY) {
                for (var i = 0; i < x; i++) {
                    var rangeX = maxX - minX;
                    var rangeY = maxY - minY;
                    var posX = Math.random() * rangeX + minX;
                    var posY = Math.random() * rangeY + minY;
                    var newFlame = new Flame(posX, posY);
                    this.flames.push(newFlame);
                }
            };
            Fire.prototype.draw = function (ctx, canvas) {
                this.flames.forEach(function (flame) {
                    flame.draw(ctx, canvas);
                });
                this.addXFlames(2, 0, canvas.height - 20, canvas.width / 5, canvas.height);
                this.addXFlames(1, canvas.width * 1 / 15, canvas.height - 20, canvas.width * 2 / 15, canvas.height);
                this.flames = this.flames.filter(function (flame, index) {
                    return flame.position.x > 0 && flame.radius > 1.5 && flame.life > 0;
                });
            };
            Fire.prototype.update = function () {
                this.flames.forEach(function (flame) {
                    flame.update();
                });
            };
            return Fire;
        })();
        fireBackground.beforeDraw = function (ctx, canvas) {
            var fireInstance = Fire.Instance(0, 0, canvas.width, canvas.height);
            fireInstance.draw(ctx, canvas);
            fireInstance.update();
        };
        Inknote.Managers.PluginManager.Instance.addPlugin(fireBackground);
    })(Plugins = Inknote.Plugins || (Inknote.Plugins = {}));
})(Inknote || (Inknote = {}));
