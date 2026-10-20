import {defineCollection} from 'astro:content';
import {z} from 'astro/zod';
import {glob} from 'astro/loaders';
const common = {title:z.string(), summary:z.string(), source:z.url(), status:z.enum(['draft','approved'])};
export const collections = {
 services:defineCollection({loader:glob({pattern:'**/*.md',base:'./src/content/services'}),schema:z.object({...common,
  kind:z.enum(['cex','dex']).optional(),
  audience:z.string().optional(),
  headline:z.string().optional(),
  operations:z.array(z.object({title:z.string(),text:z.string()})).optional(),
  access:z.string().optional(),
  considerations:z.string().optional(),
  faqs:z.array(z.object({question:z.string(),answer:z.string()})).optional()
 })}),
 research:defineCollection({loader:glob({pattern:'**/*.md',base:'./src/content/research'}),schema:z.object({...common, published:z.coerce.date()})})
};
