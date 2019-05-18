import React, { Fragment } from 'react';
import styled from 'styled-components';

const Wrapper = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  position: relative;
`;

const Header = styled.header`
  font-size: 1em;
  color: black;
  padding: 15px 30px;
  text-align: right;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AvatarImg = styled.img`
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  border: 2px solid #000000;
`;

const DivRight = styled.div`
  float: right;
  display: flex;
  justify-content: space-between;
`;

const SpanHighlight = styled.span`
  margin-left: 0.2em;
  margin-right: 1em;
  text-shadow: 2px 2px 0px #ffffff;
`;

const TwitterAvatar = ({ src, handle }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <AvatarImg src={src} />
    <SpanHighlight>{handle}</SpanHighlight>
  </div>
);

const Layout = ({ children }) => (
  <Fragment>
    <Header>
      <span>#BDDworkshop</span>
      <span>
        <a alt="bitly raisconf2019 bdd" href="http://bit.ly/railsconf2019-bdd">
          http://bit.ly/railsconf2019-bdd
        </a>
      </span>
      <DivRight>
        <TwitterAvatar
          handle="@selenasmall88"
          src="./images/selena_small_twitter.jpg"
        />
        <TwitterAvatar
          handle="@saramic"
          src="./images/michael_milewski_twitter.jpg"
        />
      </DivRight>
    </Header>
    <Wrapper>{children}</Wrapper>
  </Fragment>
);

export default Layout;
