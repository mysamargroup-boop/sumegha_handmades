import { defineField, defineType } from 'sanity';

export const product = defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Product Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: { source: 'name', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'productId',
            title: 'Product ID (e.g., SH-CNP-03)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'image',
            title: 'Product Image',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'additionalImages',
            title: 'Additional Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'subcategory',
            title: 'Sub Category',
            type: 'string',
        }),
        defineField({
            name: 'regular_price',
            title: 'Regular Price (₹)',
            type: 'number',
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'sale_price',
            title: 'Sale Price (₹)',
            type: 'number',
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'weight',
            title: 'Weight',
            type: 'string',
        }),
        defineField({
            name: 'dimensions',
            title: 'Dimensions',
            type: 'string',
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        }),
        defineField({
            name: 'rating',
            title: 'Rating (1-5)',
            type: 'number',
            validation: (Rule) => Rule.min(1).max(5),
            initialValue: 5,
        }),
        defineField({
            name: 'isFeatured',
            title: 'Featured Product?',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'sale_price',
            media: 'image',
        },
        prepare({ title, subtitle, media }) {
            return {
                title,
                subtitle: subtitle ? `₹${subtitle}` : '',
                media,
            };
        },
    },
});
