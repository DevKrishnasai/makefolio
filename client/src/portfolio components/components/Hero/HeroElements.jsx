import styled, { keyframes } from "styled-components";
import { Link as LinkScroll } from "react-scroll";

export const HeroWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  height: calc(100vh - 150px);
  margin: 0 auto;

  @media screen and (max-width: 900px) {
    width: 100%;
    height: auto;
    flex-direction: column;
    padding: 2rem 1rem;
  }
`;

export const HeroLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding-right: 2rem;
  width: 100%;

  h1,
  h2 {
    text-align: left;
    font-size: 2.3rem;
    color: #f6f6f6;
    font-weight: 500;
    margin-bottom: 0.3rem;
  }

  h5 {
    text-align: left;
    font-size: 1.3rem;
    color: #fff;
    margin-top: 1rem;
  }

  @media screen and (max-width: 900px) {
    width: 100%;
    text-align: center;
    align-items: center;
    padding-right: 0;
    min-height: 190px;

    h1,
    h2 {
      text-align: center;
      font-size: 1.8rem;
    }

    h5 {
      text-align: center;
      font-size: 1.1rem;
    }
  }
`;

export const HeroRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;

  @media screen and (max-width: 900px) {
    width: 100%;
    margin-top: 2rem;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 80vh;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 900px) {
    max-height: 50vh;
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
  justify-content: start;
  align-items: center;
  cursor: pointer;
  position: absolute;
  // left: 20%;
  margin-top: 40px;
  width: full;
  min-width: 180px;
  transform: translateX(-50%);
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

  svg {
    height: 35px;
    width: 35px;
    margin-left: 6px;
  }
`;
