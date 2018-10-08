import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({});
class AuthorizationDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleNotApprove}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"terarara Bankが下記の許可を求めています"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            口座情報へのアクセス
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            取引情報へのアクセス
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            振込実行
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleNotApprove} color="primary">
            許可しない
          </Button>
          <Button onClick={this.props.handleApprove} color="primary" autoFocus>
            許可する
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AuthorizationDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleApprove: PropTypes.func.isRequired,
  handleNotApprove: PropTypes.func.isRequired
};

export default withStyles(styles)(AuthorizationDialog);
