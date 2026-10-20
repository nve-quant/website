import {createGold} from './gold';
import {createFund} from './fund';
import {createStock} from './stock';
import {createEmerald} from './emerald';
import {createOil,createWheat} from './commodities';
import {createCorn,createSoy} from './grains';
import {createCopper} from './metals';
import {createNickel,createGas,createCoffee,createCotton} from './additional-assets';
import {createRealEstate} from './real-estate';
import type {AssetVariantId} from '../../data/market-model';
import type * as THREE from 'three';

export const assetBuilders:Record<AssetVariantId,()=>THREE.Group>={
    gold:()=>createGold(),silver:()=>createGold('silver'),palladium:()=>createGold('palladium'),platinum:()=>createGold('platinum'),
    nickel:createNickel,gas:createGas,coffee:createCoffee,cotton:createCotton,treasury:()=>createStock('treasury'),bond:()=>createStock('bond'),
    fund:createFund,stock:createStock,emerald:createEmerald,ruby:()=>createEmerald('ruby'),sapphire:()=>createEmerald('sapphire'),diamond:()=>createEmerald('diamond'),oil:createOil,wheat:createWheat,corn:createCorn,soy:createSoy,copper:createCopper,aluminium:()=>createGold('aluminium'),
    residential:()=>createRealEstate('residential'),office:()=>createRealEstate('office'),warehouse:()=>createRealEstate('warehouse'),
  };
