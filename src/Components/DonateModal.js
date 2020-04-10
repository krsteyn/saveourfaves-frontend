import React from "react";
import { Modal } from "antd";
import Constants from "../Constants";

function DonateModal(props) {
  return (
    <Modal
      title="Donate to a local"
      visible={props.shouldShow}
      onOk={props.onClose}
      width="80%"
      onCancel={props.onClose}
      footer={<span></span>}
    >
      <title>Coming Soon</title>
    </Modal>
  );
}

export default DonateModal;
