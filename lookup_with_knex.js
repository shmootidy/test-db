const pg = require('pg');
const settings = require('./settings'); // settings.json
const knex = require('knex')({
  client: 'pg',
  connection: {
    user      : settings.user,
    password  : settings.password,
    database  : settings.database,
    host      : settings.hostname,
    port      : settings.port,
    ssl       : settings.ssl
  }
});

// knex.from('famous_people').select('*')
//   .then((people) => {
//     console.log(people);
//   })
//   .catch((err) => {
//     console.log(err); throw err
//   })
//   .finally(() => {
//     knex.destroy();
//   });

knex.select('*').from('famous_people')
  .where('first_name', 'like', 'Paul%')
  .asCallback((err, res) => {
    if (err) return console.error(err);
    console.log(res);
    knex.destroy();
  })