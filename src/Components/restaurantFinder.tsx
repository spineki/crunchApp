import React, { useCallback, useState } from "react";
import { Button, InputAdornment, TextField, LinearProgress, makeStyles, createStyles, Theme } from '@material-ui/core';
import axios from "axios";
import { Restaurant } from "../types";
import { credentials } from "../credentials";
import { RestaurantList } from "./restaurantList";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainContainer: {
            display: "flex",
            flexDirection: "column",
            border: "2px solid #3860bf",
            borderRadius: 10,
            padding: 8
        },
        inputRow: {
            display: "flex",
            justifyContent: "space-between"
        },
        input: {
            margin: 8
        },
        spinner: {
            alignSelf: "center",
            margin: 8,
            width: "100%"
        },
        separator: {
            alignSelf: "center",
            margin: 8
        }
    }),
);

export function RestaurantFinder() {
    const classes = useStyles();
    const [latitude, setLatitude] = useState<string | number>("");
    const [longitude, setLongitude] = useState<string | number>("");
    const [isValidLatitude, setIsValidLatitude] = useState<boolean>(false);
    const [isValidLongitude, setIsValidLongitude] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    const [restaurants, setRestaurants] = useState<Array<Restaurant> | null>(null);

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
        async () => {

            if (!isValidLatitude || !isValidLongitude) {
                alert("All field must be correct before looking for tasty restaurants!");
                setIsLoading(false);
                return;
            }

            // radius of the circle
            let size = 10000;
            // our category
            let category = "restaurant";
            // How many results we want to fetch
            let nb_result = 100;

            // Creating the url for the GET command
            let url = `https://places.ls.hereapi.com/places/v1/discover/explore?in=${latitude},${longitude};r=${size}&cat=${category}&size=${nb_result}&apiKey=${credentials.apiKey}`;

            setIsLoading(true);

            await axios.get(url)
                .then(res => {
                    // We sort restaurants, closer first
                    let nearestrestaurants: Array<Restaurant> = res.data.results.items.sort((first: Restaurant, second: Restaurant) => first.distance - second.distance);
                    // Then we select only the 10 nearest
                    setRestaurants(nearestrestaurants.slice(0, 10));
                }).catch((error) => {
                    alert("Couldn't fetch data from Here Api, maybe try to verify your internet connexion? \n " + error);
                })

            setIsLoading(false);
        }
        ,
        [isValidLatitude, isValidLongitude, latitude, longitude]
    );

    function updateCurrentLocation(navigatorPosition: GeolocationPosition) {

        let { latitude, longitude } = navigatorPosition.coords;
        updateLatitude(latitude.toString());
        updateLongitude(longitude.toString());
        setRestaurants(null);
        setIsLoading(false);
    }

    const getCurrentLocation = async () => {
        setIsLoading(true);
        if (navigator.geolocation) {
            await navigator.permissions
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
            alert("Sorry geolocation is not available!");
        }
    }

    return (
        <div
            className={classes.mainContainer}
        >
            <div className={classes.inputRow}>
                <TextField
                    className={classes.input}
                    placeholder="Latitude"
                    label="Latitude"
                    error={!isValidLatitude}
                    helperText={isValidLatitude ? null : "Choose latitude in [-90, 90]"}
                    value={latitude}
                    onChange={(event) => { updateLatitude(event.target.value); }}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">°</InputAdornment>,
                    }}
                />

                <TextField
                    className={classes.input}
                    placeholder="Longitude"
                    label="Longitude"
                    error={!isValidLongitude}
                    helperText={isValidLongitude ? null : "Choose longitude in [-180, 180]"}
                    value={longitude}
                    onChange={(event) => { updateLongitude(event.target.value); }}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">°</InputAdornment>,
                    }}
                />


                <Button
                    className={classes.input}
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

            {
                isLoading
                    ? <LinearProgress color="secondary" className={classes.spinner} />
                    :
                    <span className={classes.separator}>
                        🍴
                    </span>
            }

            {
                restaurants === null ? null : <RestaurantList restaurants={restaurants} />
            }

        </div>

    );

}
