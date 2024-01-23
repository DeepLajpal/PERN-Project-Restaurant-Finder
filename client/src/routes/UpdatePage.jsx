import React from "react";
import UpdateRestaurant from "../components/UpdateRestaurant";

const UpdatePage = () => {
  return (
    <>
      <div className="container mx-auto p-2"  style={{ transform: "translateY(20%)", width: "50vw" }}>
        <h1 className="text-center" style={{ marginBottom : "3rem"}}>Update Restaurant</h1>
        <UpdateRestaurant />
      </div>
    </>
  );
};

export default UpdatePage;
