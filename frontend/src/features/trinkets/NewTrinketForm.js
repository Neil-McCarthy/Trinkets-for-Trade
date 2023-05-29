import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewTrinketMutation } from "./trinketsApiSlice"
import useAuth from "../../hooks/useAuth"
import Header from "../../components/common/Header"
import Nav from "../../components/common/Nav"
import Footer from "../../components/common/Footer"

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
            <Header />
            <Nav  isLoggedIn={true} />
            <main>
                <p>{error?.data?.message}</p>

                <form className="create-new-form" onSubmit={onSaveTrinketClicked}>
                    <h2>New Trinket</h2>
                    <div>
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
                    </div>
                    <div>
                        <label htmlFor="description">
                            Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={onDescriptionChanged}
                        />
                    </div>
                    <div>
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
                    </div>
                    <button
                        className="icon-button"
                        title="Save"
                        disabled={!canSave}
                    >
                        Save
                    </button>
                </form>
            </main>
            <Footer />
        </>
    )

    return content
}

export default NewTrinketForm