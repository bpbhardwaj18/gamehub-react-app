import axios from "axios";
import { useEffect } from "react";
import API_BASE_URL from "../../../Constants";

function Action() {
    useEffect(() => {
        const apiCallForGameData = () => {
            axios.get(API_BASE_URL+"game/Action", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then(
                (data) => {
                    console.log("shriji")
                    console.log(data)
                }
            ).catch((e) => {
                console.log("jaya")
                console.log(e)
            })
        }
        apiCallForGameData()
    }, [])
    return (
        <>
            <h1 className="mt-3 mx-2"  >Action Games</h1 >
            <div className="list-group m-3" id="list-tab" role="tablist">
                <p>bdhfvbsxhjvhjvh</p>
            </div >
        </>
    );
}
export default Action;