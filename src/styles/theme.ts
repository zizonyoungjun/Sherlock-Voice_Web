import { css, DefaultTheme } from 'styled-components';

const colors = {
  Color_Orange: {
    extralight: '#FFB864',
    light: '#FFA539',
    primary: '#FF8A00',
    heavy: '#DB6C00',
    extraheavy: '#9B5400',
  },
  Color_Green: {
    extralight: '#4EC786',
    light: '#2AB96C',
    primary: '#00B454',
    heavy: '#008C41',
    extraheavy: '#006E33',
  },
  Color_Blue: {
    extralight: '#5D67C4',
    light: '#3C47B5',
    primary: '#1826B0',
    heavy: '#111D88',
    extraheavy: '#0B146B',
  },
  Color_Red: '#FF3900',
  Color_Yellow: '#FFBA00',
  Color_Gray_Black: '#1E1F21',
  Color_Gray_2: '#525C67',
  Color_Gray_3: '#8A949E',
  Color_Gray_4: '#C3CDD5',
  Color_Gray_5: '#E8EBEF',
  Color_Gray_6: '#F4F5F7',
  Color_White: '#FFFFFF',
  Color_Oasis_Blue: '#85B6FF',
};

const fonts = {
  Title1_Pretendard_Bold_24: css`
    font-family: 'PretendardBold', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 2.4rem;
    line-height: 2.9rem;
  `,
  Title2_Pretendard_SemiBold_20: css`
    font-family: 'PretendardBold', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 2rem;
    line-height: 2.4rem;
  `,
  Title3_Pretendard_Bold_35: css`
    font-family: 'PretendardSemiBold', sans-serif;
    font-size: 3.5rem;
    font-weight: 700;
    font-style: normal;
    line-height: 4.177rem;
  `,
  Subtitle1_Pretendard_Semibold_20: css`
    font-family: 'PretendardSemiBold', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 2rem;
    line-height: 2.4rem;
  `,
  Subtitle2_Pretendard_Medium_18: css`
    font-family: 'PretendardMedium', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 2.2rem;
  `,
  Subtitle3_Pretendard_Semibold_20: css`
    font-family: 'PretendardSemiBold', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 2rem;
    line-height: 2.148rem;
  `,
  Body1_Pretendard_Medium_16: css`
    font-family: 'PretendardMedium', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 1.9rem;
  `,
  Body2_Pretendard_Bold_16: css`
    font-family: 'PretendardBold', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 1.9rem;
  `,
  Caption1_Pretendard_Semibold_12: css`
    font-family: 'PretendardSemiBold', sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    font-style: normal;
    line-height: 1.671rem;
  `,
  Caption2_Pretendard_Semibold_14: css`
    font-family: 'PretendardSemiBold', sans-serif;
    font-size: 1.4rem;
    font-weight: 600;
    font-style: normal;
    line-height: 1.671rem;
  `,
  Noto_B_Title_1: css`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 2rem;
    line-height: 2.7rem;
    letter-spacing: -0.03em;
  `,
  Noto_SB_Title_2: css`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 600;
    font-size: 2.6rem;
    line-height: 2.2rem;
    letter-spacing: -0.02em;
  `,
  Noto_B_Title_3: css`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 4rem;
    line-height: 3.95rem;
  `,
  Noto_SB_Title_4: css`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 2.2rem;
    letter-spacing: -0.02em;
  `,
  Noto_M_Subtitle_1: css`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.6rem;
    letter-spacing: -0.05em;
  `,
  Noto_SB_Subtitle_2: css`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 600;
    font-size: 1.2rem;
    line-height: 1.6rem;
    letter-spacing: -0.02em;
  `,
  Noto_M_Subtitle_3: css`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.2rem;
    letter-spacing: -0.02em;
  `,
  Noto_M_Subtitle_4: css`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.6rem;
    letter-spacing: -0.02em;
  `,
  Noto_M_Subtitle_5: css`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.9rem;
    letter-spacing: -0.05em;
  `,
  Noto_SB_Subtitle_6: css`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 1.9rem;
    letter-spacing: -0.05em;
  `,
};

export type ColorsTypes = typeof colors;
export type FontsTypes = typeof fonts;

export const theme: DefaultTheme = {
  colors,
  fonts,
};
