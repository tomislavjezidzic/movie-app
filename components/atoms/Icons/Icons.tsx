import React from 'react';
import { ArrowRight } from './arrowRight';
import { Checkmark } from './checkmark';
import { ChevronDown } from './chevronDown';

const ICON_MAP = {
    arrowRight: ArrowRight,
    checkmark: Checkmark,
    chevronDown: ChevronDown,
};

export const icons = Object.keys(ICON_MAP);

export type IconName = keyof typeof ICON_MAP | string;

interface IconProps {
    name: IconName;
    classes?: string;
}

export const Icon = ({ name, classes }: IconProps) => {
    const ComponentTag = ICON_MAP[name] ? (ICON_MAP[name] as React.ElementType) : null;
    return ICON_MAP[name] ? <ComponentTag classes={classes} /> : null;
};
