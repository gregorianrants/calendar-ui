import auth0Client from "../auth/auth0";


export async function authorize(code){
    const auth0 = await auth0Client;
    const token = await auth0.getTokenSilently();

    return await fetch(`http://localhost:8000/api/v1/gcal/authourize?code=${code}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
}