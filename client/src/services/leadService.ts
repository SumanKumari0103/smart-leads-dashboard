import axios from "axios";

const API =
  "http://localhost:5000/api/leads";

// GET ALL LEADS
export const getLeads = async (
  search = "",
  status = "",
  source = "",
  page = 1,
  sort = "latest"
) => {
  const token =
    localStorage.getItem("token");

  const response = await axios.get(
    API,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },

      params: {
        search,
        status,
        source,
        page,
        sort,
      },
    }
  );

  return response.data;
};

// CREATE LEAD
export const createLead = async (
  leadData: any
) => {
  const token =
    localStorage.getItem("token");

  const response = await axios.post(
    API,
    leadData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// UPDATE LEAD
export const updateLead = async (
  id: string,
  leadData: any
) => {
  const token =
    localStorage.getItem("token");

  const response = await axios.put(
    `${API}/${id}`,
    leadData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// DELETE LEAD
export const deleteLead = async (
  id: string
) => {
  const token =
    localStorage.getItem("token");

  const response = await axios.delete(
    `${API}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};