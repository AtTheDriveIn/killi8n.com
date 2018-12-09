import React from "react";
import { css } from "@emotion/core";
import { rhythm } from "../utils/typography";
import { StaticQuery, Link, graphql } from "gatsby";

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div
        css={css`
          margin: 0 auto;
          max-width: 700px;
          padding: ${rhythm(2)};
          padding-top: ${rhythm(1.5)};
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Link
            to={`/`}
            css={css`
              text-decoration: none;
              font-weight: 800;
              font-size: 2rem;
            `}
          >
            {data.site.siteMetadata.title}
          </Link>
          <Link
            to={`/about/`}
            css={css`
              margin-left: auto;
              font-size: 1.5rem;
            `}
          >
            About
          </Link>
        </div>
        {children}
      </div>
    )}
  />
);
