import React from "react";
import { render, fireEvent, act } from "@testing-library/react";

import Form from "./Form";
import Weather from "../utils/Weather";

function renderForm(updateWeatherFn: () => any = jest.fn()) {
  return render(<Form updateWeather={updateWeatherFn} />);
}

function mockWeatherGet(implementation: () => any) {
  jest.spyOn(Weather.prototype, "get").mockImplementationOnce(implementation);
}

describe("Form component", () => {
  test("input is changing value", () => {
    const { getByPlaceholderText } = renderForm();
    const input = getByPlaceholderText("Enter city...");
    fireEvent.change(input, { target: { value: "changed" } });

    expect((input as any).value).toBe("changed");
  });

  describe("onSubmit", () => {
    test("call weather get with input city", async () => {
      const weatherGetMockFn = jest.fn();
      mockWeatherGet(weatherGetMockFn);

      const { getByPlaceholderText, getByTestId } = renderForm();
      const input = getByPlaceholderText("Enter city...");
      const form = getByTestId("form");

      fireEvent.change(input, { target: { value: "changed" } });
      await act(async () => {
        await fireEvent.submit(form, { preventDefault: jest.fn() });
      });

      expect(weatherGetMockFn.mock.calls.length).toBe(1);
      expect(weatherGetMockFn.mock.calls[0][0]).toBe("changed");
    });

    describe("city not exists", () => {
      test("show error message", async () => {
        const weatherGetMockFn = jest.fn(() => null);
        mockWeatherGet(weatherGetMockFn);

        const { getByTestId, getByText } = renderForm();
        const form = getByTestId("form");
        await act(async () => {
          await fireEvent.submit(form, { preventDefault: jest.fn() });
        });

        const errorMessage = getByText("City not found");
        expect(errorMessage).toBeTruthy();
      });
    });

    describe("city exists", () => {
      test("clear error message when city exists", async () => {
        const weatherGetMockFn = jest.fn(() => 12);
        mockWeatherGet(weatherGetMockFn);

        const { getByTestId, queryByText } = renderForm();
        const form = getByTestId("form");
        await act(async () => {
          await fireEvent.submit(form, { preventDefault: jest.fn() });
        });

        const errorMessage = queryByText("City not found");
        expect(errorMessage).toBeNull();
      });

      test("call update weather with get weather data", async () => {
        const updateWeatherMockFn = jest.fn();
        const weatherGetMockFn = jest.fn(() => 12);
        mockWeatherGet(weatherGetMockFn);

        const { getByTestId } = renderForm(updateWeatherMockFn);
        const form = getByTestId("form");
        await act(async () => {
          await fireEvent.submit(form, { preventDefault: jest.fn() });
        });

        expect(updateWeatherMockFn.mock.calls.length).toBe(1);
        expect(updateWeatherMockFn.mock.calls[0][0]).toBe(12);
      });
    });
  });
});
