import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import { Toolbar, Typography, Button } from '@material-ui/core';
import MUIAppBar from '@material-ui/core/AppBar';
import { AccountCircle } from '@material-ui/icons';

const styles = () => ({
    title: {
        flexGrow: 1,
    }
});

const AppBar = props => {
    const { classes, isUserLoggedIn, userEmail } = props;

    return (<MUIAppBar position="static" color="secondary">
        <Toolbar>
            <Typography variant="h6" className={classes.title}>Chart posts</Typography>
            { isUserLoggedIn && <AccountCircle />  }
            { isUserLoggedIn &&  <Typography>{userEmail}</Typography>  }
            { !isUserLoggedIn && <Link to="/login"><Button color="inherit"> Login </Button></Link> }
            { !isUserLoggedIn && <Link to="/signup"><Button color="inherit"> Sign up </Button></Link> }
        </Toolbar>
    </MUIAppBar>);
};

AppBar.propTypes = {
    classes: PropTypes.object,
    isUserLoggedIn: PropTypes.bool,
    userEmail: PropTypes.string,
};

const mapStateToProps = state => ({
    isUserLoggedIn: state.auth.isLoggedIn,
    userEmail: state.auth.email,
});

export default connect(mapStateToProps)(withStyles(styles)(AppBar));
