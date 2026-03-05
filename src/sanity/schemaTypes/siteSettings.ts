import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'siteName',
            title: 'Site Name',
            type: 'string',
            initialValue: 'Sumegha Handmades',
        }),
        defineField({
            name: 'siteDescription',
            title: 'Site Description (SEO)',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'heroSlides',
            title: 'Hero Slider Images',
            description: 'Images shown in the main hero carousel on the homepage',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'badge',
                            title: 'Badge Text',
                            type: 'string',
                            initialValue: 'COLLECTION HIGHLIGHT',
                        }),
                        defineField({
                            name: 'title',
                            title: 'Title (Line 1)',
                            type: 'string',
                        }),
                        defineField({
                            name: 'highlight',
                            title: 'Highlight Text (Line 2, colored)',
                            type: 'string',
                        }),
                        defineField({
                            name: 'description',
                            title: 'Description',
                            type: 'text',
                            rows: 2,
                        }),
                        defineField({
                            name: 'image',
                            title: 'Slide Image',
                            type: 'image',
                            options: { hotspot: true },
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'linkUrl',
                            title: 'Link URL (e.g., /products?category=Custom%20Name%20Plates)',
                            type: 'string',
                        }),
                        defineField({
                            name: 'buttonText',
                            title: 'Button Text',
                            type: 'string',
                            initialValue: 'Shop Now',
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            subtitle: 'highlight',
                            media: 'image',
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'spotlightImages',
            title: 'Spotlight Gallery Images',
            description: 'Images for the Masterpiece Gallery section',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            options: { hotspot: true },
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            media: 'image',
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'instagramPosts',
            title: 'Instagram Feed Images',
            description: 'Images shown in the Instagram section on the homepage',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: { hotspot: true },
                },
            ],
        }),
        defineField({
            name: 'instagramHandle',
            title: 'Instagram Handle',
            type: 'string',
            initialValue: '@sumegha_handmades',
        }),
        defineField({
            name: 'instagramUrl',
            title: 'Instagram URL',
            type: 'url',
            initialValue: 'https://instagram.com/sumegha_handmades',
        }),
        defineField({
            name: 'whatsappNumber',
            title: 'WhatsApp Number',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Contact Email',
            type: 'string',
        }),
        defineField({
            name: 'aboutStory',
            title: 'About / Story Section Text',
            type: 'text',
            rows: 5,
        }),
        defineField({
            name: 'aboutQuote',
            title: 'Artist Quote',
            type: 'string',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Site Settings',
                subtitle: 'Global site configuration',
            };
        },
    },
});
