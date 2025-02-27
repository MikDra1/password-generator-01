import  { useState } from "react";
import styled from "styled-components";
import { useProject } from "../contexts/ProjectProvider";

const StyledDisplayPassword = styled.div`
  padding: 1rem;
  background-color: var(--dark-gray);
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const StyledPassword = styled.p`
  color: var(--light-gray);
  font-weight: 500;
  font-size: 1.5rem;
  width: 100%;
  user-select: none;

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

const PasswordPlaceholder = styled(StyledPassword)`
  color: #54535b;
`;

const ImageCopy = styled.img`
  cursor: pointer;

  transition: all 0.3s;

  &:hover {
    filter: brightness(1000%);
  }
`;

const FlexCopied = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  gap: 1rem;
  color: var(--neon-green);
  text-transform: uppercase;
`

export default function DisplayPassword() {
  const [message, setMessage] = useState<string>("");

  const { password } = useProject();

  function copyToClipboard(text: string) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setMessage("Copied");
        setTimeout(() => {
          setMessage(""); // Clear the message after 2 seconds
        }, 2000);
      })
      .catch((err) => {
        setMessage("Failed to copy!");
        console.error("Error copying text: ", err);
      });
  }

  return (
    <StyledDisplayPassword>
      {password ? (
        <StyledPassword>{password}</StyledPassword>
      ) : (
        <PasswordPlaceholder>P4$5W0rD!</PasswordPlaceholder>
      )}
      <FlexCopied>
        <p>{message}</p>
        <ImageCopy
          onClick={() => copyToClipboard(password)}
          src="assets/images/icon-copy.svg"
          alt="Copy icon"
        />
      </FlexCopied>
    </StyledDisplayPassword>
  );
}
