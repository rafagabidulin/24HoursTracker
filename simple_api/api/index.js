const router = require('express').Router();
const { todos } = require('./mock');
const { reply } = require('./utils');

router.get('/todos', (req, res, next) => {
  reply(res, todos);
});

module.exports = router;
