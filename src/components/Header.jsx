import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchUser} from "../store/slices/userStore";
import {selectUser, selectUserStatus} from "../store/selectors";

function Header() {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const status = useSelector(selectUserStatus)

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch])

    return (
        <header className="header">
            <h1>🛒 Интернет-магазин</h1>
            <div className="user-info">
                {status === "succeeded" ? (
                    <span>Привет, {user.name}!</span>
                ) : (
                    <span>Загрузка...</span>
                )}
            </div>
        </header>
    )
}

export default Header;