import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { useState } from "react";
import { Restaurant } from "../types"
import { RestaurantRow } from "./restaurantRow";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sorry: {
            display: "flex",
            alignSelf: "center"
        },
        rowContainer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly"
        }
    })
);



type Props = {
    restaurants: Array<Restaurant>
}

export function RestaurantList(props: Props) {
    const classes = useStyles();
    const { restaurants } = props;
    const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);


    return (
        <>
            {
                restaurants.length === 0
                    ?
                    <span className={classes.sorry}>Sorry, no restaurant found 🤭. <br /> Maybe try closer to a big town? 🏙</span>
                    :
                    <div className={classes.rowContainer}>
                        {
                            restaurants.map((restaurant, index) => {
                                return (
                                    <RestaurantRow
                                        key={index}
                                        restaurant={restaurant}
                                        expanded={selectedRestaurant === index}
                                        onExpand={(shouldOpen) => { shouldOpen ? setSelectedRestaurant(index) : setSelectedRestaurant(null) }}
                                    />
                                )
                            })
                        }
                    </div>
            }
        </>
    );
}