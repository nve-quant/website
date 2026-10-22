/** Schematic liquidity contributions per price bin, not live observations. */
export const needLiquidityBands = [14,26,18,10,14,34,26,16].map((other,index)=>{
 const x=16+index*16,centre=x+8;
 const managed=(price:number)=>{
  const distance=Math.abs(centre-price);
  return distance<26?7+15*Math.exp(-(((distance-17)/8)**2)):0;
 };
 return {x,other,managedStart:managed(68),managedEnd:managed(100)};
});
