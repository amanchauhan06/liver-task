module.exports = async () => {
    // Global setup logic if needed
    global.beforeAll = global.beforeAll || (() => {});
    global.afterAll = global.afterAll || (() => {});
    global.describe = global.describe || (() => {});
    global.test = global.test || (() => {});
    global.expect = global.expect || (() => {});
  };