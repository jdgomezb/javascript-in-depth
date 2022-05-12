// jest.mock('./http');

const { loadTitle } = require('./util');

test('should console log an uppercased text', () => {
  loadTitle().then(title => {
    expect(title).toBe('DELECTUS AUT AUTEM');
  });
});