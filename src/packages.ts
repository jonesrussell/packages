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
function forTable(deps: [string, string][], ...labels: string[]) {
  return Object.assign(
    [],
    deps.map((item) => {
      labels[0]: item[0],
      labels[1]: item[1],
    })
  );
}

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", `${err.message}`);
  process.exit(1);
});

const cwd: string = process.cwd();

const schemaFilename = `${globalModules}/@jonesrussell/pkg-info/package.schema.json`;
const filename = `${cwd}/package.json`;

let fileSchema: string;
let file: string;

/**
 * Try opening package.json and schema
 */
try {
  file = readFileSync(filename, "utf-8");
} catch (err) {
  throw new Error(err);
}

try {
  fileSchema = readFileSync(schemaFilename, "utf-8");
} catch (err) {
  throw new Error(err);
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
  throw new Error("Invalid package.json");
}

/**
 * Show deps
 */
const deps: [string, string][] = Object.entries(data.dependencies);
const devDeps: [string, string][] = Object.entries(data.devDependencies);

const p = new Table({
  title: "dependencies",
  columns: [{ name: "Name" }, { name: "Version" }],
});

const rows = forTable(deps, "Name", "Version");
p.addRows(rows);

p.printTable();

/**
 * Show devDependencies
 */
const p2 = new Table({
  title: "devDependencies",
  columns: [{ name: "Name" }, { name: "Version" }],
});

const rows2 = forTable(devDeps, "Name", "Version");
p2.addRows(rows2);

p2.printTable();
