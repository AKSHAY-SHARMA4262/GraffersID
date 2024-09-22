import React, { useState, useEffect } from "react";
import apiClient from "../../axiosConfig";
import {
  Box,
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box
          sx={{
            marginBottom: "24px",
            padding: "8px 16px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Soft shadow for a subtle effect
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 600, // Slightly bold for prominence
              color: "#333", // Dark gray for a modern, professional tone
              textAlign: "left", // Align text to the left
            }}
          >
            Company Listing
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="purple"
          onClick={() => setOpenAddCompanyModal(true)}
          sx={{
            background: "linear-gradient(45deg, purple, pink)",
            color: "white",
            "&:hover": {
              background: "linear-gradient(45deg, pink, purple)",
            },
          }}
        >
          Add Company
        </Button>
      </Box>

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
                    variant="contained"
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      background: "linear-gradient(45deg, purple, pink)",
                      color: "white",
                      "&:hover": {
                        background: "linear-gradient(45deg, pink, purple)",
                      },
                    }}
                  >
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
