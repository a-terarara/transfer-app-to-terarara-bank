import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

let id = 0;
function createData(account) {
  id += 1;
  return {
    id,
    account_no: account[0],
    account_name: account[1],
    address: account[2],
    tel_no: account[3]
  };
}

class AccountTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, accounts } = this.props;
    const rows = [createData(accounts)];

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>口座番号</CustomTableCell>
              <CustomTableCell numeric>名前</CustomTableCell>
              <CustomTableCell numeric>住所</CustomTableCell>
              <CustomTableCell numeric>電話番号</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => {
              return (
                <TableRow className={classes.row} key={row.id}>
                  <CustomTableCell component="th" scope="row">
                    {row.account_no}
                  </CustomTableCell>
                  <CustomTableCell numeric>{row.account_name}</CustomTableCell>
                  <CustomTableCell numeric>{row.address}</CustomTableCell>
                  <CustomTableCell numeric>{row.tel_no}</CustomTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

AccountTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountTable);
