import Weather, { WeatherListItem, WeatherGet } from "./Weather";

function mockFetchOnce(cityName: string, list: WeatherListItem[]) {
  const fetchImplemention = jest.fn(() =>
    Promise.resolve({ json: () => ({ city: { name: cityName }, list }) })
  );

  jest.spyOn(global, "fetch").mockImplementationOnce(fetchImplemention as any);
}

function createWeatherListItem(
  hour: number = 12,
  temp: number = 0,
  humidity: number = 0
): WeatherListItem {
  const strHour: string = hour >= 10 ? hour.toString() : `0` + hour.toString();
  const dt_txt = `2017-02-16 ${strHour}:00:00`;
  return { dt_txt, main: { temp, humidity } };
}

describe("Weather class", () => {
  describe("get", () => {
    test("return proper cityName", async () => {
      mockFetchOnce("city_name", []);
      const { cityName } = (await new Weather().get("aaa")) as WeatherGet;
      expect(cityName).toBe("city_name");
    });

    describe("trackers", () => {
      test("add every weather list item to humidity tracker", async () => {
        const weatherList = [
          createWeatherListItem(0, 0, 0),
          createWeatherListItem(0, 0, 12),
        ];
        mockFetchOnce("city_name", weatherList);
        const { trackers } = (await new Weather().get("aaa")) as WeatherGet;

        expect(trackers.humidity.showMean()).toBe(6);
      });

      test("add weather list item to day temp tracker", async () => {
        const weatherList = [createWeatherListItem(13)];
        mockFetchOnce("city_name", weatherList);
        const { trackers } = (await new Weather().get("aaa")) as WeatherGet;

        expect(trackers.dayTemperature.isEmpty()).toBe(false);
        expect(trackers.nightTemperature.isEmpty()).toBe(true);
        expect(trackers.morningTemperature.isEmpty()).toBe(true);
      });

      test("add weather list item to night temp tracker", async () => {
        const weatherList = [createWeatherListItem(0)];
        mockFetchOnce("city_name", weatherList);
        const { trackers } = (await new Weather().get("aaa")) as WeatherGet;

        expect(trackers.dayTemperature.isEmpty()).toBe(true);
        expect(trackers.nightTemperature.isEmpty()).toBe(false);
        expect(trackers.morningTemperature.isEmpty()).toBe(true);
      });

      test("add weather list item to morning temp tracker", async () => {
        const weatherList = [createWeatherListItem(8)];
        mockFetchOnce("city_name", weatherList);
        const { trackers } = (await new Weather().get("aaa")) as WeatherGet;

        expect(trackers.dayTemperature.isEmpty()).toBe(true);
        expect(trackers.nightTemperature.isEmpty()).toBe(true);
        expect(trackers.morningTemperature.isEmpty()).toBe(false);
      });
    });
  });
});
