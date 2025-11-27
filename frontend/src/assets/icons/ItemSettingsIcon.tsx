type ItemSettingsIconProps = React.SVGProps<SVGSVGElement> & {
  className?: string;
};

export const ItemSettingsIcon: React.FC<ItemSettingsIconProps> = ({ className, ...props }) => (
  
    <svg width="16" height="6" viewBox="0 0 16 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="15" height="5" rx="2.5" stroke="white"/>
<circle cx="4" cy="3" r="1" fill="white"/>
<circle cx="8" cy="3" r="1" fill="white"/>
<circle cx="12" cy="3" r="1" fill="white"/>
</svg>

)