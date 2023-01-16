import fs from 'fs';
import path from 'path';

const url = process.cwd();

const goal = `${url}\\DY_frontend\\package.json`;
const data = fs.readFileSync(goal, { encoding: 'utf-8' });
//console.log(data);
const json = JSON.parse(data);

const subs = [];

Object.entries(json.dependencies).map(([key, value]) => {
  if (value.match('file:')) {
    subs.push(key);
    delete json.dependencies[key];
  }
});
// console.log(json, subs);
subs.map((sub) => {
  const data = fs.readFileSync(`${url}\\${sub}\\package.json`, { encoding: 'utf-8' });
  const subJson = JSON.parse(data);
  //   console.log(subJson, json);
  Object.assign(json.dependencies, subJson.dependencies || {});
});
//console.log(json);
fs.writeFileSync(goal, JSON.stringify(json));
console.log('make package json');
