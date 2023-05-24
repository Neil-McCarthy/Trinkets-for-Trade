import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewTrinketMutation } from "./trinketsApiSlice"
import useAuth from "../../hooks/useAuth"

const NewTrinketForm = () => {

    const {userId} = useAuth();

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

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setDescription('')
            navigate('/trinkets')
        }
    }, [isSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onPriceChanged = e => setPrice(e.target.value)

    const canSave = [ name, description, price].every(Boolean) && !isLoading

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
                <label htmlFor="price">
                    Price:</label>
                <input
                    id="name"
                    name="name"
                    type="number"
                    autoComplete="off"
                    value={price}
                    onChange={onPriceChanged}
                />
            </form>
        </>
    )

    return content
}

export default NewTrinketForm