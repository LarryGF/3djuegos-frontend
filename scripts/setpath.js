/*jshint esversion: 6 */
/* jshint node: true */
/* jshint -W097 */

const fs = require('fs');
let data = `
export const dbPath = '/db/db.json';
export const filterPath = '/db/filters.json';
`;
if (process.env.NODE_ENV === 'DEPLOY') {
  data = `
export const dbPath = '/animes/db/db.json';
export const filterPath = '/animes/db/filters.json';
`;
}
fs.writeFileSync('./store/path.js', data);
