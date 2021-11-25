

export default function Settings(){
    function handleAuthorize(){
        fetch("http://localhost:8000/api/v1/auth/url")
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                window.location.href = res.url;
            });
    }

    return (
        <button onClick={handleAuthorize}>
            authorize
        </button>
    )
}