import React, { useState, FormEvent } from "react";

import Weather, { WeatherGet } from "../utils/Weather";
import { SForm, SInput, SErrorText, SButton } from "./Form.style";

interface FormProps {
  updateWeather: (data: WeatherGet) => void;
}

interface FormState {
  city: string;
  err: boolean;
  loading: boolean;
}

const weather = new Weather();

const initState: FormState = {
  city: "",
  err: false,
  loading: false,
};

function Form({ updateWeather }: FormProps) {
  const [state, setState] = useState<FormState>(initState);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setState((prevState) => ({ ...prevState, city: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.loading) return;

    const data = await weather.get(state.city);
    setState((prevState) => ({ ...prevState, loading: true }));
    if (data) {
      setState(initState);
      updateWeather(data);
    } else {
      setState((prevState) => ({
        ...prevState,
        err: true,
        loading: false,
      }));
    }
  }

  return (
    <section>
      <SForm onSubmit={handleSubmit} data-testid="form">
        <SInput
          placeholder="Enter city..."
          type="text"
          onChange={handleChange}
          value={state.city}
          disabled={state.loading}
        />
        <SButton type="submit" disabled={state.loading}>
          Get weather
        </SButton>
      </SForm>
      {state.err && <SErrorText>City not found</SErrorText>}
    </section>
  );
}

export default Form;
