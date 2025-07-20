import { Link } from "react-router-dom";
import Main from "./Main";

interface Props {
    list: string[]
}

function LeftNav(props: Props) {
    return (
        <>
            < p className="fs-4 mt-3 mx-2"  >Genres</p >
            <div className="list-group m-3" id="list-tab" role="tablist">
                {props.list.map((item) => {
                    return (
                        <Link to={`/` + item} className="m-1">{item}</Link>
                    );
                })}
            </div >
        </  >
    );
}

export default LeftNav