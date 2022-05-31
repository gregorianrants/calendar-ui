import {Container,Title,SectionHeading,Property,Value,ActionsStyled,Items} from "./style";
import Accordion from "../../components/Accordion";
import {sortBy,pipe,prop,last} from 'ramda'
import {useSendInvoiceMutation} from "../api/apiSlice";
import {Button} from "@material-ui/core";

function SendInvoiceButton({id}){
    const [sendInvoice] = useSendInvoiceMutation()

    return (<Button
        variant="contained"
        color="primary"
        size="small"
        onClick={()=>{sendInvoice(id)}}
    >
        send invoice
    </Button>)

}


function Invoice({invoice}){
    const {customer,charges,addresses,bill,_id,status} = invoice

    const {name,email} = customer

    function getStatus(status){
        const map = {
            'created': 'invoice has been created but not sent',
            'sent': 'email has been sent',
            'sending': 'invoice has been created but emailing it failed'
        }

        return map[status] || ''
    }

    const {hourlyRate, fuelCharge, travelTime} = charges || {}
    return (
        <Container>
            <Title>Invoice For {name}</Title>
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
                <tr>
                    <Property>
                        Collection Address
                    </Property>
                    <Value>
                        {addresses[0].value}
                    </Value>
                </tr>
                <tr>
                    <Property>
                        Bill
                    </Property>
                    <Value>
                        £{bill}
                    </Value>
                </tr>
                <tr>
                    <Property>
                        Status
                    </Property>
                    <Value>
                        {getStatus(status)}
                    </Value>
                </tr>


            </table>
            <SendInvoiceButton id={_id}/>
        </Container>
    )
}


export default function Invoices({invoices=[]}){
    if(invoices.length===0) return null

    console.log(invoices)

    const latest = pipe(
        sortBy(prop('createdAt')),
        last
    )(invoices)

    return (
        <Invoice invoice={latest}/>
    )




}