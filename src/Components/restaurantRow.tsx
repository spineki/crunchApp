import { Accordion, AccordionDetails, AccordionSummary, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { Restaurant } from "../types";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
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
    }),
);


type Props = {
    restaurant: Restaurant
    onExpand: (shouldOpen: boolean) => void
    expanded: boolean;
}

export function RestaurantRow(props: Props) {
    const { restaurant, expanded, onExpand } = props;
    const classes = useStyles();

    console.log(restaurant.tags);

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
                <AccordionDetails>
                    <Typography>
                        {"tags" in restaurant ? restaurant.tags.map(
                            (tag) => {
                                return (<span>#{tag.title} </span>)
                                    ;
                            }) : null}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}