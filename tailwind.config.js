module.exports = {
   purge: [],
   darkMode: false, // or 'media' or 'class'
   theme: {
      extend: {
         colors: {
            violet: '#AD1FEA',
            dark: 'rgb(55,63,104)',
            'dark-hover': '#647196',
            sky: '#62bcfa',
            orange: '#f49f85',
            body: '#f2f4ff',
            light: '#f7f8fd',
         },
         fontFamily: {
            body: ['Jost'],
            logo: ['Montserrat Alternates'],
            test: ['Comfortaa'],
         },
      },
   },
   variants: {
      extend: {},
   },
   plugins: [require('tailwind-scrollbar')],
};
