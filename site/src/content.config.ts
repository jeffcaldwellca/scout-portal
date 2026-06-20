import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    howTo: z
      .object({
        name: z.string(),
        description: z.string(),
        steps: z.array(z.string()),
      })
      .optional(),
  }),
});

export const collections = { docs };
