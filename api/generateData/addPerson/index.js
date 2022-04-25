const axios = require('axios')
const data = require('./data.json')

function processUser({name,email,cell}){
    const {first,last} = name
    const mobile = cell.replace(/-/g,'')
    return {
        name: first + ' ' + last,
        email,
        mobile
    }
}

// async function getUsers(howMany=1){
//     const users = await axios
//         .get(`https://randomuser.me/api/?nat=gb&results=${howMany}`)
//         .then(res=>res.data.results)
//         .then(results=>results.map(processUser))
//         .catch(console.error)
//
//     return users
// }

function getUsers(howMany=1){
    return data.slice(0,howMany)
}


function addPersons(jobs){
    const users = getUsers(jobs.length)
    return jobs.map(
        (job,i)=> ({
            ...job,
        customer: users[i]
    })
    )
}

module.exports = addPersons

console.log(getUsers(3))


//addPersons([{},{}]).then(console.log).catch(console.error)
