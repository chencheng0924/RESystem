/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['variant', [
    '@media (prefers-color-scheme: dark) { &:not(.themeLight *) }',
    '&:is(.themeDark *)',
  ]],
  content: ["./src/**/*", "./src/**/*.{html, js, ts, vue}"],
  theme: {
    extend: {
      colors: {
        Primary: "#333333",
      },
      fontFamily: {
        NotoSans: ["Noto Sans TC"],
        Futura: ["Futura", "Noto Sans TC"],
      },
      fontSize: {
        h1: [
          "var(--h1-size)",
          {
            lineHeight: "var(--h1-lineHeight)",
            fontWeight: "var(--h1-weight)",
          },
        ],
        h2: [
          "var(--h2-size)",
          {
            lineHeight: "var(--h2-lineHeight)",
            fontWeight: "var(--h2-weight)",
          },
        ],
        h3: [
          "var(--h3-size)",
          {
            lineHeight: "var(--h3-lineHeight)",
            fontWeight: "var(--h3-weight)",
          },
        ],
        h4: [
          "var(--h4-size)",
          {
            lineHeight: "var(--h4-lineHeight)",
            fontWeight: "var(--h4-weight)",
          },
        ],
        h5: [
          "var(--h5-size)",
          {
            lineHeight: "var(--h5-lineHeight)",
            fontWeight: "var(--h5-weight)",
          },
        ],
        body1: [
          "var(--body1-size)",
          {
            lineHeight: "var(--body1-lineHeight)",
            fontWeight: "var(--body1-weight)",
          },
        ],
        body2: [
          "var(--body2-size)",
          {
            lineHeight: "var(--body2-lineHeight)",
            fontWeight: "var(--body2-weight)",
          },
        ],
        body3: [
          "var(--body3-size)",
          {
            lineHeight: "var(--body3-lineHeight)",
            fontWeight: "var(--body3-weight)",
          },
        ],
        body4: [
          "var(--body4-size)",
          {
            lineHeight: "var(--body4-lineHeight)",
            fontWeight: "var(--body4-weight)",
          },
        ],
        pageTitle: [
          "var(--pageTitle-size)",
          {
            lineHeight: "var(--pageTitle-lineHeight)",
            fontWeight: "var(--pageTitle-weight)",
          },
        ],
        pageSubTitle: [
          "var(--pageSubTitle-size)",
          {
            lineHeight: "var(--pageSubTitle-lineHeight)",
            fontWeight: "var(--pageSubTitle-weight)",
          },
        ],
      },
      colors: {

        fonePrimaryDashboard: "var(--fone-primary-dashboard)",
        fonePrimaryMain: "var(--fone-primary-main)",
        fonePrimaryBg: "var(--fone-primary-bg)",
        fonePrimaryClick: "var(--fone-primary-click)",
        fonePrimaryHover: "var(--fone-primary-hover)",
        foneTextLevel1: "var(--fone-text-level1)",
        foneTextLevel2: "var(--fone-text-level2)",
        foneTextLevel3: "var(--fone-text-level3)",
        foneTextDisable: "var(--fone-text-disable)",
        foneTextWhite: "var(--fone-text-white)",
        foneBg: "var(--fone-bg)",
        foneBgBtn: "var(--fone-bg-btn)",
        foneBgBtn2: "var(--fone-bg-btn2)",
        foneBgLevel1: "var(--fone-bg-level1)",
        foneBgLevel2: "var(--fone-bg-level2)",
        foneBgLevel3: "var(--fone-bg-level3)",
        foneBgLevel4: "var(--fone-bg-level4)",
        foneBgLevel5: "var(--fone-bg-level5)",
        foneBgLevel6: "var(--fone-bg-level6)",
        foneBgHover: "var(--fone-bg-hover)",
        foneBgDisable: "var(--fone-bg-disable)",
        foneBorder: "var(--fone-border)",
        foneBorderOncolor: "var(--fone-border-oncolor)",
        foneBgBackdrop: "var(--fone-bg-backdrop)",
        foneBgDark: "var(--fone-bg-dark)",
        foneBgGuide: "var(--fone-bg-guide)",
        foneThemeGreen: "var(--fone-theme-green)",
        foneThemeRed: "var(--fone-theme-red)",
        foneSurface: "var(--fone-surface)",
        foneHomeCard: "var(--fone-home-card)",
        tagGreen: "var(--tag-green)",
        tagBgGreen: "var(--tag-bg-green)",
        tagPink: "var(--tag-pink)",
        tagBgPink: "var(--tag-bg-pink)",
        tagRed: "var(--tag-red)",
        tagBgRed: "var(--tag-bg-red)",
        tagOrange: "var(--tag-orange)",
        tagBgOrange: "var(--tag-bg-orange)",
        tagSkyblue: "var(--tag-skyblue)",
        tagBgSkyblue: "var(--tag-bg-skyblue)",
        statusSuccess: "var(--status-success)",
        statusError: "var(--status-error)",
        statusNotice: "var(--status-notice)",
        foneAccordionContentBackground: "var(--fone-accordion-content-background)",
        foneCardHoverbtnBackground: "var(--fone-card-hoverbtn-background)",
        foneTabsBackground: "var(--fone-tabs-background)",
        fonePropmtCardBackground: "var(--fone-propmt-card-background)"
      },
      width: {
        foneInnerPage: '700px',
        sidebar: '240px',
        topbar: "calc(100vw - 240px)",
        sideIconBar: '48px',
        sideIconBarPage: 'calc(100vw - 48px)'
      },
      height: {
        topbar: '68px',
        sidebar: 'calc(100vh - 68px)',
        pageMinHeight: 'calc(100vh - 68px)'
      },
      minHeight: {
        pageMinHeight: "calc(100vh - 68px)",
      },
      padding: {
        topbar: '68px',
        sidebar: '240px',
        sideIconBar: '65px'
      },
      backgroundColor: {
        avatarBg: 'rgba(51, 51, 51, 0.7)'
      },
      backgroundImage: {
        'edit': "url('@/assets/img/icon/ic_edit.svg')"
      },
      screens: {
        'sm': '576px',  // 改成跟 PrimeFlex 一致
        'md': '768px',
        'lg': '992px',  // 改成跟 PrimeFlex 一致
        'xl': '1200px', // 改成跟 PrimeFlex 一致
      }
    },
  },
  plugins: [require('tailwindcss-primeui')]
}

