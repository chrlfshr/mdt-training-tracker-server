const express = require('express');
// const db = require('../db.js');
const db = require('knex')(require('../knexfile.js')[process.env.NODE_ENV||'development']);

const router = express.Router();
router.use(express.json());

router.route('/')
  .get((req,res) => {
    db
      .select('*')
      .from('tasks')
      .then((data) => res.status(200).json(data))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not GET tasks data.'
        })
      );
  })
  .post((req,res) => {
    db
      .insert(req.body)
      .returning('*')
      .into('tasks')
      .then((data) => res.status(201).json(data))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not POST tasks data.'
        })
      );
  })

router.route('/:id')
  .get((req,res) => {
    db
    .select('*')
    .from('tasks')
    .where('id', '=', req.params.id)
    .then((data) => res.status(200).json(data[0]))
    .catch(err =>
      res.status(404).json({
        message:
          'Could not GET task data.'
      })
    );
  })
  .put((req,res) => {
    db
      .select('*')
      .from('tasks')
      .where('id', '=', eq.params.id)
      .update({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description ?? null,
        link: req.body.link ?? null,
        special_instructions: req.body.link ?? null,
        module_id: req.body.module_id ?? null
        })
      .returning('*')
      .then((data) => res.status(204).json(data[0]))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not PUT task data.'
        })
      );
    })
  .patch((req,res) => {
    db
      .select('*')
      .from('tasks')
      .where('id', '=', req.params.id)
      .update(req.body)
      .returning('*')
      .then((data) => res.status(204).json(data[0]))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not PATCH task data.'
        })
      );
  })
  .delete((req,res) => {
    db
      .select('*')
      .from('tasks')
      .where('id', '=', req.params.id)
      .delete()
      .then((data) => res.status(200).json(data[0]))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not DELETE task data.'
        })
      );
  })

// router.param('id', (req, res, next, id) => {
  
//   next();
// })

module.exports = router;