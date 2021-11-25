import auth0Client from "../features/auth/auth0";


export async function Authorize(code){
    const auth0 = await auth0Client;
    const token = await auth0.getTokenSilently();

    await fetch(`http://localhost:8000/api/v1/auth/authourize?code=${code}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
}