import styled from "styled-components";

// Wrapper for the checkbox
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CheckboxLabel = styled.label`
  color: var(--light-gray);
  cursor: pointer;
  user-select: none;

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }

  @media (max-width:350px) {
    font-size: 0.8rem;
  }
`;

const Checkbox = styled.input`
  cursor: pointer;
  position: absolute;
  opacity: 0;
`;

// Custom checkmark box
const Checkmark = styled.label`
  width: 20px;
  height: 20px;
  display: inline-block;
  position: relative;
  transition: all 0.3s ease-in-out;
  border: 2px solid var(--light-gray);
  cursor: pointer;

  input:hover + & {
    border: 2px solid var(--neon-green);
  }

  input:focus-visible + & {
    outline: 1px solid var(--neon-green);
    outline-offset: 2px;
  }


  /* Checkmark when checked */
  input:checked + & {
    background-color: var(--neon-green);
    border-color: var(--neon-green);
  }

  /* Add checkmark icon */
  input:checked + &::after {
    content: "✔";
    position: absolute;
    left: 50%;
    transform: translate(-50%, -100%);
    top: 50%;
    width: 12px;
    height: 12px;
  }
`;

const CustomCheckbox = ({ register, value, children }: any) => (
  <CheckboxContainer>
    <Checkbox type="checkbox" {...register(value)} id={value} />
    <Checkmark htmlFor={value} />
    <CheckboxLabel htmlFor={value}>{children}</CheckboxLabel>
  </CheckboxContainer>
);

export default CustomCheckbox;
