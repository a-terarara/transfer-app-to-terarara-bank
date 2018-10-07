import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => {};
class TransferDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Dialog
        open={this.props.openTransfer}
        onClose={this.props.handleClose}
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
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="to_bank_code"
            label="振込先金融機関コード"
            type="string"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="to_branch_code"
            label="振込先支店コード"
            type="string"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="to_account_number"
            label="振込先口座番号"
            type="string"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="amount"
            label="振込金額"
            type="string"
            fullWidth
          />
          <TextField
            margin="dense"
            id="memo"
            label="備考"
            type="string"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.props.handleClose} color="primary">
            振込
          </Button>
        </DialogActions>
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
