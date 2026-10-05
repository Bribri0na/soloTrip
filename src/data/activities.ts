export const ACTIVITY_GROUPS = [
    {
        title:"Culture & Arts",
        tages:["Vintage Markets", "Open-air Concerts", "Museums", "Cultural Festivals", "Photography Buddy"],
    },
    {
        title:"Food & Vibe",
        tages:["Cafe Hopping","Rooftop Drinks", "Local Food Tasting", "Fine Dining"],
    },
     {
        title:"Active & Outdoors",
        tages:["City Walk", "Hiking", "Kayaking","Morning Run", "Gym/Workout"],
    },
     {
        title:"Logistics",
        tages:["Split Car Rental","Share Accommodation", "Grocery & Cook"],
    },
]as const;

export type ActivityTag = (typeof ACTIVITY_GROUPS)[number]["tages"][number];