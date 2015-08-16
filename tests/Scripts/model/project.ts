/// <reference path="../../../inknote 2/_references.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />

module Inknote.Tests {  
          
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
            var namedProject = new Project("Test project");

            expect(namedProject.name).toBe("Test project");
        });

        it("to have 'Untitled' as title if specified name empty", function () {
            var namedProject = new Project("");

            expect(namedProject.name).toBe("Untitled");
        });
    }); 
}