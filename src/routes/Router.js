import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../screens/LoginPage'
import SignUpPage from '../screens/SignUpPage'
import FeedPage from '../screens/FeedPage'
import PostPage from '../screens/PostPage'
import ErrorPage from '../screens/ErrorPage';

const Router = (props) => {
    return ( 
        <Switch>

            <Route exact path={['/login', '/sharkeddit/login']}>
                <LoginPage setButtonName={props.setButtonName}/>
            </Route>
            
            <Route exact path={['/cadastro', '/sharkeddit/cadastro']}>
                <SignUpPage setButtonName={props.setButtonName}/>
            </Route>
            
            <Route exact path={['/sharkeddit/feed', '/', '/feed', '/sharkeddit']} component={FeedPage} />

            <Route exact path={['/feed/:id', '/sharkeddit/feed/:id']} component={PostPage} />
            
            <Route component={ErrorPage}/>
            
        </Switch>
     );
}
 
export default Router;
