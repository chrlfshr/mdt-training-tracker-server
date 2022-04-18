const express = require('express');
// const db = require('../db.js');
const db = require('knex')(require('../knexfile.js')[process.env.NODE_ENV||'development']);

const router = express.Router();
router.use(express.json());

router.route('/')
  .get((req,res) => {
    db
      .select('*')
      .from('crews')
      .then((data) => res.status(200).json(data))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not GET crews data.'
        })
      );
  })
  .post((req,res) => {
    db
      .insert(req.body)
      .returning('*')
      .into('crews')
      .then((data) => res.status(201).json(data))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not POST crews data.'
        })
      );
  })

router.route('/:id')
  .get((req,res) => {
    db
    .select('*')
    .from('crews')
    .where('id', '=', req.params.id)
    .then((data) => res.status(200).json(data[0]))
    .catch(err =>
      res.status(404).json({
        message:
          'Could not GET crew data.'
      })
    );
  })
  .put((req,res) => {
    db
      .select('*')
      .from('crews')
      .where('id', '=', eq.params.id)
      .update({
        id: req.body.id,
        name: req.body.name,
        })
      .returning('*')
      .then((data) => res.status(204).json(data[0]))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not PUT crew data.'
        })
      );
    })
  .patch((req,res) => {
    db
      .select('*')
      .from('crews')
      .where('id', '=', req.params.id)
      .update(req.body)
      .returning('*')
      .then((data) => res.status(204).json(data[0]))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not PATCH crew data.'
        })
      );
  })
  .delete((req,res) => {
    db
      .select('*')
      .from('crews')
      .where('id', '=', req.params.id)
      .delete()
      .then((data) => res.status(200).json(data[0]))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not DELETE crew data.'
        })
      );
  })

// router.param('id', (req, res, next, id) => {
  
//   next();
// })

module.exports = router;