export const gotchiesQuery = (skip) => {
    return `{
        aavegotchis(
          first: 1000,
          skip: ${skip},
          orderBy: id,
          orderDirection: "desc"
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