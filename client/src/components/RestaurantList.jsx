import React, { useEffect, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useRestaurantsContext } from "../context/RestaurantContext";
import { useNavigate } from "react-router-dom";
import StartRating from "./StartRating";
import Popups from "./Popups";

const RestaurantList = () => {
  const {
    restaurants,
    setRestaurants,
    RenderStarRatingComponent,
    currentReviews,
  } = useRestaurantsContext();
  const [popups, setPopups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.restaurant[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const handleDeleteBtn = async (e, id, restaurant) => {
    e.stopPropagation();
    if (
      restaurant?.total_rating === 0 ||
      restaurant?.total_rating === undefined ||
      restaurant?.total_rating === null
    ) {
      try {
        await RestaurantFinder.delete(`./${id}`);

        // Update the state to remove the deleted restaurant
        setRestaurants((prevRestaurants) => {
          return prevRestaurants.filter((restaurant) => restaurant.id !== id);
        });
        setPopups((prevPopups) => [...prevPopups, "Delete Sccess!"]);
        setTimeout(() => {
          setPopups((prevPopups) => prevPopups.slice(1));
        }, 1500);
        console.log("Delete Success");
      } catch (error) {
        console.log(error);
      }
    } else {
      setPopups((prevPopups) => [...prevPopups, "Reviews Exist!"]);
      setTimeout(() => {
        setPopups((prevPopups) => prevPopups.slice(1));
      }, 1500);
    }
  };

  const handleOnRowClick = (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}`);
  };

  const handleUpdateBtn = (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  return (
    <>
      {popups.map((popup, index) => {
        if (popup === "Delete Sccess!") {
          return (
            <Popups
              key={index}
              className={"alert alert-success"}
              alertMessage={popup}
              style={{
                position: "absolute",
                marginTop: "10%",
                top: `${index * 70}px`,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 999,
              }}
            />
          );
        } else {
          return (
            <Popups
              key={index}
              className={"alert alert-warning"}
              alertMessage={popup}
              style={{
                position: "absolute",
                marginTop: "10%",
                top: `${index * 70}px`,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 999,
              }}
            />
          );
        }
      })}

      <div className="table-responsive">
        <table className="table table-hover table-dark">
          <thead>
            <tr className="table-primary">
              <th scope="col">Restaurant</th>
              <th scope="col">Location</th>
              <th scope="col">Price Range</th>
              <th scope="col">Rating</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {restaurants &&
              restaurants.map((restaurant) => {
                return (
                  <tr
                    onClick={(e) => handleOnRowClick(e, restaurant?.id)}
                    key={restaurant?.id}
                  >
                    <td className="align-middle">{restaurant?.name}</td>
                    <td className="align-middle">{restaurant?.location}</td>
                    <td className="align-middle">{restaurant?.price_range}</td>
                    <td className="text-warning align-middle">
                      {RenderStarRatingComponent(restaurant)}
                    </td>
                    <td className="align-middle">
                      <button
                        onClick={(e) =>
                          handleUpdateBtn(e, restaurant?.id, restaurant)
                        }
                        className="btn btn-warning"
                      >
                        Update
                      </button>
                    </td>
                    <td className="align-middle">
                      <button
                        onClick={(e) =>
                          handleDeleteBtn(e, restaurant?.id, restaurant)
                        }
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RestaurantList;
