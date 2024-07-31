import { FC } from "react";

import ContentLoader from "react-content-loader"

type TSkeletonProps = {
    className: string,
    key: number
}
 
const PizzaSkeletonLoader: FC<TSkeletonProps> = (props) => {
    return (
        <ContentLoader
            speed={2}
            width={280}
            height={466}
            viewBox="0 0 280 466"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <circle cx="139" cy="129" r="122" /> 
            <rect x="0" y="265" rx="8" ry="8" width="280" height="27" /> 
            <rect x="0" y="313" rx="8" ry="8" width="280" height="88" /> 
            <rect x="128" y="420" rx="22" ry="22" width="152" height="45" /> 
            <rect x="0" y="431" rx="8" ry="8" width="90" height="27" />
        </ContentLoader>
    );
}

export default PizzaSkeletonLoader;