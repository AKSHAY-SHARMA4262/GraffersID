import { Routes, Route } from "react-router-dom";
import CompanyListing from "./Components/Company/CompanyListing";
import DetailReview from "./Components/Review/DetailReview";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CompanyListing />} />
      <Route path="/company/:companyId/reviews" element={<DetailReview />} />
    </Routes>
  );
}

export default App;
  