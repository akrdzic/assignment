import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import UploadIcon from '@material-ui/icons/CloudUpload';

import Posts from '../store/actions/Posts';

const styles = (theme) => ({
    fab: {
        margin: theme.spacing(1),
    },
    fileInput: {
        display: 'none',
    },
});

class UploadPostBtn extends Component {

    onFileUploadClicked = () => {
        this.fileUpload.value = null;
        this.fileUpload.click();
    };

    onFileSelected = event => {
        const { files } = event.target;
        const { uploadPostFromFile } = this.props;
        uploadPostFromFile(files[0]);
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.onFileUploadClicked}>
                    <UploadIcon />
                </Fab>
                <input
                    id="file-uploader"
                    className={classes.fileInput}
                    type="file"
                    ref={ref => (this.fileUpload = ref)}
                    onChange={this.onFileSelected}
                    accept=".csv"
                />
            </div>
        );
    }
}

UploadPostBtn.propTypes = {
    classes: PropTypes.object,
    uploadPostFromFile: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
    uploadPostFromFile: (file) => dispatch(Posts.uploadPostFromFile(file)),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(UploadPostBtn));
