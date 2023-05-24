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
    const [price, setPrice] = useState(0)
    const [userId, setUserId] = useState(users[0].id)

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setDescription('')
            setUserId('')
            navigate('/trinkets')
        }
    }, [isSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [name, description, userId].every(Boolean) && !isLoading

    const onSaveTrinketClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewTrinket({ user: userId, name: name, description: description, price: price })
        }
    }


    const content = (
        <>
            <p>{error?.data?.message}</p>

            <form onSubmit={onSaveTrinketClicked}>
                <div>
                    <h2>New Trinket</h2>
                    <div>
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
                <label htmlFor="name">
                    Name:</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />

                <label htmlFor="description">
                    Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={onDescriptionChanged}
                />
            </form>
        </>
    )

    return content
}

export default NewTrinketForm