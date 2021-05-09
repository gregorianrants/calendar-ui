const port = 3000

export default async function fetchWeekContaining({from,to}){
    return fetch(`http://localhost:8000/api/v1/jobs?from=${from}&to=${to}`)
        .then(res=>res.json())
        .then(res=>res.data)
        .then(data=>data.map(job=>(
            {...job,
                start: new Date(job.start),
                end: new Date(job.end),//TODO create a function that does this
            }
        )))
        .catch(err=>console.error(err))
}
