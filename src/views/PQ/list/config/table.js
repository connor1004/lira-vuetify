import statuses from './statuses'

const { pending, submitted, approved, rejected, request_for_info } = statuses;

const tableConfig = {
    [pending.value]: [
        {
            text: 'Unique Ref',
            value: 'UniqueRef',
            // sortable: true
        },
        {
            text: 'Name',
            value: 'FullName'
        },
        {
            text: 'Submitted on',
            value: 'statusdate',
        },
        {
            text: 'Status',
            value: 'status'
        }
    ],
    [submitted.value]: [
        {
            text: 'Reference',
            value: 'reference'
        },
        {
            text: 'Unique Ref',
            value: 'UniqueRef'
        },
        {
            text: 'Name',
            value: 'FullName'
        },
        {
            text: 'Submitted on',
            value: 'statusdate'
        },
        {
            text: 'Status',
            value: 'status'
        }
    ],
    [approved.value]: [
        {
            text: 'Unique Ref',
            value: 'UniqueRef'
        },
        {
            text: 'Name',
            value: 'FullName'
        },
        {
            text: 'Approved on',
            value: 'statusdate'
        },
    ],
    [rejected.value]: [
        {
            text: 'Reference',
            value: 'reference'
        },
        {
            text: 'Unique Ref',
            value: 'UniqueRef'
        },
        {
            text: 'Name',
            value: 'FullName'
        },
        {
            text: 'Submitted on',
            value: 'statusdate'
        },
        {
            text: 'Reason for Rejection',
            value: 'reason_for_rejection'
        }
    ],
    [request_for_info.value]: [
        {
            text: 'Reference',
            value: 'reference'
        },
        {
            text: 'Unique Ref',
            value: 'UniqueRef'
        },
        {
            text: 'Name',
            value: 'FullName'
        },
        {
            text: 'Submitted on',
            value: 'statusdate'
        },
        {
            text: 'Status',
            value: 'status'
        }
    ]
};

export default tableConfig