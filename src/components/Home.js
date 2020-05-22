/* eslint-disable jsx-a11y/iframe-has-title */
// Home Component

/**
 * Module dependencies.
 */

import React, { Component } from "react";
import Typed from "react-typed";
import Footer from "./Footer";
import $ from "jquery";
import "../staticAssets/css/style.css";
import uuid from "react-uuid";

import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import {
  createInstance,
  OptimizelyProvider,
  OptimizelyFeature,
  withOptimizely,
  OptimizelyVariation,
  OptimizelyExperiment,
} from "@optimizely/react-sdk";
import { getData } from "./Helper";

const optimizely = createInstance({
  sdkKey: process.env.REACT_APP_OPTIMIZELY_SDK_KEY,
  datafileOptions: {
    updateInterval: 1000,
    autoUpdate: true,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      home: "",

      userCookie: uuid(),
    };
  }

  componentDidMount() {
    document.cookie = `userID=${this.state.userCookie}`;
    getData(
      `https://cdn.contentstack.io/v3/content_types/${process.env.REACT_APP_HOME_CONTENT_TYPE}/entries/?environment=${process.env.REACT_APP_PUBLISH_ENVIRONMENT}`
    )
      .then((data) => {
        this.setState({
          home: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    var $header = $(".header-animated");
    var $headers = $(".header-animated opaque");
    var $logoAlt = $header.find(".logo > img").data("logo-alt"); // white logo
    var $logoDefault = $header.find(".logo > img").data("logo-default"); // black logo
    $(".header").css("display", "block");

    if (
      window.location.pathname != "/features" &&
      window.location.pathname != "/about"
    ) {
      $header.removeClass("opaque");
      $header.find(".logo > img").attr("src", $logoAlt);
    }

    $(window).on("scroll", function () {
      if (
        window.location.pathname != "/features" &&
        window.location.pathname != "/about"
      ) {
        if ($(window).scrollTop() > 100) {
          $header.fadeIn().addClass("opaque");
          $header.find(".logo > img").attr("src", $logoDefault);
        } else {
          $header.removeClass("opaque");
          $header.find(".logo > img").attr("src", $logoAlt);
        }
      }
    });
    $(".dropdown").hover(
      function () {
        $(".dropdown").addClass("open");
      },
      function () {
        $(".dropdown").removeClass("open");
      }
    );
  }

  render() {
    if (this.state.home !== "") {
      document.title = this.state.home.data.entries[0].title;
      const html = this.state.home.data.entries[0].hero_banner.description;
      const bannerVariationOne = this.state.home.data.entries[0]
        .banner_variation.banner_image[0].url;
      const bannerVariationTwo = this.state.home.data.entries[0]
        .banner_variation.banner_image[1].url;
      const bannerVariationThree = this.state.home.data.entries[0]
        .banner_variation.banner_image[2].url;
      const bannerVariationDefault = this.state.home.data.entries[0]
        .banner_variation.banner_image[3].url;

      return (
        <>
          {this.state.home.data.entries.map((obj, index) => {
            return (
              <>
                <section>
                  <div className="wrapper">
                    <OptimizelyProvider
                      optimizely={optimizely}
                      user={{ id: document.cookie.split("=")[1] }}
                    >
                      {/* feature key below */}
                      <OptimizelyFeature
                        autoUpdate={true}
                        feature={process.env.REACT_APP_OPTIMIZELY_FEATURE_KEY}
                      >
                        {(isEnabled, variables) => {
                          return (
                            // experiment key below
                            <OptimizelyExperiment
                              autoUpdate={true}
                              experiment={
                                process.env.REACT_APP_OPTIMIZELY_EXPERIMENT_KEY
                              }
                            >
                              {(variation) => {
                                if (isEnabled) {
                                  if (variation === "variation_1") {
                                    return (
                                      <>
                                        <div
                                          className="home-hero-bg hero-bg"
                                          id="home"
                                          style={{
                                            backgroundImage: `url(${bannerVariationOne})`,
                                          }}
                                        >
                                          <div className="background-overlay"></div>
                                          <div className="aligned-container typed-container">
                                            <div className="container">
                                              <div className="typing-block">
                                                <div className="typing-block">
                                                  {obj.hero_banner.title}{" "}
                                                  <span>
                                                    {" "}
                                                    <Typed
                                                      strings={[
                                                        `${obj.hero_banner.rolling_text[0]}`,
                                                      ]}
                                                      typeSpeed={50}
                                                    />{" "}
                                                  </span>
                                                </div>
                                              </div>
                                              {ReactHtmlParser(html)}
                                              <a
                                                href="/"
                                                className="btn btn-primary mrm"
                                              >
                                                {obj.hero_banner.cta[0].title}
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    );
                                  } else if (variation === "variation_2") {
                                    return (
                                      <>
                                        <div
                                          className="home-hero-bg hero-bg"
                                          id="home"
                                          style={{
                                            backgroundImage: `url(${bannerVariationTwo}`,
                                          }}
                                        >
                                          <div className="background-overlay"></div>
                                          <div className="aligned-container typed-container">
                                            <div className="container">
                                              <div className="typing-block">
                                                <div className="typing-block">
                                                  {obj.hero_banner.title}{" "}
                                                  <span>
                                                    {" "}
                                                    <Typed
                                                      strings={[
                                                        `${obj.hero_banner.rolling_text[0]}`,
                                                      ]}
                                                      typeSpeed={50}
                                                    />{" "}
                                                  </span>
                                                </div>
                                              </div>
                                              {ReactHtmlParser(html)}
                                              <a
                                                href="/"
                                                className="btn btn-primary mrm"
                                              >
                                                {obj.hero_banner.cta[0].title}
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    );
                                  } else if (variation === "variation_3") {
                                    return (
                                      <>
                                        <div
                                          className="home-hero-bg hero-bg"
                                          id="home"
                                          style={{
                                            backgroundImage: `url(${bannerVariationThree})`,
                                          }}
                                        >
                                          <div className="background-overlay"></div>
                                          <div className="aligned-container typed-container">
                                            <div className="container">
                                              <div className="typing-block">
                                                <div className="typing-block">
                                                  {obj.hero_banner.title}{" "}
                                                  <span>
                                                    {" "}
                                                    <Typed
                                                      strings={[
                                                        `${obj.hero_banner.rolling_text[0]}`,
                                                      ]}
                                                      typeSpeed={50}
                                                    />{" "}
                                                  </span>
                                                </div>
                                              </div>
                                              {ReactHtmlParser(html)}
                                              <a
                                                href="/"
                                                className="btn btn-primary mrm"
                                              >
                                                {obj.hero_banner.cta[0].title}
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    );
                                  }
                                } else {
                                  return (
                                    <>
                                      <div
                                        className="home-hero-bg hero-bg"
                                        id="home"
                                        style={{
                                          backgroundImage: `url(${bannerVariationDefault})`,
                                        }}
                                      >
                                        <div className="background-overlay"></div>
                                        <div className="aligned-container typed-container">
                                          <div className="container">
                                            <div className="typing-block">
                                              <div className="typing-block">
                                                {obj.hero_banner.title}{" "}
                                                <span>
                                                  {" "}
                                                  <Typed
                                                    strings={[
                                                      `${obj.hero_banner.rolling_text[0]}`,
                                                    ]}
                                                    typeSpeed={50}
                                                  />{" "}
                                                </span>
                                              </div>
                                            </div>
                                            {ReactHtmlParser(html)}
                                            <a
                                              href="/"
                                              className="btn btn-primary mrm"
                                            >
                                              {obj.hero_banner.cta[0].title}
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                }
                              }}
                            </OptimizelyExperiment>
                          );
                        }}
                      </OptimizelyFeature>
                    </OptimizelyProvider>
                    <div className="main-container"></div>
                  </div>
                  {/* <!-- Video --> */}
                  <div
                    className="modal videoModal fade"
                    id="videoModal"
                    tabindex="-1"
                    role="dialog"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-lg">
                      <div className="modal-header">
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <div className="modal-content">
                        <div className="modal-body">
                          <div
                            className="embed-responsive embed-responsive-16by9"
                            id="yt-player"
                          >
                            <img
                              className="img-responsive"
                              src={"img/hero-bg.jpg"}
                              alt="demo"
                            />
                            <iframe
                              className="embed-responsive-item"
                              src="http://player.vimeo.com/video/27408483?title=0&byline=0&portrait=0&color=ffffff"
                            ></iframe>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <Footer />
              </>
            );
          })}
        </>
      );
    } else if (this.state.home === "") {
      return null;
    }
  }
}

export default Home;
