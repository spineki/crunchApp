export type Restaurant = {
    distance: number;
    title: string;
    vicinity: string;
    tags: Array<{title: string}>;
    position: Array<number>;
    averageRating: number
};
