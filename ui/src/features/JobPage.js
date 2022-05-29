import {useCreateInvoiceMutation, useGetJobQuery} from "./api/apiSlice";
import {useParams} from "react-router";
import {Button, Typography} from "@material-ui/core";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {omit} from "lodash-es";


const Container = styled.div`
font-family: Roboto;
  color: #1A2027;
  width: fit-content;
`
const Title = styled.h2`
font-size: 18px;
`

const SectionHeading = styled.h2`
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 0.2em;
  color: #757de8;
`

const Property  = styled.td`
  width: 150px;
  font-weight: 400;
  font-family: Roboto;
  font-size: 12px;
  color: slategray;
`

const Value = styled.td`
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
`

const ActionsStyled = styled.div`
margin-top: 16px;
`



function Address({address,number}){
    return(
        <tr>
            <Property>Address {number}</Property>
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
                history.push(`list/prepare-for-invoice/${id}`)
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

function Actions({job}){

    const {readyForInvoice, invoices, id} = job
    return(
        <ActionsStyled>{
            readyForInvoice
                ?
                <CreateInvoiceButton job={job}/>
                :
                invoices && invoices.length === 0
                    ?
                    <PrepareForInvoiceButton id={job._id}/>
                    :
                    null
        }
        </ActionsStyled>
    )
}


export default function JobPage(){
    let {id} = useParams();
    let {data: job, isFetching} = useGetJobQuery(id);
    const {customer,charges,addresses,readyForInvoice} = job || {}
    const {name,email,mobile} = customer ||{}

    const{hourlyRate,fuelCharge,travelTime} = charges||{}



    console.log(job)

    console.log(id);
    return (
        isFetching
        ?
            <p>loading...</p>
            :
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
            </table>
            <SectionHeading variant='h6'>
                Addresses
            </SectionHeading>
            {addresses.map((address,i)=> {
                console.log(address.value)
                    return Address({
                        address: address.value,
                        number: String(i)
                    })
                }
            )}
            <Actions job={job}/>



        </Container>

    )
}