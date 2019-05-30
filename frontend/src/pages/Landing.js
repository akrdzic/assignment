import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import {
    Container,
    CssBaseline,
    Grid,
    Toolbar,
} from '@material-ui/core';

import AppBar from '../components/AppBar';
import PostsList from '../components/posts-list/PostsList';

import Posts from '../store/actions/Posts';
import UploadPostBtn from '../components/UploadPostBtn';

const styles = theme => ({
    container: {
        padding: theme.spacing(2),
    },
    toolbar: {
        padding: 0,
        display: 'flex',
        justifyContent: 'flex-end'
    }
});

class Landing extends Component {
    componentDidMount() {
        const { retrievePosts } = this.props;
        retrievePosts();
    }

    render() {
        const { classes, isUserLoggedIn } = this.props;

        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar />
                <Container>
                    <Grid container className={classes.container} direction="column" spacing={2}>
                        <Grid item>
                            <Toolbar className={classes.toolbar}>
                                { isUserLoggedIn && <UploadPostBtn />  }
                            </Toolbar>
                        </Grid>
                        <Grid item>
                            <PostsList />
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

Landing.propTypes = {
    classes: PropTypes.object,
    retrievePosts: PropTypes.func,
    isUserLoggedIn: PropTypes.bool,
};

const mapStateToProps = state => ({
    isUserLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
    retrievePosts: () => dispatch(Posts.retrievePosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Landing));
