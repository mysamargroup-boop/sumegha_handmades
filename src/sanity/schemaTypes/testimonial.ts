import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Customer Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Role / Title',
            type: 'string',
            description: 'e.g., Home Stylist, Gifting Enthusiast, Bridal Client',
        }),
        defineField({
            name: 'content',
            title: 'Review Content',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'stars',
            title: 'Rating (1-5 Stars)',
            type: 'number',
            validation: (Rule) => Rule.required().min(1).max(5),
            initialValue: 5,
        }),
        defineField({
            name: 'avatar',
            title: 'Customer Photo (Optional)',
            type: 'image',
            options: { hotspot: true },
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'content',
            media: 'avatar',
        },
        prepare({ title, subtitle }) {
            return {
                title,
                subtitle: subtitle ? subtitle.substring(0, 60) + '...' : '',
            };
        },
    },
});
