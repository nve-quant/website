// Owner-confirmed CEX/DEX access model. Specific permission settings remain engagement-specific.
export const accessPathways = [
  {
    name: 'Centralized exchanges',
    account: 'Your exchange accounts',
    accountDetail: 'Client-funded liquidity',
    permission: 'API-key access',
    permissionDetail: 'Permissions agreed before trading',
    operation: 'CEX market making',
    operationDetail: 'Quoting and inventory management',
    href: '/market-making#access',
    link: 'CEX access and operation',
  },
  {
    name: 'Decentralized exchanges',
    account: 'Your onchain vaults',
    accountDetail: 'Safe or Squads',
    permission: 'Roles and permissions',
    permissionDetail: 'Configuration agreed for the mandate',
    operation: 'DEX liquidity management',
    operationDetail: 'Allocation and range management',
    href: '/dex-liquidity-management#access',
    link: 'DEX access and operation',
  },
] as const;
