const {last} = require("../../utils/utils");

test('adds 1 + 2 to equal 3', () => {
	expect(last([1, 2])).toBe(2);
});
