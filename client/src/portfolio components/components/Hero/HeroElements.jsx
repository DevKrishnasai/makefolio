import styled, { keyframes } from "styled-components";
import { Link as LinkScroll } from "react-scroll";

export const HeroWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: calc(100vh - 150px);
  margin: 0 auto;

  @media screen and (max-width: 900px) {
    width: 100%;
    height: 100%;
    flex-direction: column;
  }
`;

export const HeroLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 1rem;
  width: 100%;

  h1 {
    font-size: 2.3rem;
    color: #f6f6f6;
    font-weight: 500;
    margin-bottom: 0.3rem;
  }
  h2 {
    font-size: 2.1rem;
    color: #f6f6f6;
    font-weight: 500;
    margin-bottom: 1.4rem;
  }

  h5 {
    font-size: 1.3rem;
    color: #fff;
  }

  @media screen and (max-width: 900px) {
    flex: 1;
    width: 100%;
    text-align: center;
    padding-right: 0;
    h1,
    h2 {
      font-size: 1.5rem;
      color: #f6f6f6;
      font-weight: 500;
    }

    h5 {
      margin-top: 20px;
      font-size: 1rem;
      font-weight: 500;
      color: #fff;
    }
  }
`;

export const HeroRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding-left: 3rem;
  margin: 3rem;
  @media screen and (max-width: 900px) {
    margin: 0px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

export const Image = styled.img`
  max-width: 90%;
  height: 100%;
  border-radius: 40px;

  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Shadow effect */
  @media screen and (max-width: 900px) {
    width: 100%;
    height: 100%;
  }
`;

const ScrollAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

export const ScrollDown = styled(LinkScroll)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  margin-top: 40px;

  align-items: flex-start;

  animation: ${ScrollAnimation} 2s linear 0s infinite;
  @media screen and (max-width: 992px) {
    display: none;
  }
`;

export const ScrollLink = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  color: #f6f6f6;

  img {
    height: 35px;
    width: 35px;
    margin-left: 6px;
  }
`;
