import { defineField, defineType } from 'sanity';

export const blogPost = defineType({
    name: 'blogPost',
    title: 'Blog Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Short Description',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required().max(200),
        }),
        defineField({
            name: 'content',
            title: 'Full Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                            { title: 'Underline', value: 'underline' },
                        ],
                        annotations: [
                            {
                                title: 'Link',
                                name: 'link',
                                type: 'object',
                                fields: [
                                    {
                                        title: 'URL',
                                        name: 'href',
                                        type: 'url',
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: 'caption',
                            title: 'Caption',
                            type: 'string',
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'author',
            title: 'Author Name',
            type: 'string',
            initialValue: 'Sumegha',
        }),
        defineField({
            name: 'category',
            title: 'Blog Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Philosophy', value: 'Philosophy' },
                    { title: 'Tradition', value: 'Tradition' },
                    { title: 'Design', value: 'Design' },
                    { title: 'Behind the Scenes', value: 'Behind the Scenes' },
                    { title: 'Tips & Ideas', value: 'Tips & Ideas' },
                ],
            },
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published Date',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        }),
    ],
    orderings: [
        {
            title: 'Published Date (Newest First)',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'category',
            media: 'coverImage',
        },
    },
});
