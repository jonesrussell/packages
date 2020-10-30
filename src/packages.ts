#!/usr/bin/env node

import { readFileSync } from "fs";
import program, { on } from "commander";
import { Validator } from "jsonschema";
import chalk from "chalk";
import globalModules from "global-modules";
import { Table } from "console-table-printer";

/**
 * Convert array into associative array for display in table
 * @param deps array of dependencies from package.json
 */
function forTable(
  deps: [string, string][],
  name = "Name",
  version = "Version"
) {
  return Object.entries(deps).reduce((result, [n, v]) => {
    return Object.assign(result, { name: n, version: v });
  }, {});
  // return new Map(deps.map((x) => [{ name: x[0], version: x[1] }]));
}

/*process.on("uncaughtException", (err: any) => {
  console.error("Uncaught Exception:", `${err.message}`);
  process.exit(1);
});*/

const cwd: string = process.cwd();

const schemaFilename = `${globalModules}/@jonesrussell/pkg-info/package.schema.json`;
const filename = `${cwd}/package.json`;

let fileSchema: string;
let file: string;

/**
 * Try opening package.json and schema
 */
try {
  fileSchema = readFileSync(schemaFilename, "utf-8");
} catch (err) {
  // throw console.error(err.name, "Cannot open package.schema.json");
  throw new Error("Cannot open package.schema.json");
}

try {
  file = readFileSync(filename, "utf-8");
} catch (err) {
  throw console.error(err.name, "Cannot open package.json");
}

// Convert the file contents to a JSON object
const data = JSON.parse(file);
// Convert the fileSchema contents to a JSON object
const schema = JSON.parse(fileSchema);

// Set the program version
program.version(data.version);

// Validate package.json against schema
const v = new Validator();
const validated = v.validate(data, schema);

if (!validated.valid) {
  // console.log(chalk.blue("Invalid package.json"));
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

/**
 * Show devDependencies
 */
/*const p2 = new Table({
  title: "devDependencies",
  columns: [{ name: "Name" }, { name: "Version" }],
});

const rows2 = forTable(devDeps, "Name", "Version");
p2.addRows(rows2);

p2.printTable();
*/
