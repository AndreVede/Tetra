import * as React from 'react';
import { HeadFC, PageProps, graphql } from 'gatsby';
import Layout from '../templates/Layout';
import { SEO } from '../components/SEO';

const IndexPage: React.FC<PageProps<Queries.Query>> = ({ data, location }) => {
    const title = data.site?.siteMetadata?.title;
    return (
        <Layout location={location}>
            <h1>{title}</h1>
        </Layout>
    );
};

export default IndexPage;

export const Head: HeadFC = () => <SEO title="Tetra Home"></SEO>;

export const query = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
`;
