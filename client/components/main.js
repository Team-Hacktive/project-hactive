import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { logout, me, getAllProblemsThunk } from '../store';
import CodeEditor from './CodeEditor';
import UserHome from './user-home';
import { Router } from 'react-router';
import history from '../history';
import AuthHelper from './AuthHelper';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginOrSignup: ''
    };
  }

  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, handleClick } = this.props;
    return (
      <div>
        <Router history={history}>
          <div>
            {!isLoggedIn ? (
              <div className="titleScreen">
                <div className="navbar">
                  <button
                    type="button"
                    onClick={() => this.setState({ loginOrSignup: 'login' })}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => this.setState({ loginOrSignup: 'signup' })}
                  >
                    Signup
                  </button>
                </div>
                <div className="splash">
                <h1>HACKTIVE</h1>
                <AuthHelper loginOrSignup={this.state.loginOrSignup} />
                </div>
              </div>
            ) : null}
            <Switch>
              <Route path="/authHelper" component={AuthHelper} />
              {isLoggedIn && (
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/editor" component={CodeEditor} />
                  <Route path="/home" component={UserHome} />
                  <Route path="/" component={UserHome} />
                </Switch>
              )}
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(getAllProblemsThunk());
    },
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Main);
