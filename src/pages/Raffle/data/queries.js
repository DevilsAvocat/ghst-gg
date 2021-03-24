export const commonQuery = `{
    erc1155Listings (
        first: 5, 
        orderBy: timeLastPurchased,
        orderDirection: desc,
        where: {
            cancelled: false, 
            sold: true,
            category: 3,
            erc1155TypeId: 0
        }
    )
    {
        id,
        priceInWei
    }
}`;

export const uncommonQuery = `{ 
    erc1155Listings (
        first: 5, 
        orderBy: timeLastPurchased,
        orderDirection: desc,
        where: {
            cancelled: false, 
            sold: true,
            category: 3,
            erc1155TypeId: 1
        }
    )
    {
        id,
        priceInWei
    }
}`;

export const rareQuery = `{ 
    erc1155Listings (
        first: 5, 
        orderBy: timeLastPurchased,
        orderDirection: desc,
        where: {
            cancelled: false, 
            sold: true,
            category: 3,
            erc1155TypeId: 2
        }
    )
    {
        id,
        priceInWei
    }
}`;

export const legendaryQuery = `{ 
    erc1155Listings (
        first: 5, 
        orderBy: timeLastPurchased,
        orderDirection: desc,
        where: {
            cancelled: false, 
            sold: true,
            category: 3,
            erc1155TypeId: 3
        }
    )
    {
        id,
        priceInWei
    }
}`;

export const mythicalQuery = `{ 
    erc1155Listings (
        first: 5, 
        orderBy: timeLastPurchased,
        orderDirection: desc,
        where: {
            cancelled: false, 
            sold: true,
            category: 3,
            erc1155TypeId: 4
        }
    )
    {
        id,
        priceInWei
    }
}`;

export const godlikeQuery = `{ 
    erc1155Listings (
        first: 5, 
        orderBy: timeLastPurchased,
        orderDirection: desc,
        where: {
            cancelled: false, 
            sold: true,
            category: 3,
            erc1155TypeId: 5
        }
    )
    {
        id,
        priceInWei
    }
}`;