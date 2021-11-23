// import React from "react";
// import {createJob} from "../../Model/Jobs";
// import JobForm from './JobForm'
// import Modal from './Modal'
// import {Card, CardContent} from "@material-ui/core";



// export default function NewJobModal({addToEvents,toggleModal,data}) {
//    const handleSubmit = (data) => {
//         createJob(data)
//             .then((calEvent)=>{
//                 console.log(calEvent)
//                 addToEvents(calEvent)
//                 toggleModal()
//             })
//             .catch(console.error)
//     }



//     return (
//         <Modal>
//             <Card style={{width: 600}}>
//                 <CardContent>
//                     <JobForm handleSubmit={handleSubmit}
//                              toggleModal={toggleModal}

//                     />
//                 </CardContent>
//             </Card>
//         </Modal>
//     )
// }