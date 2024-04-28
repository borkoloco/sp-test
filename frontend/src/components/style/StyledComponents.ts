import styled from "styled-components";
import { Card as BootstrapCard } from "react-bootstrap";

export const Container = styled.div`
  margin: 0 auto;
`;

export const Header = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  padding: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;

    div {
      width: 100%;
      margin-bottom: 5px;
    }
  }
`;

export const Bar = styled.div`
  width: 25%;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  color: #959595;
`;

export const Div = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
`;

export const CardWrapper = styled(BootstrapCard)`
  margin: 1rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
