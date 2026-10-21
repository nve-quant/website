// Populate only from owner-confirmed public coverage. Empty lists render nothing.
// Operational coverage does not imply partnership or endorsement.
export interface CexVenue { name: string; logo?: string; }
export interface DexDeployment { protocol: string; networks: string[]; poolTypes: string[]; }
export const cexVenues: CexVenue[] = [];
export const dexDeployments: DexDeployment[] = [];
