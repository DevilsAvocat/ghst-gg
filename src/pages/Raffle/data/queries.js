export const raffleTicketPriceQuery = (id) => {
    return `{ 
        erc1155Listings (
            first: 5, 
            orderBy: timeLastPurchased,
            orderDirection: desc,
            where: {
                cancelled: false, 
                sold: true,
                category: 3,
                erc1155TypeId: ${id}
            }
        )
        {
            id,
            priceInWei
        }
    }`
};

export const raffleTotalQuery = (id) => {
    return `{
        total(id: ${id}) {
            totalCommon
            totalUncommon
            totalRare
            totalLegendary
            totalMythical
            totalLegendary
            totalGodLike
            totalDrop
        }
    }`
};

export const raffle5TotalEnteredQuery = () => {
    return `{
        total(id: 4) {
            totalDrop
        }
    }`
};