import {useCreateInvoiceMutation, useGetJobQuery} from "../api/apiSlice";
import JobDetails from "./JobDetails";
import {useParams} from "react-router";
import {Grid,Paper} from '@material-ui/core'
import Invoices from "./Invoice";


export default function JobPage() {
    let {id} = useParams();
    let {data: job, isFetching} = useGetJobQuery(id);

    return (
        isFetching
            ?
            <p>loading...</p>
            :
            <Grid container spacing={3}>
                <Grid item>
                    <JobDetails job={job}/>
                </Grid>
                <Grid item>
                    <Invoices invoices={job.invoices}/>
                </Grid>

            </Grid>

    )

}

