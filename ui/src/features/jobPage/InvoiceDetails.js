import {ButtonSpacer, Container, Property, Title,TitleVoid, Value} from "./style";



export default function InvoiceDetails({invoice}){
    const {customer,charges,addresses,bill,_id,status,invoiceNumber} = invoice

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
        <>
            {status==='void'
            ?
                <TitleVoid>Void Invoice For {name}</TitleVoid>
                :
                <Title>Invoice For {name}</Title>
            }

            <table>
                <tr>
                    <Property>Invoice Number</Property>
                    <Value>{invoiceNumber}</Value>
                </tr>
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

        </>
    )
}
