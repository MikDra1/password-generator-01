import DisplayPassword from "./components/DisplayPassword";
import Form from "./components/Form";
import styled from "styled-components";
import { ProjectProvider } from "./contexts/ProjectProvider";

const StyledContainer = styled.div`
  background-color: var(--very-dark-gray);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 35rem;
  margin-inline: auto;
  width: 35rem;

  @media (max-width: 700px) {
    width: 90%;
  }
`;

const Title = styled.h2`
  color: var(--grayish-purple);
  font-weight: 500;
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 2rem;
`;

export default function App() {
  return (
    <ProjectProvider>
      <StyledContainer>
        <Wrapper>
          <Title>Password Generator</Title>
          <DisplayPassword />
          <Form />
        </Wrapper>
      </StyledContainer>
    </ProjectProvider>
  );
}
