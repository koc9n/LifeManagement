/**
 * Created by konstantin.mironchik on 9/28/2017.
 */
let pino = require('pino');
let pretty = pino.pretty();
pretty.pipe(process.stdout);
let log = pino({
    name: 'app',
    safe: true
}, pretty);
module.exports = log;
