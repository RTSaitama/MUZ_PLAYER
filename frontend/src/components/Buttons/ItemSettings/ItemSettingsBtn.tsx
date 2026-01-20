 import { ItemSettingsIcon } from "@/assets/icons/item_options/ItemSettingsIcon"
type ItemSettingsBtnProps = {
  onClick?: () => void;
};
 export const ItemSettingsBtn = ( { onClick }: ItemSettingsBtnProps) => {


  return(
    <button
    className="item__settings__btn btn "  onClick={onClick}><ItemSettingsIcon width={16} height={6} /></button>
  )
}