import {useCreateInvoiceMutation, useGetJobQuery} from "../api/apiSlice";
import JobDetails from "./JobDetails";
import {useParams} from "react-router";
import {Grid,Paper} from '@material-ui/core'
import Invoice from "./Invoice";
import VoidInvoice from "./VoidInvoice";
import styled from "styled-components";

const Column = styled.div`
            display: flex;
            flex-direction: column;
  
            & > div:not(:first-child) {
              margin-top: 15px;
            }
`



export default function JobPage() {
    let {id} = useParams();
    let {data: job, isFetching} = useGetJobQuery(id);

    const validInvoice = job?.invoices.find(invoice=>invoice.status!=='void')

    const voidInvoices = job?.invoices.filter(invoice=>invoice.status==='void')

    console.log(validInvoice)

    return (
        isFetching
            ?
            <p>loading...</p>
            :
            <Grid container spacing={3}>
                <Grid item>
                    <JobDetails job={job}/>
                </Grid>
                {
                    validInvoice
                    &&
                    <Grid item>
                        <Invoice invoice={validInvoice}/>
                    </Grid>
                }
                {
                    voidInvoices
                    &&
                        <Grid item>
                            <Column>
                                {voidInvoices.map(
                                    invoice=>(
                                        <VoidInvoice invoice={invoice}/>
                                    )
                                )}
                            </Column>
                        </Grid>
                }


            </Grid>

    )

}

