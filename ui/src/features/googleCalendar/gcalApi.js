import auth0Client from "../auth/auth0";

const BASE_URL = process.env.REACT_APP_BASE_URL

export async function authorize(code){
    const auth0 = await auth0Client;
    const token = await auth0.getTokenSilently();

    return await fetch(`${BASE_URL}/api/v1/gcal/authourize?code=${code}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
}