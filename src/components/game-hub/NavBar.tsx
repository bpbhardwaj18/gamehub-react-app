import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface Props {
    onSubmit: (data: string) => void;
    onLogout: () => void
}

function NavBar(props: Props) {
    interface FormData {
        search: string;
    }

    const [searchString, setSearchString] = useState<string>(() => {
        // Retrieve the search string from localStorage on initial render
        return localStorage.getItem("searchString") || "";
    });

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>();

    useEffect(() => {
        // Store the search string in localStorage whenever it changes
        localStorage.setItem("searchString", searchString);
    }, [searchString]);

    return (
        <nav className="navbar border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <form
                    className="d-flex flex-grow-1"
                    role="search"
                    onSubmit={handleSubmit((data) => {
                        setSearchString(data.search);
                        props.onSubmit(data.search);
                        const hiddenLink = document.getElementById("hiddenLink") as HTMLAnchorElement;
                        if (hiddenLink) {
                            hiddenLink.href = `/searchResult`;
                            hiddenLink.click();
                        }
                    })}
                >
                    <input
                        {...register("search", { required: true, minLength: 1 })}
                        className="form-control me-2 flex-grow-1"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        id="search"
                        defaultValue={searchString} // Set the default value from state
                    />

                    <button className="btn btn-outline-success" type="submit">Search</button>
                    <Link
                        to="/searchResult"
                        style={{ display: "none" }}
                        id="hiddenLink"
                    />
                </form>

                <div className="form-check form-switch mx-3">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    <label className="form-check-label text-white" htmlFor="flexSwitchCheckDefault">Dark Mode</label>
                </div>
                <button
                    className="btn btn-outline-success"
                    type="button"
                    onClick={props.onLogout}
                >
                    Logout
                </button>
                {/* <Link
                    to="/login"
                    style={{ display: "none" }}
                    id="hiddenLoginLink"
                /> */}
            </div>
        </nav>
    );
}

export default NavBar;