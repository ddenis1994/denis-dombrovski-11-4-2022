export namespace Weather {
    export namespace OneDay {
        export type Request = {
            cityKey: string;
        }
        export type Response = {
            "Headline": {
                "EffectiveDate": string,
                "EffectiveEpochDate": number
                "Severity": number,
                "Text": string
                "Category": string
                "EndDate": string
                "EndEpochDate": number
                "MobileLink": string
                "Link": string
            },
            "DailyForecasts": FiveDays.DailyForecast[]
        }
    }
}

export namespace Weather {
    export namespace AutoComplete {
        type Value = {
            "Version": number,
            "Key": string,
            "Type": string,
            "Rank": number,
            "LocalizedName": string,
            "Country": {
                "ID": string,
                "LocalizedName": string
            },
            "AdministrativeArea": {
                "ID": string,
                "LocalizedName": string
            }
        }
        export type Response = Value[]
    }
    export namespace CurrentWeather {
        type Value = {
            "LocalObservationDateTime": string;
            "EpochTime": number,
            "WeatherText": string
            "WeatherIcon": number,
            "HasPrecipitation": boolean,
            "PrecipitationType": unknown,
            "IsDayTime": boolean,
            "Temperature": Record<string, {
                "Value": number,
                "Unit": string,
                "UnitType": number
            }>,

            "MobileLink": string,
            "Link": string
        }
        export type Return = Value[]
    }

    export namespace FiveDays {
        export type DailyForecast = {
            "Date": string,
            "EpochDate": number,
            "Temperature": {
                "Minimum": {
                    "Value": number,
                    "Unit": string,
                    "UnitType": number
                },
                "Maximum": {
                    "Value": number,
                    "Unit": string,
                    "UnitType": number
                }
            },
            "Day": {
                "Icon": number,
                "IconPhrase": string,
                "HasPrecipitation": boolean
            },
            "Night": {
                "Icon": number,
                "IconPhrase": string,
                "HasPrecipitation": boolean
            },
            "Sources": string[

            ],
            "MobileLink": string,
            "Link": string
        }
        export type Return = {
            "Headline": {
                "EffectiveDate": string,
                "EffectiveEpochDate": number,
                "Severity": number,
                "Text": string,
                "Category": number,
                "EndDate": unknown,
                "EndEpochDate": unknown,
                "MobileLink": string,
                "Link": string
            },
            "DailyForecasts": DailyForecast[],

        }
    }

    export namespace CityByGeoLocation {
        export type Request = {
            apikey: string,
            q: `${string},${string}`,
            language?: string,
            details?: boolean,
            toplevel?: boolean
        }
        export type Response = {
            "Version": number,
            "Key": string,
            "Type": string,
            "Rank": number,
            "LocalizedName": string,
            "EnglishName": string,
            "PrimaryPostalCode": string,
            "Region": {
                "ID": string,
                "LocalizedName": string,
                "EnglishName": string
            },
            "Country": {
                "ID": string,
                "LocalizedName": string,
                "EnglishName": string
            },
            "AdministrativeArea": {
                "ID": string,
                "LocalizedName": string,
                "EnglishName": string,
                "Level": number,
                "LocalizedType": string,
                "EnglishType": string,
                "CountryID": string
            },
            "TimeZone": {
                "Code": string
                "Name": string,
                "GmtOffset": number,
                "IsDaylightSaving": boolean,
                "NextOffsetChange": string
            },
            "GeoPosition": {
                "Latitude": number,
                "Longitude": number,
                "Elevation": {
                    "Metric": {
                        "Value": number,
                        "Unit": string,
                        "UnitType": number
                    },
                    "Imperial": {
                        "Value": number,
                        "Unit": string,
                        "UnitType": number
                    }
                }
            },
            "IsAlias": boolean,
            "SupplementalAdminAreas": unknown[],
            "DataSets": string[
            ]
        }

    }
}



