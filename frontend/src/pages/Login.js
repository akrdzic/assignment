import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Container } from '@material-ui/core';

import Auth from '../store/actions/Auth';

const styles = theme => ({
    container: {
        padding: theme.spacing(2),
    },
    submitBtn: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
});

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    componentDidUpdate() {
        const { isUserLoggedIn, history } = this.props;
        if (isUserLoggedIn) {
            history.push('/');
        }
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const { login } = this.props;

        const { email, password } = this.state;

        login(email, password);
    };

    render() {
        const { classes } = this.props;
        const { email, password } = this.state;

        return (
            <Container maxWidth="xs" className={classes.container}>
                <form onSubmit={this.onSubmit}>
                    <TextField
                        required
                        name="email"
                        label="Email"
                        type="email"
                        margin="normal"
                        autoComplete="username"
                        value={email}
                        onChange={this.onInputChange}
                    />
                    <TextField
                        required
                        name="password"
                        label="Password"
                        type="password"
                        margin="normal"
                        autoComplete="current-password"
                        value={password}
                        onChange={this.onInputChange}
                    />
                    <Button className={classes.submitBtn} color="primary" variant="outlined" type="submit">
                        Login
                    </Button>
                    <div>
                        <span>Don't have an account yet? </span>
                        <Link to="/signup">
                            <Button color="primary">Sign up</Button>
                        </Link>
                    </div>
                </form>
            </Container>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object,
    login: PropTypes.func,
    isUserLoggedIn: PropTypes.bool,
};

const mapStateToProps = state => ({
    isUserLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
    login: (email, password) => dispatch(Auth.login(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
