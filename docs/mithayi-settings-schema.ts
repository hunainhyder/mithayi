// Settings schema for the `mithayi` tenant.
//
// The types below already exist in the backend schema file. Delete this block when
// pasting, and add `mithayi` to the `schemas` registry (key = NEXT_PUBLIC_TENANT_ID).

export type SimpleFieldType = 'text' | 'textarea' | 'asset' | 'url' | 'email' | 'tel'
export interface FieldDef { key: string; label: string; type: SimpleFieldType }
export interface RepeatableDef {
    key: string
    label: string
    type: 'repeatable'
    itemLabel: string
    fields: FieldDef[]
}
export type SectionField = FieldDef | RepeatableDef
export interface SectionDef { key: string; label: string; fields: SectionField[] }
export interface PageDef { key: string; label: string; sections: SectionDef[] }
export interface TenantSchema { pages: PageDef[] }

// ─── Conventions ─────────────────────────────────────────────────────────────
// * Headings in this design have an italic accent ("Find your <em>kind of sweet.</em>").
//   Each is split into `*_title` (plain part) and `*_title_accent` (italic part).
// * Line breaks: put "|" in a text value where the line should break.
// * Keys are unique across the whole tenant (prefixed by section) so they can be
//   stored flat, as with the other tenants.
// * The repeatable type only supports simple fields, so the footer's two link
//   columns are two separate repeatables rather than a nested one.
// * Occasion `icon` is a text field. Allowed values: moon | bloom | burst | heart |
//   sparkle | asterisk. Ratings are text (1-5) because there is no number type.

