const express = require('express');
// const db = require('../db.js');
const db = require('knex')(require('../knexfile.js')['development']);

const router = express.Router();
router.use(express.json());

router.route('/')
  .get((req,res) => {
    db
      .select('*')
      .from('modules')
      .then((data) => res.status(200).json(data))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not GET modules data.'
        })
      );
  })
  .post((req,res) => {
    db
      .insert({
        name: req.body.name,
        operator_level: req.body.operator_level,
        is_approved: req.body.is_approved
      })
      .returning('*')
      .into('modules')
      .then((data) => res.status(201).json(data))
      .catch(err => {
        console.log(err);
        res.status(404).json({
          message:
            'Could not POST modules data.'
        })
      });
  })

router.route('/:id')
  .get((req,res) => {
    db
    .select('*')
    .from('modules')
    .where('id', '=', req.params.id)
    .then((data) => res.status(200).json(data[0]))
    .catch(err =>
      res.status(404).json({
        message:
          'Could not GET module data.'
      })
    );
  })
  .put((req,res) => {
    db
      .select('*')
      .from('modules')
      .where('id', '=', eq.params.id)
      .update({
        id: req.body.id,
        name: req.body.name,
        operator_level: req.body.operator_level ?? null,
        is_approved: req.body.is_approved ?? null
        })
      .returning('*')
      .then((data) => res.status(204).json(data[0]))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not PUT module data.'
        })
      );
    })
  .patch((req,res) => {
    db
      .select('*')
      .from('modules')
      .where('id', '=', req.params.id)
      .update(req.body)
      .returning('*')
      .then((data) => res.status(204).json(data[0]))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not PATCH module data.'
        })
      );
  })
  .delete((req,res) => {
    db
      .select('*')
      .from('modules')
      .where('id', '=', req.params.id)
      .delete()
      .then((data) => res.status(200).json(data[0]))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not DELETE module data.'
        })
      );
  })

// router.param('id', (req, res, next, id) => {

//   next();
// })

module.exports = router;