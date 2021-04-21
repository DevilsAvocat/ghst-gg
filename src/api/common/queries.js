export const gotchiesQuery = (skip, orderDir) => {
    return `{
        aavegotchis(
          first: 1000,
          skip: ${skip},
          orderBy: id,
          orderDirection: ${orderDir},
          where: {status: 3}
        ) {
          id
          name
          numericTraits
          baseRarityScore
          modifiedRarityScore
          kinship
          experience
          equippedWearables
          owner {
            id
          }
        }
    }`
};