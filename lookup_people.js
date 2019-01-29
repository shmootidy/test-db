const pg = require('pg');
const settings = require('./settings'); // settings.json

const name = process.argv.slice(2);

const client = new pg.Client({
  user      : settings.user,
  password  : settings.password,
  database  : settings.database,
  host      : settings.hostname,
  port      : settings.port,
  ssl       : settings.ssl
});

client.connect();

function doQuery (client, query, values, cb) {
  client.query(query, values, (err, res) => {
    if (err) {
      return console.log('Err:', err);
    }
    console.log('Searching ...');
    console.log(`Found ${res.rows.length} person(s) by the name ${name}:`);
    res.rows.forEach(cb);
    client.end();
  });
}

function birthdateConverter (givenDate) {
  const birthDate = new Date(givenDate);
  const year = birthDate.getFullYear();
  let month = if (birthDate.getMonth() + 1 < 10) {
    '0' + birthDate.getMonth() + 1;
  } else {
    birthDate.getMonth() +1;
  }
  let date = birthDate.getDate();
  if (date < 10) {
    date = '0' + date;
  }
  return `${year}-${month}-${date}`;
}

function findPerson (client, name) {
  const query = "SELECT * FROM famous_people WHERE first_name LIKE $1";
  const values = [`${name}%`];
  doQuery(client, query, values, (person, i) => {
    const birthDate = birthdateConverter(person.birthdate);
    console.log(`- ${i+1}: ${person.first_name} ${person.last_name}, born '${birthDate}'`);
  });
}

if (name) {
  findPerson(client, name);
} else {
  console.log('Enter a name...');
}