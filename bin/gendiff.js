#!/usr/bin/env node
import { program, Option } from 'commander';
import genDiff from '../src/index.js';

program // выводим справочную информацию по утилите используя библиотеку commander
  .description('Compares two configuration files and shows a difference.')
  // 'сравинивает 2 файла и выводит разницу'

  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .addOption(new Option('-f, --format [type]', 'output format').choices(['stylish', 'plain', 'json']).default('stylish'))
  .action((filepath1, filepath2, options) => {
    console.log(genDiff(filepath1, filepath2, options.format));
  });

program.parse();
