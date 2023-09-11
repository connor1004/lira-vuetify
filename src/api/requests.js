import axios from "../axios";

export const uploadFile = (data) => axios.post(`webuser/file/upload`, data, {
  headers: {
    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
  },
});

export const uploadRecordCheckListFile = (data) => axios.post(`pqform/file/upload`, data, {
  headers: {
    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
  },
});

export const getAddressById = (address_id) => axios.post(`webuser/getaddress`, { address_id });

export const addUpdateAddressRequest = (data) => axios.post('webuser/addUpdateAddress', data);
