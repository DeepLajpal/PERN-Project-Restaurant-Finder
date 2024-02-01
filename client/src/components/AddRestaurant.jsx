import { useRestaurantsContext } from "../context/RestaurantContext";

const AddRestaurant = () => {
  const {
    name,
    setName,
    location,
    setLocation,
    priceRange,
    setPriceRange,
  } = useRestaurantsContext();
  
  return (
    <div>
      <form action="">
        <div className="col justify-content-center align-items-center">
          <div className="col">
            <div className="form-floating mb-3 mt-2">
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
            <div className="form-floating mb-3 mt-3">
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
            <div className="form-floating mt-3" style={{ marginTop: "8px" }}>
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
              <label htmlFor="floatingSelectGrid">
                Select<span className="text-danger">*</span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
