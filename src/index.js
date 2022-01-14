import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import buildTree from './buildTree.js';
import parsers from './parsers.js';

const loadData = (filePath) => { // загрузка данных
  const fileExtension = _.last(filePath.split('.')); // извлекаем из данных последнее значение отделенное точкой - получаем расширение файла
  const fileData = fs.readFileSync(path.resolve(filePath), 'utf8'); // преобразует строку пути fitePath по стандарту кодирования utf8 и возвращает содержимое
  return parsers[fileExtension](fileData);
  // из файла parsers извлекаем значение по ключу(расширение файла)
};

const genDiff = (path1, path2) => {
  const tree = buildTree(loadData(path1), loadData(path2));
  return tree;
};

export default genDiff;
