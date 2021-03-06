const express = require('express');
// const db = require('../db.js');
const db = require('knex')(require('../knexfile.js')['development']);

const router = express.Router();
router.use(express.json());

router.route('/')
  .get((req,res) => {
    db
      .select('*')
      .from('requests')
      .then((data) => res.status(200).json(data))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not GET requests data.'
        })
      );
  })
  .post((req,res) => {
    db
      .insert({
        name: req.body.name,
        is_submitted: req.body.is_submitted,
        description: req.body.description,
        module_id: req.body.module_id
      })
      .returning('*')
      .into('requests')
      .then((data) => res.status(201).json(data))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not POST requests data.'
        })
      );
  })

router.route('/:id')
  .get((req,res) => {
    db
    .select('*')
    .from('requests')
    .where('id', '=', req.params.id)
    .then((data) => res.status(200).json(data[0]))
    .catch(err =>
      res.status(404).json({
        message:
          'Could not GET request data.'
      })
    );
  })
  .put((req,res) => {
    db
      .select('*')
      .from('requests')
      .where('id', '=', eq.params.id)
      .update({
        id: req.body.id,
        name: req.body.name,
        is_submitted: req.body.is_submitted ?? null,
        description: req.body.description ?? null,
        module_id: req.body.module_id ?? null
        })
      .returning('*')
      .then((data) => res.status(204).json(data[0]))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not PUT request data.'
        })
      );
    })
  .patch((req,res) => {
    db
      .select('*')
      .from('requests')
      .where('id', '=', req.params.id)
      .update(req.body)
      .returning('*')
      .then((data) => res.status(204).json(data[0]))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not PATCH request data.'
        })
      );
  })
  .delete((req,res) => {
    db
      .select('*')
      .from('requests')
      .where('id', '=', req.params.id)
      .delete()
      .then((data) => res.status(200).json(data[0]))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not DELETE request data.'
        })
      );
  })

// router.param('id', (req, res, next, id) => {

//   next();
// })

module.exports = router;