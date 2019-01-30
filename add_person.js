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

const firstName = 'Keanu';
const lastName = 'Reeves';
const birthDate = new Date(1964, 9, 2);
const newPerson = [
  { first_name: firstName, last_name: lastName, birthdate: birthDate },
]

knex('famous_people').insert(newPerson).asCallback((err, res) => {
  console.log(res);
  knex.destroy();
})
