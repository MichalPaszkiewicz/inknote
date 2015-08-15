/// <reference path="../../../inknote 2/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />

//declare var require;

//var fs = require('fs')
//var myCode = fs.readFileSync('../Inknote 2/@script.js', 'utf-8') // depends on the file encoding
//eval(myCode);
 
module Inknote.Tests {  
          
    describe("A new project", function () {
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

}