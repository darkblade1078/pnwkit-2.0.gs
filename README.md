# pnwkit-2.0
A new 2.0 version that was made using code from pnwkit 1.0 with some modifications and additions.


## Authors

- [@darkblade](https://github.com/darkblade1078)

## Special Thanks

- [@Henrik](https://github.com/icehenrik)
- [@Doctor](https://github.com/BlackAsLight)
- [@Village](https://github.com/mrvillage)
- [@leonissenbaum](https://github.com/leonissenbaum)


## Installation

Install the library using this code: ```1z8BJslEJaGkxbtPxUJsMJoH3Xd0A7JW81QIHnZ-Q5XtvbYAVhR_cUPD4```

Note - When installing the library, set the identifier to ```pnwkit```.

## Usage/Examples

### Queries
Call whatever data you want with queries
```appscript
pnwkit.setKeys('api key');

const nations = await pnwkit.nationQuery({id: [100541], first: 1}, `name`);

console.log(`Nation name: ${nations[0].name}`);
```

### Mutations
Use mutations to handle bank transactions and other things
```appscript
pnwkit.setKeys('api key', 'bot key');

const bankDeposit = await pnwkit.bankDepositMutation({ money: 1, note: 'works' }, `date`, 'api key');

console.log(`Deposit Date: ${bankDeposit.date}`);
```

### Utilities
Utilities are here to help calculate data
```appscript
pnwkit.setKeys('api key');

  const cityCost = pnwkit.utilities.cityCost(30, 31, true, true, true, true, true);

  console.log(cityCost);
```


## Supported API Features
Here is a list of all the quries, mutations, and subscriptions that are supported by pnwkit 2.0 as of now.
### Queries
- activityStatsQuery
- allianceQuery
- apiKeyDetailsQuery
- bankRecordsQuery
- baseballGameQuery
- bannedNationQuery
- baseballPlayerQuery
- baseballTeamQuery
- bountyQuery
- cityQuery
- colorQuery
- customQuery (for those who want to run custom GraphQL queries)
- emabrgoQuery
- gameInfoQuery
- nationQuery
- nationResourceStatQuery
- resourceStatsQuery
- topTradeInfoQuery
- tradePricesQuery
- tradeQuery
- treasureQuery
- treasureTradeQuery
- warAttackQuery
- warQuery
- bulletinQuery
- bulletinRepliesQuery

### Mutations
- acceptPersonalTradeMutation
- declinePersonalTradeMutation
- approveTreatyMutation
- proposeTreatyMutation
- cancelTreatyMutation
- assignAlliancePositionMutation
- editAlliancePositionMutation
- assignTaxBracketMutation
- editTaxBracketMutation
- deleteTaxBracketMutation
- bankDepositMutation
- bankWithdrawMutation
- createAlliancePositionMutation
- deleteAlliancePositionMutation

### V2
- sendMessage
