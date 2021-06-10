import { useState } from "react";
import { Restaurant } from "../types"
import { RestaurantRow } from "./restaurantRow";

type Props = {
    restaurants: Array<Restaurant>
}

export function RestaurantList(props: Props) {

    const { restaurants } = props;
    const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);


    return (
        <>
            {
                restaurants.length == 0
                    ?
                    <span>"Sorry, no restaurant found 🤭. Maybe try closer to a big town? 🏙"</span>
                    :
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
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