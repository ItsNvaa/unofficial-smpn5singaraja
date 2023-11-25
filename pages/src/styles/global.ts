import styled from "styled-components";

export const Container = styled.div`
  padding: 0 2rem;
  @media (width >= 750px) {
    padding: 0 4rem;
  }
  @media (width >= 920px) {
    padding: 0 6rem;
  }
  @media (width >= 1120px) {
    padding: 0 8rem;
  }
  @media (width >= 1400px) {
    padding: 0 10rem;
  }
`;

export const Primary = styled.a`
  font-size: 0.85rem;
  padding: 0.35rem 0.95rem;
  background-color: var(--accent);
  border-radius: 5px;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.46);
  &:hover {
    opacity: 0.85;
  }
  @media (width >= 920px) {
    padding: 0.3rem 1rem 0.4rem 1rem;
    font-size: 0.9rem;
  }
`;

export const Secondary = styled.a`
  font-size: 0.85rem;
  padding: 0.35rem 0.95rem;
  background-color: var(--primary);
  color: var(--secondary);
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.46);
  font-weight: 600;
  &:hover {
    opacity: 0.85;
  }
  @media (width >= 920px) {
    padding: 0.3rem 1rem 0.4rem 1rem;
    font-size: 0.9rem;
  }
`;
