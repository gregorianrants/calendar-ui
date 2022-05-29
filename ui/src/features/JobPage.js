import {useGetJobQuery} from "./api/apiSlice";
import {useParams} from "react-router";
import {Typography} from "@material-ui/core";
import styled from "styled-components";


const Container = styled.div`
font-family: Roboto;
  color: #1A2027;
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



function Address({address,number}){
    return(
        <tr>
            <Property>Address {number}</Property>
            <Value>{address}</Value>
        </tr>
    )

}

export default function JobPage(){
    let {id} = useParams();
    let {data: job, isFetching} = useGetJobQuery(id);
    const {customer,charges,addresses} = job
    const {name,email,mobile} = customer

    const{hourlyRate,fuelCharge,travelTime} = charges



    console.log(job)

    console.log(id);
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
        </Container>

    )
}