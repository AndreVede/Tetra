import * as React from 'react';
import { HeadFC, PageProps, graphql } from 'gatsby';
import Layout from '../templates/Layout';
import { SEO } from '../components/SEO';
import Game from '../components/Game/Game';

const GamePage: React.FC<PageProps<Queries.Query>> = ({ data, location }) => {
    return (
        <Layout location={location}>
            <h1>Game</h1>
            <Game />
        </Layout>
    );
};

export default GamePage;

export const Head: HeadFC = () => (
    <SEO title="Tetra Game" description="That's a Tetris like game. Enjoy play it."></SEO>
);
