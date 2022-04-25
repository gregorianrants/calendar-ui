const axios = require("axios");
const {writeFile} = require('fs/promises')


function processUser({name,email,cell}){
    const {first,last} = name
    const mobile = cell.replace(/-/g,'')+'0'  //adding a 0 on because stupid api made wrong length of phone number
    return {
        name: first + ' ' + last,
        email,
        mobile
    }
}

async function getUsers(howMany=1000){
    const users = await axios
        .get(`https://randomuser.me/api/?nat=gb&results=${howMany}`)
        .then(res=>res.data.results)
        .then(results=>results.map(processUser))
        .then(JSON.stringify)
        .then(json=>writeFile('data.json',json))
        .catch(console.error)

    return users
}

getUsers()