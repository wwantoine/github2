import React from "react";
import { Modal } from "react-bootstrap";
import Markdown from "react-markdown";

const SingleIssue = ({ handleClose, show, issue, comments }) => {
  return (
    <div>
      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{issue.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Markdown source={issue.body} />
        </Modal.Body>
        <Modal.Footer>
          {comments &&
            comments.map((item) => (
              <li>
                <img
                  src={item.user.avatar_url}
                  alt="avatar"
                  style={{ width: "50px", height: "50px" }}
                />
                <p>
                  <Markdown source={item.body} />
                </p>
              </li>
            ))}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SingleIssue;
