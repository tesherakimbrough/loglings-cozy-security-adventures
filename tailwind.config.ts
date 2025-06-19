
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'cozy': ['Poppins', 'sans-serif'],
				'body': ['Inter', 'sans-serif'],
				'script': ['Dancing Script', 'cursive'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				cozy: {
					warm: '#8B4513',
					sage: '#87A96B',
					cream: '#F5F5DC',
					amber: '#D2B48C',
					rose: '#D4A574',
					forest: '#355E3B',
					moss: '#ADDFAD',
					lavender: '#E6E6FA',
					peach: '#FFCBA4',
					mint: '#F0FFF0'
				},
				// New Cozy Forest Colors
				'forest-night': 'var(--forest-night)',
				'tree-shadow': 'var(--tree-shadow)',
				'moss-glow': 'var(--moss-glow)',
				'firefly-light': 'var(--firefly-light)',
				'sage-whisper': 'var(--sage-whisper)',
				'forest-breath': 'var(--forest-breath)',
				'leaf-glow': 'var(--leaf-glow)',
				'spring-moss': 'var(--spring-moss)',
				'warm-amber': 'var(--warm-amber)',
				'sunset-peach': 'var(--sunset-peach)',
				'berry-blush': 'var(--berry-blush)',
				'moonbeam': 'var(--moonbeam)',
				'text-primary': 'var(--text-primary)',
				'text-cozy': 'var(--text-cozy)',
				'text-whisper': 'var(--text-whisper)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				cozy: '1.5rem'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'gentle-float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-8px)'
					}
				},
				'cozy-pulse': {
					'0%, 100%': {
						opacity: '1',
						transform: 'scale(1)'
					},
					'50%': {
						opacity: '0.8',
						transform: 'scale(1.02)'
					}
				},
				'sparkle': {
					'0%, 100%': {
						opacity: '0.3',
						transform: 'rotate(0deg) scale(1)'
					},
					'50%': {
						opacity: '1',
						transform: 'rotate(180deg) scale(1.1)'
					}
				},
				'gentle-bounce': {
					'0%, 20%, 53%, 80%, 100%': {
						transform: 'translateY(0px)'
					},
					'40%, 43%': {
						transform: 'translateY(-4px)'
					},
					'70%': {
						transform: 'translateY(-2px)'
					}
				},
				'cozy-glow': {
					'0%, 100%': {
						boxShadow: '0 4px 20px -2px rgba(139, 69, 19, 0.1)'
					},
					'50%': {
						boxShadow: '0 8px 25px -2px rgba(139, 69, 19, 0.2)'
					}
				},
				'twinkle': {
					'0%': { opacity: '0.6' },
					'100%': { opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'gentle-float': 'gentle-float 3s ease-in-out infinite',
				'cozy-pulse': 'cozy-pulse 2s ease-in-out infinite',
				'sparkle': 'sparkle 2s ease-in-out infinite',
				'gentle-bounce': 'gentle-bounce 2s ease-in-out infinite',
				'cozy-glow': 'cozy-glow 4s ease-in-out infinite',
				'twinkle': 'twinkle 3s ease-in-out infinite alternate'
			},
			backgroundImage: {
				'cozy-gradient': 'linear-gradient(135deg, #F0FFF0 0%, #E6E6FA 50%, #FFCBA4 100%)',
				'forest-gradient': 'linear-gradient(135deg, #87A96B 0%, #355E3B 100%)',
				'warm-gradient': 'linear-gradient(135deg, #D2B48C 0%, #D4A574 100%)',
				'cozy-texture': 'radial-gradient(circle at 1px 1px, rgba(139, 69, 19, 0.15) 1px, transparent 0)',
				'forest-night-gradient': 'radial-gradient(ellipse at center top, rgba(45, 59, 50, 0.3) 0%, rgba(26, 37, 32, 0.8) 50%, var(--forest-night) 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
