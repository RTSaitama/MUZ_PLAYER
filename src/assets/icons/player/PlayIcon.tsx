import React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  className?: string;
};

export const PlayIcon: React.FC<Props> = ({ className, ...props }) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="play">
  <path d="M32 57.14a25.14 25.14 0 1 1 17.66-7.25 2 2 0 1 1-2.81-2.84A21.14 21.14 0 1 0 32 53.14a21.37 21.37 0 0 0 5.8-.8 2 2 0 1 1 1.09 3.85 25.35 25.35 0 0 1-6.89.95Z"></path>
  <path d="M25.79 44.64a2 2 0 0 1-1-.27 2 2 0 0 1-1-1.73V21.36a2 2 0 0 1 3-1.73l18.42 10.64a2 2 0 0 1 0 3.46L26.79 44.37a2 2 0 0 1-1 .27Zm2-19.82v14.36L40.21 32Z"></path>
</svg>
)