import type { IconProps } from "./types";

export const UnderlineIcon = ({
  title,
  ...props
}: IconProps): React.JSX.Element => {
  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      strokeWidth="1.5"
      {...props}
    >
      {title && <title>{title}</title>}
      <g fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.25 2C5.66421 2 6 2.33579 6 2.75V8.5C6 10.1558 7.34336 11.5 9 11.5C10.6566 11.5 12 10.1558 12 8.5V2.75C12 2.33579 12.3358 2 12.75 2C13.1642 2 13.5 2.33579 13.5 2.75V8.5C13.5 10.984 11.4854 13 9 13C6.51464 13 4.5 10.984 4.5 8.5V2.75C4.5 2.33579 4.83579 2 5.25 2Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 15.25C2 14.8358 2.33579 14.5 2.75 14.5H15.25C15.6642 14.5 16 14.8358 16 15.25C16 15.6642 15.6642 16 15.25 16H2.75C2.33579 16 2 15.6642 2 15.25Z"
          fill="currentColor"
          fillOpacity=".4"
        />
      </g>
    </svg>
  );
};
