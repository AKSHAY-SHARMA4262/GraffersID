import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CompanyList = ({ companies }) => {
  const navigate = useNavigate();

  const handleDetailReview = (companyId) => {
    navigate(`/company/${companyId}/reviews`); // This stays the same
  };


  return (
    <div>
      {companies.length > 0 ? (
        companies.map((company) => (
          <Card
            key={company.id}
            variant="outlined"
            style={{
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <CardContent>
              <Typography variant="h6">{company.name}</Typography>
              <Typography>Location: {company.location}</Typography>
              <Typography>Founded On: {company.foundedOn}</Typography>
              <Typography>City: {company.city}</Typography>
            </CardContent>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDetailReview(company.id)} // This is correct
              >
                Detail Review
              </Button>
            </div>
          </Card>
        ))
      ) : (
        <Typography>No companies available</Typography>
      )}
    </div>
  );
};

export default CompanyList;
