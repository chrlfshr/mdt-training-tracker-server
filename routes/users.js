const express = require('express');
// const db = require('../db.js');
const db = require('knex')(require('../knexfile.js')['development']);

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
      .insert({
        username: req.body.username,
        rank: req.body.rank,
        name: req.body.name,
        crew_id: req.body.crew_id,
        is_auth: req.body.is_auth,
        is_trainer: req.body.is_trainer,
        is_approver: req.body.is_approver
      })
      .returning('*')
      .into('users')
      .then((data) => res.status(201).json(data[0]))
      .catch(err => {
        console.log(err);
        res.status(404).json({
          message:
            'Could not POST users data.'
        })
      });
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
      .where('id', '=', req.params.id)
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
      .then((data) => res.status(201).send("Successfully updated record."))
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
    })
    .post((req, res) => {
      db
      .insert(req.body)
      .returning('*')
      .into('modules_users')
      .then((data) => res.status(201).json(data))
      .catch(err =>
        res.status(404).json({
          message:
            'Could not POST user module.'
        })
      );
    })

  router.route('/:id/modules/:m_id')
    .delete((req,res) => {
      db
        .select('*')
        .from('modules_users')
        .where('user_id', '=', req.params.id)
        .andWhere('module_id', '=', req.params.m_id)
        .delete()
        .then((data) => res.status(200).send("Module unassigned from user."))
        .catch(err =>
          res.status(404).json({
            message:
              'Could not DELETE user module.'
          })
        );
    })
    .put((req,res) => {
      db
        .select('*')
        .from('modules_users')
        .where('user_id', '=', req.params.id)
        .andWhere('module_id', '=', req.params.m_id)
        .update({
          module_id: req.body.module_id,
          user_id: req.body.user_id,
          is_started: req.body.is_started ?? false,
          is_completed: req.body.is_completed ?? false,
          deadline: req.body.deadline ?? null
          })
        .returning('*')
        .then((data) => res.status(201).send("User's module assignment updated."))
        .catch(err =>
          res.status(404).json({
            message:
              'Could not PUT user module assignment.'
          })
        );
      })
    .patch((req,res) => {
      db
        .select('*')
        .from('modules_users')
        .where('user_id', '=', req.params.id)
        .andWhere('module_id', '=', req.params.m_id)
        .update(req.body)
        .returning('*')
        .then((data) => res.status(201).send("User's module assignment updated."))
        .catch(err =>
          res.status(404).json({
            message:
              'Could not PATCH user data.'
          })
        );
    })



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
      let p2 = db.select('crews.id', 'crews.name').from('crews').innerJoin('users', function() {
        this.on('users.username', '=', db.raw('?', [`${req.params.username}`])).andOn('users.crew_id', '=', 'crews.id');
      });
      let p3 = db.select(db.raw('modules_users.*, modules.name, modules.operator_level')).from('modules_users').innerJoin('users', function() {
        this.on('users.username', '=', db.raw('?', [`${req.params.username}`])).andOn('modules_users.user_id', '=', 'users.id');
      }).innerJoin('modules', function() {
        this.on('modules.id', '=', 'modules_users.module_id');
      });
      let p4 = db.select(db.raw('tasks_users.*, tasks.*')).from('tasks_users').innerJoin('users', function() {
        this.on('users.username', '=', db.raw('?', [`${req.params.username}`])).andOn('tasks_users.user_id', '=', 'users.id');
      }).innerJoin('tasks', function() {
        this.on('tasks.id', '=', 'tasks_users.task_id');
      });
      Promise.all([p1, p2, p3, p4])
      .then((dataSet) => {
        const finalData = {};
        finalData.userInfo = dataSet[0][0];
        finalData.crewInfo = dataSet[1][0];
        finalData.modules = dataSet[2];
        finalData.tasks = dataSet[3];
        res.status(200).json(finalData);
      })
      .catch(err => {
        console.log(err);
          res.status(404).json({
            message:
              'Could not GET user overview.'
          });
        }
      );
    });

module.exports = router;