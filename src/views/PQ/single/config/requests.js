import axios from '@/axios'

export const createNewForm = (data) => axios.post('webuser/draftRequest', data);

export const getIdentificationTypes = () => axios.get('list/getIdentificationTypes');

export const getQualificationTypes = () => axios.get('list/getQualificationTypes');

export const addUpdatePQForm = (data) => axios.post('pqform/addUpdatePQForm', data);

export const getPQformById = (PQForm_id) => axios.post('pqform/getPQFormByid', { PQForm_id });

export const getCountries = () => axios.get('public/fetchAllCountriesforSignup');

export const addUpdatePQFormChecklistData = (data) => axios.post('pqform/addUpdatePQFormChecklistData', data);

export const getPQMasterChecklist = () => axios.get('list/getPQMasterChecklist');

export const getPQChecklistDataByPQId = (pq_id) => axios.post('pqform/getPQChecklistDataByPQId', { pq_id });

export const getPQRecordByPQid = (pq_id) => axios.post('pqform/getPQRecordByPQid', { pq_id });

export const getPQformDetails = (data) => axios.post('pqform/getPQformDetails', data);

export const addUpdatePQRecord = (data) => axios.post('pqform/addUpdatePQRecord', data);

export const getProcessDocument = (data) => axios.post('webuser/getProcessDocument', data);