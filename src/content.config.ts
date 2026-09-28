import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const games = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/games' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['potato', 'fries']),
    image: z.string(),
    year: z.coerce.number().int(),
    genre: z.string(),
    hardware: z.string(),
    performance: z.string(),
    description: z.string(),
    storeUrl: z.string().url().optional().or(z.literal('')),
    storeLabel: z.string().optional(),
  }),
});

export const collections = { games };
