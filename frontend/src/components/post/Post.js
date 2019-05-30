import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import numeral from 'numeral';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Toolbar, IconButton } from '@material-ui/core';
import LikeIcon from '@material-ui/icons/Favorite'

import PostChart from './PostChart';
import PostComparablePostsSelector from './PostComparablePostsSelector';

import PostSelection from '../../store/actions/PostSelection';

const styles = (theme) => ({
    compareSelector: {
        flexGrow: 1,
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    caption: {
        flexGrow: 1,
    }
});

const Post = props => {
    const { post, classes, canLike, canCompare, likePost } = props;

    if (!post) {
        return null;
    }

    return (
        <div>
            <Grid container alignItems="stretch" direction="column" spacing={4}>
                <Grid item className={classes.titleContainer}>
                    <Typography variant="h4">
                        { post.name }
                    </Typography>
                </Grid>
                <Grid item>
                    <div className={classes.compareSelector}>
                        { canCompare &&  <PostComparablePostsSelector /> }
                    </div>
                </Grid>
                <Grid item>
                    <PostChart />
                </Grid>
                <Grid item>
                    <Toolbar>
                        <Typography className={classes.caption} variant="caption">
                            { `by ${post.userFullName}` }
                        </Typography>
                        {
                            canLike ? (<IconButton onClick={() => { likePost(post.id) }}>
                                <LikeIcon color="primary" />
                            </IconButton>) : <LikeIcon color="primary" />
                        }
                        <Typography variant="body1">
                            { numeral(post.likes).format('0 a') }
                        </Typography>
                    </Toolbar>
                </Grid>
            </Grid>
        </div>
    );
};

Post.propTypes = {
    classes: PropTypes.object,
    post: PropTypes.object,
    canLike: PropTypes.bool,
    canCompare: PropTypes.bool,
};

const mapStateToProps = ({ postSelection, auth }) => {
    const { post } = postSelection;
    const { isLoggedIn, userId } = auth;

    return {
        post,
        canLike: post && post.userId !== userId,
        canCompare: post && isLoggedIn && post.userId !== userId,
    };
};

const mapDispatchToProps = dispatch => ({
    likePost: postId => dispatch(PostSelection.likePost(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Post));
