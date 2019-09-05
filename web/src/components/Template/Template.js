import React from "react";
import propTypes from "prop-types";
import cs from "classnames";
import "./Template.css";
import logo from "./logo.png";
import instagram from "./instagram.png";
import randomColor from "./randomColor";

const backgroundColor = small =>
  small && {
    backgroundColor: randomColor()
  };

export default function Template({ height, phrase, description, translation, userName, type, small }) {
  return (
    <div
      style={{
        ...backgroundColor(small),
        ...(height && { height })
      }}
      className={cs("Template", { "Template-sm": small })}
    >
      <div className={cs("Template-text-container", { "Template-text-container-sm": small })}>
        <h1 className={cs("Template-title", { "Template-title-sm": small })}>{phrase}</h1>
        <div className="Template-description-container">
          <span className={cs("Template-translate", { "Template-translate-sm": small })}>
            /{translation}/ ({type}.)
          </span>
          <span className={cs("Template-description", { "Template-description-sm": small })}> {description}</span>
        </div>
      </div>
      {userName && (
        <h2 className={cs("Template-userinfo", { "Template-userinfo-sm": small })}>
          tradução criada por @{userName} em greengodictionary.com
        </h2>
      )}
      <div className={cs("Template-footer", { "Template-footer-sm": small })}>
        <img className={cs({ "instagram-sm": small })} src={instagram} />
        <img className={cs({ "logo-sm": small })} src={logo} />
      </div>
    </div>
  );
}

Template.defaultProps = {
  type: "exp",
  size: "normal"
};

Template.propTypes = {
  phrase: propTypes.string.isRequired,
  type: propTypes.oneOf(["exp", "sub", "adj", "pro", "cit"]).isRequired,
  description: propTypes.string.isRequired,
  translation: propTypes.string.isRequired,
  userName: propTypes.string,
  small: propTypes.bool,
  height: propTypes.number
};
