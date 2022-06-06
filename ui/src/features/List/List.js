import {useListJobsQuery} from "../api/apiSlice";
import {DataGrid, getGridNumericColumnOperators } from '@material-ui/data-grid';
import {Button} from "@material-ui/core";
import {format} from "date-fns";
import React from "react";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {useGetJobsQuery} from "../api/apiSlice";
import {omit} from "lodash-es";
import {useCreateInvoiceMutation} from "../api/apiSlice";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//note the npm page for data grid says we need mui 4.12 and we are using 4.11

export default function List() {
    const history = useHistory()

    const [skip, setSkip] = React.useState(0)
    const [page, setPage] = React.useState(0)
    const [filter,setFilter] = React.useState('all')

    const handleSelectChange = (event)=>{
        if(event.target.value==='all'){
            setFilter(null)
        }
        setFilter(event.target.value)
    }

    const handlePageChange = (newPage) => {
        console.log(newPage)
        setSkip(newPage * 10)
        setPage(newPage)
    }

    const onFilterChange = (filterModel)=>{
        console.log(filterModel)
    }

    const {
        data: jobsForDate,
        isLoading,
        isSuccess,
        isError,
        error
    } = useListJobsQuery({skip, limit: 10, invoiceState: filter})

    const columns = [
        {field: 'date', headerName: 'Date', width: 120},
        {field: 'name', headerName: 'Name', width: 150},
        {field: 'mobile', headerName: 'Mobile', width: 120},
        {field: 'email', headerName: 'Email', width: 200},
        {field: 'firstAddress', headerName: 'First Address', width: 200},
        {field: 'invoiceStatus', headerName: 'Invoice Status', width: 200},
        {field: 'bill', headerName: 'Bill', width: 100},
        {
            field: 'jobPage', headerName: 'VisitPage', width: 170, renderCell: ({row}) => (
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={()=>history.push(`/job-page/${row._id}`)}
                >
                    visit page
                </Button>
                )
        },

    ]

    let content

    if (isLoading) {
        content = <p>loading</p>
    } else if (isSuccess) {
        const rows = (jobsForDate?.items || []).map(row => {
            const {_id, customer, addresses,
                start, readyForInvoice, invoices,bill,
            invoiceState} = row
            console.log(readyForInvoice)
            const {name, mobile, email} = customer

            const hasInvoice = Boolean(invoices && invoices.length > 0)


            return {
                _id,
                name, mobile, email,
                bill,
                prepared: 'no',
                firstAddress: addresses.length > 1 ? addresses[0].value : '',
                date: format(new Date(start), 'dd/LL/yy'),
                readyForInvoice: readyForInvoice,
                job: row,
                invoiceStatus: (
                    invoiceState==='none'
                        ?
                        'not created'
                        :
                        invoiceState)
            }
        })

        console.log(jobsForDate.pagination)

        content = <div style={{height: '700px', width: '100%'}}>
            <DataGrid
                page={page}
                rows={rows}
                pagination
                getRowId={(row) => row._id}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                paginationMode='server'
                rowCount={jobsForDate.pagination.of}
                onPageChange={handlePageChange}
                loading={isLoading}
            />
        </div>
    }

    return (
        <div>
            <h2>
                Jobs List
            </h2>
            <FormControl style={{width: '400px'}}>
                <InputLabel>Filter by Invoice Status</InputLabel>
                <Select
                    value={filter}
                onChange={handleSelectChange}
                >
                    <MenuItem value={'created'}>created</MenuItem>
                    <MenuItem value={'sent'}>sent</MenuItem>
                    <MenuItem value={'all'}>all</MenuItem>
                </Select>
            </FormControl>



            {content}
        </div>

    )


}