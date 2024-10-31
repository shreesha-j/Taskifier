/**
 * Assets module containing application-wide resources such as images and colors.
 * @module Assets
 */
const Assets = {
    Images: {
      // Application logo image
      logo: new URL('./images/vite.svg', import.meta.url).href,
    },
    Colors: {
      // Secondary color used throughout the application
      secondary: '#292929',
    },
  };
  
  export default Assets;