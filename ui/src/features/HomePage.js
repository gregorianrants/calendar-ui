import styled from "styled-components";
import {Link} from "react-router-dom";
import video from '../assets/short-demo.mp4'
import {Typography} from "@material-ui/core";


const Container = styled.div`
width: 800px;
`

const VideoContainer = styled.div`
margin: 40px 0;
`

const TitleStyled = styled.div`
  margin-top: 15px;
  margin-bottom: 30px;
`

const Title = function ({children}){
    return (
        <TitleStyled>
            <Typography variant='h4'>
                {children}
            </Typography>
        </TitleStyled>
    )
}

const ParagraphStyled = styled.div`
margin-bottom: 20px;
`

const Paragraph = function ({children}){
    return (
        <ParagraphStyled>
            <Typography variant='body'>
                {children}
            </Typography>
        </ParagraphStyled>

    )
}

const Section = styled.div`
margin-bottom: 25px;
`

export default function(){
    return (
        <Container>
            <Title>
                Home Page
            </Title>
            <Section>
                <Typography variant='h5'>Important Message</Typography>
                <Paragraph>This application is for demonstration purposes only at the moment.  Any data created in the app will be destroyed at regular intervals.  It is expected that users will only use dummy data with the application to investigate its functionality.  If a user finds this application useful and wants to create permanent data on the application they should contact the developer at <a href="mailto:gregorianrants4@gmail.com">gregorianratns4@gmail.com</a> and he will consider making a version of the application where data is more permanent.</Paragraph>
            </Section>

            <Section>
                <Typography variant='h5'>About VanCal</Typography>
                <Paragraph>VanCal is an application I built to showcase my web development skills.  Although this is a demonstration app I still chose to solve a real world problem, from my own business. This allows me to demonstrate my ability to develop an application, end to end, from problem statement to final application.  The final application is an integrated booking and invoicing application for a Man With A Van Business.</Paragraph>
                <Paragraph>To see the application in action click on the login button in the top right and visit the main calendar page of the application or read on to find more about the application.</Paragraph>
            </Section>

            <Section>

            </Section>




            <Typography variant='h5'>The Problem Van Val Solves</Typography>
            <Paragraph>In running my man with a van business prior to VanCal I made my bookings using Google Calendar. Calendars are great for scheduling you can see what you have on at a glance and where you can fit new work in.</Paragraph>

           <Paragraph>However I need to store more atomic data about the jobs i book, for account keeping and invoicing. Using Google Calendar for booking means i have to keep separate records of bookings, in a spreadsheet, and this leads to a lot of duplicated data. this can lead to mistakes, falling behind with record keeping and creates extra work.</Paragraph>

            <Typography variant='h5'>The solution</Typography>
           <Paragraph>The solution is a SAAS (Software As A Service) application that any Man With A Van business can use.  The user can sign in with an email and password or with their google account and create and manage bookings in the application. The bookings are displayed on a week view calendar to facilitate scheduling. the data is recorded at a level of atomicity that means the information captured when making a booking can be used for business record keeping.</Paragraph>

           <Paragraph>Here is a short video demonstrating making a booking then changing the time of the booking by dragging the event tile.  The red tiles are Bookings and the blue tile is an event from the users google calendar.</Paragraph>

            <VideoContainer>
                <video width='800px' controls>
                    <source src={video}
                            type="video/mp4"/>
                </video>
            </VideoContainer>

           <Paragraph>Users can also create invoice db records on the application api, from the booking record and email invoices to customers from the application. They can optionally provide their email address and company details in the settings page and this will be used to generate an invoice with the booking details and the company details. the sent invoice will be sent from a no reply email address which belongs to VanCal. However the reply-to field of the email will be set to the users email address so that if a customer replies to the email the application user will recieve the email.</Paragraph>

            <Typography variant='h5'>Integration with google calendar</Typography>
           <Paragraph>VanCal provides an option to authorise the application to read the event data on a users Google Calendar.  This allows a user to view other events they may have going on in the same place that they make bookings for their business.  As someone who runs a man with a van business I find this a very useful feature.  However users can decide themselves if this feature is usefull to them and opt in or out as they choose</Paragraph>
            
           <Paragraph>To authorise VanCal to access google calendar visit the <Link to='/settings'>settings</Link> page and click the authorise to google calendar button.  After authorising to google calendar there will be an option on settings to revoke the authorization.</Paragraph>

            <Typography variant='h5'>Users Data</Typography>

            <h3>Google Calendar Users Data</h3>
           <Paragraph>other than fetching a users event data from google calendar and displaying it on the ui of the application van cal does not store, share or use for any purpose a users google calendar data.  more information on our data policies can be found on our <Link to='/privacy-policy'>privacy policy</Link> page</Paragraph>

            <h3>Data Users Create for bookings</h3>
           <Paragraph>The application is currently for demonstration purposes only and any data provided for bookings is expected to be dummy data and this data will be deleted at regular intervals and will persist for no longer than 1 month.</Paragraph>
           <Paragraph>The application is currently for demonstration purposes only and any data provided for bookings is expected to be dummy data and this data will be deleted at regular intervals and will persist for no longer than 1 month.</Paragraph>
           <Paragraph>This data is stored on the appications api database, the data is secured using Oauth2 via the Auth0 authorization service. this data is only stored so that i can be managed by the user of the application for their own benefit. the application developer does not use this data for any other purpose.  The data is not shared with any 3rd parties.  At the moment the application is for demonstration purposes only</Paragraph>

            <h3>Email, Company Name and Company Address data</h3>
           <Paragraph>This data can be provided for the purpose of populating fields of invoices sent from the application, this data is only used for the functionality it provides in the application. Providing this information is completely optional and much of the functionality of the app can be used without providing this data.</Paragraph>
        </Container>

    )
}