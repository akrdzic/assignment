import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import numeral from 'numeral';

import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import ChartIcon from '@material-ui/icons/MultilineChart';
import DeleteIcon from '@material-ui/icons/Delete';
import Posts from "../../store/actions/Posts";

const styles = () => ({
    root: {
        backgroundColor: '#fff',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
        padding: 0
    },
    link: {
        textDecoration: 'none',
        color: '#111',
        flexGrow: 1,
        display: 'inline-flex'
    },
    nonLastPostListItem: {
        borderBottom: '1px solid #d3d3d3',
    }
});

const PostsList = props => {
    const { classes, postsList, deletePost } = props;

    return (
        <List className={classes.root}>
            { postsList.map((post, idx) => (
                <ListItem
                button
                key={post.id}
                className={ (idx < postsList.length - 1) ? classes.nonLastPostListItem : '' }
                >
                    <Link className={classes.link} to={`/post/${post.id}`}>
                        <ListItemAvatar>
                            <Avatar>
                                <ChartIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={post.name} secondary={` ${numeral(post.likes).format('0 a') } likes`} />
                    </Link>
                    {
                        post.canDelete && (
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="Delete"
                                    onClick={() => { deletePost(post.id) }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        )
                    }
                </ListItem>
            ))}
        </List>
    );
};

PostsList.propTypes = {
    classes: PropTypes.object,
    postsList: PropTypes.arrayOf(PropTypes.object),
    deletePost: PropTypes.func,
};

const mapStateToProps = ({ posts, auth }) => {
    const { list } = posts;
    const { isLoggedIn, userId } = auth;

    return {
        postsList: list.map(post => (
            Object.assign({
                canDelete: isLoggedIn && userId === post.userId,
            }, post)
        )),
    };
};

const mapDispatchToProps = (dispatch) => ({
    deletePost: postId => dispatch(Posts.deletePost(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostsList));
