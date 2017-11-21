import { StyleSheet } from 'react-native';

export const colors = {
  orangeyRed: (alpha = 1) => `rgba(252, 61, 57, ${alpha})`,
  grapefruit: (alpha = 1) => `rgba(255, 96, 89, ${alpha})`,
  seafoamBlue: (alpha = 1) => `rgba(84, 214, 201, ${alpha})`,
  lightGreyBlue: (alpha = 1) => `rgba(145, 214, 216, ${alpha})`,
  deepSkyBlue: (alpha = 1) => `rgba(29, 141, 242, ${alpha})`,
  azure: (alpha = 1) => `rgba(0, 153, 240, ${alpha})`,
  white: (alpha = 1) => `rgba(255, 255, 255, ${alpha})`,
  whiteTwo: (alpha = 1) => `rgba(219, 219, 219, ${alpha})`,
  paleGrey: (alpha = 1) => `rgba(237, 250, 249, ${alpha})`,
  whiteThree: (alpha = 1) => `rgba(250, 250, 250, ${alpha})`,
  ocean: (alpha = 1) => `rgba(0, 131, 143, ${alpha})`,
  mustard: (alpha = 1) => `rgba(227, 167, 0, ${alpha})`,
  selectiveYellow: (alpha = 1) => `rgba(255, 179, 0, ${alpha})`,
  black: (alpha = 1) => `rgba(0, 0, 0, ${alpha})`,
  warmGrey: (alpha = 1) => `rgba(155, 155, 155, ${alpha})`,
  charcoalGrey: (alpha = 1) => `rgba(74, 74, 74, ${alpha})`,
  bazaar: (alpha = 1) => `rgba(158, 112, 118, ${alpha})`,
  catSkillWhite: (alpha = 1) => `rgba(229, 242, 243, ${alpha})`,
};

export const textStyles = {
  regular: {
    fontFamily: 'SourceSansPro-Regular'
  },
  semiBold: {
    fontFamily: 'SourceSansPro-Semibold',
  },
  bold: {
    fontFamily: 'SourceSansPro-Bold',
  },
  regularWhiteSmall: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 12,
    color: colors.white()
  },
  regularWhite: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 17,
    color: colors.white()
  },
  regularWhiteMedium: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 15,
    color: colors.white()
  },
  regularGrapefruit: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 17,
    color: colors.grapefruit()
  },
  regularBlackSmall: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 13,
    color: colors.charcoalGrey()
  },
  regularBlackMedium: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 14,
    color: colors.charcoalGrey()
  },
  regularBlack: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 17,
    color: colors.charcoalGrey()
  },
  regularOceanSmall: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 13,
    color: colors.ocean()
  },
  regularOcean: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 15,
    color: colors.ocean()
  },
  regularWarmGrey: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 15,
    color: colors.warmGrey()
  },
  semiBoldWhite: {
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: 15,
    color: colors.white()
  },
  semiBoldWhiteSmall: {
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: 12,
    color: colors.white()
  },
  semiBoldWhiteBig: {
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: 24,
    color: colors.white()
  },
  semiBoldWhiteHuge: {
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: 28,
    color: colors.white()
  },
  semiBoldBlackSmall: {
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: 13,
    color: colors.charcoalGrey()
  },
  semiBoldBlack: {
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: 15,
    color: colors.charcoalGrey()
  },
  semiBoldGrape: {
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: 17,
    color: colors.grapefruit()
  },
  semiBoldOceanSmall: {
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: 12,
    color: colors.ocean()
  },
};
