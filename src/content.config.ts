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
			category: z.enum(['research', 'personal']).default('personal'),
			order: z.number().default(99),
			heroImage: image().optional(),
		}),
});

const notes = defineCollection({
	loader: glob({ base: './src/content/notes', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			summary: z.string(),
			date: z.coerce.date().optional(),
			heroImage: image().optional(),
			gallery: z.array(z.string()).default([]),
			captions: z.record(z.string(), z.string()).default({}),
		}),
});

export const collections = { adventures, projects, notes };
