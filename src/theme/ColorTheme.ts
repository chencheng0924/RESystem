import DataTable from "primevue/datatable";

export class ColorTheme {
    public get uiLibraryColor() {
        return {
            primitive: {
                // 原始設定
                borderRadius: {
                    none: '0',
                    xs: '2px',
                    sm: '4px',
                    md: '6px',
                    lg: '8px',
                    xl: '12px'
                },
                emerald: { 50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b', 950: '#022c22' },
                green: { 50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d', 950: '#052e16' },
                lime: { 50: '#f7fee7', 100: '#ecfccb', 200: '#d9f99d', 300: '#bef264', 400: '#a3e635', 500: '#84cc16', 600: '#65a30d', 700: '#4d7c0f', 800: '#3f6212', 900: '#365314', 950: '#1a2e05' },
                red: { 50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5', 400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c', 800: '#991b1b', 900: '#7f1d1d', 950: '#450a0a' },
                orange: { 50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c', 800: '#9a3412', 900: '#7c2d12', 950: '#431407' },
                amber: { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f', 950: '#451a03' },
                yellow: { 50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047', 400: '#facc15', 500: '#eab308', 600: '#ca8a04', 700: '#a16207', 800: '#854d0e', 900: '#713f12', 950: '#422006' },
                teal: { 50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a', 950: '#042f2e' },
                cyan: { 50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9', 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490', 800: '#155e75', 900: '#164e63', 950: '#083344' },
                sky: { 50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 800: '#075985', 900: '#0c4a6e', 950: '#082f49' },
                blue: { 50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a', 950: '#172554' },
                indigo: { 50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81', 950: '#1e1b4b' },
                violet: { 50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065' },
                purple: { 50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8', 900: '#581c87', 950: '#3b0764' },
                fuchsia: { 50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 300: '#f0abfc', 400: '#e879f9', 500: '#d946ef', 600: '#c026d3', 700: '#a21caf', 800: '#86198f', 900: '#701a75', 950: '#4a044e' },
                pink: { 50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4', 400: '#f472b6', 500: '#ec4899', 600: '#db2777', 700: '#be185d', 800: '#9d174d', 900: '#831843', 950: '#500724' },
                rose: { 50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337', 950: '#4c0519' },
                slate: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617' },
                gray: { 50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827', 950: '#030712' },
                zinc: { 50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#a1a1aa', 500: '#71717a', 600: '#52525b', 700: '#3f3f46', 800: '#27272a', 900: '#18181b', 950: '#09090b' },
                neutral: { 50: '#fafafa', 100: '#f5f5f5', 200: '#e5e5e5', 300: '#d4d4d4', 400: '#a3a3a3', 500: '#737373', 600: '#525252', 700: '#404040', 800: '#262626', 900: '#171717', 950: '#0a0a0a' },
                stone: { 50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 300: '#d6d3d1', 400: '#a8a29e', 500: '#78716c', 600: '#57534e', 700: '#44403c', 800: '#292524', 900: '#1c1917', 950: '#0c0a09' }
            },
            semantic: {
                // 語意標籤設定
                transitionDuration: '0.2s',
                focusRing: {
                    width: '0',
                    style: 'none',
                    color: 'transparent',
                    offset: '0'
                },
                disabledOpacity: '0.6',
                iconSize: '1rem',
                anchorGutter: '2px',
                primary: {
                    // 系統主色設定
                    50: `var(--fone-primary-main)`,
                    100: `var(--fone-primary-main)`,
                    200: `var(--fone-primary-main)`,
                    300: `var(--fone-primary-main)`,
                    400: `var(--fone-primary-main)`,
                    500: `var(--fone-primary-main)`,
                    600: `var(--fone-primary-main)`,
                    700: `var(--fone-primary-main)`,
                    800: `var(--fone-primary-main)`,
                    900: `var(--fone-primary-main)`,
                    950: `var(--fone-primary-main)`
                },
                formField: {
                    // 表單input樣式
                    paddingX: '12px',
                    paddingY: '4px',
                    borderRadius: '4px',
                    focusRing: {
                        width: '{focus.ring.width}',
                        style: '{focus.ring.style}',
                        color: '{focus.ring.color}',
                        offset: '{focus.ring.offset}',
                        shadow: '{focus.ring.shadow}'
                    },
                    transitionDuration: '{transition.duration}'
                },
                list: {
                    padding: '0.5rem 0',
                    gap: '0',
                    header: {
                        padding: '0.625rem 1rem 0 1rem'
                    },
                    option: {
                        padding: '0.625rem 1rem',
                        borderRadius: '0'
                    },
                    optionGroup: {
                        padding: '0.625rem 1rem',
                        fontWeight: '600'
                    }
                },
                content: {
                    borderRadius: '{border.radius.md}'
                },
                mask: {
                    transitionDuration: '0.15s'
                },
                navigation: {
                    list: {
                        padding: '0.5rem 0',
                        gap: '0'
                    },
                    item: {
                        padding: '0.625rem 1rem',
                        borderRadius: '0',
                        gap: '0.5rem'
                    },
                    submenuLabel: {
                        padding: '0.625rem 1rem',
                        fontWeight: '600'
                    },
                    submenuIcon: {
                        size: '0.875rem'
                    }
                },
                overlay: {
                    select: {
                        borderRadius: '{border.radius.md}',
                        shadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)'
                    },
                    popover: {
                        borderRadius: '{border.radius.md}',
                        padding: '1rem',
                        shadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                    },
                    modal: {
                        borderRadius: '{border.radius.xl}',
                        padding: '1.5rem',
                        shadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                    },
                    navigation: {
                        shadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)'
                    }
                },
                colorScheme: {
                    // 組件深淺色系顏色設定-light, dark都要記得調整
                    light: {
                        surface: {
                            0: 'var(--fone-surface)',
                            50: 'var(--fone-surface)',
                            100: 'var(--fone-bg)',
                            200: 'var(--fone-surface)',
                            300: 'var(--fone-surface)',
                            400: 'var(--fone-surface)',
                            500: 'var(--fone-surface)',
                            600: 'var(--fone-text-level1)',
                            700: 'var(--fone-text-white)',
                            800: 'var(--fone-text-white)',
                            900: 'var(--fone-text-white)',
                            950: 'var(--fone-text-white)'
                        },
                        primary: {
                            color: 'var(--fone-primary-main)',
                            contrastColor: '#ffffff',
                            hoverColor: 'var(--fone-primary-hover)',
                            activeColor: 'var(--fone-primary-click)'
                        },
                        highlight: {
                            background: 'var(--fone-primary-bg)',
                            focusBackground: 'var(--fone-primary-hover)',
                            color: 'var(--fone-primary-main)',
                            focusColor: 'var(--fone-primary-click)'
                        },
                        focusRing: {
                            shadow: '0 0 0 0.2rem var(--fone-primary-bg)'
                        },
                        mask: {
                            background: 'rgba(0,0,0,0.4)',
                            color: 'var(--fone-surface)'
                        },
                        formField: {
                            // 表單input樣式
                            background: 'var(--fone-bg-level1)',
                            disabledBackground: 'var(--fone-bg-disable)',
                            filledBackground: 'var(--fone-primary-bg)',
                            filledFocusBackground: 'var(--fone-primary-click)',
                            borderColor: 'var(--fone-border)',
                            hoverBorderColor: 'var(--fone-primary-hover)',
                            focusBorderColor: 'var(--fone-primary-click)',
                            invalidBorderColor: 'var(--fone-theme-red)',
                            color: 'var(--fone-text-level1)',
                            disabledColor: 'var(--fone-text-disable)',
                            placeholderColor: 'var(--fone-text-disable)',
                            floatLabelColor: 'var(--fone-surface)',
                            floatLabelFocusColor: 'var(--fone-surface)',
                            floatLabelInvalidColor: 'var(--fone-theme-red)',
                            iconColor: 'var(--fone-text-white)',
                            shadow: 'none',
                            paddingY: '9.5px'
                        },

                        text: {
                            color: 'var(--fone-text-level1)',
                            hoverColor: 'var(--fone-text-level2)',
                            mutedColor: 'var(--fone-text-disable)',
                            hoverMutedColor: 'var(--fone-text-level2)'
                        },
                        content: {
                            background: 'var(--fone-bg-level3)',
                            hoverBackground: 'var(--fone-primary-hover)',
                            borderColor: 'var(--fone-border)',
                            color: 'var(--fone-text-level1)',
                            hoverColor: 'var(--fone-primary-main)'
                        },
                        overlay: {
                            select: {
                                background: 'var(--fone-bg-level3)',
                                borderColor: 'var(--fone-border)',
                                color: 'var(--fone-text-level1)'
                            },
                            popover: {
                                background: 'var(--fone-bg-level3)',
                                borderColor: 'var(--fone-border)',
                                color: 'var(--fone-text-level1)'
                            },
                            modal: {
                                // dialog 樣式
                                background: 'var(--fone-bg-level3)',
                                borderColor: 'transparent',
                                color: 'var(--fone-text-level1)'
                            }
                        },
                        list: {
                            option: {
                                focusBackground: 'var(--fone-bg)',
                                selectedBackground: '{highlight.background}',
                                selectedFocusBackground: '{highlight.focus.background}',
                                color: '{text.color}',
                                focusColor: '{text.hover.color}',
                                selectedColor: '{highlight.color}',
                                selectedFocusColor: '{highlight.focus.color}',
                                icon: {
                                    color: 'var(--fone-text-level1)',
                                    focusColor: 'var(--fone-text-level2)'
                                }
                            },
                            optionGroup: {
                                background: 'transparent',
                                color: '{text.color}'
                            }
                        },
                        navigation: {
                            item: {
                                focusBackground: 'var(--fone-bg)',
                                activeBackground: 'var(--fone-primary-click)',
                                color: '{text.color}',
                                focusColor: '{text.hover.color}',
                                activeColor: '{text.hover.color}',
                                icon: {
                                    color: 'var(--fone-text-level1)',
                                    focusColor: 'var(--fone-text-level2)',
                                    activeColor: 'var(--fone-text-level3)'
                                }
                            },
                            submenuLabel: {
                                background: 'transparent',
                                color: '{text.color}'
                            },
                            submenuIcon: {
                                color: 'var(--fone-text-level1)',
                                focusColor: 'var(--fone-text-level2)',
                                activeColor: 'var(--fone-text-level3)'
                            }
                        }
                    },
                    dark: {
                        surface: {
                            0: 'var(--fone-surface)',
                            50: 'var(--fone-surface)',
                            100: 'var(--fone-surface)',
                            200: 'var(--fone-surface)',
                            300: 'var(--fone-surface)',
                            400: 'var(--fone-surface)',
                            500: 'var(--fone-surface)',
                            600: 'var(--fone-bg-level1)',
                            700: 'var(--fone-bg-level1)',
                            800: 'var(--fone-bg-level1)',
                            900: 'var(--fone-bg-level1)',
                            950: 'var(--fone-bg-level1)'
                        },
                        primary: {
                            color: 'var(--fone-primary-main)',
                            contrastColor: '#ffffff',
                            hoverColor: 'var(--fone-primary-hover)',
                            activeColor: 'var(--fone-primary-click)'
                        },
                        highlight: {
                            background: 'var(--fone-primary-bg)',
                            focusBackground: 'var(--fone-primary-hover)',
                            color: 'var(--fone-primary-main)',
                            focusColor: 'var(--fone-primary-click)'
                        },
                        focusRing: {
                            shadow: '0 0 0 0.2rem var(--fone-primary-bg)'
                        },
                        mask: {
                            background: 'rgba(0,0,0,0.4)',
                            color: 'var(--fone-surface)'
                        },
                        formField: {
                            background: 'var(--fone-bg-level1)',
                            disabledBackground: 'var(--fone-text-disable)',
                            filledBackground: 'var(--fone-primary-bg)',
                            filledFocusBackground: 'var(--fone-primary-click)',
                            borderColor: 'var(--fone-border)',
                            hoverBorderColor: 'var(--fone-primary-hover)',
                            focusBorderColor: 'var(--fone-primary-click)',
                            invalidBorderColor: 'var(--fone-theme-red)',
                            color: 'var(--fone-text-level1)',
                            disabledColor: 'var(--fone-text-disable)',
                            placeholderColor: 'var(--fone-text-disable)',
                            floatLabelColor: 'var(--fone-surface)',
                            floatLabelFocusColor: 'var(--fone-surface)',
                            floatLabelInvalidColor: 'var(--fone-theme-red)',
                            iconColor: 'var(--fone-surface)',
                            shadow: 'none'
                        },
                        text: {
                            color: 'var(--fone-text-level1)',
                            hoverColor: 'var(--fone-text-level2)',
                            mutedColor: 'var(--fone-text-level1)',
                            hoverMutedColor: 'var(--fone-text-level2)'
                        },
                        content: {
                            background: 'var(--fone-bg-level3)',
                            hoverBackground: 'var(--fone-primary-hover)',
                            borderColor: 'var(--fone-border)',
                            color: 'var(--fone-text-level1)',
                            hoverColor: 'var(--fone-primary-hover)'
                        },
                        overlay: {
                            select: {
                                background: 'var(--fone-bg)',
                                borderColor: 'var(--fone-border)',
                                color: 'var(--fone-text-level1)'
                            },
                            popover: {
                                background: 'var(--fone-bg)',
                                borderColor: 'var(--fone-border)',
                                color: 'var(--fone-text-level1)'
                            },
                            modal: {
                                // dialog樣式
                                background: 'var(--fone-bg-level3)',
                                borderColor: 'transparent',
                                color: 'var(--fone-text-level1)'
                            }
                        },
                        list: {
                            option: {
                                focusBackground: 'var(--fone-bg)',
                                selectedBackground: '{highlight.background}',
                                selectedFocusBackground: '{highlight.focus.background}',
                                color: '{text.color}',
                                focusColor: '{text.hover.color}',
                                selectedColor: '{highlight.color}',
                                selectedFocusColor: '{highlight.focus.color}',
                                icon: {
                                    color: 'var(--fone-text-level1)',
                                    focusColor: 'var(--fone-text-level2)'
                                }
                            },
                            optionGroup: {
                                background: 'transparent',
                                color: '{text.color}'
                            }
                        },
                        navigation: {
                            item: {
                                focusBackground: 'var(--fone-bg)',
                                activeBackground: 'var(--fone-primary-click)',
                                color: '{text.color}',
                                focusColor: '{text.hover.color}',
                                activeColor: '{text.hover.color}',
                                icon: {
                                    color: 'var(--fone-text-level1)',
                                    focusColor: 'var(--fone-text-level2)',
                                    activeColor: 'var(--fone-text-level3)'
                                }
                            },
                            submenuLabel: {
                                background: 'transparent',
                                color: '{text.color}'
                            },
                            submenuIcon: {
                                color: 'var(--fone-text-level1)',
                                focusColor: 'var(--fone-text-level2)',
                                activeColor: 'var(--fone-text-level3)'
                            }
                        }
                    }
                }
            },
            components: {
                button: {
                    colorScheme: {
                        dark: {
                            label: {
                                fontWeight: '700'
                            },
                            primary: {
                                color: '#1D1D1E'
                            },
                            secondary: {
                                background: 'transparent',
                                borderColor: 'transparent',
                                color: 'var(--fone-text-level1)',
                                hover: { background: 'var(--fone-bg-level3)' },
                                activeBackground: 'var(--fone-bg-level3)',
                            },
                            text: {
                                secondary: {
                                    color: 'var(--fone-text-level1)',
                                    hover: { background: 'var(--fone-bg-level3)' },
                                    activeBackground: 'var(--fone-bg-level3)',
                                }
                            }
                        },
                        light: {
                            label: {
                                fontWeight: '700'
                            },
                            primary: {
                                color: '#FFFFFF'
                            },
                            secondary: {
                                background: 'transparent',
                                borderColor: 'transparent',
                                hover: { background: 'var(--fone-bg-level3)' },
                                color: 'var(--fone-text-level1)',
                            },
                            text: {
                                secondary: {
                                    color: 'var(--fone-text-level1)',
                                    hoverBackground: 'var(--fone-bg-level4)',
                                    activeBackground: 'var(--fone-bg-level4)',
                                }
                            }
                        }
                    }
                },
                panel: {
                    root: {
                        borderColor: 'var(--p-panel-background)',
                        background: 'var(--p-panel-header-background)'
                    },
                    header: {
                        borderWidth: '0px 0px 0px 0px;'
                    }
                },
                datatable: {
                    headerCell: {
                        background: 'var(--fone-bg-level4)'
                    }
                },
                skeleton: {
                    colorScheme: {
                        dark: {
                            background: '#D8D8D8',
                            animation: {
                                background: '#ffffff'
                            }
                        },
                        light: {
                            background: '#333333',
                            animation: {
                                background: '#ffffff'
                            }
                        }
                    }
                },
                inputnumber: {
                    colorScheme: {
                        dark: {
                            button: {
                                color: 'var(--fone-text-level1)',
                                hover: {
                                    color: 'var(--fone-text-level1)'
                                }
                            }
                        },
                        light: {
                            button: {
                                color: 'var(--fone-text-level1)',
                                hover: {
                                    color: 'var(--fone-text-level1)'
                                }
                            }
                        }
                    }
                },
                select: {
                    colorScheme: {
                        dark: {
                            dropdown: {
                                color: 'var(--fone-text-level1)',
                                hover: {
                                    color: 'var(--fone-text-level1)'
                                }
                            }
                        },
                        light: {
                            dropdown: {
                                color: 'var(--fone-text-level1)',
                                hover: {
                                    color: 'var(--fone-text-level1)'
                                }
                            }
                        }
                    }
                },
                rating: {
                    colorScheme: {
                        dark: {
                            icon: {
                                color: 'var(--fone-text-level2)',
                                size: '12px',
                                activeColor: 'var(--fone-text-level2)',
                            }
                        },
                        light: {
                            icon: {
                                color: 'var(--fone-text-level2)',
                                size: '12px',
                                activeColor: 'var(--fone-text-level2)',
                            }
                        }
                    }
                },
                toast: {
                    colorScheme: {
                        dark: {
                            info: {
                                detail: {
                                    color: 'var(--fone-text-level2)'
                                }
                            },
                            error: {
                                detail: {
                                    color: 'var(--fone-text-level2)'
                                }
                            },
                            warn: {
                                detail: {
                                    color: 'var(--fone-text-level2)'
                                }
                            }
                        },
                        light: {
                            info: {
                                detail: {
                                    color: 'var(--fone-text-level2)'
                                }
                            },
                            error: {
                                detail: {
                                    color: 'var(--fone-text-level2)'
                                }
                            },
                            warn: {
                                detail: {
                                    color: 'var(--fone-text-level2)'
                                }
                            }
                        }
                    }
                },
                multiselect: {
                    colorScheme: {
                        dark: {
                            dropdown: {
                                color: 'var(--fone-text-level1)',
                                hover: {
                                    color: 'var(--fone-text-level1)'
                                }
                            }
                        },
                        light: {
                            dropdown: {
                                color: 'var(--fone-text-level1)',
                                hover: {
                                    color: 'var(--fone-text-level1)'
                                }
                            }
                        }
                    }
                },
                toggleswitch: {
                    colorScheme: {
                        dark: {
                            background: 'var(--fone-border)',
                            hover: {
                                background: 'var(--fone-border)'
                            },
                            checked: {
                                hover: {
                                    background: 'var(--fone-primary-main)'
                                }
                            }
                        },
                        light: {
                            background: 'var(--fone-border)',
                            hover: {
                                background: 'var(--fone-border)'
                            },
                            checked: {
                                hover: {
                                    background: 'var(--fone-primary-main)'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
