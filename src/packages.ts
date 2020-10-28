#!/usr/bin/env node

import { readFileSync } from "fs";
import program from "commander";
import { Validator } from "jsonschema";
import chalk from "chalk";

const cwd: string = process.cwd();
const schemaFilename = `${cwd}/package.schema.json`;
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

const v = new Validator();
const validated = v.validate(data, schema);

if (!validated.valid) {
  // console.log(chalk.blue("Invalid package.json"));
  throw new Error("Invalid package.json");
}

/**
 * Show deps
 */
const table = console.table;

console.group(chalk.blue("Dependencies"));
table(data.dependencies);
console.groupEnd();

console.group(chalk.blue("Dev Dependencies"));
table(data.devDependencies);
console.groupEnd();
