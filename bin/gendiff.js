#!/usr/bin/env node
import program from 'commander';
import genDiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2));
  })
  .parse();
