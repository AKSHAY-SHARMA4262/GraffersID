import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../axiosConfig";
import { Box } from "@mui/material";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Formik, Form, Field } from "formik";

const DetailReview = () => {
  const { companyId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [company, setCompany] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [openAddReviewModal, setOpenAddReviewModal] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await apiClient.get(
          `/company/get-company-with-review/${companyId}`
        );
        setReviews(response.data.reviews);
        setCompany(response.data); 
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [companyId]);

  const handleAddReview = async (values) => {
    try {
      const reviewData = { ...values, companyId };
      const response = await apiClient.post(`/review/add`, reviewData);
      console.log(response);
      

      if (response.data) {
        setReviews((prevReviews) => [...prevReviews, response.data]);
        setSuccessMessage("Review added successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        console.error("No review data returned from API");
      }
      setOpenAddReviewModal(false);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

 return (
   <div style={{ padding: "20px" }}>
     <Box display="flex" justifyContent="space-between" alignItems="center">
       <Typography
         variant="h4"
         gutterBottom
         sx={{
           fontWeight: 600,
           color: "#333",
           textAlign: "left",
         }}
       >
         Reviews For Company {company ? company.name : "Loading..."}
       </Typography>
       <Button
         variant="contained"
         color="primary"
         sx={{
           background: "linear-gradient(45deg, purple, pink)",
           color: "white",
           "&:hover": {
             background: "linear-gradient(45deg, pink, purple)",
           },
         }}
         onClick={() => setOpenAddReviewModal(true)}
       >
         Add Review
       </Button>
     </Box>
     {successMessage && (
       <Typography variant="h6" color="green">
         {successMessage}
       </Typography>
     )}

     {reviews.length > 0 ? (
       reviews.map((review) => (
         <Card
           key={review._id} // Use review._id instead of review.id
           variant="outlined"
           style={{ marginBottom: "10px" }}
         >
           <CardContent>
             <Typography variant="h6">Rating: {review.rating} / 5</Typography>
             <Typography>Full Name: {review.fullName}</Typography>
             <Typography>Subject: {review.subject}</Typography>
             <Typography>{review.reviewText}</Typography>
           </CardContent>
         </Card>
       ))
     ) : (
       <Typography>No reviews available</Typography>
     )}

     {/* Add Review Modal */}
     <Dialog
       open={openAddReviewModal}
       onClose={() => setOpenAddReviewModal(false)}
     >
       <DialogTitle>Add Review</DialogTitle>
       <DialogContent>
         <Formik
           initialValues={{
             fullName: "",
             subject: "",
             reviewText: "",
             rating: 0,
           }}
           onSubmit={handleAddReview}
         >
           {({ handleChange, values }) => (
             <Form>
               <Field
                 name="fullName"
                 as={TextField}
                 label="Full Name"
                 fullWidth
                 margin="dense"
                 variant="outlined"
                 value={values.fullName}
                 onChange={handleChange}
               />
               <Field
                 name="subject"
                 as={TextField}
                 label="Subject"
                 fullWidth
                 margin="dense"
                 variant="outlined"
                 value={values.subject}
                 onChange={handleChange}
               />
               <Field
                 name="reviewText"
                 as={TextField}
                 label="Review Text"
                 fullWidth
                 margin="dense"
                 variant="outlined"
                 value={values.reviewText}
                 onChange={handleChange}
               />
               <Field
                 name="rating"
                 as={TextField}
                 label="Rating (1-5)"
                 fullWidth
                 margin="dense"
                 variant="outlined"
                 type="number"
                 inputProps={{ min: 1, max: 5 }}
                 value={values.rating}
                 onChange={handleChange}
               />
               <DialogActions>
                 <Button
                   onClick={() => setOpenAddReviewModal(false)}
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

export default DetailReview;
