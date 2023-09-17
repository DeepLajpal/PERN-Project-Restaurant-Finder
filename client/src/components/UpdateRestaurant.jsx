import React, { useEffect, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateRestaurant = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Select Price Range");
  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`./${params.id}`);
        console.log(response?.data.data.restaurant[0]);
        setName(response?.data.data.restaurant[0].name);
        setLocation(response?.data.data.restaurant[0].location);
        setPriceRange(response?.data.data.restaurant[0].price_range);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleOnSubmit = async (e) => {
    
    try {
      e.preventDefault();
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
  };

  return (
    <div>
      <form action="">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
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
            Price Range :
          </label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="my-1 mr-sm-2 form-select mb-3"
            id="price-range"
          >
            <option disabled>Price Range</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
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
  );
};

export default UpdateRestaurant;
