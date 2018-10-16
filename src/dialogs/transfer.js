import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";

import config from "../config";
import ConfirmDialog from "./confirm";

const styles = theme => {};
class TransferDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from_account_number: "",
      to_bank_code: "",
      to_branch_code: "",
      to_account_number: "",
      amount: "",
      memo: "",
      isConfirm: false,
      transfer_id: ""
    };
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleTransfer = () => {
    const headers = {
      Authorization: "Bearer test",
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = JSON.stringify({ ...this.state });
    fetch(`${config.backend.baseUri}/transfer`, {
      method: "POST",
      body,
      headers
    })
      .then(res => (res.ok ? res.json() : new Error(res.json())))
      .then(json => {
        this.setState({ transfer_id: json.transfer_id });
        this.setState({ isConfirm: true });
      })
      .catch(e => console.log(e));
  };
  render() {
    const { openTransfer, handleClose } = this.props;
    const { isConfirm, transfer_id } = this.state;
    return (
      <Dialog
        open={openTransfer}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">振込</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="from_account_number"
            label="振込元口座番号"
            type="string"
            value={this.state.from_account_number}
            onChange={this.handleChange("from_account_number")}
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="to_bank_code"
            label="振込先金融機関コード"
            type="string"
            value={this.state.to_bank_code}
            onChange={this.handleChange("to_bank_code")}
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="to_branch_code"
            label="振込先支店コード"
            type="string"
            value={this.state.to_branch_code}
            onChange={this.handleChange("to_branch_code")}
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="to_account_number"
            label="振込先口座番号"
            value={this.state.to_account_number}
            onChange={this.handleChange("to_account_number")}
            type="string"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="amount"
            label="振込金額"
            type="string"
            value={this.state.amount}
            onChange={this.handleChange("amount")}
            fullWidth
          />
          <TextField
            margin="dense"
            id="memo"
            label="備考"
            type="string"
            value={this.state.memo}
            onChange={this.handleChange("memo")}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleTransfer} color="primary">
            確認
          </Button>
        </DialogActions>
        {isConfirm ? (
          <ConfirmDialog
            isConfirm={isConfirm}
            transfer_id={transfer_id}
            handleClose={handleClose}
          />
        ) : (
          ""
        )}
      </Dialog>
    );
  }
}
TransferDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  openTransfer: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default withStyles(styles)(TransferDialog);
