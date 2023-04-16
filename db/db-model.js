// eslint-disable-next-line import/no-extraneous-dependencies
const { Client } = require('pg');

const connectionString = process.env.DB_URL;

module.exports.query = async (text, values, callback) => {
  const client = new Client({ connectionString });
  await client.connect();
  const result = client.query(text, values, callback);
  await client.end();
  return result;
};
