#! /usr/bin/env node

const Benchmark = require("benchmark");

const suite = new Benchmark.Suite;
const opossum = require(".");

let instance;

// add tests
suite
    .add("constructor", function() {
        let instance = new opossum(async () => { return 3; }, {});
    })
    .add("fire()", async function(foo) {
        await instance.fire(6);
    },{
        onStart: () => {
            instance = new opossum(async (val) => { return val; }, {});
        }
    })
    .add("fire() error", async function(foo) {
        try {
            await instance.fire(6);
        } catch (err) {}
    },{
        onStart: () => {
            instance = new opossum(async (val) => { throw new Error(); }, {});
        }
    })
    .on('cycle', function(event) {
        console.log(String(event.target))
    })
    .run({ "async": true });
