import { NavLink } from "react-router-dom"
import { closeModal } from "../redux/slices/modalStatusSlice"
import { useDispatch } from "react-redux"
export const AuthRequiredPage: React.FC = () => {
  const dispatch = useDispatch();
  const onHandleCloseModal = () => {
    dispatch(closeModal())
  }
  return (
    <div className="modal__overlay authRequired_overlay" onClick={() => onHandleCloseModal()}>
      <div className="modal__window authRequired__window" >
        <h3 className="authRequired__message">You shoud be logged to manage your playlists.</h3>
        <NavLink to="/login" className="login-form__link">let's go to Login Page  </NavLink>
      </div>
    </div>
  )
}