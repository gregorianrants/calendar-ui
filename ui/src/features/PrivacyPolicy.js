export default function PrivacyPolicy() {
    return (
        <div style={{width: '600px'}}>
            <h2>what this app is for</h2>
            <p>this app is a demonstration app for my web development portfolio it is not expected that users will be
                entering real data and therefore we are not collecting any data from the user for the apps main
                functionality.</p>

            <p>the application is a booking app for small removals companies</p>

                <p>
                A couple of extra features in the app ask for further data but it is completely up to user if they want
                to add this functionality to the application.
            </p>
            <p>i do not share or do anything with ANY data created on this app the app is purely for demonstration
                purposes and all data will be destroyed at least at weekly intervals but perhaps more.</p>
            <h2>
                google calendar data
            </h2>
            <p>
                van cal gives the option to authorize the application to read your google calandar events data.
                the application doesnt store any of this data and simply sends the data straight to the front end for
                the users personal viewing.
                authorizing the application to view your google calendar data is completely optional.
                It is expected that users only use this feature if they personally deem it worthwhile.
            </p>

            <p>the app gives the user the option to view this data because it is scheduling app and it may be helpfull
                to view your personal google calandar at the same time as scheduling bookings</p>

            <h2>email address</h2>
            <p>the application provdes an option to provde an email address and password for their business domain email
                to allow the application to send emails for the user. the user should create a custom email address on
                there domain that they do not use for anything else so the application has no access to the users other
                emails. </p>

            <p>
                for example if the user has a domain acme.com they would create an email address on there mail server
                invoice@acme.com which is only used for sending email from the application. we only use this login
                information to send emails and do nothing else with it.
            </p>

            <p>THIS IS COMPLETELY OPTIONAL AND USERS DO NOT NEED TO PROVIDE IT IF THEY DO NOT THINK IT PROVIDES
                VALUE.</p>

        </div>

    )
}