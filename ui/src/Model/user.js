import auth0Client from "../features/auth/auth0";

export async function getUser(){
    const auth0 = await auth0Client;
    const token = await auth0.getTokenSilently();

    return fetch(`http://localhost:8000/api/v1/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => {
            console.log('12', res)
            return res
        })
        .catch((err) => console.error(err));
}

export async function createUser(){
    const auth0 = await auth0Client;
    const token = await auth0.getTokenSilently();

    return fetch(`http://localhost:8000/api/v1/users`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
    })
        .then((res) => {
            console.log('28', res)
            console.log('38',res.json())
            return res
        })
        .catch((err) => console.error(err));
}

export async function getOrCreateUser(){
    try{
        const previouslyCreatedUser = await getUser()
        if (previouslyCreatedUser.status ===200) return await previouslyCreatedUser.json()

        const newUser = await createUser()
        if(newUser.status===200) return await newUser.json()

        throw new Error('these are not the status codes you are looking for')
    }
    catch (err){
        console.error(err)
    }
}

