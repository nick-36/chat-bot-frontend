import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

import "./ChannelSearch.scss";

const cookies = new Cookies();

function ChannelSearch(props) {
  const [query, setQuery] = useState("");

  const onLogout = (e) => {
    cookies.remove("token");
    cookies.remove("userName");
    cookies.remove("fullName");
    cookies.remove("hashedPassword");
    cookies.remove("userId");
  };

  const onSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };
  return (
    <div className="channel__search-container">
      <div className="channel__search-wrapper">
        <div className="search-icon">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <input
          type="search"
          placeholder="search"
          className="search__input"
          onChange={onSearch}
          value={query}
        />
      </div>
      <div className="cta__wrapper">
        <Link to="/login">
          <button className="btn btn-logout" onClick={onLogout}>
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ChannelSearch;
