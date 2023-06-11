/** @type {import('tailwindcss').Config} */

export default {
  future: {
    purgeLayersByDefault: true,
  },
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  variants: {
    textColor: ["responsive", "hover", "focus", "group-hover"],
    borderWidth: ["responsive", "last", "hover", "focus"],
    backgroundColor: [
      "responsive",
      "odd",
      "even",
      "hover",
      "focus",
      "group-hover",
    ],
    backgroundOpacity: ["responsive", "odd", "even", "hover", "focus"],
    padding: ["responsive"],
    textAlign: ["responsive", "first", "last"],
  },
  theme: {
    letterSpacing: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0.05em",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    },
    screens: {
      sm: "640px", // was 640px
      md: "1000px", //was 768px
      lg: "1024px",
      xl: "1280px",
      xs: "400px",
    },
    // fontFamily: {
    //   display: ["Proza Libre", "sans-serif"],
    //   body: ["Proza Libre", "sans-serif"],
    // },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      4: "4px",
    },
    extend: {
      width: {
        "w-30": "30%",
        "w-9": "9%",
        "w-2": "2%",
        "w-5": "5%",
      },
      colors: {
        
        outline:'#E6E6E6',
        light:'#F4F4F4',

        primary: {
          DEFAULT: "#EE6F34",
          light:'#FFDBCA',
          lighter:'#FFF0E9'
        },

        secondary: {
          DEFAULT: "#22A45D",
           light:'#C0FFDD',
           lighter:'#E6FDF0'
        },

        tertiary: {
          DEFAULT: "#FFD600",
           light:'#FFF4BA',
           lighter:'#FEFAE3'
        },

        info: {
          DEFAULT: "#2F80ED",
        },

        success: {
          DEFAULT: "#219653",
        },

        warning: {
          DEFAULT: "#F39C36",
        },

        error: {
          DEFAULT: "#eb445a",
        },

        dark: {
 
          100: "#C2C4C7",
          200: "#646A78",
          300: "#373F53",
          400: "#0B101F",

        },
      },
      spacing: {
        90: "20rem",
        96: "24rem",
        98: "28rem",
        100: "30rem",
        128: "32rem",
        easispace: "11rem",
      },
      minHeight: {
        "screen-75": "75vh",
      },
      fontSize: {
        55: "55rem",
      },
      opacity: {
        80: ".8",
      },
      zIndex: {
        2: 2,
        3: 3,
      },
      inset: {
        "-100": "-100%",
        "-225-px": "-225px",
        "-160-px": "-160px",
        "-150-px": "-150px",
        "-94-px": "-94px",
        "-50-px": "-50px",
        "-29-px": "-29px",
        "-20-px": "-20px",
        "25-px": "25px",
        "40-px": "40px",
        "95-px": "95px",
        "145-px": "145px",
        "195-px": "195px",
        "210-px": "210px",
        "260-px": "260px",
      },
      height: {
        "95-px": "95px",
        "70-px": "70px",
        "350-px": "350px",
        "500-px": "500px",
        "600-px": "600px",
      },
      maxHeight: {
        "860-px": "860px",
      },
      maxWidth: {
        "100-px": "100px",
        "120-px": "120px",
        "150-px": "150px",
        "180-px": "180px",
        "200-px": "200px",
        "210-px": "210px",
        "580-px": "580px",
      },
      minWidth: {
        "140-px": "140px",
        48: "12rem",
      },
      backgroundSize: {
        full: "100%",
      },
    },
  },
  plugins: [ require('@tailwindcss/line-clamp')],
}

