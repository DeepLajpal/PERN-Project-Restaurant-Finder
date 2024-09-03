import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useRestaurantsContext } from "../context/RestaurantContext";
import { LuUtensilsCrossed } from "react-icons/lu";
import PropTypes from "prop-types";

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
    e.stopPropagation();
    setShow(false);
  };

  const handleModalClose = async (e, id, restaurant) => {
    e.stopPropagation();

    if (modalCloseBtnFunction) {
      if (restaurant) {
        await modalCloseBtnFunction(e, id, restaurant);
      } else {
        await modalCloseBtnFunction(e);
      }

      setModalDisplay((prevModalDisplay) => {
        if (!prevModalDisplay) {
          setShow(false);
        }
        return prevModalDisplay;
      });
    } else {
      console.log("No Change");
    }
  };

  return (
    <>
      <Button variant={modalOpenBtnColor} onClick={handleShow}>
        {modalOpenBtnName}
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
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
              handleModalClose(
                e,
                functionParam?.restaurant?.id,
                functionParam?.restaurant
              )
            }
          >
            {modalCloseBtnName}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

CustomModal.propTypes = {
  value: PropTypes.node.isRequired,
  modalOpenBtnName: PropTypes.string.isRequired,
  modalCloseBtnName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  modalOpenBtnColor: PropTypes.string,
  modalCloseBtnFunction: PropTypes.func,
  functionParam: PropTypes.shape({
    restaurant: PropTypes.object,
  }),
};

export default CustomModal;
