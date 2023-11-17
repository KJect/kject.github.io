import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type {Options as DocOptions} from '@docusaurus/plugin-content-docs';
import type {Options as IdealImageOptions} from '@docusaurus/plugin-ideal-image';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
    title: 'KJect',
    tagline: 'The Kotlin Injector',
    favicon: 'img/favicon.ico',

    url: 'https://kject.github.io/',
    baseUrl: '/',

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    markdown: {
        format: 'detect',
        mermaid: true,
    },

    customFields: {
        description: 'The Kotlin Injector',
    },

    plugins: [
        [
            'content-docs',
            {
                id: 'community',
                path: 'community',
                routeBasePath: 'community',
                editUrl: 'https://github.com/KJect/kject.github.io/edit/main/',
                sidebarPath: './sidebarsCommunity.ts',
                sidebarCollapsible: true,
                sidebarCollapsed: true,
            } satisfies DocOptions,
        ],
        [
            'ideal-image',
            {
                quality: 70,
                max: 1030,
                min: 640,
                steps: 2,
            } satisfies IdealImageOptions,
        ],
        '@docusaurus/theme-mermaid',
    ],

    presets: [
        [
            'classic',
            {
                docs: {
                    path: 'docs',
                    editUrl: 'https://github.com/KJect/kject.github.io/edit/main/',
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                    sidebarPath: './sidebars.ts',
                    sidebarCollapsible: true,
                    sidebarCollapsed: true,
                },
                blog: {
                    path: 'blog',
                    postsPerPage: 3,
                    blogSidebarCount: 'ALL',
                    blogSidebarTitle: 'All posts',
                    showReadingTime: true,
                    editUrl: 'https://github.com/KJect/kject.github.io/edit/main/',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        image: 'img/docusaurus-social-card.jpg',
        colorMode: {
            defaultMode: 'dark',
            respectPrefersColorScheme: true,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
            defaultLanguage: 'kotlin',
            magicComments: [
                {
                    className: 'theme-code-block-highlighted-line',
                    line: 'highlight',
                    block: {
                        start: 'highlight-start',
                        end: 'highlight-end',
                    },
                },
                {
                    className: 'code-block-error-line',
                    line: 'error',
                    block: {
                        start: 'error-start',
                        end: 'error-end',
                    }
                },
            ],
        },
        navbar: {
            title: 'KJect',
            logo: {
                alt: 'Logo',
                src: 'img/logo.svg',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'docsSidebar',
                    position: 'left',
                    label: 'Documentation',
                },
                {
                    to: '/blog',
                    position: 'left',
                    label: 'Blog',
                },
                {
                    to: '/community/support',
                    position: 'left',
                    label: 'Community',
                },
                {
                    href: 'https://github.com/KJect/kject.github.io',
                    position: 'right',
                    className: 'header-github-link',
                    'aria-label': 'GitHub repository',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Learn',
                    items: [
                        {
                            label: 'Introduction',
                            to: '/docs/introduction',
                        },
                        {
                            label: 'Examples',
                            to: '/docs/examples',
                        },
                        {
                            label: 'Documentation',
                            to: '/docs/what-is-kject',
                        }
                    ],
                },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'Github',
                            href: 'https://github.com/KJect/Kject',
                        },
                        {
                            label: 'Blog',
                            to: '/blog',
                        },
                        {
                            label: 'Changelog',
                            to: '/community/changelog',
                        },
                    ],
                },
                {
                    title: 'Legal',
                    items: [
                        {
                            label: 'Imprint',
                            to: '/imprint',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} KJect, Built with <a href="https://docusaurus.io" target="_blank">Docusaurus</a>.`,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
