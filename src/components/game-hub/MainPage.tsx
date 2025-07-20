import Action from "./RouteComponent/Action";
import Adventure from "./RouteComponent/Adventure";
import Card from "./RouteComponent/Card";
import Casual from "./RouteComponent/Casual";
import Indie from "./RouteComponent/Indie";
import Platformer from "./RouteComponent/Platformer";
import Puzzle from "./RouteComponent/Puzzle";
import Racing from "./RouteComponent/Racing";
import RPG from "./RouteComponent/RPG";
import Shooter from "./RouteComponent/Shooter";
import Simulation from "./RouteComponent/Simulation";
import Strategy from "./RouteComponent/Strategy";
import Sports from "./RouteComponent/Sports";
import Fighting from "./RouteComponent/Fighting";
import Family from "./RouteComponent/Family";
import Educational from "./RouteComponent/Educational";
import Arcade from "./RouteComponent/Arcade";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import GameDetails from "./GameDetails";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import API_BASE_URL from "../../Constants";


interface Props {
    category: string
    list?: string
    source: string
    testing: () => void
}
interface GameData {
    imgUrl: string;
    name: string;
    description: string;
}

function MainPage(props: Props) {

    const [isTruncate, setIsTruncate] = useState<{ [key: number]: boolean }>({ [-1]: true });
    const [gameData, setGameData] = useState<GameData[]>([]);
    useEffect(() => {
        const apiCallForGameData = (category: String) => {
            axios.get(API_BASE_URL+"game/" + category, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then(
                (data) => {
                    console.log("shriji")
                    console.log(data)
                    setGameData(data.data)
                }
            ).catch((e) => {
                console.log("jaya")
                console.log(e)
            })
        }
        if (props.source !== "search") {
            console.log("props cahnges" + props.category)

        }
        setGameData([]); // Clear previous data
        apiCallForGameData(props.category);
    }, [props.category, props.source]);

    return (
        <>
            <h1 className="mt-3 mx-2"  >{(props.source === "search" ? "Search result for " + props.category : props.category)} Games</h1 >
            {props.source === "search" && gameData.length === 0 ? <p className="mt-3 mx-2" >No Data Found</p> : null}
            <div className="list-group m-3" id="list-tab" role="tablist">
                <div className="d-flex flex-row flex-wrap">
                    {gameData.length !== 0 && gameData.map((item, index) => {
                        return (
                            <>
                                <div
                                    className="card bg-dark m-3"
                                    style={{
                                        width: "13rem",
                                        border: "2px solid grey",
                                        position: "relative",
                                        zIndex: 2,
                                    }}
                                    title={item.description} // Tooltip for full description on hover
                                    onClick={() => setIsTruncate((prev) => ({ ...prev, [index]: true }))}
                                >
                                    <img src={item.imgUrl} className="card-img-top" alt={item.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className={"card-text text-truncate"} style={{ maxWidth: "100%" }}>
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                                {isTruncate[index] && (
                                    <div
                                        style={{
                                            position: "fixed",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                                            zIndex: 9999,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <GameDetails
                                            name={item.name}
                                            description={item.description}
                                            imgUrl={item.imgUrl}
                                            onClick={() => setIsTruncate((prev) => ({ ...prev, [index]: false }))}
                                        />
                                    </div>

                                )}
                            </>
                        );
                    })}
                </div>
            </div >

        </>
    );

}
export default MainPage