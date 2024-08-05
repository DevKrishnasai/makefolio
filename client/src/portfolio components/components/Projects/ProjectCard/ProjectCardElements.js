import styled from "@emotion/styled";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.3);
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const CardLeft = styled.div`
  flex: 1;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

export const CardRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  background-color: #ffffff;

  h4 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #333;
  }

  p {
    font-size: 1rem;
    font-weight: 400;
    color: #666;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  @media (max-width: 767px) {
    align-items: center;
    text-align: center;
  }
`;

export const BtnGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  a {
    padding: 0.8rem 1.5rem;
    border-radius: 5px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease-in-out;

    &.SecondaryBtn {
      background-color: black;
      color: white;

      &:hover {
        background-color: #e0e0e0;
      }
    }

    &:hover {
      background-color: black;
      color: white;
    }
  }
`;

export const TechCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 0.6rem;
  @media (min-width: 992px) {
    justify-content: flex-start;
  }
`;
export const TechCard = styled.div`
  border-radius: 10px;
  background-color: #f5f5f5;
  padding: 5px 10px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.815);
  cursor: default;
  box-shadow: 0px 2px 5px rgba(160, 170, 180, 0.6);
`;
