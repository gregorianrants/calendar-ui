export default function PrivacyPolicy() {
    return (
        <div style={{width: '600px'}}>
            <h2>About This App</h2>
            <p>This app is a demonstration app for my web development portfolio. The application is a SAAS booking app for small removals companies.</p>

            <p>Because this is a demonstration app it is not expected that users will be inputting real data when using the main functionality of the application</p>

            <p>there are some optional features that can ask for some data from the user these are outlined bellow</p>
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
                to view your personal google calandar at the same time as scheduling bookings.</p>

            <h2>email address</h2>
            <p>the application provides an option for the user to provide an email address, business name and address,
                this is purely to populate the invoices sent with the application an provide a reply to email address on the sent emails.</p>

            <p>it is possible to use purely dummy data to demonstrate this functionality,
                and the application does not use the email address provided here to send the emails, but uses and email account provided by the application developer.</p>
        </div>

    )
}