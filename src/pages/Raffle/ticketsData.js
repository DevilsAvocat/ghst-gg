import commonIcon from '../../assets/tickets/common.svg';
import uncommonIcon from '../../assets/tickets/uncommon.svg';
import rareIcon from '../../assets/tickets/rare.svg';
import legendaryIcon from '../../assets/tickets/legendary.svg';
import mythicalIcon from '../../assets/tickets/mythical.svg';
import godlikeIcon from '../../assets/tickets/godlike.svg';

export const ticketsData = [
    {
        type: 'common',
        icon: commonIcon,
        items: 6000,
        supply: 0,
        price: 0.23,
        cost: 0.23,
        chance: 0,
        wearables: [
            { name: 'Vote Sign', amount: 1000 },
            { name: 'L2 Sign', amount: 1000 },
            { name: 'Fireball', amount: 1000 },
            { name: 'Elf Ears', amount: 1000 },
            { name: 'The Imperial Moustache', amount: 1000 },
            { name: 'Common Rofl', amount: 1000 }
        ]
    },
    {
        type: 'uncommon',
        icon: uncommonIcon,
        items: 3250,
        supply: 0,
        price: 0.92,
        cost: 0.92,
        chance: 0,
        wearables: [
            { name: 'Snapshot Shirt', amount: 500 },
            { name: 'Polygon Shirt', amount: 500 },
            { name: 'Dragon Horns', amount: 500 },
            { name: 'Gemstone Ring', amount: 500 },
            { name: 'Tiny Crown', amount: 500 },
            { name: 'Uncommon Rofl', amount: 500 },
            { name: 'Lil Pump Goatee', amount: 250 }
        ]
    },
    {
        type: 'rare',
        icon: rareIcon,
        items: 1625,
        supply: 0,
        price: 1.73,
        cost: 1.73,
        chance: 0,
        wearables: [
            { name: 'Snapshot Cap', amount: 250 },
            { name: 'Polygon Cap', amount: 250 },
            { name: 'Dragon Wings', amount: 250 },
            { name: 'Princess Tiara', amount: 250 },
            { name: 'Royal Scepter', amount: 250 },
            { name: 'Rare Rofl', amount: 250 },
            { name: 'Lil Pump Drank', amount: 125 }
        ]
    },
    {
        type: 'legendary',
        icon: legendaryIcon,
        items: 450,
        supply: 0,
        price: 7.55,
        cost: 7.55,
        chance: 0,
        wearables: [
            { name: 'Pointy Horns', amount: 100 },
            { name: 'Gold Necklace', amount: 100 },
            { name: 'Royal Crown', amount: 100 },
            { name: 'Legendary Rofl', amount: 100 },
            { name: 'Lil Pump Drank', amount: 50 }
        ]
    },
    {
        type: 'mythical',
        icon: mythicalIcon,
        items: 175,
        supply: 0,
        price: 29.65,
        cost: 29.65,
        chance: 0,
        wearables: [
            { name: 'Princess Hair', amount: 50 },
            { name: 'Royal Robes', amount: 50 },
            { name: 'Mythical Rofl', amount: 50 },
            { name: 'Lil Pump Threads', amount: 25 }
        ]
    },
    {
        type: 'godlike',
        icon: godlikeIcon,
        items: 12,
        supply: 0,
        price: 128.20,
        cost: 128.20,
        chance: 0,
        wearables: [
            { name: 'Goldi Locks', amount: 5 },
            { name: 'Royal Rofl', amount: 5 },
            { name: 'Lil Pump Dreads', amount: 2 }
        ]
    }
];