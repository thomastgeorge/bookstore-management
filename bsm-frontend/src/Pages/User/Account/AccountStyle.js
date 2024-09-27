import styled from "styled-components";

export const PageWrapper = styled.div`
  margin-top: 3rem;
  width: 100%;
  justify-content: center;
  padding: 0 clamp(1rem, 10vw, 10rem);
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 4px 4px;
`;

export const AvatarWrapper = styled.div`
  margin: 1rem;
`;

export const AllCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 5px;
  max-width: 800px;
  margin: 0 auto;
  & > div {
    margin: 0 4px;
  }
`;

export const CardWrapper = styled.div`
  margin-bottom: 1rem;
  width: 30%;
  min-width: 230px;
  display: flex;
`;

export const CardBodyWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;