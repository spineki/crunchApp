import { Accordion, AccordionDetails, AccordionSummary, createStyles, Link, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { Restaurant } from "../types";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MapIcon from "@material-ui/icons/PinDrop";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '90%',
            flexShrink: 0,
        },
        secondaryHeading: {
            flexBasis: '66.66%',
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },

        starHeading: {
            fontSize: theme.typography.pxToRem(15),
        },

        details: {
            display: "flex",
            flexDirection: "column",
        },
        tagContainer: {
            display: "flex",
            flexWrap: "wrap"
        },
        tag: {
            fontWeight: "bold"
        },
        place: {
            display: "flex",
            alignItems: "center"
        }
    }),
);


type Props = {
    restaurant: Restaurant
    onExpand: (shouldOpen: boolean) => void
    expanded: boolean;
}

/**
 * A component to display a restaurant (row)
 * @param props 
 * @returns 
 */
export function RestaurantRow(props: Props) {
    const classes = useStyles();
    const { restaurant, expanded, onExpand } = props;
    const place = restaurant.vicinity.split("<br/>").join(", ");

    return (
        <div>
            <Accordion expanded={expanded} onChange={() => onExpand(!expanded)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography className={classes.heading}>{restaurant.title}</Typography>
                    <Typography className={classes.starHeading}>{"⭐".repeat(restaurant.averageRating)}</Typography>
                    <Typography className={classes.secondaryHeading}>
                        {restaurant.distance} m</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                    <Link href={`https://maps.google.com/?q=${place}`} color="inherit" target="_blank" rel="noopener">
                        <Typography className={classes.place}>
                            <MapIcon /> {place}
                        </Typography>
                    </Link>

                    <Typography
                        className={classes.tagContainer}
                    >
                        {"tags" in restaurant ? restaurant.tags.map(
                            (tag) => {
                                return (<span className={classes.tag}> #{tag.title}&nbsp;</span>)
                                    ;
                            }) : null}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}