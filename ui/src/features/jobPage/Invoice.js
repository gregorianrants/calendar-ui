import {Container,Title,SectionHeading,Property,Value,ActionsStyled,Items} from "./style";
import Accordion from "../../components/Accordion";
import {sortBy,pipe,prop,last} from 'ramda'
import {useSendInvoiceMutation, useVoidInvoiceMutation} from "../api/apiSlice";
import {Button} from "@material-ui/core";
import {ButtonSpacer} from "./style";
import InvoiceDetails from "./InvoiceDetails";

function SendInvoiceButton({id}){
    const [sendInvoice] = useSendInvoiceMutation()

    return (<Button
        variant="contained"
        color="primary"
        size="small"
        onClick={()=>{sendInvoice(id)}}
        style={{width: '100%'}}
    >
        send invoice
    </Button>)

}

function VoidInvoiceButton({id}){
    console.log('asdfsdfsdf',id)


    const [voidInvoice] = useVoidInvoiceMutation()

    return (<Button
        variant="contained"
        color="primary"
        size="small"
        style={{width: '100%'}}
        onClick={()=>{voidInvoice(id)}}
    >
        void invoice
    </Button>)
}






export default function Invoice({invoice}){
    console.log(invoice)


    const {_id} = invoice

    console.log(_id)
    
    return (
            <Container>
                <InvoiceDetails invoice={invoice}/>
                <SendInvoiceButton id={_id}/>
                <ButtonSpacer>
                    <VoidInvoiceButton id={_id}/>
                </ButtonSpacer>
            </Container>
    )




}