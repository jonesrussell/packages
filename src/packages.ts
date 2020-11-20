#!/usr/bin/env node

import { readFileSync } from "fs";
import program, { on } from "commander";
import { Validator } from "jsonschema";
import globalModules from "global-modules";
import { Table } from "console-table-printer";

type Dependant = {
  name: string;
  version: string;
};

// Set the program version
program.version("1.0.6");

const loadFile = (filename: string) => {
  try {
    return readFileSync(filename, "utf-8");
  } catch (err) {
    throw console.error(`Cannot open ${filename}`);
  }
};

const cwd: string = process.cwd();

/**
 * Open package.json in current directory
 */
const filename = `${cwd}/package.json`;
// Convert the file contents to a JSON object
const data = JSON.parse(loadFile(filename));

const schemaFilename = `${globalModules}/@jonesrussell42/packages/package.schema.json`;
console.log(schemaFilename);
const fileSchema = loadFile(schemaFilename);

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

function depsTable(deps: any) {
  const p = new Table({
    title: "dependencies",
    columns: [{ name: "Name" }, { name: "Version" }],
  });
  p.addRows(deps);

  return p.render();
}

console.log(`${depsTable(deps)}`);
console.log(`${depsTable(devDeps)}`);

process.exit(0);
