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

const input = [firstName, lastName, birthDate] = process.argv.slice(2);

// const firstName = 'Keanu';
// const lastName = 'Reeves';
// const birthDate = new Date(1964, 9, 2);

function addPerson (knex, input) {
  const newPerson = [{ first_name: firstName, last_name: lastName, birthdate: new Date(birthDate) }];
  knex('famous_people').insert(newPerson).asCallback((err, res) => {
    console.log(res);
    knex.destroy();
  });
}

if (input) {
  addPerson(knex, input);
} else {
  console.log("Nope!");
}
