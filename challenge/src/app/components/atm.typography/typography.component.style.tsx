import styled from "styled-components";
import { Color, FontFamily, FontSize, FontWeight, LineHeight, Spacing } from "../obj.constants/constants";


export const H1 = styled.h1`
  color: ${Color.GrayDark};
  font-size: ${FontSize.Large};
  font-family: ${FontFamily.Secondary};
  font-weight: ${FontWeight.Semibold};
  line-height: ${LineHeight.Large};
  padding: 0;
  margin-top: ${Spacing.Large};
  margin-bottom: ${Spacing.Small};
`;


export const H2 = styled.h2`
  color: ${Color.GrayDark};
  font-size: ${FontSize.Small};
  font-family: ${FontFamily.Secondary};
  font-weight: ${FontWeight.Bold};
  line-height: ${LineHeight.Large};
  padding: 0;
  margin-top: ${Spacing.Small};
  margin-bottom: ${Spacing.XSmall};
`;

interface BodyProps {
  bold?: boolean;
}

export const Body = styled.p<BodyProps>`
  color: ${Color.Gray};
  margin: 0;
  font-size: ${FontSize.XSmall};
  font-family: ${FontFamily.Primary};
  font-weight: ${(props) => (props.bold ? FontWeight.Bold : FontWeight.Normal)};
  line-height: ${LineHeight.XLarge};
  padding: 0;
  margin: 0;
`;


