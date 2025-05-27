import axios from 'axios';

const API_BASE_URL = 'http://localhost:3010/api';

export interface Candidate {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  education?: string;
  work_experience?: string;
  resume_file?: File;
}

export const createCandidate = async (candidateData: FormData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/candidates`, candidateData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAutocomplete = async (field: string, search: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/candidates/autocomplete?field=${field}&search=${search}`
    );
    return response.data;
  } catch (error) {
    return { payload: { [field]: [] } };
  }
};