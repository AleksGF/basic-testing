import { generateLinkedList } from './index';

const values = new Array<number>(100).fill(0).map((_, ind) => ind);
const expectedResult = JSON.parse(
  '{"value":0,"next":{"value":1,"next":{"value":2,"next":{"value":3,"next":{"value":4,"next":{"value":5,"next":{"value":6,"next":{"value":7,"next":{"value":8,"next":{"value":9,"next":{"value":10,"next":{"value":11,"next":{"value":12,"next":{"value":13,"next":{"value":14,"next":{"value":15,"next":{"value":16,"next":{"value":17,"next":{"value":18,"next":{"value":19,"next":{"value":20,"next":{"value":21,"next":{"value":22,"next":{"value":23,"next":{"value":24,"next":{"value":25,"next":{"value":26,"next":{"value":27,"next":{"value":28,"next":{"value":29,"next":{"value":30,"next":{"value":31,"next":{"value":32,"next":{"value":33,"next":{"value":34,"next":{"value":35,"next":{"value":36,"next":{"value":37,"next":{"value":38,"next":{"value":39,"next":{"value":40,"next":{"value":41,"next":{"value":42,"next":{"value":43,"next":{"value":44,"next":{"value":45,"next":{"value":46,"next":{"value":47,"next":{"value":48,"next":{"value":49,"next":{"value":50,"next":{"value":51,"next":{"value":52,"next":{"value":53,"next":{"value":54,"next":{"value":55,"next":{"value":56,"next":{"value":57,"next":{"value":58,"next":{"value":59,"next":{"value":60,"next":{"value":61,"next":{"value":62,"next":{"value":63,"next":{"value":64,"next":{"value":65,"next":{"value":66,"next":{"value":67,"next":{"value":68,"next":{"value":69,"next":{"value":70,"next":{"value":71,"next":{"value":72,"next":{"value":73,"next":{"value":74,"next":{"value":75,"next":{"value":76,"next":{"value":77,"next":{"value":78,"next":{"value":79,"next":{"value":80,"next":{"value":81,"next":{"value":82,"next":{"value":83,"next":{"value":84,"next":{"value":85,"next":{"value":86,"next":{"value":87,"next":{"value":88,"next":{"value":89,"next":{"value":90,"next":{"value":91,"next":{"value":92,"next":{"value":93,"next":{"value":94,"next":{"value":95,"next":{"value":96,"next":{"value":97,"next":{"value":98,"next":{"value":99,"next":{"value":null,"next":null}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}',
);

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(values)).toStrictEqual(expectedResult);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList(values);

    expect(linkedList).toMatchSnapshot();
  });
});
