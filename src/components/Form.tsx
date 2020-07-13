import React, { useState, FormEvent } from "react";

import Weather, { WeatherGet } from "../utils/Weather";

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
      <form onSubmit={handleSubmit} data-testid="form">
        <label htmlFor="city">City</label>
        <input
          placeholder="Enter city..."
          type="text"
          name="city"
          id="city"
          onChange={handleChange}
          value={state.city}
        />
        <button type="submit" disabled={state.loading}>
          Get weather
        </button>
      </form>
      {state.err && <p>City not found</p>}
    </section>
  );
}

export default Form;
