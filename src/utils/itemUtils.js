import { wearables } from '../data/wearables';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getItemNameById(id) {
        return wearables[id]?.name || '';
    },

    getItemStatsById(id) {
        return wearables[id]?.stats || '';
    },

    getItemRarityById(id) {
        return wearables[id]?.rarity || '';
    },

    getItemType(item) {
        const itemMap = {
            'ERC721Listing': {
                '0': () => {
                    return 'closed_portal';
                },
                '2': () => {
                    return 'open_portal';
                },
                '3': () => {
                    return 'aavegotchi';
                }
            },
            'ERC1155Listing': {
                '0': () => {
                    return 'wearable';
                },
                '2': () => {
                    return 'consumable';
                },
                '3': () => {
                    return 'ticket';
                }
            }
        };

        return itemMap[item.__typename][item.category]();
    },

    getItemRarityName(item) {
        if (item.__typename === 'ERC1155Listing') {
            return getRarityName(item.rarityLevel);
        } else {
            return null;
        }

        function getRarityName(id) {
            switch (id) {
                case '0':
                    return 'common';
                case '1':
                    return 'uncommon';
                case '2':
                    return 'rare';
                case '3':
                    return 'legendary';
                case '4':
                    return 'mythical';
                case '5':
                    return 'godlike';
                default:
                    return null;
            }
        }
    },

    getItemImg(item) {
        const typeMap = {
            wearable: () => returnWearable(),
            closed_portal: () => {
                return require(`../assets/images/portal-sealed.svg`).default;
            },
            open_portal: () => {
                return require(`../assets/images/portal-open.svg`).default;
            },
            aavegotchi: () => returnAavegotchi(),
            consumable: () => returnWearable(),
            ticket: () => returnTicket.call(this)
        };

        function returnWearable() {
            try {
                return require(`../assets/wearables/${item.erc1155TypeId}.svg`).default;
            } catch (error) {
                return require(`../assets/images/no-image2.svg`).default;
            }
        }

        function returnAavegotchi() {
            try {
                return require(`../assets/svgs/${item.tokenId}.svg`).default;
            } catch (error) {
                return require(`../assets/images/no-image2.svg`).default;
            }
        }

        function returnTicket() {
            try {
                return require(`../assets/tickets/${this.getItemRarityName(item)}.svg`).default;
            } catch (error) {
                return require(`../assets/images/no-image2.svg`).default;
            }
        }

        return typeMap[this.getItemType(item)]();
    },

    getItemUrl(item) {
        try {
            return `https://aavegotchi.com/baazaar/${item.__typename === "ERC1155Listing" ? 'erc1155' : 'erc721'}/${item.id}`;
        } catch (error) {
            console.error(error);
            return 'https://aavegotchi.com/baazaar';
        }
    }
}