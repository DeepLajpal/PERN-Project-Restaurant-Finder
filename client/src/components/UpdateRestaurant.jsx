import React, { useEffect, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRestaurantsContext } from "../context/RestaurantContext";
import Popups from "../components/Popups";

const UpdateRestaurant = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  const navigate = useNavigate();
  const { restaurants } = useRestaurantsContext();
  const [popups, setPopups] = useState([]);

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`./${params.id}`);
        setName(response?.data.data.restaurant.name);
        setLocation(response?.data.data.restaurant.location);
        setPriceRange(response?.data.data.restaurant.price_range);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("restaurants:", restaurants);

    if (name && location && priceRange !== "Price Range") {
      try {
        const response = await RestaurantFinder.put(`./${params.id}`, {
          name,
          location,
          price_range: priceRange,
        });
        navigate("/");
        console.log("Update Succesfully");
      } catch (error) {
        console.log(error);
      }
    } else {
      setPopups((prevPopups) => [...prevPopups, "All details are Mandatory!"]);

      setTimeout(() => {
        setPopups((prevPopups) => prevPopups.slice(1));
      }, 1500);
    }
  };

  return (
    <>
      {popups?.map((popup, index) => {
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
      })}

      <div>
        <form action="">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name<span className="text-danger">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
              type="text"
              id="name"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location<span className="text-danger">*</span>
            </label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              id="location"
              className="form-control"
            />
          </div>
          <div className="col-auto">
            <label htmlFor="price-range" className="form-label">
              Select<span className="text-danger">*</span>
            </label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="my-1 mr-sm-2 form-select mb-3"
              id="price-range"
            >
              <option defaultValue>Price Range</option>
              <option value="₹10 - ₹1.5K">₹10 - ₹1.5K</option>
              <option value="₹1.5K - ₹3K">₹1.5K - ₹3K</option>
              <option value="₹3K - ₹4.5K">₹3K - ₹4.5K</option>
              <option value="₹4.5K - ₹6K">₹4.5K - ₹6K</option>
              <option value="₹6K - 10K">₹6K - 10K</option>
            </select>
          </div>

          <div className="col">
            <button to="/" onClick={handleOnSubmit} className="btn btn-primary">
              Submit
            </button>
            <div />
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateRestaurant;
