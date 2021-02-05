import React, { Component } from "react";
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";
import { Route, NavLink } from "react-router-dom";
import FullPost from "./FullPost/FullPost";

import "./Blog.css";

class Blog extends Component {
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  exact
                  to="/"
                  activeStyle={{
                    textDecoration: "underline",
                    color: "#fa923f",
                  }}
                >
                  Home{" "}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post",
                    hash: "#submit",
                    search: "?quick-submit=true",
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>

        <Route path="/" component={Posts} exact />
        <Route path="/new-post" component={NewPost} exact />
        <Route path="/posts/:id" component={FullPost} exact />
      </div>
    );
  }
}

export default Blog;
