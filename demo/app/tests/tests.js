var Startapp = require("nativescript-startapp").Startapp;
var startapp = new Startapp();

describe("greet function", function() {
    it("exists", function() {
        expect(startapp.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(startapp.greet()).toEqual("Hello, NS");
    });
});