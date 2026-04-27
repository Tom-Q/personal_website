import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const adventures = defineCollection({
	loader: glob({ base: './src/content/adventures', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			date: z.coerce.date(),
			location: z.string(),
			heroImage: image(),
			summary: z.string(),
			tags: z.array(z.string()).default([]),
			gallery: z.array(z.string()).default([]),
		}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			summary: z.string(),
			tags: z.array(z.string()).default([]),
			status: z.enum(['active', 'complete', 'on-hold']),
			order: z.number().default(99),
			heroImage: image().optional(),
		}),
});

export const collections = { adventures, projects };