const mithayi: TenantSchema = {
    pages: [
        // ═════════════════════════ INDEX ═════════════════════════
        {
            key: 'index',
            label: 'Index Page',
            sections: [
                {
                    key: 'hero',
                    label: 'Hero Section',
                    fields: [
                        { key: 'hero_image', label: 'Background Image', type: 'asset' },
                        { key: 'hero_image_alt', label: 'Image Alt Text', type: 'text' },
                        { key: 'hero_eyebrow', label: 'Eyebrow', type: 'text' },
                        { key: 'hero_title', label: 'Title', type: 'text' },
                        { key: 'hero_title_accent', label: 'Title Accent (italic)', type: 'text' },
                        { key: 'hero_description', label: 'Description', type: 'textarea' },
                        { key: 'hero_primary_button_text', label: 'Primary Button Text', type: 'text' },
                        { key: 'hero_primary_button_url', label: 'Primary Button Link', type: 'url' },
                        { key: 'hero_secondary_button_text', label: 'Secondary Button Text', type: 'text' },
                        { key: 'hero_secondary_button_url', label: 'Secondary Button Link', type: 'url' },
                        { key: 'hero_scroll_text', label: 'Scroll Hint Text', type: 'text' },
                        { key: 'hero_vertical_text', label: 'Vertical Side Text', type: 'text' },
                    ],
                },
                {
                    key: 'marquee',
                    label: 'Scrolling Marquee',
                    fields: [
                        {
                            key: 'marquee_items',
                            label: 'Marquee Phrases',
                            type: 'repeatable',
                            itemLabel: 'Phrase',
                            fields: [{ key: 'text', label: 'Text', type: 'text' }],
                        },
                    ],
                },
                {
                    key: 'collections',
                    label: 'Collections Section',
                    fields: [
                        { key: 'collections_eyebrow', label: 'Eyebrow', type: 'text' },
                        { key: 'collections_title', label: 'Title', type: 'text' },
                        { key: 'collections_title_accent', label: 'Title Accent (italic)', type: 'text' },
                        { key: 'collections_description', label: 'Description', type: 'textarea' },
                        { key: 'collections_card_label', label: 'Card Label (e.g. "Collection")', type: 'text' },
                    ],
                },
                {
                    key: 'signature',
                    label: 'Signature Section',
                    fields: [
                        { key: 'signature_image', label: 'Image', type: 'asset' },
                        { key: 'signature_image_alt', label: 'Image Alt Text', type: 'text' },
                        { key: 'signature_badge_text', label: 'Badge Text', type: 'text' },
                        { key: 'signature_eyebrow', label: 'Eyebrow', type: 'text' },
                        { key: 'signature_title', label: 'Title', type: 'text' },
                        { key: 'signature_title_accent', label: 'Title Accent (italic)', type: 'text' },
                        { key: 'signature_description', label: 'Description', type: 'textarea' },
                        {
                            key: 'signature_perks',
                            label: 'Perks',
                            type: 'repeatable',
                            itemLabel: 'Perk',
                            fields: [{ key: 'text', label: 'Text', type: 'text' }],
                        },
                        { key: 'signature_link_text', label: 'Link Text', type: 'text' },
                        { key: 'signature_link_url', label: 'Link URL', type: 'url' },
                    ],
                },
                {
                    key: 'gifting',
                    label: 'Gifting Section',
                    fields: [
                        { key: 'gifting_eyebrow', label: 'Eyebrow', type: 'text' },
                        { key: 'gifting_title', label: 'Title', type: 'text' },
                        { key: 'gifting_title_accent', label: 'Title Accent (italic)', type: 'text' },
                        {
                            key: 'gifting_slides',
                            label: 'Gift Banners',
                            type: 'repeatable',
                            itemLabel: 'Banner',
                            fields: [
                                { key: 'image', label: 'Image', type: 'asset' },
                                { key: 'kicker', label: 'Kicker (e.g. "01 / The perfect gesture")', type: 'text' },
                                { key: 'title_line_1', label: 'Title Line 1', type: 'text' },
                                { key: 'title_line_2', label: 'Title Line 2', type: 'text' },
                                { key: 'button_text', label: 'Button Text', type: 'text' },
                                { key: 'button_url', label: 'Button Link', type: 'url' },
                            ],
                        },
                    ],
                },
                {
                    key: 'festive',
                    label: 'Festive Banner',
                    fields: [
                        { key: 'festive_image', label: 'Image', type: 'asset' },
                        { key: 'festive_image_alt', label: 'Image Alt Text', type: 'text' },
                        { key: 'festive_eyebrow', label: 'Eyebrow', type: 'text' },
                        { key: 'festive_title_line_1', label: 'Title Line 1', type: 'text' },
                        { key: 'festive_title_line_2_before', label: 'Title Line 2 (before accent)', type: 'text' },
                        { key: 'festive_title_accent', label: 'Title Accent (italic)', type: 'text' },
                        { key: 'festive_title_line_3', label: 'Title Line 3', type: 'text' },
                        { key: 'festive_description', label: 'Description', type: 'textarea' },
                        { key: 'festive_button_text', label: 'Button Text', type: 'text' },
                        { key: 'festive_button_url', label: 'Button Link', type: 'url' },
                    ],
                },
                {
                    key: 'story',
                    label: 'Story Section',
                    fields: [
                        { key: 'story_image', label: 'Image', type: 'asset' },
                        { key: 'story_image_alt', label: 'Image Alt Text', type: 'text' },
                        { key: 'story_image_caption', label: 'Image Caption', type: 'text' },
                        { key: 'story_eyebrow', label: 'Eyebrow', type: 'text' },
                        { key: 'story_title', label: 'Title', type: 'text' },
                        { key: 'story_title_accent', label: 'Title Accent (italic)', type: 'text' },
                        { key: 'story_paragraph_1', label: 'Paragraph 1', type: 'textarea' },
                        { key: 'story_paragraph_2', label: 'Paragraph 2', type: 'textarea' },
                        { key: 'story_signoff', label: 'Sign-off Line', type: 'text' },
                    ],
                },
                {
                    key: 'favourites',
                    label: 'Best Sellers Section',
                    fields: [
                        { key: 'favourites_eyebrow', label: 'Eyebrow', type: 'text' },
                        { key: 'favourites_title', label: 'Title', type: 'text' },
                        { key: 'favourites_title_accent', label: 'Title Accent (italic)', type: 'text' },
                        { key: 'favourites_description', label: 'Description', type: 'textarea' },
                        { key: 'favourites_button_text', label: 'View All Button Text', type: 'text' },
                    ],
                },
                {
                    key: 'occasions',
                    label: 'Occasions Section',
                    fields: [
                        { key: 'occasions_eyebrow', label: 'Eyebrow', type: 'text' },
                        { key: 'occasions_title', label: 'Title', type: 'text' },
                        { key: 'occasions_title_accent', label: 'Title Accent (italic)', type: 'text' },
                        {
                            key: 'occasions_list',
                            label: 'Occasions',
                            type: 'repeatable',
                            itemLabel: 'Occasion',
                            fields: [
                                { key: 'name', label: 'Name', type: 'text' },
                                { key: 'url', label: 'Link', type: 'url' },
                                { key: 'icon', label: 'Icon (moon, bloom, burst, heart, sparkle, asterisk)', type: 'text' },
                            ],
                        },
                    ],
                },
                {
                    key: 'testimonials',
                    label: 'Testimonials Section',
                    fields: [
                        { key: 'testimonials_eyebrow', label: 'Eyebrow', type: 'text' },
                        {
                            key: 'testimonials_list',
                            label: 'Testimonials',
                            type: 'repeatable',
                            itemLabel: 'Testimonial',
                            fields: [
                                { key: 'quote', label: 'Quote', type: 'textarea' },
                                { key: 'author', label: 'Author', type: 'text' },
                                { key: 'city', label: 'City', type: 'text' },
                                { key: 'rating', label: 'Rating (1-5)', type: 'text' },
                            ],
                        },
                    ],
                },
                {
                    key: 'instagram',
                    label: 'Instagram Section',
                    fields: [
                        { key: 'instagram_eyebrow', label: 'Eyebrow', type: 'text' },
                        { key: 'instagram_title', label: 'Title', type: 'text' },
                        { key: 'instagram_title_accent', label: 'Title Accent (italic)', type: 'text' },
                        { key: 'instagram_handle', label: 'Handle (e.g. @mithayi)', type: 'text' },
                        { key: 'instagram_profile_url', label: 'Profile URL', type: 'url' },
                        {
                            key: 'instagram_images',
                            label: 'Photos',
                            type: 'repeatable',
                            itemLabel: 'Photo',
                            fields: [
                                { key: 'image', label: 'Image', type: 'asset' },
                                { key: 'alt', label: 'Alt Text', type: 'text' },
                                { key: 'url', label: 'Post URL', type: 'url' },
                            ],
                        },
                    ],
                },
            ],
        },

        // ═════════════════════════ SHOP ═════════════════════════
        {
            key: 'shop',
            label: 'Shop Page',
            sections: [
                {
                    key: 'shop_hero',
                    label: 'Shop Header',
                    fields: [
                        { key: 'shop_hero_image', label: 'Banner Image', type: 'asset' },
                        { key: 'shop_hero_eyebrow', label: 'Eyebrow', type: 'text' },
                        { key: 'shop_hero_title', label: 'Title', type: 'text' },
                        { key: 'shop_hero_title_accent', label: 'Title Accent (italic)', type: 'text' },
                        { key: 'shop_hero_description', label: 'Description', type: 'textarea' },
                    ],
                },
                {
                    key: 'shop_labels',
                    label: 'Shop Labels',
                    fields: [
                        { key: 'shop_result_singular', label: 'Result Count Word (singular)', type: 'text' },
                        { key: 'shop_result_plural', label: 'Result Count Word (plural)', type: 'text' },
                        { key: 'shop_empty_message', label: 'No Results Message', type: 'text' },
                    ],
                },
            ],
        },

        // ═════════════════════════ CART & CHECKOUT ═════════════════════════
        {
            key: 'cart',
            label: 'Cart Page',
            sections: [
                {
                    key: 'cart_hero',
                    label: 'Cart Header',
                    fields: [
                        { key: 'cart_hero_eyebrow', label: 'Eyebrow', type: 'text' },
                        { key: 'cart_hero_title', label: 'Title', type: 'text' },
                        { key: 'cart_hero_title_accent', label: 'Title Accent (italic)', type: 'text' },
                        { key: 'cart_empty_message', label: 'Empty Cart Message', type: 'text' },
                        { key: 'cart_empty_button_text', label: 'Empty Cart Button Text', type: 'text' },
                    ],
                },
            ],
        },
        {
            key: 'checkout',
            label: 'Checkout Page',
            sections: [
                {
                    key: 'checkout_hero',
                    label: 'Checkout Header',
                    fields: [
                        { key: 'checkout_hero_eyebrow', label: 'Eyebrow', type: 'text' },
                        { key: 'checkout_hero_title', label: 'Title', type: 'text' },
                        { key: 'checkout_hero_title_accent', label: 'Title Accent (italic)', type: 'text' },
                    ],
                },
                {
                    key: 'checkout_confirmation',
                    label: 'Order Confirmation',
                    fields: [
                        { key: 'order_success_eyebrow', label: 'Success Eyebrow', type: 'text' },
                        { key: 'order_success_title', label: 'Success Title', type: 'text' },
                        { key: 'order_success_title_accent', label: 'Success Title Accent (italic)', type: 'text' },
                        { key: 'order_success_message', label: 'Success Message (leave empty to use the order confirmation from the system)', type: 'textarea' },
                    ],
                },
            ],
        },
        {
            key: 'shipping',
            label: 'Shipping Settings',
            sections: [
                {
                    key: 'shipping_standard',
                    label: 'Standard Delivery',
                    fields: [
                        { key: 'shipping_label', label: 'Label', type: 'text' },
                        { key: 'shipping_description', label: 'Description', type: 'text' },
                        { key: 'shipping_rate', label: 'Shipping Rate (PKR)', type: 'text' },
                    ],
                },
            ],
        },

        // ═════════════════════════ JOURNAL ═════════════════════════
        {
            key: 'blog',
            label: 'Journal Page',
            sections: [
                {
                    key: 'blog_hero',
                    label: 'Journal Header',
                    fields: [
                        { key: 'blog_hero_image', label: 'Banner Image', type: 'asset' },
                        { key: 'blog_hero_eyebrow', label: 'Eyebrow', type: 'text' },
                        { key: 'blog_hero_title', label: 'Title', type: 'text' },
                        { key: 'blog_hero_title_accent', label: 'Title Accent (italic)', type: 'text' },
                        { key: 'blog_hero_description', label: 'Description', type: 'textarea' },
                        { key: 'blog_empty_message', label: 'No Posts Message', type: 'text' },
                    ],
                },
            ],
        },

        // ═════════════════════════ FAQS ═════════════════════════
        {
            key: 'faqs',
            label: 'FAQs Page',
            sections: [
                {
                    key: 'faqs_hero',
                    label: 'FAQs Header',
                    fields: [
                        { key: 'faqs_hero_image', label: 'Banner Image', type: 'asset' },
                        { key: 'faqs_hero_eyebrow', label: 'Eyebrow', type: 'text' },
                        { key: 'faqs_hero_title', label: 'Title', type: 'text' },
                        { key: 'faqs_hero_title_accent', label: 'Title Accent (italic)', type: 'text' },
                        { key: 'faqs_hero_description', label: 'Description', type: 'textarea' },
                        { key: 'faqs_empty_message', label: 'No FAQs Message', type: 'text' },
                        { key: 'faqs_footer_text', label: 'Footer Text (before link)', type: 'text' },
                        { key: 'faqs_footer_link_text', label: 'Footer Link Text', type: 'text' },
                    ],
                },
            ],
        },

        // ═════════════════════════ CONTACT ═════════════════════════
        {
            key: 'contact',
            label: 'Contact Page',
            sections: [
                {
                    key: 'contact_hero',
                    label: 'Contact Header',
                    fields: [
                        { key: 'contact_hero_image', label: 'Banner Image', type: 'asset' },
                        { key: 'contact_hero_eyebrow', label: 'Eyebrow', type: 'text' },
                        { key: 'contact_hero_title', label: 'Title', type: 'text' },
                        { key: 'contact_hero_title_accent', label: 'Title Accent (italic)', type: 'text' },
                        { key: 'contact_hero_description', label: 'Description', type: 'textarea' },
                    ],
                },
                {
                    key: 'contact_form',
                    label: 'Enquiry Form',
                    fields: [
                        { key: 'contact_form_submit_text', label: 'Submit Button Text', type: 'text' },
                        { key: 'contact_form_success_message', label: 'Success Message (leave empty to use the order confirmation from the system)', type: 'textarea' },
                    ],
                },
            ],
        },

        // ═════════════════════════ GLOBAL ═════════════════════════
        {
            key: 'global',
            label: 'Global Settings',
            sections: [
                {
                    key: 'site_identity',
                    label: 'Site Identity',
                    fields: [
                        { key: 'site_title', label: 'Site Title', type: 'text' },
                        { key: 'site_title_template_suffix', label: 'Page Title Suffix (e.g. "Mithayi")', type: 'text' },
                        { key: 'site_description', label: 'Site Description', type: 'textarea' },
                        { key: 'site_logo', label: 'Site Logo', type: 'asset' },
                        { key: 'site_favicon', label: 'Favicon', type: 'asset' },
                        { key: 'site_share_image', label: 'Social Share Image', type: 'asset' },
                        { key: 'site_wordmark', label: 'Wordmark Text', type: 'text' },
                        { key: 'site_tagline', label: 'Header Tagline (e.g. "Est. with love")', type: 'text' },
                    ],
                },
                {
                    key: 'announcement',
                    label: 'Site Announcement',
                    fields: [
                        {
                            key: 'site_announcements',
                            label: 'Announcements',
                            type: 'repeatable',
                            itemLabel: 'Announcement',
                            fields: [{ key: 'text', label: 'Announcement Text', type: 'text' }],
                        },
                    ],
                },
                {
                    key: 'navigation',
                    label: 'Header Navigation',
                    fields: [
                        {
                            key: 'nav_links',
                            label: 'Navigation Links',
                            type: 'repeatable',
                            itemLabel: 'Link',
                            fields: [
                                { key: 'label', label: 'Label', type: 'text' },
                                { key: 'url', label: 'URL', type: 'url' },
                            ],
                        },
                        { key: 'nav_search_label', label: 'Search Button Label', type: 'text' },
                        { key: 'nav_cart_label', label: 'Cart Button Label', type: 'text' },
                        { key: 'nav_menu_label', label: 'Phone Menu Button Label', type: 'text' },
                        { key: 'nav_shop_all_label', label: 'Shop Menu: "Shop all" Link Text', type: 'text' },
                        { key: 'nav_more_label', label: 'Shop Menu: Heading for Categories Without Sub-categories', type: 'text' },
                    ],
                },
                {
                    key: 'footer',
                    label: 'Footer',
                    fields: [
                        { key: 'footer_tagline', label: 'Tagline', type: 'textarea' },
                        { key: 'footer_column_1_title', label: 'Column 1 Title', type: 'text' },
                        {
                            key: 'footer_column_1_links',
                            label: 'Column 1 Links',
                            type: 'repeatable',
                            itemLabel: 'Link',
                            fields: [
                                { key: 'label', label: 'Label', type: 'text' },
                                { key: 'url', label: 'URL', type: 'url' },
                            ],
                        },
                        { key: 'footer_column_2_title', label: 'Column 2 Title', type: 'text' },
                        {
                            key: 'footer_column_2_links',
                            label: 'Column 2 Links',
                            type: 'repeatable',
                            itemLabel: 'Link',
                            fields: [
                                { key: 'label', label: 'Label', type: 'text' },
                                { key: 'url', label: 'URL', type: 'url' },
                            ],
                        },
                        { key: 'footer_copyright', label: 'Copyright Line', type: 'text' },
                        { key: 'footer_signoff', label: 'Bottom Sign-off', type: 'text' },
                    ],
                },
                {
                    key: 'contact_info',
                    label: 'Contact Information',
                    fields: [
                        { key: 'contact_email', label: 'Email', type: 'email' },
                        { key: 'contact_phone', label: 'Phone Number', type: 'tel' },
                        { key: 'contact_whatsapp', label: 'WhatsApp Number', type: 'tel' },
                        { key: 'contact_address', label: 'Address', type: 'text' },
                        { key: 'contact_hours', label: 'Business Hours', type: 'text' },
                    ],
                },
                {
                    key: 'social_media',
                    label: 'Social Media Links',
                    fields: [
                        {
                            key: 'social_media_links',
                            label: 'Social Media Links',
                            type: 'repeatable',
                            itemLabel: 'Platform',
                            fields: [
                                { key: 'platform', label: 'Platform', type: 'text' },
                                { key: 'title', label: 'Display Title', type: 'text' },
                                { key: 'url', label: 'URL', type: 'url' },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}

export default mithayi
