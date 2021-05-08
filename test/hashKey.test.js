const util = require("../Util/Utility")
test('Generate Hashkey - It should return an object',() =>{
  const hashKeyObj = util.generateHashKey();
  expect(hashKeyObj).not.toBeNull();
})