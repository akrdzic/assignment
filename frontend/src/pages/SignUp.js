import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Container } from '@material-ui/core';

import Auth from "../store/actions/Auth";

const styles = theme => ({
    container: {
        padding: theme.spacing(4),
    },
    submitBtn: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
});

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
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

        const { register } = this.props;

        const { email, password, firstName, lastName } = this.state;

        register(email, password, firstName, lastName);
    };

    render() {
        const { classes } = this.props;
        const { email, password, firstName, lastName } = this.state;

        return (
            <Container maxWidth="xs" className={classes.container}>
                <form onSubmit={this.onSubmit}>
                    <TextField
                        name="firstName"
                        label="First Name"
                        margin="normal"
                        value={firstName}
                        onChange={this.onInputChange}
                    />
                    <TextField
                        name="lastName"
                        label="Last Name"
                        margin="normal"
                        value={lastName}
                        onChange={this.onInputChange}
                    />
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
                        Sign up
                    </Button>
                    <div>
                        <span>Already have a personal account?</span>
                        <Link to="/login">
                            <Button color="primary">Log in</Button>
                        </Link>
                    </div>
                </form>
            </Container>
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object,
    register: PropTypes.func,
    isUserLoggedIn: PropTypes.bool,
};

const mapStateToProps = state => ({
    isUserLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
    register: (email, password, firstName, lastName) => dispatch(Auth.register(email, password, firstName, lastName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp));
