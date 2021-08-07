import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const SendImage = (props) => {
  const [show, setShow] = useState(false);
  const [ImageUrl, setImageUrl] = useState(null);

  const handleClose = (base64) => {
    sendImageBase64(base64);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  // const handleFile = (e) => {
  //   console.log(e.target.files);
  // };

  // useEffect(() => {
  //   console.log(props);
  // }, [props]);

  //https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const imageShow = async (e) => {
    let allow_type = ["image/png", "image/jpeg"];
    if (allow_type.includes(e.target.files[0].type)) {
      console.log(e.target.files[0]);
      setImageUrl(await toBase64(e.target.files[0]));
    } else {
      console.log("not allow this type");
      Swal.fire({
        icon: "error",
        title: "File Type Not Allow",
        text: `please try again`,
      });
    }
  };

  const sendImageBase64 = (base64) => {
    props.dispatch({
      type: "add_message",
      data: {
        room_key: props.obj.room_key,
        author: localStorage.getItem("username"),
        author_id: localStorage.getItem("username_key"),
        content: base64,
        content_type: "image",
        timeStamp:new Date().toJSON(),
      },
    });
  };

  return (
    <>
      <div onClick={handleShow} className="btn btn-success border-0">
        <i class="fas fa-file-image"></i>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            {/* <Form.Label>Default file input example</Form.Label> */}
            <Form.Control type="file" onChange={imageShow} />
          </Form.Group>
          {ImageUrl !== null ? (
            <img src={ImageUrl} width="100%" alt="PreviewImage" />
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
