import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const SendImage = (props) => {
  const [show, setShow] = useState(false);
  const [ImageUrl, setImageUrl] = useState(null);
  const handleShow = () => setShow(true);

  const handleClose = (url) => {
    sendImageUrl(url);
    setShow(false);
  };

//   useEffect(() => {
//     console.log(props);
//   }, [props]);

  const sendImageUrl = (url) => {
    props.dispatch({
      type: "add_message",
      data: {
        room_key: props.obj.room_key,
        author: localStorage.getItem("username"),
        author_id: localStorage.getItem("username_key"),
        content: url,
        content_type: "image",
        timeStamp: new Date().toJSON(),
      },
    });
  };

  return (
    <>
      <div onClick={handleShow} className="btn btn-warning border-0">
        <i class="fas fa-link"></i>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Image URL</Form.Label>
              <Form.Control value={ImageUrl} onChange={(v)=>setImageUrl(v.target.value)} type="url" placeholder="URL" />
            </Form.Group>
          </Form>
          {ImageUrl !== null !== 0 ? (
            <img src={ImageUrl} alt="image Preview" width="100%"></img>
          ) : (
            ""
          )}
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => setImageUrl(null)}>
            Clear
          </Button>
          {ImageUrl !== null ? (
            <Button variant="primary" onClick={() => handleClose(ImageUrl)}>
              Send Image
            </Button>
          ) : (
            ""
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

const map_data = (state) => {
  return {
    redux: state,
  };
};

export default connect(map_data)(SendImage);
