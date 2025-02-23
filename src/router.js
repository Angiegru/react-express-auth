const express = require('express');
const userController = require('./controllers/user/index'); // the "/index" part of the path is technically not required here, by default, when provided with a folder, the index file will be imported

const journalEntryController = require('./controllers/journal/index');
const moodsController = require('./controllers/moods/index');
const addModelsToRequest = require('./middleware/add-models-to-request');
const checkAuthentication = require('./middleware/check-authentication');


const Router = express.Router();
Router.use(addModelsToRequest);

Router.get('/users', userController.list);
Router.post('/users', userController.create);
Router.get('/users/:id', userController.show);

Router.post('/login', userController.login);
Router.delete('/logout', userController.logout);
Router.get('/me', userController.showMe);

Router.get('/users/:id/journal_entries', journalEntryController.list);
Router.post('/users/:id/journal_entries', journalEntryController.create);
//Router.patch('/journal_entries/:id', journalEntryController.update);
Router.delete('/users/:id/journal_entries', journalEntryController.deleted);

Router.get('/users/:id/moods', moodsController.list);
Router.post('/users/:id/moods', moodsController.create);
// Router.patch('/moods/:id', moodsController.update);
Router.delete('/users/:id/moods', moodsController.deleted);

// These actions require authentication (only valid logged in users can do these things)
// The checkAuthentication middleware will only run for these specified routes.
Router.patch('/users/:id', checkAuthentication, userController.update);
Router.get('/logged-in-secret', checkAuthentication, (req, res) => {
  res.send({ msg: 'The secret is: there is no secret.' });
});

module.exports = Router;
