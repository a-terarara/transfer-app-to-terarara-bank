import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import SendIcon from "@material-ui/icons/Send";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import AuthDialog from "../dialogs/authorization";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class BankList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorization: false
    };
    this.handleApprove = this.handleApprove.bind(this);
    this.handleOnBank = this.handleOnBank.bind(this);
    this.handleNotApprove = this.handleNotApprove.bind(this);
  }
  handleApprove = () => {
    this.props.handleChangeBank();
  };
  handleOnBank = () => {
    this.setState({ isAuthorization: true });
  };
  handleNotApprove = () => {
    this.setState({ isAuthorization: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AccountBalanceIcon />
            </Avatar>
            <Typography variant="headline">銀行を選択してください</Typography>
            <form className={classes.form}>
              <List>
                <ListItem button onClick={this.handleOnBank}>
                  <ListItemIcon>
                    <SendIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="terarara Bank" />
                </ListItem>
              </List>
              {this.state.isAuthorization ? (
                <AuthDialog
                  open={this.state.isAuthorization}
                  handleApprove={this.handleApprove}
                  handleNotApprove={this.handleNotApprove}
                />
              ) : (
                ""
              )}
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

BankList.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChangeBank: PropTypes.func.isRequired
};

export default withStyles(styles)(BankList);
