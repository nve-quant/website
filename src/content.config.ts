import {defineCollection} from 'astro:content';
import {z} from 'astro/zod';
import {glob} from 'astro/loaders';
const common = {title:z.string(), summary:z.string(), source:z.url(), status:z.enum(['draft','approved'])};
export const collections = {
 services:defineCollection({loader:glob({pattern:'**/*.md',base:'./src/content/services'}),schema:z.object(common)}),
 research:defineCollection({loader:glob({pattern:'**/*.md',base:'./src/content/research'}),schema:z.object({...common, published:z.coerce.date()})})
};
