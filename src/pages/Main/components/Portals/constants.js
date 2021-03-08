const Constants = {
    RPC_URL: 'https://rpc-mainnet.maticvigil.com/v1/de9ab922c0ff3e6d6e2863750dd2ca68fd01a267',
    TOKEN_ADDRESS: '0xb0897686c545045aFc77CF20eC7A532E3120E0F1',
    WALLET_ADDRESS: '0x86935F11C86623deC8a25696E1C19a8659CbF95d',
    MIN_ABI: [
        {
            'constant':true,
            'inputs':[{'name':'_owner','type':'address'}],
            'name':'balanceOf',
            'outputs':[{'name':'balance','type':'uint256'}],
            'type':'function'
        },
        {
            'constant':true,
            'inputs':[],
            'name':'decimals',
            'outputs':[{'name':'','type':'uint8'}],
            'type':'function'
        }
    ]
}

export default Constants