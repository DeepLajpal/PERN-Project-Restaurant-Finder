import React from "react";
import Popups from "./Popups";
import { useRestaurantsContext } from "../context/RestaurantContext";

const RenderPopup = () => {
  const { popups } = useRestaurantsContext();


  return (
    <div>
      {popups?.map((popup, index) => {
        if (
          popup === "All Details are Mandatory!" ||
          popup === "Restaurant Already Exist!" ||
          popup === "Reviews Exist!" 
        ) {
          return (
            <Popups
              alertMessage={popup}
              className={"alert alert-warning"}
              key={index}
              style={{
                position: "fixed",
                marginTop: "10%",
                marginBottom: "5%",
                bottom: `${index * 70}px`,
                left: "14%",
                transform: "translateX(-40%)",
                zIndex: "9999",
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
                position: "fixed",
                marginTop: "10%",
                marginBottom: "5%",
                bottom: `${index * 70}px`,
                left: "14%",
                transform: "translateX(-40%)",
                zIndex: "9999",
              }}
            />
          );
        }
      })}
    </div>
  );
};

export default RenderPopup;
