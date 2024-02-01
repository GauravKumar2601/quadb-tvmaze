import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowDetails = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    // Add more booking details as needed
  });

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        const data = await response.json();
        setShowDetails(data);
      } catch (error) {
        console.error("Error fetching show details:", error);
      }
    };

    fetchShowDetails();
  }, [id]);

  const handleBookingClick = () => {
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., send booking details to server)
    // For now, let's just log the booking details to the console
    console.log("Booking Details:", bookingDetails);
    // Close the form
    setShowForm(false);
  };

  if (!showDetails) {
    return <div>Loading...</div>;
  }

  const { name, summary, image } = showDetails;

  return (
    <div className="show-details">
      <img src={image && image.medium} alt={name} />
      <div className="details-header">
        <h2>{name}</h2>
        <p dangerouslySetInnerHTML={{ __html: summary }} />
        <button className="book-btn" onClick={handleBookingClick}>
          Book Tickets
        </button>
      </div>

      {showForm && (
        <div className="booking-form-modal">
          <form onSubmit={handleFormSubmit} className="booking-form">
            <h3>Book Tickets</h3>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={bookingDetails.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={bookingDetails.email}
                onChange={handleInputChange}
              />
            </label>
            {/* Add more input fields for other booking details */}
            <button type="submit">Submit Booking</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ShowDetails;
