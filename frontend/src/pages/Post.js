import React, { Component } from 'react';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import { Container, CssBaseline } from '@material-ui/core';

import AppBar from '../components/AppBar';
import PostDetails from '../components/post/Post';

import PostSelection from '../store/actions/PostSelection';

const styles = () => ({
    container: {
        paddingTop: 32,
    }
});

class Post extends Component {
    componentDidMount() {
        const { retrievePost, match } = this.props;
        const postId = Number.parseInt(match.params.postId, 10);
        retrievePost(postId);
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar />
                <Container className={classes.container}>
                    <br />
                    <PostDetails />
                </Container>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    post: state.postSelection.post,
});

const mapDispatchToProps = (dispatch) => ({
    retrievePost: (postId) => dispatch(PostSelection.retrievePost(postId)),
});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Post));
