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
import React from 'react';


interface Props {
    category?: string
    list?: string
}

function Main(props: Props) {
    return (
        <>
            < p className="fs-4 mt-3 mx-2"  >Genres</p >
            <div className="list-group m-3" id="list-tab" role="tablist">
                {props.category === "Action" ? (<Action></Action>) :
                    props.category === "Indie" ? (<Indie></Indie>) :
                        props.category === "Adventure" ? (<Adventure></Adventure>) :
                            props.category === "RPG" ? (<RPG></RPG>) :
                                props.category === "Strategy" ? (<Strategy></Strategy>) :
                                    props.category === "Shooter" ? (<Shooter></Shooter>) :
                                        props.category === "Casual" ? (<Casual></Casual>) :
                                            props.category === "Simulation" ? (<Simulation></Simulation>) :
                                                props.category === "Puzzle" ? (<Puzzle></Puzzle>) :
                                                    props.category === "Arcade" ? (<Arcade></Arcade>) :
                                                        props.category === "Platformer" ? (<Platformer></Platformer>) :
                                                            props.category === "Racing" ? (<Racing></Racing>) :
                                                                props.category === "Massively Multiplayer" ? (<p>Massively Multiplayer</p>) :
                                                                    props.category === "Sports" ? (<Sports></Sports>) :
                                                                        props.category === "Fighting" ? (<Fighting></Fighting>) :
                                                                            props.category === "Family" ? (<Family></Family>) :
                                                                                props.category === "Board Games" ? (<p>hgdchjsxgh</p>) :
                                                                                    props.category === "Educational" ? (<Educational></Educational>) :
                                                                                        props.category === "Card" ? (<Card></Card>) :
                                                                                            (<p>Home</p>)}
            </div >
        </  >
    );
}


export default Main