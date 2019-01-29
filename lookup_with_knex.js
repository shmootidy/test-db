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
const name = process.argv.slice(2);


function birthdateConverter (givenDate) {
  const birthDate = new Date(givenDate);
  const year = birthDate.getFullYear();
  let month = birthDate.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  let date = birthDate.getDate();
  if (date < 10) {
    date = '0' + date;
  }
  return `${year}-${month}-${date}`;
}

(function findPerson (knex, name) {
  knex.select('*').from('famous_people')
    .where('first_name', 'like', 'Paul%')
    .asCallback((err, rows) => {
      if (err) return console.error(err);
      rows.forEach((person, i) => {
        const birthDate = birthdateConverter(person.birthdate);
        console.log(`- ${i+1}: ${person.first_name} ${person.last_name}, born '${birthDate}'`);
      });
      knex.destroy();
    });
})(knex);


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
