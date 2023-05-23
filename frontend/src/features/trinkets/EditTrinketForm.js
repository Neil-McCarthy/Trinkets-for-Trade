import { useState } from "react"
import { useUpdateTrinketMutation } from "./trinketsApiSlice"

const EditTrinketForm = ({ trinket, users }) => {

    const [updateTrinket, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateTrinketMutation()



    const [name, setName] = useState(trinket.name)
    const [description, setDescription] = useState(trinket.description)
    const [price, setPrice] = useState(trinket.price)
    const [userId, setUserId] = useState(trinket.user)


    const onNameChanged = e => setName(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onPriceChanged = e => setPrice(e.target.value)

    const canSave = [name, description, price].every(Boolean) && !isLoading

    const onSaveTrinketClicked = async (e) => {
        if (canSave) {
            await updateTrinket({ id: trinket.id, name: name, description: description, price: price, imageUrl: '../images/duck.jpg' })
        }
    }

    const content = (
        <>
            <form onSubmit={e => e.preventDefault()}>
                <div>
                    <h2>Edit Trinket {trinket._id}</h2>
                    <div>
                        <button
                            name="Save"
                            onClick={onSaveTrinketClicked}
                            disabled={!canSave}
                        >
                            Edit
                        </button>
                    </div>
                </div>
                <label htmlFor="trinket-name">
                    Name:</label>
                <input
                    id="trinket-name"
                    name="name"
                    type="description"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />

                <label htmlFor="trinket-description">
                    Description:</label>
                <textarea
                    id="trinket-description"
                    name="description"
                    value={description}
                    onChange={onDescriptionChanged}
                />
                <label htmlFor="trinket-price">
                    Price:</label>
                <input
                    id="trinket-price"
                    name="price"
                    type="description"
                    autoComplete="off"
                    value={price}
                    onChange={onPriceChanged}
                />
                {/* <div>
                    <p>Created:<br />{created}</p>
                    <p>Updated:<br />{updated}</p>
                </div> */}
            </form>
        </>
    )

    return content
}

export default EditTrinketForm