import { defineField, defineType } from 'sanity';

export const category = defineType({
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Category Name',
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
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'image',
            title: 'Category Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'subCategories',
            title: 'Sub Categories',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'name',
                            title: 'Sub Category Name',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'image',
                            title: 'Sub Category Image',
                            type: 'image',
                            options: { hotspot: true },
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'name',
                            media: 'image',
                        },
                    },
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
        },
    },
});
