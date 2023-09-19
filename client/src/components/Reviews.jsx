import React from "react";
import StartRating from "./StartRating";
import { ImBin } from "react-icons/im";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useRestaurantsContext } from "../context/RestaurantContext";

const Reviews = ({ allReviews }) => {
  const { currentReviews, setCurrentReviews } = useRestaurantsContext();

  const handleReveiwDeleteBtn = async (id) => {

    try {
      const response = await RestaurantFinder.delete(`/${id}/deleteReview`);

      // Update the state to remove the deleted restaurant
      setCurrentReviews({ currentReviews });
      console.log("Delete Success");
    } catch (error) {
      console.log(error);
    }
    return;
  };
  return (
    <div className="row row-cols-1 row-cols-sm-3 g-4 ">
      {allReviews?.map(
        (review) =>
          review && (
            <div className="col" key={review.id}>
              <div
                className="card text-white bg-primary mb-0.8 mx-0.5"
                style={{ maxWidth: "30rem" }}
              >
                <div className="card-header d-flex justify-content-between">
                  <span className="fs-5">{review.name}</span>
                  <span className="text-warning fs-5">
                    <StartRating rating={review.rating} />
                  </span>{" "}
                  <span>
                    <button
                      onClick={() => handleReveiwDeleteBtn(review.id)}
                      type="button"
                      className="btn btn-danger fs-6"
                    >
                      <ImBin />
                    </button>
                  </span>{" "}
                  {/* Note the correct attribute syntax */}
                </div>
                <div className="card-body">
                  <p className="card-text fs-5">{review.review}</p>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default Reviews;
