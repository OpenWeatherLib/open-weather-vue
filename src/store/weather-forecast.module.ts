import { of } from "rxjs";
import { catchError, take } from "rxjs/operators";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import {
  getWeatherForecastList,
  mostWeatherCondition
} from "@/helper/weather-forecast.helper";
import { City, WeatherForecast, WeatherForecastPart } from "@/models";
import { openWeatherService } from "@/services";
import { RootState } from "./root-state";

export interface WeatherForecastState {
  error?: any;
  filter?: string;
  isLoading?: boolean;
  weatherForecast?: WeatherForecast;
}

// TODO Remove dummy data
const state: WeatherForecastState = {
  error: undefined,
  filter: undefined,
  isLoading: false,
  weatherForecast: {
    cod: "200",
    message: 0,
    cnt: 40,
    list: [
      {
        dt: 1574002800,
        main: {
          temp: 9.31,
          temp_min: 9.2,
          temp_max: 9.31,
          pressure: 1000,
          sea_level: 1000,
          grnd_level: 962,
          humidity: 90,
          temp_kf: 0.11
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04d"
          }
        ],
        clouds: {
          all: 100
        },
        wind: {
          speed: 1.19,
          deg: 132
        },
        sys: {
          pod: "d"
        },
        dt_txt: "2019-11-17 15:00:00"
      },
      {
        dt: 1574013600,
        main: {
          temp: 7.44,
          temp_min: 7.36,
          temp_max: 7.44,
          pressure: 1000,
          sea_level: 1000,
          grnd_level: 962,
          humidity: 93,
          temp_kf: 0.08
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 100
        },
        wind: {
          speed: 1.05,
          deg: 238
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-17 18:00:00"
      },
      {
        dt: 1574024400,
        main: {
          temp: 7.4,
          temp_min: 7.34,
          temp_max: 7.4,
          pressure: 1002,
          sea_level: 1002,
          grnd_level: 963,
          humidity: 93,
          temp_kf: 0.06
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 100
        },
        wind: {
          speed: 1.99,
          deg: 179
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-17 21:00:00"
      },
      {
        dt: 1574035200,
        main: {
          temp: 6.16,
          temp_min: 6.13,
          temp_max: 6.16,
          pressure: 1004,
          sea_level: 1004,
          grnd_level: 965,
          humidity: 87,
          temp_kf: 0.03
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 98
        },
        wind: {
          speed: 1.55,
          deg: 223
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-18 00:00:00"
      },
      {
        dt: 1574046000,
        main: {
          temp: 5.59,
          temp_min: 5.59,
          temp_max: 5.59,
          pressure: 1004,
          sea_level: 1004,
          grnd_level: 966,
          humidity: 88,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 99
        },
        wind: {
          speed: 2.47,
          deg: 201
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-18 03:00:00"
      },
      {
        dt: 1574056800,
        main: {
          temp: 3.95,
          temp_min: 3.95,
          temp_max: 3.95,
          pressure: 1007,
          sea_level: 1007,
          grnd_level: 968,
          humidity: 87,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 99
        },
        wind: {
          speed: 2.83,
          deg: 204
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-18 06:00:00"
      },
      {
        dt: 1574067600,
        main: {
          temp: 5.63,
          temp_min: 5.63,
          temp_max: 5.63,
          pressure: 1009,
          sea_level: 1009,
          grnd_level: 970,
          humidity: 76,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04d"
          }
        ],
        clouds: {
          all: 100
        },
        wind: {
          speed: 3.8,
          deg: 206
        },
        sys: {
          pod: "d"
        },
        dt_txt: "2019-11-18 09:00:00"
      },
      {
        dt: 1574078400,
        main: {
          temp: 6.81,
          temp_min: 6.81,
          temp_max: 6.81,
          pressure: 1010,
          sea_level: 1010,
          grnd_level: 971,
          humidity: 65,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04d"
          }
        ],
        clouds: {
          all: 66
        },
        wind: {
          speed: 5.08,
          deg: 235
        },
        sys: {
          pod: "d"
        },
        dt_txt: "2019-11-18 12:00:00"
      },
      {
        dt: 1574089200,
        main: {
          temp: 5.6,
          temp_min: 5.6,
          temp_max: 5.6,
          pressure: 1011,
          sea_level: 1011,
          grnd_level: 972,
          humidity: 66,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04d"
          }
        ],
        clouds: {
          all: 83
        },
        wind: {
          speed: 4.97,
          deg: 226
        },
        sys: {
          pod: "d"
        },
        dt_txt: "2019-11-18 15:00:00"
      },
      {
        dt: 1574100000,
        main: {
          temp: 3.4,
          temp_min: 3.4,
          temp_max: 3.4,
          pressure: 1013,
          sea_level: 1013,
          grnd_level: 973,
          humidity: 76,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03n"
          }
        ],
        clouds: {
          all: 41
        },
        wind: {
          speed: 4.02,
          deg: 221
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-18 18:00:00"
      },
      {
        dt: 1574110800,
        main: {
          temp: 2.79,
          temp_min: 2.79,
          temp_max: 2.79,
          pressure: 1014,
          sea_level: 1014,
          grnd_level: 974,
          humidity: 79,
          temp_kf: 0
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01n"
          }
        ],
        clouds: {
          all: 2
        },
        wind: {
          speed: 3.93,
          deg: 205
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-18 21:00:00"
      },
      {
        dt: 1574121600,
        main: {
          temp: 2.44,
          temp_min: 2.44,
          temp_max: 2.44,
          pressure: 1015,
          sea_level: 1015,
          grnd_level: 975,
          humidity: 80,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03n"
          }
        ],
        clouds: {
          all: 43
        },
        wind: {
          speed: 3.03,
          deg: 195
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-19 00:00:00"
      },
      {
        dt: 1574132400,
        main: {
          temp: 2.53,
          temp_min: 2.53,
          temp_max: 2.53,
          pressure: 1015,
          sea_level: 1015,
          grnd_level: 975,
          humidity: 78,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 100
        },
        wind: {
          speed: 2.88,
          deg: 185
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-19 03:00:00"
      },
      {
        dt: 1574143200,
        main: {
          temp: 3.06,
          temp_min: 3.06,
          temp_max: 3.06,
          pressure: 1016,
          sea_level: 1016,
          grnd_level: 976,
          humidity: 79,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 100
        },
        wind: {
          speed: 2.6,
          deg: 178
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-19 06:00:00"
      },
      {
        dt: 1574154000,
        main: {
          temp: 4.87,
          temp_min: 4.87,
          temp_max: 4.87,
          pressure: 1016,
          sea_level: 1016,
          grnd_level: 977,
          humidity: 73,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04d"
          }
        ],
        clouds: {
          all: 69
        },
        wind: {
          speed: 2.68,
          deg: 220
        },
        sys: {
          pod: "d"
        },
        dt_txt: "2019-11-19 09:00:00"
      },
      {
        dt: 1574164800,
        main: {
          temp: 5.93,
          temp_min: 5.93,
          temp_max: 5.93,
          pressure: 1017,
          sea_level: 1017,
          grnd_level: 978,
          humidity: 77,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04d"
          }
        ],
        clouds: {
          all: 51
        },
        wind: {
          speed: 3.66,
          deg: 275
        },
        sys: {
          pod: "d"
        },
        dt_txt: "2019-11-19 12:00:00"
      },
      {
        dt: 1574175600,
        main: {
          temp: 5.19,
          temp_min: 5.19,
          temp_max: 5.19,
          pressure: 1019,
          sea_level: 1019,
          grnd_level: 979,
          humidity: 73,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04d"
          }
        ],
        clouds: {
          all: 94
        },
        wind: {
          speed: 2.82,
          deg: 256
        },
        sys: {
          pod: "d"
        },
        dt_txt: "2019-11-19 15:00:00"
      },
      {
        dt: 1574186400,
        main: {
          temp: 2.77,
          temp_min: 2.77,
          temp_max: 2.77,
          pressure: 1021,
          sea_level: 1021,
          grnd_level: 980,
          humidity: 82,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 79
        },
        wind: {
          speed: 1.6,
          deg: 223
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-19 18:00:00"
      },
      {
        dt: 1574197200,
        main: {
          temp: 2.05,
          temp_min: 2.05,
          temp_max: 2.05,
          pressure: 1022,
          sea_level: 1022,
          grnd_level: 981,
          humidity: 85,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 100
        },
        wind: {
          speed: 0.53,
          deg: 201
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-19 21:00:00"
      },
      {
        dt: 1574208000,
        main: {
          temp: 1.51,
          temp_min: 1.51,
          temp_max: 1.51,
          pressure: 1022,
          sea_level: 1022,
          grnd_level: 981,
          humidity: 86,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 100
        },
        wind: {
          speed: 0.91,
          deg: 67
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-20 00:00:00"
      },
      {
        dt: 1574218800,
        main: {
          temp: 0.85,
          temp_min: 0.85,
          temp_max: 0.85,
          pressure: 1022,
          sea_level: 1022,
          grnd_level: 981,
          humidity: 85,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03n"
          }
        ],
        clouds: {
          all: 35
        },
        wind: {
          speed: 1.62,
          deg: 75
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-20 03:00:00"
      },
      {
        dt: 1574229600,
        main: {
          temp: 0.48,
          temp_min: 0.48,
          temp_max: 0.48,
          pressure: 1022,
          sea_level: 1022,
          grnd_level: 981,
          humidity: 84,
          temp_kf: 0
        },
        weather: [
          {
            id: 801,
            main: "Clouds",
            description: "few clouds",
            icon: "02n"
          }
        ],
        clouds: {
          all: 24
        },
        wind: {
          speed: 1.56,
          deg: 59
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-20 06:00:00"
      },
      {
        dt: 1574240400,
        main: {
          temp: 3.76,
          temp_min: 3.76,
          temp_max: 3.76,
          pressure: 1021,
          sea_level: 1021,
          grnd_level: 980,
          humidity: 74,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04d"
          }
        ],
        clouds: {
          all: 63
        },
        wind: {
          speed: 2.71,
          deg: 87
        },
        sys: {
          pod: "d"
        },
        dt_txt: "2019-11-20 09:00:00"
      },
      {
        dt: 1574251200,
        main: {
          temp: 7.75,
          temp_min: 7.75,
          temp_max: 7.75,
          pressure: 1018,
          sea_level: 1018,
          grnd_level: 979,
          humidity: 65,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03d"
          }
        ],
        clouds: {
          all: 39
        },
        wind: {
          speed: 2.66,
          deg: 83
        },
        sys: {
          pod: "d"
        },
        dt_txt: "2019-11-20 12:00:00"
      },
      {
        dt: 1574262000,
        main: {
          temp: 6.05,
          temp_min: 6.05,
          temp_max: 6.05,
          pressure: 1017,
          sea_level: 1017,
          grnd_level: 977,
          humidity: 74,
          temp_kf: 0
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01d"
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 2.85,
          deg: 70
        },
        sys: {
          pod: "d"
        },
        dt_txt: "2019-11-20 15:00:00"
      },
      {
        dt: 1574272800,
        main: {
          temp: 3.68,
          temp_min: 3.68,
          temp_max: 3.68,
          pressure: 1017,
          sea_level: 1017,
          grnd_level: 977,
          humidity: 90,
          temp_kf: 0
        },
        weather: [
          {
            id: 801,
            main: "Clouds",
            description: "few clouds",
            icon: "02n"
          }
        ],
        clouds: {
          all: 11
        },
        wind: {
          speed: 2.2,
          deg: 84
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-20 18:00:00"
      },
      {
        dt: 1574283600,
        main: {
          temp: 3.33,
          temp_min: 3.33,
          temp_max: 3.33,
          pressure: 1016,
          sea_level: 1016,
          grnd_level: 976,
          humidity: 92,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03n"
          }
        ],
        clouds: {
          all: 47
        },
        wind: {
          speed: 1.71,
          deg: 79
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-20 21:00:00"
      },
      {
        dt: 1574294400,
        main: {
          temp: 3.63,
          temp_min: 3.63,
          temp_max: 3.63,
          pressure: 1015,
          sea_level: 1015,
          grnd_level: 975,
          humidity: 93,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 74
        },
        wind: {
          speed: 1.51,
          deg: 86
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-21 00:00:00"
      },
      {
        dt: 1574305200,
        main: {
          temp: 3.57,
          temp_min: 3.57,
          temp_max: 3.57,
          pressure: 1013,
          sea_level: 1013,
          grnd_level: 973,
          humidity: 94,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 100
        },
        wind: {
          speed: 1.89,
          deg: 93
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-21 03:00:00"
      },
      {
        dt: 1574316000,
        main: {
          temp: 3.68,
          temp_min: 3.68,
          temp_max: 3.68,
          pressure: 1012,
          sea_level: 1012,
          grnd_level: 973,
          humidity: 92,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 100
        },
        wind: {
          speed: 2.12,
          deg: 108
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-21 06:00:00"
      },
      {
        dt: 1574326800,
        main: {
          temp: 5.53,
          temp_min: 5.53,
          temp_max: 5.53,
          pressure: 1012,
          sea_level: 1012,
          grnd_level: 972,
          humidity: 84,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04d"
          }
        ],
        clouds: {
          all: 89
        },
        wind: {
          speed: 2.74,
          deg: 123
        },
        sys: {
          pod: "d"
        },
        dt_txt: "2019-11-21 09:00:00"
      },
      {
        dt: 1574337600,
        main: {
          temp: 6.83,
          temp_min: 6.83,
          temp_max: 6.83,
          pressure: 1010,
          sea_level: 1010,
          grnd_level: 971,
          humidity: 79,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04d"
          }
        ],
        clouds: {
          all: 95
        },
        wind: {
          speed: 2.97,
          deg: 132
        },
        sys: {
          pod: "d"
        },
        dt_txt: "2019-11-21 12:00:00"
      },
      {
        dt: 1574348400,
        main: {
          temp: 6.41,
          temp_min: 6.41,
          temp_max: 6.41,
          pressure: 1010,
          sea_level: 1010,
          grnd_level: 971,
          humidity: 81,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04d"
          }
        ],
        clouds: {
          all: 93
        },
        wind: {
          speed: 1.64,
          deg: 130
        },
        sys: {
          pod: "d"
        },
        dt_txt: "2019-11-21 15:00:00"
      },
      {
        dt: 1574359200,
        main: {
          temp: 4.21,
          temp_min: 4.21,
          temp_max: 4.21,
          pressure: 1010,
          sea_level: 1010,
          grnd_level: 971,
          humidity: 90,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03n"
          }
        ],
        clouds: {
          all: 47
        },
        wind: {
          speed: 1.7,
          deg: 119
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-21 18:00:00"
      },
      {
        dt: 1574370000,
        main: {
          temp: 3.68,
          temp_min: 3.68,
          temp_max: 3.68,
          pressure: 1011,
          sea_level: 1011,
          grnd_level: 971,
          humidity: 92,
          temp_kf: 0
        },
        weather: [
          {
            id: 801,
            main: "Clouds",
            description: "few clouds",
            icon: "02n"
          }
        ],
        clouds: {
          all: 13
        },
        wind: {
          speed: 1.59,
          deg: 111
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-21 21:00:00"
      },
      {
        dt: 1574380800,
        main: {
          temp: 3.25,
          temp_min: 3.25,
          temp_max: 3.25,
          pressure: 1011,
          sea_level: 1011,
          grnd_level: 971,
          humidity: 93,
          temp_kf: 0
        },
        weather: [
          {
            id: 801,
            main: "Clouds",
            description: "few clouds",
            icon: "02n"
          }
        ],
        clouds: {
          all: 23
        },
        wind: {
          speed: 1.7,
          deg: 117
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-22 00:00:00"
      },
      {
        dt: 1574391600,
        main: {
          temp: 2.84,
          temp_min: 2.84,
          temp_max: 2.84,
          pressure: 1012,
          sea_level: 1012,
          grnd_level: 972,
          humidity: 94,
          temp_kf: 0
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01n"
          }
        ],
        clouds: {
          all: 7
        },
        wind: {
          speed: 1.6,
          deg: 110
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-22 03:00:00"
      },
      {
        dt: 1574402400,
        main: {
          temp: 2.46,
          temp_min: 2.46,
          temp_max: 2.46,
          pressure: 1012,
          sea_level: 1012,
          grnd_level: 972,
          humidity: 93,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03n"
          }
        ],
        clouds: {
          all: 45
        },
        wind: {
          speed: 1.92,
          deg: 115
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-11-22 06:00:00"
      },
      {
        dt: 1574413200,
        main: {
          temp: 4.61,
          temp_min: 4.61,
          temp_max: 4.61,
          pressure: 1013,
          sea_level: 1013,
          grnd_level: 973,
          humidity: 82,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04d"
          }
        ],
        clouds: {
          all: 94
        },
        wind: {
          speed: 2.26,
          deg: 117
        },
        sys: {
          pod: "d"
        },
        dt_txt: "2019-11-22 09:00:00"
      },
      {
        dt: 1574424000,
        main: {
          temp: 7.56,
          temp_min: 7.56,
          temp_max: 7.56,
          pressure: 1011,
          sea_level: 1011,
          grnd_level: 972,
          humidity: 73,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04d"
          }
        ],
        clouds: {
          all: 97
        },
        wind: {
          speed: 2.54,
          deg: 103
        },
        sys: {
          pod: "d"
        },
        dt_txt: "2019-11-22 12:00:00"
      }
    ],
    city: {
      id: 2861650,
      name: "Nuremberg",
      coord: {
        lat: 49.4539,
        lon: 11.0773
      },
      country: "DE",
      population: 499237,
      timezone: 3600,
      sunrise: 1573972154,
      sunset: 1574004731
    }
  }
};

const getters: GetterTree<WeatherForecastState, RootState> = {
  error: (state: WeatherForecastState) => state.error,
  isLoading: (state: WeatherForecastState) => state.isLoading,
  mostWeatherCondition: (state: WeatherForecastState) =>
    mostWeatherCondition(getWeatherForecastList(state)),
  temperatureMax: (state: WeatherForecastState) =>
    Math.max(
      ...getWeatherForecastList(state).map(
        (value: WeatherForecastPart) => value.main.temp_max
      )
    ),
  temperatureMin: (state: WeatherForecastState) =>
    Math.min(
      ...getWeatherForecastList(state).map(
        (value: WeatherForecastPart) => value.main.temp_min
      )
    ),
  trendCloud: (state: WeatherForecastState) =>
    getWeatherForecastList(state).map(
      (value: WeatherForecastPart) => value.clouds.all
    ),
  trendHumidity: (state: WeatherForecastState) =>
    getWeatherForecastList(state).map(
      (value: WeatherForecastPart) => value.main.humidity
    ),
  trendPressure: (state: WeatherForecastState) =>
    getWeatherForecastList(state).map(
      (value: WeatherForecastPart) => value.main.pressure
    ),
  trendTemperature: (state: WeatherForecastState) =>
    getWeatherForecastList(state).map((value: WeatherForecastPart) => ({
      temp: value.main.temp,
      temp_min: value.main.temp_min,
      temp_max: value.main.temp_max
    })),
  trendWind: (state: WeatherForecastState) =>
    getWeatherForecastList(state).map(
      (value: WeatherForecastPart) => value.wind
    ),
  weatherForecast: (state: WeatherForecastState) => state.weatherForecast,
  weatherForecastList: (state: WeatherForecastState) =>
    getWeatherForecastList(state)
};

const mutations: MutationTree<WeatherForecastState> = {
  setError(state: WeatherForecastState, error: any) {
    state.error = error;
  },
  setFilter(state: WeatherForecastState, filter: string) {
    state.filter = filter;
  },
  setIsLoading(state: WeatherForecastState, isLoading: boolean) {
    state.isLoading = isLoading;
  },
  setWeatherForecast(
    state: WeatherForecastState,
    weatherForecast: WeatherForecast
  ) {
    state.weatherForecast = weatherForecast;
  }
};

const actions: ActionTree<WeatherForecastState, RootState> = {
  loadWeatherForecast({ commit, getters }): void {
    commit(mutations.setWeatherForecast.name, undefined);
    commit(mutations.setError.name, undefined);
    commit(mutations.setIsLoading.name, true);

    const city: City = getters.city;
    const appId: string = getters.openWeatherApiKey;

    openWeatherService
      .loadWeatherForecast(city, appId)
      .pipe(
        catchError((error: any) => {
          commit(mutations.setError.name, error);
          return of(undefined);
        }),
        take(1)
      )
      .subscribe((weatherForecast: WeatherForecast | undefined) => {
        commit(mutations.setWeatherForecast.name, weatherForecast);
        commit(mutations.setIsLoading.name, false);
      });
  },
  setFilter({ commit }, filter: string): void {
    commit(mutations.setFilter.name, filter);
  }
};

export const weatherForecastModule: Module<WeatherForecastState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
