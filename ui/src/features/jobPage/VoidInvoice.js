import {Container,Title,SectionHeading,Property,Value,ActionsStyled,Items} from "./style";
import Accordion from "../../components/Accordion";
import {sortBy,pipe,prop,last} from 'ramda'
import {useSendInvoiceMutation, useVoidInvoiceMutation} from "../api/apiSlice";
import {Button} from "@material-ui/core";
import {ButtonSpacer} from "./style";
import InvoiceDetails from "./InvoiceDetails";






export default function Invoice({invoice}){


    const {_id} = invoice?._id

    return (
        <Container>
            <InvoiceDetails invoice={invoice} title='Void Invoice' color={'red'}/>
        </Container>
    )




}