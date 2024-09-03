import React, { useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useRestaurantsContext } from "../context/RestaurantContext";

const UpdateRestaurant = ({ restaurant }) => {
  const {
    setRestaurants,
    updatedName,
    setUpdatedName,
    updatedLocation,
    setUpdatedLocation,
    updatedPriceRange,
    setUpdatedPriceRange,
  } = useRestaurantsContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response2 = await RestaurantFinder.get("/");
        setRestaurants(response2.data.data.restaurant);
        setUpdatedName(restaurant?.name);
        setUpdatedLocation(restaurant?.location);
        setUpdatedPriceRange(restaurant?.price_range);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <form action="">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name<span className="text-danger">*</span>
          </label>
          <input
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value.toUpperCase())}
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
            value={updatedLocation}
            onChange={(e) => setUpdatedLocation(e.target.value)}
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
            value={updatedPriceRange}
            onChange={(e) => setUpdatedPriceRange(e.target.value)}
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
      </form>
    </div>
  );
};

export default UpdateRestaurant;
