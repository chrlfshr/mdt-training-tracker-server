const express = require('express');
// const db = require('../db.js');
const db = require('knex')(require('../knexfile.js')['development']);


const router = express.Router();
router.use(express.json());

router.route('/')
  .get((req,res) => {
    db
      .select('*')
      .from('crews')
      .then((data) => res.status(200).json(data))
      .catch(err => {
        console.log(err);
        res.status(404).json({
          message:
            'Could not GET crews data.'
        })
      }
      );
  })
  .post((req,res) => {
    db
      .insert({
        name: req.body.name
      })
      .returning('*')
      .into('crews')
      .then((data) => res.status(201).json(data))
      .catch(err => {
        console.log(err);
        res.status(404).json({
          message:
            'Could not POST crews data.'
        })
      });
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

  router.route('/:id/members')
  .get((req,res) => {
    db
    .select(db.raw('users.*')).from('users').innerJoin('crews', function() {
      this.on('crews.id', '=', db.raw('?', [`${req.params.id}`])).andOn('users.crew_id', '=', 'crews.id');
    })
    .then((data) => res.status(200).json(data))
    .catch(err => {
      console.log(err);
      res.status(404).json({
        message:
          'Could not GET crew data.'
      })
    });
  })

// router.param('id', (req, res, next, id) => {

//   next();
// })

module.exports = router;