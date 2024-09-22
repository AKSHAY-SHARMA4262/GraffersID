import React, { useState, useEffect } from "react";
import apiClient from "../../axiosConfig";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import CompanyList from "./CompanyList";

const CompanyListing = () => {
  const [companies, setCompanies] = useState([]);
  const [openAddCompanyModal, setOpenAddCompanyModal] = useState(false);

  // Fetch company list from backend
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await apiClient.get("/company/get");
        setCompanies(response.data); // Set the companies state with API response
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  // Add new company to backend
  const handleAddCompany = async (values) => {
    try {
      const response = await apiClient.post("/company/add", values); // Add company API
      setCompanies([...companies, response.data]); // Update state after adding company
      setOpenAddCompanyModal(false);
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Company Listing
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAddCompanyModal(true)}
      >
        Add Company
      </Button>

      {/* Render company list */}
      <CompanyList companies={companies} />

      <Dialog
        open={openAddCompanyModal}
        onClose={() => setOpenAddCompanyModal(false)}
      >
        <DialogTitle>Add Company</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ name: "", location: "", foundedOn: "", city: "" }}
            onSubmit={handleAddCompany}
          >
            {({ handleChange, values }) => (
              <Form>
                <Field
                  name="name"
                  as={TextField}
                  label="Company Name"
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  value={values.name}
                  onChange={handleChange}
                />
                <Field
                  name="location"
                  as={TextField}
                  label="Company Location"
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  value={values.location}
                  onChange={handleChange}
                />
                <Field
                  name="foundedOn"
                  as={TextField}
                  label="DD/MM/YYYY"
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  value={values.foundedOn}
                  onChange={handleChange}
                />
                <Field
                  name="city"
                  as={TextField}
                  label="City"
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  value={values.city}
                  onChange={handleChange}
                />
                <DialogActions>
                  <Button
                    onClick={() => setOpenAddCompanyModal(false)}
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyListing;
