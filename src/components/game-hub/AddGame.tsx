import { useForm } from "react-hook-form";

interface Props {
    onAddGameSubmit: (data: FormData) => void
    list: string[]
}

interface FormData {
    gameName: string
    gameDesc: string
    gameImgUrl: string
    category: string
}
function AddGame(props: Props) {

    const { register, handleSubmit, formState } = useForm<FormData>();
    return (
        <>
            <h3>Add New Game</h3>
            <div style={{ display: 'flex', height: '100vh' }}>
                <form className="bg-dark" style={{ width: '40%', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} onSubmit={handleSubmit(props.onAddGameSubmit)}  >
                    <div className="mb-3">
                        <label htmlFor="gameName" className="form-label">Game Name</label>
                        <input {...register("gameName", { required: true })} type="text" className="form-control" id="gameName" aria-describedby="gameName" />
                        {formState.errors.gameName?.type === "required" ? <p className="text-danger mt-2">Name is required</p> : null}

                    </div>
                    <div className="mb-3">
                        <label htmlFor="gameDesc" className="form-label">Game Description</label>
                        <input  {...register("gameDesc", { required: true })} type="text" className="form-control" id="gameDesc" />
                        {formState.errors.gameDesc?.type === "required" ? <p className="text-danger mt-2">Description is required</p> : null}

                    </div>
                    <div className="mb-3">
                        <label htmlFor="gameImgUrl" className="form-label">Image Url</label>
                        <input  {...register("gameImgUrl", { required: true })} type="text" className="form-control" id="gameImgUrl" />
                        {formState.errors.gameImgUrl?.type === "required" ? <p className="text-danger mt-2">ImgUrl is required</p> : null}
                    </div>

                    <select {...register("category", { required: true })} id="category" className="form-select" onChange={(e) => {
                        var value = e.target.value;
                    }}>
                        <option selected></option>
                        {props.list.map(item => { return <option key={item}>{item}</option> })}
                    </select>
                    {formState.errors.category?.type === "required" ? <p className="text-danger mt-2">Category is required</p> : null}
                    <div className="d-flex flex-row">
                        <button type="submit" className="btn btn-primary w-100 m-3">Add</button>
                        <button type="reset" className="btn btn-primary w-100 m-3">Reset</button>
                    </div>
                </form>
            </div >
        </ >
    );
}

export default AddGame