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

client.query("SELECT * FROM famous_people WHERE first_name LIKE $1", [`${name}%`], (err, res) => {
  if (err) {
    return console.log('Err:', err);
  }
  console.log('Searching ...');
  console.log(`Found ${res.rows.length} person(s) by the name '${name}'`);
  res.rows.forEach((person, i) => {
    // console.log(res.rows[i].birthdate);
    const birthDate = new Date(res.rows[i].birthdate);
    const year = birthDate.getFullYear();
    let month = birthDate.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let date = birthDate.getDate();
    if (date < 10) {
      date = '0' + date;
    }
    console.log(`- ${i+1}: ${res.rows[i].first_name} ${res.rows[i].last_name}, born '${year}-${month}-${date}'`);
  })
  client.end();
});

// client.query("SELECT * FROM famous_people", (err, res) => {
//   if (err) return false;
//   console.log(res);
//   client.end();
// });
