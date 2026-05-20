import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import DashboardLayout from "../layouts/DashboardLayout";

import {
  createLead,
  deleteLead,
  getLeads,
  updateLead,
} from "../services/leadService";

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
}

const Dashboard = () => {
  // LEADS STATE
  const [leads, setLeads] = useState<
    Lead[]
  >([]);

  // PAGINATION STATES
  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  // SORT STATE
  const [sort, setSort] =
    useState("latest");

  // SEARCH STATES
  const [search, setSearch] =
    useState("");

  const [
    debouncedSearch,
    setDebouncedSearch,
  ] = useState("");

  // FILTER STATES
  const [statusFilter, setStatusFilter] =
    useState("");

  const [sourceFilter, setSourceFilter] =
    useState("");

  // EDIT STATE
  const [editingId, setEditingId] =
    useState<string | null>(null);

  // FORM STATE
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      status: "New",
      source: "Website",
    });

  // FETCH LEADS
  const fetchLeads = async () => {
    try {
      const data = await getLeads(
        debouncedSearch,
        statusFilter,
        sourceFilter,
        page,
        sort
      );

      setLeads(data.leads);

      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH WHEN FILTERS CHANGE
  useEffect(() => {
    fetchLeads();
  }, [
    debouncedSearch,
    statusFilter,
    sourceFilter,
    page,
    sort,
  ]);

  // DEBOUNCED SEARCH
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // HANDLE INPUT CHANGE
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // EDIT LEAD
  const handleEdit = (lead: Lead) => {
    setEditingId(lead._id);

    setFormData({
      name: lead.name,
      email: lead.email,
      status: lead.status,
      source: lead.source,
    });
  };

  // DELETE LEAD
  const handleDelete = async (
    id: string
  ) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this lead?"
      );

    if (!confirmDelete) return;

    try {
      await deleteLead(id);

      alert("Lead Deleted");

      fetchLeads();
    } catch (error) {
      console.log(error);

      alert("Delete Failed");
    }
  };

  // CREATE / UPDATE LEAD
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      // UPDATE
      if (editingId) {
        await updateLead(
          editingId,
          formData
        );

        alert("Lead Updated");

        setEditingId(null);
      }

      // CREATE
      else {
        await createLead(formData);

        alert("Lead Added");
      }

      // REFRESH LEADS
      fetchLeads();

      // RESET FORM
      setFormData({
        name: "",
        email: "",
        status: "New",
        source: "Website",
      });
    } catch (error) {
      console.log(error);

      alert("Operation Failed");
    }
  };

  // DASHBOARD STATS
  const totalLeads = leads.length;

  const newLeads = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const qualifiedLeads = leads.filter(
    (lead) =>
      lead.status === "Qualified"
  ).length;

  const lostLeads = leads.filter(
    (lead) => lead.status === "Lost"
  ).length;

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-2xl shadow">
        {/* HEADING */}
<div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold">
    Leads Dashboard
  </h1>

  <CSVLink
    data={leads}
    filename="leads.csv"
    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
  >
    Export CSV
  </CSVLink>
</div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-100 p-5 rounded-xl">
            <h2 className="text-lg font-semibold">
              Total Leads
            </h2>

            <p className="text-3xl font-bold mt-2">
              {totalLeads}
            </p>
          </div>

          <div className="bg-green-100 p-5 rounded-xl">
            <h2 className="text-lg font-semibold">
              New Leads
            </h2>

            <p className="text-3xl font-bold mt-2">
              {newLeads}
            </p>
          </div>

          <div className="bg-yellow-100 p-5 rounded-xl">
            <h2 className="text-lg font-semibold">
              Qualified
            </h2>

            <p className="text-3xl font-bold mt-2">
              {qualifiedLeads}
            </p>
          </div>

          <div className="bg-red-100 p-5 rounded-xl">
            <h2 className="text-lg font-semibold">
              Lost Leads
            </h2>

            <p className="text-3xl font-bold mt-2">
              {lostLeads}
            </p>
          </div>
        </div>

        {/* ADD / UPDATE FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Lead Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Lead Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="New">
              New
            </option>

            <option value="Contacted">
              Contacted
            </option>

            <option value="Qualified">
              Qualified
            </option>

            <option value="Lost">
              Lost
            </option>
          </select>

          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="Website">
              Website
            </option>

            <option value="Instagram">
              Instagram
            </option>

            <option value="Referral">
              Referral
            </option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg md:col-span-4 hover:bg-blue-700"
          >
            {editingId
              ? "Update Lead"
              : "Add Lead"}
          </button>
        </form>

        {/* SEARCH + FILTER */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border p-3 rounded-lg"
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          >
            <option value="">
              All Status
            </option>

            <option value="New">
              New
            </option>

            <option value="Contacted">
              Contacted
            </option>

            <option value="Qualified">
              Qualified
            </option>

            <option value="Lost">
              Lost
            </option>
          </select>

          <select
            value={sourceFilter}
            onChange={(e) =>
              setSourceFilter(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          >
            <option value="">
              All Sources
            </option>

            <option value="Website">
              Website
            </option>

            <option value="Instagram">
              Instagram
            </option>

            <option value="Referral">
              Referral
            </option>
          </select>

          {/* SORT */}
          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="border p-3 rounded-lg"
          >
            <option value="latest">
              Latest First
            </option>

            <option value="oldest">
              Oldest First
            </option>
          </select>
        </div>

        {/* LEADS TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">
                  Name
                </th>

                <th className="p-3 border">
                  Email
                </th>

                <th className="p-3 border">
                  Status
                </th>

                <th className="p-3 border">
                  Source
                </th>

                <th className="p-3 border">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {leads.length > 0 ? (
                leads.map((lead) => (
                  <tr key={lead._id}>
                    <td className="p-3 border">
                      {lead.name}
                    </td>

                    <td className="p-3 border">
                      {lead.email}
                    </td>

                    <td className="p-3 border">
                      {lead.status}
                    </td>

                    <td className="p-3 border">
                      {lead.source}
                    </td>

                    <td className="p-3 border">
                      <button
                        onClick={() =>
                          handleEdit(lead)
                        }
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            lead._id
                          )
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center p-5"
                  >
                    No Leads Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() =>
              setPage(page - 1)
            }
            disabled={page === 1}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() =>
              setPage(page + 1)
            }
            disabled={
              page === totalPages
            }
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;