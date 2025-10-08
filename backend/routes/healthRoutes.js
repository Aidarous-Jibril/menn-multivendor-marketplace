const router = require('express').Router();

router.get('/', (_req, res) => {
  res.status(200).json({ ok: true });
});

module.exports = router;
