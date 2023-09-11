const statuses = {
    pending: {
        value: 'pending',
        text: 'Pending'
    },
    submitted: {
        value: 'submitted',
        text: 'Submitted'
    },
    approved: {
        value: 'approved',
        text: 'Approved'
    },
    rejected: {
        value: 'rejected',
        text: 'Rejected'
    },
    request_for_info: {
        value: 'request_for_info',
        text: 'Request for info'
    }
};


// const params = {
//     filtering:[
//         {
//             key: 'status',
//             value: 'pending'
//         },
//         {
//             key: 'start_date',
//             value: '12-12-2019'
//         }
//     ],
//     sorting: {
//         key: 'proposed_name',
//         value: 'DESC'
//     },
//     pagination: {
//         currentPage: 10,
//         perPage: 10
//     },
// }

export default statuses;