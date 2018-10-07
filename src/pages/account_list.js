import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import config from "../config";
import AccountTable from "../table/account";
import TransactionsDialog from "../dialogs/transactions";
import TransferDialog from "../dialogs/transfer";
const headers = { Authorization: "Bearer test" };

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6
  }
});

class AccountList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      transactions: [{}],
      openTransaction: false,
      openTransfer: false
    };
    this.handleTransactionsOpen = this.handleTransactionsOpen.bind(this);
    this.handleTransferOpen = this.handleTransferOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount = () => {
    fetch(`${config.backend.baseUri}/accounts`, {
      method: "GET",
      headers
    })
      .then(res => res.json())
      .then(json => this.setState({ accounts: Object.values(json) }))
      .catch(e => this.setState({ accounts: "エラーが発生しました" }));
  };
  handleTransactionsOpen = () => {
    this.setState({ openTransaction: true });
  };
  handleTransferOpen = () => {
    this.setState({ openTransfer: true });
  };
  handleClose = () => {
    this.setState({ openTransaction: false });
    this.setState({ openTransfer: false });
  };

  render() {
    const { classes, handleLogout } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              振込アプリ
            </Typography>
            <Button color="inherit" onClick={() => handleLogout()}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography
                variant="display3"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                口座一覧
              </Typography>
              <Typography
                variant="title"
                align="center"
                color="textSecondary"
                paragraph
              >
                ＮＮＮＮＮＮＮＮＮＮＮＮＮＮＮ
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.handleTransferOpen()}
                    >
                      振込
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => this.handleTransactionsOpen()}
                    >
                      取引履歴
                    </Button>
                  </Grid>
                  {this.state.openTransaction ? (
                    <TransactionsDialog
                      openTransaction={this.state.openTransaction}
                      handleClose={this.handleClose}
                    />
                  ) : (
                    ""
                  )}
                  {this.state.openTransfer ? (
                    <TransferDialog
                      openTransfer={this.state.openTransfer}
                      handleClose={this.handleClose}
                    />
                  ) : (
                    ""
                  )}
                </Grid>
              </div>
            </div>
          </div>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            {/* End hero unit */}
            <Grid container justify="center" spacing={40}>
              <Card className={classes.card}>
                {Object.entries(this.state.transactions[0])}
                <AccountTable accounts={this.state.accounts} />
              </Card>
            </Grid>
          </div>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography
            variant="subheading"
            align="center"
            color="textSecondary"
            component="p"
          >
            footer!
          </Typography>
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }
}

AccountList.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default withStyles(styles)(AccountList);
