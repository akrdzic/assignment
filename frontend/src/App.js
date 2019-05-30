import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './store';

import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Post from './pages/Post';
import NotFound from './pages/NotFound';
import Root from './pages/Root';

const App = () => {
    return (
    <Provider store={store}>
        <BrowserRouter>
            <Root>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/post/:postId" component={Post} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route component={NotFound} />
                </Switch>
            </Root>
        </BrowserRouter>
    </Provider>
    );
};

export default App;
