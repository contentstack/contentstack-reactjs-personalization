// Header Component

/**
 * Module dependencies.
 */

import React, { Component } from "react";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import "../staticAssets/css/style.css";
import { getData } from "./Helper";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sign: false,
      login: false,
      nav: "",
    };
  }

  componentDidMount() {
    getData(
      `${process.env.REACT_APP_BASE_URL}v3/content_types/${process.env.REACT_APP_HEADER_CONTENT_TYPE}/entries/?environment=${process.env.REACT_APP_PUBLISH_ENVIRONMENT}`
    )
      .then((resp) => {
        this.setState({
          nav: resp,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onOpenModal = () => {
    this.setState({ sign: true });
  };

  onOpenModalLogin = () => {
    this.setState({ login: true });
  };

  onCloseModal = () => {
    this.setState({ sign: false });
  };

  onCloseModalclose = () => {
    this.setState({ login: false });
  };

  render() {
    const { login, sign } = this.state;
    if (this.state.nav !== "") {
      return (
        <>
          {this.state.nav.data.entries.map((obj, index) => {
            return (
              <Router>
                <>
                  <header
                    className="header header-animated opaque"
                    style={{
                      display: "block",
                      paddingTop: "5px",
                      paddingBottom: "5px",
                    }}
                  >
                    <div className="container">
                      <nav className="navbar navbar-default" role="navigation">
                        <div className="navbar-header">
                          {/* {console.log("isasa",i.logo)} */}
                          <a className="logo" href={obj.logo.link.href}>
                            <img
                              className="img-responsive logo"
                              src={obj.logo.image.url}
                              alt=""
                              data-logo-alt={obj.logo.image.url}
                              data-logo-default={obj.logo.color_image.url}
                            />
                          </a>
                        </div>

                        <div
                          className="nav-toggle collapsed"
                          data-toggle="collapse"
                          data-target="#navbarMain"
                          aria-expanded="false"
                          style={{ top: "15px" }}
                        >
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                        {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
                        <div
                          className="navbar-collapse collapse in"
                          id="navbarMain"
                          aria-expanded="true"
                          style={{ top: "65px" }}
                        >
                          <ul className="nav navbar-nav navbar-right">
                            <li>
                              <button
                                className="btn btn-primary-outline"
                                id="signup"
                                onClick={this.onOpenModal}
                              >
                                {obj.cta[0].title}
                              </button>
                            </li>
                            <li>
                              <button
                                className="btn btn-primary-outline"
                                id="login"
                                onClick={this.onOpenModalLogin}
                              >
                                {obj.cta[1].title}
                              </button>
                            </li>
                          </ul>
                          <ul className="nav navbar-nav collapsed-color">
                            <>
                              {obj.navigation_section.navigation_bar.map(
                                (navLink, i) => {
                                  return (
                                    <li>
                                      {" "}
                                      <Link to="/" className="nav-link">
                                        {navLink.title}
                                      </Link>{" "}
                                    </li>
                                  );
                                }
                              )}
                            </>
                          </ul>
                        </div>

                        {/* <!-- .navbar-collapse --> */}
                      </nav>
                    </div>
                  </header>
                  {/* Sign up model */}
                  <Modal open={sign} onClose={this.onCloseModal}>
                    <div className="modal-body">
                      <h2>
                        Get Started Absolutely<span> Free!</span>
                      </h2>
                      <span className="subtitle">No credit card needed</span>
                      <form
                        className="contact-form form-validate3"
                        novalidate="novalidate"
                      >
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="text"
                            name="name"
                            id="name"
                            placeholder="First Name"
                            required=""
                            autocomplete="off"
                            aria-required="true"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            required=""
                            autocomplete="off"
                            aria-required="true"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            name="pass"
                            className="form-control"
                            placeholder="Password"
                            required=""
                            autocomplete="off"
                            aria-required="true"
                          />
                        </div>
                        <input
                          className="btn btn-md btn-primary btn-center"
                          id="sign_up"
                          type="button"
                          value="Sign Up"
                        />
                      </form>
                    </div>
                  </Modal>

                  {/* <!-- signUp End -->
                  <!-- login --> */}

                  <Modal open={login} onClose={this.onCloseModalclose}>
                    <div className="modal-body">
                      <h2>
                        Login and Get <span>Started</span>
                      </h2>
                      <span className="subtitle">
                        Just fill in the form below
                      </span>
                      <form
                        className="contact-form form-validate4"
                        novalidate="novalidate"
                      >
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            required=""
                            autocomplete="off"
                            aria-required="true"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            name="pass"
                            className="form-control"
                            placeholder="Password"
                            required=""
                            autocomplete="off"
                            aria-required="true"
                          />
                        </div>
                        <input
                          className="btn btn-md btn-primary btn-center"
                          id="login_btn"
                          type="button"
                          value="Login"
                        />
                      </form>
                    </div>
                  </Modal>
                </>
                <Switch>
                  <Route
                    exact
                    path={obj.navigation_section.navigation_bar[0].link}
                    component={Home}
                  />
                </Switch>
              </Router>
            );
          })}
        </>
      );
    } else if (this.state.nav === "") {
      return null;
    }
  }
}

export default Header;
