import React, { useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useRestaurantsContext } from "../context/RestaurantContext";
import Popups from "./Popups";

const AddRestaurant = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  const { addRestaurant } = useRestaurantsContext();
  const [popups, setPopups] = useState([]);
  const { restaurants, setRestaurants } = useRestaurantsContext();
  const [alreadyExisted, setAlreadyExisted] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (name && location && priceRange !== "Price Range") {
        const exists = restaurants?.some(
          (restaurant) =>
            restaurant.name === name &&
            restaurant.location === location &&
            restaurant.price_range === priceRange
        );

        if (exists) {
          setAlreadyExisted(true);
          setPopups((prevPopups) => [
            ...prevPopups,
            "Restaurant Already Exist!",
          ]);
          setTimeout(() => {
            setPopups((prevPopups) => prevPopups.slice(1));
          }, 1500);
        } else {
          // All details are valid, and the restaurant doesn't exist
          const response = await RestaurantFinder.post("/", {
            name,
            location,
            price_range: priceRange,
          });

          addRestaurant(response.data.data.restaurant);
          console.log(restaurants);

          setPopups((prevPopups) => [
            ...prevPopups,
            "Restaurant Adding Success!",
          ]);
          setTimeout(() => {
            setPopups((prevPopups) => prevPopups.slice(1));
          }, 1500);
        }
      } else {
        setAlreadyExisted(false);
        setPopups((prevPopups) => [
          ...prevPopups,
          "All Details are Mandatory!",
        ]);
        setTimeout(() => {
          setPopups((prevPopups) => prevPopups.slice(1));
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {popups?.map((popup, index) => {
        if (
          popup === "All Details are Mandatory!" ||
          popup === "Restaurant Already Exist!"
        ) {
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

      <div className="mb-4">
        <form action="">
          <div className="row justify-content-center align-items-center">
            <div className="col">
              <div className="form-floating mb-3 mt-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value.toUpperCase())}
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Name*"
                />
                <label htmlFor="floatingInput">
                  Name<span className="text-danger">*</span>
                </label>
              </div>
            </div>
            <div className="col">
              <div className="form-floating mb-3 mt-4">
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Location*"
                />
                <label htmlFor="floatingInput">
                  Location<span className="text-danger">*</span>
                </label>
              </div>
            </div>

            <div className="col-md">
              <div className="form-floating" style={{marginTop : "8px"}}>
                <select
                  className="form-select"
                  id="floatingSelectGrid"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  style={{ cursor: "pointer" }}
                >
                  <option defaultValue>Price Range</option>
                  <option value="₹10 - ₹1.5K">₹10 - ₹1.5K</option>
                  <option value="₹1.5K - ₹3K">₹1.5K - ₹3K</option>
                  <option value="₹3K - ₹4.5K">₹3K - ₹4.5K</option>
                  <option value="₹4.5K - ₹6K">₹4.5K - ₹6K</option>
                  <option value="₹6K - 10K">₹6K - 10K</option>
                </select>
                <label htmlFor="floatingSelectGrid">Select<span className="text-danger">*</span></label>
              </div>
            </div>

            <div className="col">
              <button onClick={handleOnSubmit} className="btn btn-primary btn-lg" style={{marginTop : "8px"}}>
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRestaurant;
