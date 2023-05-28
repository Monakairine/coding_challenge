export enum FontSize {
    XSmall = '14px',
    Small = '16px',
    Medium = '18px',
    Large = '20px',
}

export enum FontFamily {
    Primary = 'Roboto',
    Secondary = 'Source Serif Pro',
}

export enum FontWeight {
    Normal = 'normal', //400
    Medium = 500,
    Semibold = 600,
    Bold = 'bold', //700
}

export enum LineHeight {
    Large = '120%',
    XLarge = '150%',
}

export enum Spacing {
    XSmall = '14px',
    Small = '16px',
    Medium = '24px',
    Large = '32px',
}


export const Color: ColorName = {
    Black: 'black',
    White: '#FCFCFC',
    Red: '#FC4242',
    Gray: '#75808A',
    GrayDark: '#161B20',
    Blue: ' #105B72',
    Alert: '#922828',
    Warning: '#EAC700',
    Success: '#289241',
};

export type BaseColor = keyof ColorName;


export interface ColorName {
    Black: string;
    White: string;
    Red: string;
    Blue: string;

    Alert: string;
    Warning: string;
    Success: string;

    GrayDark: string;
    Gray: string;
}