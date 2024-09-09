// src/icons/CalculatorIcon.tsx

import React from 'react';
import { IconProps } from '../utils/types';

const CalculatorIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => {
    const svgSize = `${size}px`;

    return (
        <svg fill="currentColor" className={className} height={svgSize} width={svgSize} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path d="M384 32H128c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h256c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-64 48c0-8.8 7.2-16 16-16s16 7.2 16 16v48c0 8.8-7.2 16-16 16s-16-7.2-16-16V80zm-64 0c0-8.8 7.2-16 16-16s16 7.2 16 16v48c0 8.8-7.2 16-16 16s-16-7.2-16-16V80zm128 416H144v-32h256v32zm0-64H144v-32h256v32zm0-64H144v-32h256v32zm0-64H144v-32h256v32zm0-64H144v-32h256v32zm0-64H144v-32h256v32z"></path>
            </g>
        </svg>
    );
};

export default CalculatorIcon;
