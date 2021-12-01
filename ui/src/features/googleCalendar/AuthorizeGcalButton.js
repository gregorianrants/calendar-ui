export default function AuthorizeGcalButton(){
    function handleAuthorize(){
        fetch("http://localhost:8000/api/v1/gcal/url")
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