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
          max-width: 1000px;
          padding: ${rhythm(1)};
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
              @media (max-width: 320px) {
                font-size: 1rem;
              }
              text-decoration: none;
              box-shadow: none;
            `}
          >
            {data.site.siteMetadata.title}
          </Link>
          <Link
            to={`/about/`}
            css={css`
              margin-left: auto;
              font-size: 1.5rem;
              @media (max-width: 320px) {
                font-size: 1rem;
              }
              text-decoration: none;
              box-shadow: none;
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
