import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewTrinketMutation } from "./trinketsApiSlice"

const NewTrinketForm = ({ users }) => {

    const [addNewTrinket, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewTrinketMutation()

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [userId, setUserId] = useState(users[0].id)

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setDescription('')
            setUserId('')
            navigate('/dash/trinkets')
        }
    }, [isSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [name, description, userId].every(Boolean) && !isLoading

    const onSaveTrinketClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewTrinket({ user: userId, name, description })
        }
    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validNameClass = !name ? "form__input--incomplete" : ''
    const validDescriptionClass = !description ? "form__input--incomplete" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveTrinketClicked}>
                <div className="form__name-row">
                    <h2>New Trinket</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="name">
                    Name:</label>
                <input
                    className={`form__input ${validNameClass}`}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />

                <label className="form__label" htmlFor="description">
                    Description:</label>
                <descriptionarea
                    className={`form__input form__input--description ${validDescriptionClass}`}
                    id="description"
                    name="description"
                    value={description}
                    onChange={onDescriptionChanged}
                />

                <label className="form__label form__checkbox-container" htmlFor="username">
                    ASSIGNED TO:</label>
                <select
                    id="username"
                    name="username"
                    className="form__select"
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select>

            </form>
        </>
    )

    return content
}

export default NewTrinketForm