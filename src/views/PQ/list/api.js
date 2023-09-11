function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const tableData = [...Array(100).keys()].map((item) => {
  return {
    unique_ref: item + 1, // Any string or null
    reference: getRandomInt(1000000), // Any string or null
    name: 'Test Name ' + getRandomInt(100), // Any string or null
    submitted_on: '2019-11-12', // Any string or null
    status: 'rejected', // String, one of 'pending', 'submitted', 'approved', 'rejected', 'request_for_info',
    approved_on: '2019-11-12', // Any string or null
    reason_for_rejection: 'Some reason' // Any string or null
  }
})

export default tableData