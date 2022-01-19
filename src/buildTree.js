import _ from 'lodash';

const compareObjects = (object1, object2) => { // сравнение объектов
  const keys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));
  // собираем массив уникальных ключей
  // методом map cоздается новый массив через обход массива keys
  return keys.map((key) => {
    if (!_.has(object2, key)) { return { type: 'deleted', key, val: object1[key] }; } // ключ есть только в первом файле
    if (!_.has(object1, key)) { return { type: 'added', key, val: object2[key] }; } // ключ есть только во втором файле

    const val1 = object1[key]; // коллекция ключей 1 и 2
    const val2 = object2[key];

    if (_.isPlainObject(val1) && _.isPlainObject(val2)) { return { type: 'nested', key, children: compareObjects(val1, val2) }; }
    // являются ли они объектами

    if (!_.isEqual(val1, val2)) {
      return {
        type: 'different', key, val1, val2, // если одинаковые значения
      };
    }
    return { type: 'same', key, val: val1 };
  });
};

const buildTree = (object1, object2) => ({ type: 'root', children: compareObjects(object1, object2) });

export default buildTree;
