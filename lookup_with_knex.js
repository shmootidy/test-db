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

knex.from('famous_people').select('*')
  .then((people) => {
    console.log(people);
  })
  .catch((err) => {
    console.log(err); throw err
  })
  .finally(() => {
    knex.destroy();
  });