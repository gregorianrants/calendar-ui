export default function PrivacyPolicy() {
    return (
        <div style={{width: '600px'}}>
            <h2>About This App</h2>
            <p>This app is a demonstration app for my web development portfolio. The application is a SAAS booking app for small removals companies.</p>

            <p>Because this is a demonstration app it is not expected that users will be inputting real data when using the main functionality of the application</p>

            <p>there are some optional features that can ask for some data from the user these are outlined bellow</p>

            <h2>Limited Use Disclosure -relating to accessing data from google calendar</h2>
            VanCal's use and transfer to any other app of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.
            <h2>
                google calendar data
            </h2>
            <p>
                van cal gives the option to authorize the application to read your google calandar events data.
                the application doesnt store any of this data and simply sends the data straight to the front end for the users personal viewing. authorizing the application to view your google calendar data is completely optional. It is expected that users only use this feature if they personally deem it worthwhile.
            </p>

            <p>This data is not stored by the application, shared with any 3rd parties or used by the application or application developer for any purpose other than presenting the data to the user on the ui for their own use.</p>

            <h2>Data Users Create for bookings</h2>
            <p>The application is currently for demonstration purposes only and any data provided for bookings is expected to be dummy data and this data will be deleted at regular intervals and will persist for no longer than 1 month.</p>
            <p>The application is currently for demonstration purposes only and any data provided for bookings is expected to be dummy data and this data will be deleted at regular intervals and will persist for no longer than 1 month.</p>
            <p>This data is stored on the appications api database, the data is secured using Oauth2 via the Auth0 authorization service. this data is only stored so that i can be managed by the user of the application for their own benefit. the application developer does not use this data for any other purpose.  The data is not shared with any 3rd parties.  At the moment the application is for demonstration puropses only</p>

            <h2>Email, Company Name and Company Address data</h2>
            <p>This data can be provided for the purpose of populating fields of invoices sent from the application, this data is only used for the functionality it provides in the application. Providing this information is completely optional and much of the functionality of the app can be used without providing this data.</p>
        </div>

    )
}