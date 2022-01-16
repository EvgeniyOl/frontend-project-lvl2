import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const fileName = fileURLToPath(import.meta.url);
// обеспечивает правильное декодирование символов
// __filename содержит абсолютный путь к файлу, в котором она используется
const dirName = dirname(fileName);
// __dirname содержит путь к каталогу

const getFixturePath = (filename) => path.join(dirName, '..', '__fixtures__', filename);

const expected = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');
const result = genDiff('file1.json', 'file2.json');

test('check for correct diff', () => {
  expect(result).toEqual(expected('expected_file.txt'));
});
