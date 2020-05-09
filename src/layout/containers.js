import styled from "styled-components";

export const TwoThirdsWidth = styled.div`
  @media (min-width: 768px) {
    width: 66%;
    display: contents;
  }
`;

export const ThreeQuartersWidth = styled.div`
  @media (min-width: 768px) {
    width: 75%;
    display: contents;
  }
`;

export default { TwoThirdsWidth, ThreeQuartersWidth };
