import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <p>Add Game </p>
            <Link to="/addNewGame">Click Here</Link>
        </>
    );
}

export default Footer