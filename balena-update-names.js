#!/usr/bin/env node

const [node, command, ...args] = process.argv;
const path = require('path');
const sdk = require('./index');

if(args.length < 1) {

  const simplecommand = command.split('/').slice(-1)[0];
  console.log(`USAGE: node ${simplecommand} hostnames.json`);

} else {

  // load json
  const filename = path.resolve(args[0]);
  const hostnames = require(filename);

  // update names using balenas supervisor API
  sdk.names.update( hostnames );

}
