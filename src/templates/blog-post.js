import React, { Component } from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../components/layout";

export default class BlogPost extends Component {
  componentDidMount() {
    console.log("componentDidMount");
  }
  render() {
    const post = this.props.data.markdownRemark;
    return (
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{post.frontmatter.title}</title>
        </Helmet>
        <div>
          <h1>{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </Layout>
    );
  }
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
