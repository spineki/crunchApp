import React, { useCallback, useState } from "react";
import { Button, InputAdornment, OutlinedInput, TextField } from '@material-ui/core';
import axios from "axios";
import { RestaurantRow } from "./restaurantRow";
import { Restaurant } from "../types";
import { credentials } from "../credentials";
import { RestaurantList } from "./restaurantList";

export function RestaurantFinder() {
    const [latitude, setLatitude] = useState<string | number>(59.334591);
    const [longitude, setLongitude] = useState<string | number>(18.063240);
    const [isValidLatitude, setIsValidLatitude] = useState<boolean>(true);
    const [isValidLongitude, setIsValidLongitude] = useState<boolean>(true);

    const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);

    const updateLatitude = (rawLatitude: string) => {
        let latitude = Number(rawLatitude);
        if (rawLatitude !== "" && !isNaN(latitude) && latitude <= 90.0 && latitude >= -90.0) {
            setIsValidLatitude(true);
        } else {
            setIsValidLatitude(false);
        }
        setLatitude(rawLatitude);
    }

    const updateLongitude = (rawLongitude: string) => {
        let longitude = Number(rawLongitude);
        if (rawLongitude !== "" && !isNaN(longitude) && longitude <= 180 && longitude >= -180.0) {
            setIsValidLongitude(true);
        } else {
            setIsValidLongitude(false);
        }
        setLongitude(rawLongitude);
    }

    const getRestaurants = useCallback(
        () => {
            // radius of the circle
            let size = 10000;
            // our category
            let category = "restaurant";
            // How many results we want to fetch
            let nb_result = 100;

            // Creating the url for the GET command
            let url = `https://places.ls.hereapi.com/places/v1/discover/explore?in=${latitude},${longitude};r=${size}&cat=${category}&size=${nb_result}&apiKey=${credentials.apiKey}`;
            axios.get(url)
                .then(res => {
                    // We sort restaurants, closer first
                    let nearestrestaurants: Array<Restaurant> = res.data.results.items.sort((first: Restaurant, second: Restaurant) => first.distance - second.distance);
                    // Then we select only the 10 nearest
                    setRestaurants(nearestrestaurants.slice(0, 10));
                }).catch((error) => {
                    alert("Couldn't fetch data from Here Api, maybe try to verify your internet connexion? \n " + error);
                })
        }
        ,
        [latitude, longitude]
    );


    function updateCurrentLocation(navigatorPosition: GeolocationPosition) {
        let { latitude, longitude } = navigatorPosition.coords;
        setLatitude(latitude);
        setLongitude(longitude);
    }

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then(function (res) {
                    if (res.state === "granted") {
                        navigator.geolocation.getCurrentPosition(updateCurrentLocation);
                    } else if (res.state === "prompt") {
                        navigator.geolocation.getCurrentPosition(
                            updateCurrentLocation,
                            () => { alert("You need to give this app the right to access your current location to do so") },
                        );
                    } else if (res.state === "denied") {
                        alert("You need to give this app the right to access your current location to do so");
                    }
                });
        } else {
            alert("Sorry Not available!");
        }
    }

    return (
        <div
            style={{ display: "flex", flexDirection: "column", border: "2px solid black", borderRadius: 10, padding: 8 }}
        >

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <TextField
                    style={{ margin: 8 }}
                    placeholder="Latitude"
                    error={!isValidLatitude}
                    helperText={isValidLatitude ? null : "Incorrect latitude ([-90, 90])"}
                    value={latitude}
                    onChange={(event) => { updateLatitude(event.target.value); }}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">°</InputAdornment>,
                    }}
                />

                <TextField
                    style={{ margin: 8 }}
                    placeholder="Longitude"
                    error={!isValidLongitude}
                    helperText={isValidLongitude ? null : "Incorrect longitude ([-90, 90])"}
                    value={longitude}
                    onChange={(event) => { updateLongitude(event.target.value); }}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">°</InputAdornment>,
                    }}
                />


                <Button
                    style={{ margin: 8 }}
                    variant="outlined"
                    color="secondary"
                    onClick={getCurrentLocation}
                >
                    🌍 Auto Localize me

                </Button>
            </div>

            <Button
                color="primary"
                variant="outlined"
                onClick={getRestaurants}
            >
                I'm hungry, where can I eat?!
            </Button>

            <span style={{ alignSelf: "center", margin: 8 }}>
                🍴
            </span>

            <RestaurantList restaurants={restaurants} />
        </div>

    );

}
