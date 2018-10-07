import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";

import config from "../config";
const headers = { Authorization: "Bearer test" };

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const styles = theme => {};
class TransactionsDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  }

  componentDidMount = () => {
    fetch(`${config.backend.baseUri}/transactions?account_number=12345`, {
      method: "GET",
      headers
    })
      .then(res => res.json())
      .then(json => this.setState({ transactions: json }))
      .catch(e => this.setState({ transactions: "エラーが発生しました" }));
  };

  render() {
    const { classes } = this.props;
    return (
      <Dialog
        open={this.props.openTransaction}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"取引履歴一覧"}
        </DialogTitle>
        <DialogContent>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>摘要</CustomTableCell>
                <CustomTableCell numeric>取引金額</CustomTableCell>
                <CustomTableCell>状態</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.transactions.map(t => (
                <TableRow className={classes.row} key={t.id}>
                  <CustomTableCell>{t.summary}</CustomTableCell>
                  <CustomTableCell numeric>{t.amount}</CustomTableCell>
                  <CustomTableCell>
                    {t.is_available ? "正常" : "エラー"}
                  </CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

TransactionsDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  openTransaction: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default withStyles(styles)(TransactionsDialog);
