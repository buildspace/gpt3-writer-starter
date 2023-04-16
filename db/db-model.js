// eslint-disable-next-line import/no-extraneous-dependencies
const { Client } = require('pg');

const connectionString = process.env.DB_URL;

/**
 * DATABASE SCHEMA:
 *   id serial primary key,
 *   full_prompt_text varchar not null,
 *   highlighted_prompt_text varchar not null,
 *   highlight_flag varchar not null,
 *   reason_for_highlight varchar not null,
 */

module.exports.query = async (text, values, callback) => {
  try {
    const client = new Client({ connectionString });
    await client.connect();
    const result = await client.query(text, values, callback);
    await client.end();
    return result;
  } catch (e) {
    console.log(e);
    return new Error('ERROR while querying database: ', e);
  }
};
