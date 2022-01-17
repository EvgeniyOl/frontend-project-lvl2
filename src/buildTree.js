import _ from 'lodash';

const compareObjects = (object1, object2) => { // сравнение объектов
  const keys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));
  // собираем массив уникальных ключей
  // методом map cоздается новый массив через обход массива keys
  return keys.map((key) => {
    if (!_.has(object2, key)) { return { type: 'deleted', key, val: object1[key] }; } // ключ есть только в первом файле
    if (!_.has(object1, key)) { return { type: 'added', key, val: object2[key] }; } // ключ есть только во втором файле

    const collection1 = object1[key]; // коллекция ключей 1 и 2
    const collection2 = object2[key];

    if (_.isPlainObject(collection1) && _.isPlainObject(collection2)) { return { type: 'nested', key, children: compareObjects(collection1, collection2) }; }
    // являются ли они объектами

    if (!_.isEqual(collection1, collection2)) {
      return {
        type: 'different', key, collection1, collection2, // если одинаковые значения
      };
    }
    return { type: 'same', key, val: collection1 };
  });
};

const buildTree = (object1, object2) => ({ type: 'root', children: compareObjects(object1, object2) });

export default buildTree;
