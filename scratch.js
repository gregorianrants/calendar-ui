var add = require('date-fns/add')
var formatISO = require('date-fns/formatISO')

const from = add(new Date(),{days: -7})
console.log(from)
console.log(formatISO(from))

const to = add(new Date(),{days: 7})
console.log(to)
console.log(formatISO(to))