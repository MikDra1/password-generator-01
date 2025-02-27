import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  generatePassword,
  checkStrength,
  getBarsToColor,
} from "../helpers/helpers";
import { useProject } from "../contexts/ProjectProvider";
import styled from "styled-components";
import CustomCheckbox from "./Checkbox";

const StyledForm = styled.form`
  background-color: var(--dark-gray);
  margin-top: 2rem;
  padding: 2rem;
`;

const Error = styled.p`
  color: var(--bright-red);
  font-weight: 500;
  margin-top: 1rem;

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }

  @media (max-width: 350px) {
    font-size: 0.65rem;
  }
`;

const CheckboxesContainer = styled.div`
  display: grid;
  gap: 1rem;

  margin-top: 2rem;
`;

const FlexTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: var(--light-gray);

  & h3 {
    @media (max-width: 600px) {
      font-size: 1rem;
    }
  }

  & p {
    color: var(--neon-green);
    font-size: 2rem;

    @media (max-width: 600px) {
      font-size: 1.5rem;
    }
  }
`;

const RangeInput = styled.input`
  -webkit-appearance: none; /* Remove default styling in webkit browsers */
  appearance: none;
  width: 100%;
  height: auto;

  background-color: transparent;
  cursor: pointer;
  border: none;

  width: 100%;
  height: 10px;
  outline: none;
  background-color: var(--very-dark-gray);
  cursor: pointer;
  border: none;
  border-radius: 15px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background: linear-gradient(
    to right,
    var(--neon-green) 0%,
    var(--very-dark-gray) 0%
  ); /* Initial gradient */

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 10px;
    border-radius: 25px;
    background: transparent;
  }

  &::-moz-range-progress {
    height: 10px;
    border-radius: 25px;
    background: var(--neon-green);
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Remove default thumb styling */
    height: 60px;
    width: 60px;
    background-color: var(--light-gray);
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    position: relative;
    transform: translateY(-40%);
    transition: all 0.3s;
  }

  &::-webkit-slider-thumb:active {
    cursor: grabbing;
    cursor: -webkit-grabbing;
    background-color: var(--light-gray);
  }

  &::-moz-range-thumb:active {
    cursor: grabbing;
    cursor: -webkit-grabbing;
    background-color: var(--light-gray);
  }

  &::-moz-range-thumb {
    -moz-appearance: none;
    appearance: none;
    border: 1px solid transparent;
    background-color: var(--light-gray);
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: var(--dark-gray);
      border: 1px solid var(--neon-green);
    }
  }
`;

const StrengthBarsContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const StrengthBar = styled.div<{ strength: string; active: boolean }>`
  height: 2rem;
  width: 0.7rem;
  background-color: ${(props) => {
    if (!props.active) return "transparent";
    switch (props.strength) {
      case "too weak!":
        return "var(--bright-red)";
      case "weak":
        return "var(--vibrant-orange)";
      case "medium":
        return "var(--soft-yellow)";
      case "strong":
        return "var(--neon-green)";
      default:
        return "gray";
    }
  }};

  border: 2px solid
    ${(props) => {
      if (!props.active) return "var(--light-gray)";
      switch (props.strength) {
        case "too weak!":
          return "var(--bright-red)";
        case "weak":
          return "var(--vibrant-orange)";
        case "medium":
          return "var(--soft-yellow)";
        case "strong":
          return "var(--neon-green)";
        default:
          return "gray";
      }
    }};
`;

const StrengthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
  padding: 1rem;
  gap: 0.5rem;
  background-color: var(--very-dark-gray);

  flex-wrap: wrap;

  & p {
    color: var(--grayish-purple);
    text-transform: uppercase;
    font-weight: 500;

    
    @media (max-width: 600px) {
      font-size: 0.9rem;
    }
  }
`;

const StrengthCategoryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  & p {
    color: var(--light-gray);
    font-size: 1.3rem;

    @media (max-width: 600px) {
      font-size: 1rem;
    }
  }
`;

const ButtonSubmit = styled.button`
  background-color: var(--neon-green);
  color: var(--very-dark-gray);
  border: 2px solid transparent;
  padding: 1.2rem 2rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  width: 100%;

  margin-top: 1.5rem;
  text-transform: uppercase;
  transition: all .3s;

  &:hover {
    background-color: transparent;
    border: 2px solid var(--neon-green);
    color: var(--neon-green);

    & img {
      filter: brightness(0) saturate(100%) invert(87%) sepia(41%) saturate(401%)
        hue-rotate(63deg) brightness(102%) contrast(101%);
    }
  }
`;

export default function Form() {
  const { register, handleSubmit } = useForm();
  const { setPassword } = useProject();
  const [oneCheckboxChecked, setOneCheckboxChecked] = useState(true);
  const [strengthCategory, setStrengthCategory] = useState("");
  const [rangeInput, setRangeInput] = useState(10);

  const onSubmit = (data: any) => {
    if (
      data.uppercaseLetters ||
      data.lowercaseLetters ||
      data.numbers ||
      data.symbols
    ) {
      setOneCheckboxChecked(true);
    } else {
      setOneCheckboxChecked(false);
      return;
    }

    console.log(data);
    const password = generatePassword(data.range, {
      uppercase: data.uppercaseLetters,
      lowercase: data.lowercaseLetters,
      numbers: data.numbers,
      symbols: data.symbols,
    });

    checkStrength(password, setStrengthCategory);

    setPassword(password);
  };

  const barsToColor = getBarsToColor(strengthCategory);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FlexTitleContainer>
        <h3>Character Length</h3>
        <p>{rangeInput}</p>
      </FlexTitleContainer>
      <RangeInput
        {...register("range")}
        type="range"
        min="0"
        max="20"
        step="1"
        defaultValue="10"
        value={rangeInput}
        onChange={(e) => setRangeInput(Number(e.target.value))}
      />
      <CheckboxesContainer>
        <CustomCheckbox register={register} value="uppercaseLetters">
          Include Uppercase Letters
        </CustomCheckbox>

        <CustomCheckbox register={register} value="lowercaseLetters">
          Include Lowercase Letters
        </CustomCheckbox>

        <CustomCheckbox register={register} value="numbers">
          Include Numbers
        </CustomCheckbox>

        <CustomCheckbox register={register} value="symbols">
          Include Symbols
        </CustomCheckbox>
      </CheckboxesContainer>

      <StrengthContainer>
        <p>Strength</p>
        <StrengthCategoryContainer>
          {strengthCategory && <p>{strengthCategory}</p>}
          <StrengthBarsContainer>
            {barsToColor.map((active, index) => (
              <StrengthBar
                key={index}
                active={active}
                strength={strengthCategory}
              />
            ))}
          </StrengthBarsContainer>
        </StrengthCategoryContainer>
      </StrengthContainer>

      {!oneCheckboxChecked && (
        <Error>Please select at least one checkbox</Error>
      )}

      <ButtonSubmit type="submit">
        Generate
        <img src="assets/images/icon-arrow-right.svg" alt="Arrow icon" />
      </ButtonSubmit>
    </StyledForm>
  );
}
