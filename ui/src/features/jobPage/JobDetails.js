import {useCreateInvoiceMutation} from "../api/apiSlice";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography
} from "@material-ui/core";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {omit} from "lodash-es";
import ordinal from "ordinal";
import Accordion from "../../components/Accordion";
import {Container,Title,SectionHeading,Property,Value,ActionsStyled,Items} from "./style";

import {makeStyles} from "@material-ui/core/styles";




const AccordionSummaryStyled = styled(Accordion.Summary)`
color: #757de8;
`


function Address({address, number}) {
    return (
        <tr>
            <Property>{ordinal((number * 1) + 1) + ' '}Address</Property>
            <Value>{address}</Value>
        </tr>
    )

}

function PrepareForInvoiceButton({id}) {
    const history = useHistory()

    return (
        <Button
            variant="contained"
            color="primary"
            size="small"
            style={{width: '100%'}}
            onClick={() => {
                history.push(`/job-page/${id}/prepare-for-invoice/`)
            }}
        >
            prepare for invoice
        </Button>
    )
}

function CreateInvoiceButton({job}) {
    console.log(job)
    const invoice = {
        ...omit(job, ['__v', '_id', 'id']),
        job: job._id
    }
    console.log(invoice)

    const [createInvoice] = useCreateInvoiceMutation()

    return <Button
        variant="contained"
        color="primary"
        size="small"
        style={{width: '100%'}}
        onClick={() => createInvoice(invoice)}
    >
        Create Invoice
    </Button>
}

function Actions({job}) {

    const {readyForInvoice, invoiceState} = job

    const needsInvoice = invoiceState === 'void' || invoiceState === 'none'


    return (
        <ActionsStyled>
            {!readyForInvoice
                ?
                <PrepareForInvoiceButton id={job._id}/>
                :
                needsInvoice && <CreateInvoiceButton job={job}/>
            }
        </ActionsStyled>
    )
}

export default function JobDetails({job}){
    const {customer, charges, addresses, readyForInvoice,items} = job || {}
    const {name, email, mobile} = customer || {}

    const {hourlyRate, fuelCharge, travelTime} = charges || {}

    console.log(job)

    return (
        <Container>
            <Title variant='h5'>
                Booking for {name}
            </Title>
            <SectionHeading variant='h6'>
                Customer Details
            </SectionHeading>
            <table>
                <tr>
                    <Property>Name</Property>
                    <Value>{name}</Value>
                </tr>
                <tr>
                    <Property>
                        Email Address
                    </Property>
                    <Value>
                        {email}
                    </Value>
                </tr>
                <tr>
                    <Property>
                        Mobile Number
                    </Property>
                    <Value>
                        {mobile}
                    </Value>
                </tr>
            </table>

            <SectionHeading variant='h6'>
                Charges
            </SectionHeading>

            <table>
                <tbody>
                <tr>
                    <Property>
                        Hourly Rate
                    </Property>
                    <Value>
                        {`£${hourlyRate}`}
                    </Value>
                </tr>
                <tr>
                    <Property>
                        Fuel Charge
                    </Property>
                    <Value>
                        {`£${fuelCharge}`}
                    </Value>
                </tr>
                <tr>
                    <Property>
                        Travel Time
                    </Property>
                    <Value>
                        {`${travelTime} minutes`}
                    </Value>
                </tr>
                </tbody>

            </table>
            <SectionHeading variant='h6'>
                Addresses
            </SectionHeading>
            {addresses.map((address, i) => {
                    console.log(address.value)
                    return Address({
                        address: address.value,
                        number: String(i)
                    })
                }
            )}
            <Accordion.Accordion>
                <Accordion.Summary color='#757de8'>
                    <SectionHeading>
                        Items
                    </SectionHeading>
                </Accordion.Summary>
                <Accordion.Description>
                    <Items>
                        {items}
                    </Items>
                </Accordion.Description>
            </Accordion.Accordion>
            <Actions job={job}/>
        </Container>
    )
}