// Owner-confirmed CEX/DEX access model, including pool/pair-scoped DEX permissions.
export const accessPathways = [
  {
    name: 'Centralized exchanges',
    account: 'Your exchange accounts',
    accountDetail: 'Client-funded liquidity',
    permission: 'API-key access',
    permissionDetail: 'Trading access only. Transfers disabled.',
    operation: 'CEX market making',
    operationDetail: 'Spot and perpetual markets',
    href: '/market-making#access',
    link: 'CEX access and operation',
  },
  {
    name: 'Decentralized exchanges',
    account: 'Your onchain vaults',
    accountDetail: 'Safe or Squads',
    permission: 'Roles and permissions',
    permissionDetail: 'Specified pool and pair. No withdrawal or send authority.',
    operation: 'DEX liquidity management',
    operationDetail: 'Ranges and balances agreed with you',
    href: '/dex-liquidity-management#access',
    link: 'DEX access and operation',
  },
] as const;
