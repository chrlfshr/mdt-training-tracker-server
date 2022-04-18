const express = require('express');
// const db = require('../db.js');
const db = require('knex')(require('../knexfile.js')[process.env.NODE_ENV||'development']);

const router = express.Router();
router.use(express.json());

router.route('/')
  .get((req,res) => {
    db
      .select('*')
      .from('users')
      .then((data) => res.status(200).json(data))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not GET users data.'
        })
      );
  })
  .post((req,res) => {
    db
      .insert(req.body)
      .returning('*')
      .into('users')
      .then((data) => res.status(201).json(data))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not POST users data.'
        })
      );
  })

router.route('/:id')
  .get((req,res) => {
    db
    .select('*')
    .from('users')
    .where('id', '=', req.params.id)
    .then((data) => res.status(200).json(data[0]))
    .catch(err =>
      res.status(404).json({
        message:
          'Could not GET user data.'
      })
    );
  })
  .put((req,res) => {
    db
      .select('*')
      .from('users')
      .where('id', '=', eq.params.id)
      .update({
        id: req.body.id,
        username: req.body.username,
        rank: req.body.rank ?? null,
        name: req.body.name ?? null,
        crew_id: req.body.crew_id ?? null,
        is_auth: req.body.is_auth ?? null,
        is_trainer: req.body.is_trainer ?? null,
        is_approver: req.body.is_approver ?? null
        })
      .returning('*')
      .then((data) => res.status(204).json(data[0]))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not PUT user data.'
        })
      );
    })
  .patch((req,res) => {
    db
      .select('*')
      .from('users')
      .where('id', '=', req.params.id)
      .update(req.body)
      .returning('*')
      .then((data) => res.status(204).json(data[0]))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not PATCH user data.'
        })
      );
  })
  .delete((req,res) => {
    db
      .select('*')
      .from('users')
      .where('id', '=', req.params.id)
      .delete()
      .then((data) => res.status(200).json(data[0]))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not DELETE user data.'
        })
      );
  })

  router.route('/:id/modules')
    .get((req, res) => {
      db.select('*').from('modules_users').where('user_id', '=', req.params.id)
        .then((data) => res.status(200).json(data))
        .catch(err => res.status(404).json({message: 'Could not GET user modules.'}));
    });

  router.route('/account/:username')
  .get((req,res) => {
    db
    .select('*')
    .from('users')
    .where('username', '=', req.params.username)
    .then((data) => res.status(200).json(data[0]))
    .catch(err =>
      res.status(404).json({
        message:
          'Could not GET user data.'
      })
    );
  })

  router.route('/account/:username/modules')
    .get((req,res) => {
      db
      .select('*')
      .from('users')
      .where('username', '=', req.params.username)
      .then((data) => {
        db.select('*').from('modules_users').where('user_id', '=', data[0].id)
          .then(result => res.status(200).json(result));
      })
      .catch(err =>
        res.status(404).json({
          message:
            'Could not GET user data.'
        })
      );
    })

  router.route('/account/:username/overview')
    .get((req, res) => {
      let p1 = db.select('*').from('users').where('username', '=', `${req.params.username}`);
      let p2 = db.select('*').from('crews').innerJoin('users', function() {
        this.on('users.username', '=', db.raw('?', [`${req.params.username}`])).andOn('users.crew_id', '=', 'crews.id');
      });
      let p3 = db.select('*').from('modules_users').innerJoin('users', function() {
        this.on('users.username', '=', db.raw('?', [`${req.params.username}`])).andOn('modules_users.user_id', '=', 'users.id');
      });
      Promise.all([p1, p2, p3])
      .then((data) => res.status(200).json(data))
      .catch(err => {
        console.log(err);
          res.status(404).json({
            message:
              'Could not GET user data.'
          });
        }
      );
    })

module.exports = router;