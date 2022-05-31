import auth0Client from "../features/auth/auth0";


//TODO: should this file be in src? what should be in src and outside it generally?

const BASE_URL = process.env.REACT_APP_BASE_URL

export function reshape(gcalEvent){
    const {start,end,id} = gcalEvent
    return{
        ...gcalEvent,
        start: start.dateTime,
        end: end.dateTime,
        type: 'gcalEvent',
        _id: id
    }
}


export async function fetchDays(from, to) {
    //TODO: should we be storing access token in redux store or fetching in
    // a thunk and then passing to the functions in jobs
    const auth0 = await auth0Client;
    const token = await auth0.getTokenSilently();

    return fetch(`${BASE_URL}/api/v1/gcal/events?from=${from}&to=${to}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .then((res) => res.data.map(gcalEvent=>reshape(gcalEvent)))
        // .then((data) =>
        //   data.map((job) => ({
        //     ...job,
        //     start: new Date(job.start),
        //     end: new Date(job.end), //TODO create a function that does this
        //   }))
        // )
        .catch((err) => console.error(err));
}

const exports = {
    fetchDays
};

export default exports
