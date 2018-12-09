import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import { css } from "@emotion/core";

export default ({ data }) => (
  <Layout>
    <h1>About Killi8n</h1>
    <div
      css={css`
        font-size: 2.5rem;
        font-weight: 800;
        border-left: 10px solid #000;
        padding-left: 1rem;
        margin-bottom: 1rem;
        margin-top: 1rem;
      `}
    >
      Who Am I?
    </div>
    <div
      css={css`
        font-size: 1.25rem;
      `}
    >
      killi8n (킬리에이튼) <br /> 2017년도 부터 코딩에 입문했습니다. 늦게 코딩의
      재미를 알게되었고, 점점 더 재밌어지는 중 입니다. 트렌디하고 멋진 기술들을
      알아가는 것을 좋아하고, 따분한 것은 별로라서 재밌게 하자는 마음가짐을 갖고
      코딩 합니다.
    </div>
    <div
      css={css`
        font-size: 2.5rem;
        font-weight: 800;
        border-left: 10px solid #000;
        padding-left: 1rem;
        margin-bottom: 1rem;
        margin-top: 1rem;
      `}
    >
      Stacks That I Like
    </div>
    <div
      css={css`
        font-size: 1.25rem;
      `}
    >
      React + Redux + Sass
      <br /> Swift or RxSwift <br /> Node.JS + MongoDB <br /> Django
    </div>
    <div
      css={css`
        font-size: 2.5rem;
        font-weight: 800;
        border-left: 10px solid #000;
        padding-left: 1rem;
        margin-bottom: 1rem;
        margin-top: 1rem;
      `}
    >
      Personality
    </div>
    <div
      css={css`
        font-size: 1.25rem;
      `}
    >
      피해를 주지않는 삶을 살려고 노력합니다. 그 만큼 피해 받는 것도 싫어합니다.
      고리타분하게 느껴지는 것들이 싫습니다. 감성적이나 파워풀한 음악을
      즐깁니다. 음악을 좋아하고, Guitar 연주를 즐깁니다. 카타르시스를 주는
      예술작품들을 좋아합니다.
    </div>
    <div
      css={css`
        font-size: 2.5rem;
        font-weight: 800;
        border-left: 10px solid #000;
        padding-left: 1rem;
        margin-bottom: 1rem;
        margin-top: 1rem;
      `}
    >
      Info
    </div>
    <div
      css={css`
        font-size: 1.25rem;
      `}
    >
      관심있는 분야를 영어로 읽는 데에 문제 없음. <br />
      현 오케이코인 코리아 프론트엔드 개발자로 재직중. <br />
    </div>
    <div
      css={css`
        font-size: 2.5rem;
        font-weight: 800;
        border-left: 10px solid #000;
        padding-left: 1rem;
        margin-bottom: 1rem;
        margin-top: 1rem;
      `}
    >
      Resume
    </div>
    <div
      css={css`
        font-size: 1.25rem;
      `}
    >
      <a
        target="_blank"
        href="https://s3.ap-northeast-2.amazonaws.com/s3.images.killi8n.com/post-images/web_app_portfolio.pdf"
      >
        프론트엔드 프로젝트 소개
      </a>
    </div>
    <div
      css={css`
        font-size: 2.5rem;
        font-weight: 800;
        border-left: 10px solid #000;
        padding-left: 1rem;
        margin-bottom: 1rem;
        margin-top: 1rem;
      `}
    >
      Contacts
    </div>
    <div
      css={css`
        font-size: 1.25rem;
      `}
    >
      killi8n@gmail.com <br />
      <a target="_blank" href="https://github.com/killi8n">
        https://github.com/killi8n
      </a>
    </div>
  </Layout>
);

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
