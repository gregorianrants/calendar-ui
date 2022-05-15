import AuthorizeGcalButton from "./googleCalendar/AuthorizeGcalButton";
import {useFakeDataMutation} from "./api/apiSlice";

function FakeDataButton(){
    const [fakeData] = useFakeDataMutation()


    return (
        <button onClick={fakeData}>
            Fake it
        </button>
    )


}

export default function Settings(){
    return (
        <div style={{maxWidth: '600px'}}>
            <h2>Google Calendar Authorization</h2>
            <AuthorizeGcalButton />
            <h2>Generate Fake Data</h2>
            <p>
                You can click the button bellow to fake some data for the app.
                Doing this will remove any previously generated fake data and replace it with with new data.
                Any Data you have created yourself will remain untouched.
            </p>

            <FakeDataButton />
        </div>
    )

}