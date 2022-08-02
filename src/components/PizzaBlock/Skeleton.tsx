"use strict";

import ContentLoader from "react-content-loader";
import React from 'react';

const Skeleton: React.FC = (props) => (
    <ContentLoader className={'pizza-block'}
        speed={2}
        width={285}
        height={465}
        viewBox="0 0 285 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="136" cy="123" r="120" />
        <rect x="0" y="266" rx="10" ry="10" width="280" height="20" />
        <rect x="0" y="318" rx="10" ry="10" width="280" height="88" />
        <rect x="0" y="425" rx="10" ry="10" width="100" height="40" />
        <rect x="131" y="425" rx="25" ry="25" width="150" height="40" />
    </ContentLoader>
)

export default Skeleton;