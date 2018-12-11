module.exports = {
  siteMetadata: {
    title: `killi8n's blog`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              inlineCodeMarker: "÷"
            }
          },
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants"
        ]
      }
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      }
    },
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: "GatsbyJS",
    //     short_name: "GatsbyJS",
    //     start_url: "/",
    //     background_color: "#6b37bf",
    //     theme_color: "#6b37bf",
    //     display: "minimal-ui",
    //     icon: "src/images/icon.png" // This path is relative to the root of the site.
    //   }
    // },
    // "gatsby-plugin-offline",
    `gatsby-plugin-react-helmet`
  ]
};
