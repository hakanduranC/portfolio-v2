import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    ogImage: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    url: z.string().url().optional(),
    repo: z.string().url().optional(),
    image: z.string().optional(),
    logo: z.string().optional(),
    context: z.string().optional(),
    period: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/experience' }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    type: z.string(),
    period: z.string(),
    location: z.string(),
    logo: z.string(),
    bullets: z.array(z.string()),
    order: z.number(),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/education' }),
  schema: z.object({
    institution: z.string(),
    degree: z.string(),
    period: z.string(),
    location: z.string(),
    focus: z.string().optional(),
    logo: z.string(),
    current: z.boolean().default(false),
    order: z.number(),
  }),
});

const references = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/references' }),
  schema: z.object({
    company: z.string(),
    label: z.string(),
    quote: z.string(),
    person: z.string(),
    date: z.string(),
    pdf: z.string(),
    order: z.number(),
  }),
});

const skills = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/skills' }),
  schema: z.object({
    title: z.string(),
    icon: z.string(),
    items: z.array(z.string()),
    order: z.number(),
  }),
});

export const collections = { blog, projects, experience, education, references, skills };
