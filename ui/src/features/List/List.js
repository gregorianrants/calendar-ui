import {useListJobsQuery} from "../api/apiSlice";


export default function List(){
    const {data: jobsForDate} = useListJobsQuery({skip: 0})

    console.log(jobsForDate)


    return(
        <p>
            this is the list
        </p>
    )
}