import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useRestaurantsContext } from "../context/RestaurantContext";
import { LuUtensilsCrossed } from "react-icons/lu";

const CustomModal = ({
  value,
  modalOpenBtnName,
  modalCloseBtnName,
  title,
  modalOpenBtnColor,
  modalCloseBtnFunction,
  functionParam,
}) => {
  const { setModalDisplay } = useRestaurantsContext();
  const [show, setShow] = useState(false);

  const handleShow = (e) => {
    e.stopPropagation();
    setShow(true);
  };
  const handleClose = (e) => {
    // e.stopPropagation();
    setShow(false);
  };

  const handleClickWithThreeArgs = async (e, id, restaurant) => {
    e.stopPropagation();
    if (modalCloseBtnFunction) {
      // Call modalCloseBtnFunction and wait for it to complete
      await modalCloseBtnFunction(e, id, restaurant);

      // Update the modalDisplay state using a callback function
      setModalDisplay((prevModalDisplay) => {
        // Close the modal if modalDisplay is false
        if (prevModalDisplay === false) {
          setShow(false);
        }

        return prevModalDisplay; // Return the previous state value
      });
    } else {
      console.log("No Change");
    }
  };

  const handleClickWithOneArgs = async (e) => {
    e.stopPropagation();
    if (modalCloseBtnFunction) {
      // Call modalCloseBtnFunction and wait for it to complete
      await modalCloseBtnFunction(e);

      // Update the modalDisplay state using a callback function
      setModalDisplay((prevModalDisplay) => {
        // Close the modal if modalDisplay is false
        if (prevModalDisplay === false) {
          setShow(false);
        }

        return prevModalDisplay; // Return the previous state value
      });
    } else {
      console.log("No Change");
    }
  };

  return (
    <>
      <Button variant={modalOpenBtnColor} onClick={(e) => handleShow(e)}>
        {modalOpenBtnName}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title onClick={(e) => e.stopPropagation()}>
            {title}
          </Modal.Title>
          <Button variant="dark" onClick={handleClose}>
            <LuUtensilsCrossed />
          </Button>
        </Modal.Header>
        <Modal.Body onClick={(e) => e.stopPropagation()}>{value}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={(e) =>
              typeof functionParam?.restaurant === "object"
                ? handleClickWithThreeArgs(
                    e,
                    functionParam?.restaurant?.id,
                    functionParam?.restaurant
                  )
                : handleClickWithOneArgs(e)
            }
          >
            {modalCloseBtnName}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomModal;
