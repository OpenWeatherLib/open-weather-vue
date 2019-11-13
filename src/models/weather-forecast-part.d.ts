import { Clouds } from "@/models/clouds";
import { Main } from "@/models/main";
import { Rain } from "@/models/rain";
import { WeatherPart } from "@/models/weather-part";
import { Wind } from "@/models/wind";

import WeatherCondition from "@/enums/weather-condition.enum";

export interface WeatherForecastPart {
    dt: number;
    main: Main;
    weather: WeatherPart[];
    clouds: Clouds;
    wind: Wind;
    rain: Rain;
    dt_txt: string;
    weatherCondition: WeatherCondition;
}
