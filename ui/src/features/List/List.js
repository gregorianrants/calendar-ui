import {useListJobsQuery} from "../api/apiSlice";
import {DataGrid} from '@material-ui/data-grid';
import {Button} from "@material-ui/core";
import {format} from "date-fns";
import React from "react";
import {useHistory} from "react-router-dom";

//note the npm page for data grid says we need mui 4.12 and we are using 4.11
export default function List() {
    const history = useHistory()

    const [skip,setSkip] = React.useState(0)
    const [page,setPage] = React.useState(0)

    const handlePageChange =(newPage)=>{
        console.log(newPage)
        setSkip(newPage*10)
        setPage(newPage)
    }

    const {
        data: jobsForDate,
        isLoading,
        isSuccess,
        isError,
        error
    } = useListJobsQuery({skip,limit: 10})

    const columns = [
        {field: 'date', headerName: 'Date', width: 120},
        {field: 'name', headerName: 'Name', width: 150},
        {field: 'mobile', headerName: 'Mobile', width: 120},
        {field: 'email', headerName: 'Email', width: 200},
        {field: 'firstAddress', headerName: 'First Address', width: 200},
        {field: 'bill',headerName: 'Bill', width: 100},
        {field: 'prepare', headerName: 'Invoice', width: 170, renderCell: (params)=>{
                return <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={()=> {
                        console.log(params)
                        history.push(`list/prepare-for-invoice/${params.id}`)
                    }}
                >
                    prepare
                </Button>
            }},
        {field: 'button', headerName: 'Invoice', width: 170, renderCell: (params)=>{
                return <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                >
                    send
                </Button>
            }},
        {field: 'paid',headerName: 'Paid',width: 120},
    ]



    let content

    if (isLoading) {
        content = <p>loading</p>
    }

    else if (isSuccess) {
        const rows = (jobsForDate?.items || []).map(row => {
            const {_id,customer,addresses,start } = row
            const {name, mobile, email} = customer

            return {
                _id,
                name, mobile, email,
                bill: '55',
                prepared: 'no',
                paid: 'no',
                firstAddress: addresses.length> 1 ? addresses[0].value : '',
                date: format(new Date(start),'dd/LL/yy')
            }
        })

       console.log(jobsForDate.pagination)

        content = <div style={{height: '700px', width: '100%'}}>
            <DataGrid
                page={page}
                rows={rows}
                pagination
                getRowId={(row)=>row._id}
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
            {content}
        </div>

    )


}