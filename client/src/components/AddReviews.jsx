import React, { useEffect, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useRestaurantsContext } from "../context/RestaurantContext";
import Popups from "./Popups";

const AddReviews = () => {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const location = useLocation();
  const { id } = useParams();
  const Navigate = useNavigate();
  const { currentReviews, setCurrentReviews } = useRestaurantsContext();
  const [popups, setPopups] = useState([]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (name && review) {
      try {
        const response = await RestaurantFinder.post(`/${id}/addReview`, {
          name,
          review,
          rating,
        });
        setCurrentReviews(response.data.data.review);
        setPopups((prevPopups) => [...prevPopups, "Review Submitted!"]);
        setTimeout(() => {
          setPopups((prevPopups) => prevPopups.slice(1));
        }, 1500);
      } catch (error) {
        console.log(error);
        setPopups((prevPopups) => [
          ...prevPopups,
          "All Details Are Mandatory!",
        ]);
        setTimeout(() => {
          setPopups((prevPopups) => prevPopups.slice(1));
        }, 1500);
      }
    } else {
      setPopups((prevPopups) => [...prevPopups, "All Details Are Mandatory!"]);
      setTimeout(() => {
        setPopups((prevPopups) => prevPopups.slice(1));
      }, 1500);
    }
  };

  return (
    <>
      {popups?.map((popup, index) => {
        if (popup === "All Details Are Mandatory!") {
          return (
            <Popups
              alertMessage={popup}
              className={"alert alert-warning"}
              key={index}
              style={{
                position: "absolute",
                marginTop: "10%",
                top: `${index * 70}px`,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: "99",
              }}
            />
          );
        } else {
          return (
            <Popups
              alertMessage={popup}
              className={"alert alert-success"}
              key={index}
              style={{
                position: "absolute",
                marginTop: "10%",
                top: `${index * 70}px`,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: "99",
              }}
            />
          );
        }
      })}

      <div className="mb-2">
        <form action="">
          <div className="row">
            <div className="mb-3 col-sm-8">
              <label htmlFor="name" className="col-form-label">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                placeholder="name"
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-3 col-sm-4">
              <label htmlFor="rating" className="col-form-label">
                Select Rating
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                id="rating"
                className="form-select"
              >
                {/* <option disabled>Select Rating</option> */}
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="mb-2" htmlFor="Review">
              Review
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              id="Review"
              className="form-control"
            ></textarea>
          </div>

          <button
            onClick={(e) => handleOnSubmit(e)}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddReviews;
