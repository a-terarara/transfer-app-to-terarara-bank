import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";

import config from "../config";

const styles = theme => {};
class ComfirmDialog extends React.Component {
  state = {};

  confirmTransferClick = () => {
    const headers = {
      Authorization: "Bearer test",
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = JSON.stringify({ transfer_id: this.props.transfer_id });
    fetch(`${config.backend.baseUri}/transfer`, {
      method: "PUT",
      body,
      headers
    })
      .then(res => (res.ok ? res.json() : new Error(res.json())))
      .then(json => {
        console.log("振込成功" + json.message);
        this.props.handleClose();
      })
      .catch(e => console.log(e));
  };

  render() {
    const { isConfirm, transfer_id, handleClose } = this.props;
    return (
      <Dialog
        open={isConfirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {transfer_id}
          へ振込しますか？
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.confirmTransferClick} color="primary" autoFocus>
            振込
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ComfirmDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  isConfirm: PropTypes.bool.isRequired,
  transfer_id: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default withStyles(styles)(ComfirmDialog);
