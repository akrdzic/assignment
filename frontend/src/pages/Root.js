import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Auth from '../store/actions/Auth';

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#FFF'
        },
        primary: {
            main: '#0074e8'
        }
    }
});

class Root extends Component {
    componentDidMount() {
        const { getLoginStatus } = this.props;

        getLoginStatus();
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                {this.props.children}
            </MuiThemeProvider>

        );
    }
}

Root.propTypes = {
    classes: PropTypes.object,
    getLoginStatus: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
    getLoginStatus: () => dispatch(Auth.getLoginStatus()),
});

export default connect(null, mapDispatchToProps)(Root);
