import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { isLogged } from './services/authHandler';

import Home from './pages/Home';
import Login from './pages/Login';
import RegisterQuestion from './pages/Register';
import NotFound from './pages/NotFound';
import AllQuestions from './pages/AllQuestions';
import NewQuestion from './pages/NewQuestion';
import QuestionDetails from './pages/QuestionDetails';
import AllTags from './pages/AllTags';
import QuestionsByTag from './pages/QuestionsByTag';
import RegisterTag from './pages/NewTag';

function Routes() {
    let logged = isLogged();

    return (
        <>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/users">
                    <RegisterQuestion />
                </Route>
                <Route exact path="/questions">
                    <AllQuestions />
                </Route>
                <Route exact path="/new-question">
                    {logged ? <NewQuestion /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/questions/:id">
                    <QuestionDetails />
                </Route>
                <Route exact path="/tags">
                    <AllTags />
                </Route>
                <Route exact path="/questions/tag/:slug">
                    <QuestionsByTag />
                </Route>
                <Route exact path="/new-tag">
                    {logged ? <RegisterTag /> : <Redirect to="/login" />}
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </>
    );
}

export default Routes;