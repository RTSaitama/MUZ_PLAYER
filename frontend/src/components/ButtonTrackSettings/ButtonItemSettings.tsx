 import { ItemSettingsIcon } from "../../assets/icons/ItemSettingsIcon"
type ButtonItemSettingsProps = {
  onClick?: () => void;
};
 export const ButtonItemSettings = ( { onClick }: ButtonItemSettingsProps) => {


  return(
    <button
    className="item__settings__btn btn "  onClick={onClick}><ItemSettingsIcon width={16} height={6} /></button>
  )
}