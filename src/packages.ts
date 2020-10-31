#!/usr/bin/env node

import { readFileSync } from "fs";
import program, { on } from "commander";
import { Validator } from "jsonschema";
import globalModules from "global-modules";
import { Table } from "console-table-printer";

// Set the program version
program.version("1.0.5");

const cwd: string = process.cwd();

/**
 * Open package.json in current directory
 */
const filename = `${cwd}/package.json`;
let file: string;

try {
  file = readFileSync(filename, "utf-8");
} catch (err) {
  throw console.error(err.name, "Cannot open package.json");
}

// Convert the file contents to a JSON object
const data = JSON.parse(file);

/**
 * Try opening package.json and schema
 */
let fileSchema: string;
const schemaFilename = `${globalModules}/@jonesrussell42/packages/package.schema.json`;

try {
  fileSchema = readFileSync(schemaFilename, "utf-8");
} catch (err) {
  throw console.error(`Cannot open ${schemaFilename}`);
}

// Convert the fileSchema contents to a JSON object
const schema = JSON.parse(fileSchema);

// Validate package.json against schema
const v = new Validator();
const validated = v.validate(data, schema);

if (!validated.valid) {
  throw console.error("Invalid package.json");
}

/**
 * Show deps
 */
let deps = [];
for (let [name, version] of Object.entries(data.dependencies)) {
  deps.push({ Name: name, Version: version });
}

let devDeps = [];
for (let [name, version] of Object.entries(data.devDependencies)) {
  devDeps.push({ Name: name, Version: version });
}

const p = new Table({
  title: "dependencies",
  columns: [{ name: "Name" }, { name: "Version" }],
});
p.addRows(deps);
p.printTable();

const p2 = new Table({
  title: "devDependencies",
  columns: [{ name: "Name" }, { name: "Version" }],
});
p2.addRows(devDeps);
p2.printTable();

process.exit(0);
