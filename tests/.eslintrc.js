module.exports = {
  env : {
    embertest : true,
    mocha     : true,
  },

  rules : {
    "no-unused-expressions": "off",
  },

  globals : {
    sinon  : true,
    server : true,
  },
};
