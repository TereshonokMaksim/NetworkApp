import { UserProfile } from "./types/friends.types";

export const testFriendProfiles: UserProfile[] = [
    {
        id: 10,
        user: {
        id: 10,
        username: "Bob Sanders",
        name: "Bob",
        surname: "Sanders",
        },
        birth_date: "1990-04-12",
        signature: "Keep moving forward.",
        avatar: "https://picsum.photos/seed/bob-sanders/300/300",
        preudonym: "@bobsanders",
        friends: [],
        is_text_signature: true,
        is_image_signature: false,
    },
    {
        id: 11,
        user: {
        id: 11,
        username: "Alice Cooper",
        name: "Alice",
        surname: "Cooper",
        },
        birth_date: "1992-08-21",
        signature: "Coffee first.",
        avatar: "https://picsum.photos/seed/alice-cooper/300/300",
        preudonym: "@alicecooper",
        friends: [],
        is_text_signature: true,
        is_image_signature: false,
    },    
];

export const testRecomendationProfiles: UserProfile[] = [
    {
        id: 12,
        user: {
        id: 12,
        username: "John Miller",
        name: "John",
        surname: "Miller",
        },
        birth_date: "1988-01-15",
        signature: "Adventure awaits.",
        avatar: "https://picsum.photos/seed/john-miller/300/300",
        preudonym: "@johnmiller",
        friends: [],
        is_text_signature: false,
        is_image_signature: true,
    },
    {
        id: 13,
        user: {
        id: 13,
        username: "Emma Wilson",
        name: "Emma",
        surname: "Wilson",
        },
        birth_date: "1995-11-03",
        signature: "Dream big.",
        avatar: "https://picsum.photos/seed/emma-wilson/300/300",
        preudonym: "@emmawilson",
        friends: [],
        is_text_signature: true,
        is_image_signature: false,
    },
    {
        id: 14,
        user: {
        id: 14,
        username: "Michael Brown",
        name: "Michael",
        surname: "Brown",
        },
        birth_date: "1987-06-30",
        signature: "Simple things matter.",
        avatar: "https://picsum.photos/seed/michael-brown/300/300",
        preudonym: "@michaelbrown",
        friends: [],
        is_text_signature: false,
        is_image_signature: true,
    },
]

export const testRequestProfiles: UserProfile[] = [
{
        id: 18,
        user: {
        id: 18,
        username: "Daniel White",
        name: "Daniel",
        surname: "White",
        },
        birth_date: "1991-07-27",
        signature: "Always learning.",
        avatar: "https://picsum.photos/seed/daniel-white/300/300",
        preudonym: "@danielwhite",
        friends: [],
        is_text_signature: true,
        is_image_signature: false,
    },
    {
        id: 19,
        user: {
        id: 19,
        username: "Sophia Harris",
        name: "Sophia",
        surname: "Harris",
        },
        birth_date: "1996-05-10",
        signature: "Create your own path.",
        avatar: "https://picsum.photos/seed/sophia-harris/300/300",
        preudonym: "@sophiaharris",
        friends: [],
        is_text_signature: true,
        is_image_signature: false,
    },
]