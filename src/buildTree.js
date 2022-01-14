import _ from 'lodash';

const compareObjects = (object1, object2) => { // сравнение объектов
  const keys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));
  // выбираем уникальные ключи объектов и сортируем, получаем отсорт массив
  // методом map cоздается новый массив через обход массива keys
  return keys.map((key) => {
    if (!_.has(object2, key)) { return { type: '-', key, val: object1[key] }; }
    if (!_.has(object1, key)) { return { type: '+', key, val: object2[key] }; }
    const val1 = object1[key];
    const val2 = object2[key];
    if (_.isPlainObject(val1) && _.isPlainObject(val2)) { return { type: 'nested', key, children: compareObjects(val1, val2) }; }
    if (!_.isEqual(val1, val2)) {
      return {
        type: '- +', key, val1, val2,
      };
    }
    return { type: ' ', key, val: val1 };
  });
};

const buildTree = (object1, object2) => (compareObjects(object1, object2));

export default buildTree;
