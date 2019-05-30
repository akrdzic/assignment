import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MultiSelector from '../form/MultiSelector';

import PostSelection from '../../store/actions/PostSelection';


class PostComparablePostsSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comparablePostsOptions: [],
        };
    }

    componentDidMount() {
        const { queryComparablePosts, userId } = this.props;

        queryComparablePosts('', userId);
    }

    loadComparableOptions =  inputValue => {
        const { queryComparablePosts, userId } = this.props;

        queryComparablePosts(inputValue, userId);
    };

    onChangeComparablePostOptions = (selectedComparablePostsOptions) => {
        const {
            comparablePostsQueryResults,
            setSelectedComparablePosts,
        } = this.props;

        // Merge old and new selected options
        const selectedComparablePosts = selectedComparablePostsOptions ? selectedComparablePostsOptions
            .map(scpo => comparablePostsQueryResults.find(cp => cp.id === scpo.value)) : [];

        setSelectedComparablePosts(selectedComparablePosts);
    };

    render() {
        const { comparablePostsOptions } = this.props;
        return (
            <MultiSelector
                placeholder="Compare with"
                options={comparablePostsOptions}
                onChange={this.onChangeComparablePostOptions}
                onInputChange={this.loadComparableOptions}
            />
        );
    }
}

PostComparablePostsSelector.propTypes = {
    post: PropTypes.object,
    comparablePostsQueryResults: PropTypes.arrayOf(PropTypes.object),
    queryComparablePosts: PropTypes.func,
    setSelectedComparablePosts: PropTypes.func,
    userId: PropTypes.number,
};

const mapStateToProps = state => {
    const { post, comparablePostsQueryResults } =  state.postSelection;
    const { userId } = state.auth;
    return {
        post,
        comparablePostsQueryResults,
        userId,
        comparablePostsOptions: comparablePostsQueryResults.map(p => ({ value: p.id, label: p.name })),
    };
};

const mapDispatchToProps = dispatch => ({
    queryComparablePosts: (q, userId) => dispatch(PostSelection.queryComparablePosts(q, userId)),
    setSelectedComparablePosts: (selectedPosts) => dispatch(PostSelection.setSelectedComparablePosts(selectedPosts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostComparablePostsSelector);
