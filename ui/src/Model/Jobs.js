import auth0Client from "../features/auth/auth0";

//TODO: should this file be in src? what should be in src and outside it generally?

export async function fetchDays(from, to) {
  //TODO: should we be storing access token in redux store or fetching in
  // a thunk and then passing to the functions in jobs
  const auth0 = await auth0Client;
  const token = await auth0.getTokenSilently();

  return fetch(`http://localhost:8000/api/v1/jobs?from=${from}&to=${to}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => res.data)
    // .then((data) =>
    //   data.map((job) => ({
    //     ...job,
    //     start: new Date(job.start),
    //     end: new Date(job.end), //TODO create a function that does this
    //   }))
    // )
    .catch((err) => console.error(err));
}

export async function createJob(job) {
  const auth0 = await auth0Client;
  const token = await auth0.getTokenSilently();

  console.log(token);

  return fetch(`http://localhost:8000/api/v1/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(job),
  })
    .then((res) => res.json())
    // .then((res) => processResponse(res))
    .catch((err) => console.error(err));
}





export function editJob({ _id, data }) {
  return fetch(`http://localhost:8000/api/v1/jobs/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    // .then((res) => processResponse(res))
    .catch((err) => console.error(err));
}

const exports =  {
  editJob,
  fetchDays,
  createJob,
};

export default exports