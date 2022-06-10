import styled from "styled-components";
import {Link} from "react-router-dom";
import video from '../assets/short-demo.mp4'


const Container = styled.div`
width: 800px;
`

const VideoContainer = styled.div`
margin: 40px 0;
`


export default function(){
    return (
        <Container>
            <h1>
                Home Page
            </h1>
            <h2>About VanCal</h2>
            <p>VanCal is an application I built to showcase my web development skills.  Although this is a demonstration app I still chose to solve a real world problem, from my own business. This allows me to demonstrate my ability to develop an application, end to end, from problem statement to final application.  The final application is an integrated booking and invoicing application for a Man With A Van Business.</p>

            <p>To see the application in action click on the login button in the top right and visit the main calendar page of the application or read on to find more about the application.</p>

            <h2>The Problem Van Val Solves</h2>
            <p>In running my man with a van business prior to VanCal I made my bookings using Google Calendar. Calendars are great for scheduling you can see what you have on at a glance and where you can fit new work in.</p>

            <p>However I need to store more atomic data about the jobs i book, for account keeping and invoicing. Using Google Calendar for booking means i have to keep separate records of bookings, in a spreadsheet, and this leads to a lot of duplicated data. this can lead to mistakes, falling behind with record keeping and creates extra work.</p>

            <h2>The solution</h2>
            <p>The solution is a SAAS (Software As A Service) application that any Man With A Van business can use.  The user can sign in with an email and password or with their google account and create and manage bookings in the application. The bookings are displayed on a week view calendar to facilitate scheduling. the data is recorded at a level of atomicity that means the information captured when making a booking can be used for business record keeping.</p>

            <p>Here is a short video demonstrating making a booking then changing the time of the booking by dragging the event tile.  The red tiles are Bookings and the blue tile is an event from the users google calendar.</p>

            <VideoContainer>
                <video width='800px' controls>
                    <source src={video}
                            type="video/mp4"/>
                </video>
            </VideoContainer>

            <p>Users can also create invoice db records on the application api, from the booking record and email invoices to customers from the application. They can optionally provide their email address and company details in the settings page and this will be used to generate an invoice with the booking details and the company details. the sent invoice will be sent from a no reply email address which belongs to VanCal. However the reply-to field of the email will be set to the users email address so that if a customer replies to the email the application user will recieve the email.</p>

            <h2>Integration with google calendar</h2>
            <p>VanCal provides an option to authorise the application to read the event data on a users Google Calendar.  This allows a user to view other events they may have going on in the same place that they make bookings for their business.  As someone who runs a man with a van business I find this a very useful feature.  However users can decide themselves if this feature is usefull to them and opt in or out as they choose</p>
            
            <p>To authorise VanCal to access google calendar visit the <Link to='/settings'>settings</Link> page and click the authorise to google calendar button.  After authorising to google calendar there will be an option on settings to revoke the authorization.</p>
            
            <p>other than fetching a users event data from google calendar and displaying it on the ui of the application van cal does not store, share or use for any purpose a users google calendar data.  more information on our data policies can be found on our <Link to='/privacy-policy'>privacy policy</Link> page</p>

        </Container>

    )
}