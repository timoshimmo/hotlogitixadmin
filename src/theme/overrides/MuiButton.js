import palette from '../palette';

export default {
  components: {
    MuiButton: {
      variants: [{
        props: { color: "primary" },
        style: {
           backgroundColor: palette.primary.main,
           '&hover': {
             backgroundColor: palette.primary.dark,
           }
         },
      },
      {
        props: { color: "secondary" },
        style: {
           backgroundColor: palette.secondary.main,
           '&hover': {
             backgroundColor: palette.secondary.dark,
           }
         },
      }],
    }
  }

/*  contained: {
    boxShadow:
      '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)',
    backgroundColor: palette.primary.main,
    '&hover': {
      backgroundColor: palette.primary.dark,
    }
  },
  root:{
    boxShadow:
      '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)',
    backgroundColor: palette.primary.main,
    '&hover': {
      backgroundColor: palette.primary.dark,
    }
  } */
};
