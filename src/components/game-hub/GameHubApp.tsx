import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LeftNav from "./LeftNav";
import NavBar from "./NavBar";
import Home from './Home';
import React, { useEffect, useState } from 'react';
import Main from './Main';
import MainPage from './MainPage';
import Login from './Login';
import axios from 'axios';
import { set } from 'react-hook-form';
import Footer from './Footer';
import AddGame from './AddGame';
import API_BASE_URL from '../../Constants';

interface User {
    username: string
    password: string
}
interface AddGame {
    gameName: string
    gameDesc: string
    gameImgUrl: string
    category: string
}
interface signInResponse {
    token: string
    roles: { authority: string }[]
}
function GameHubApp() {
    const list = ["Action", "Indie", "Adventure", "RPG", "Strategy", "Shooter", "Casual", "Simulation", "Puzzle", "Arcade", "Platformer", "Racing", "Massively Multiplayer", "Sports", "Fighting", "Family", "Board Games", "Educational", "Card"];
    const loginForm = async (user: User) => {
        await axios.post(API_BASE_URL+"api/auth/signin", { name: user.username, password: user.password }, {
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "test"
            },
        }).then((response) => {
            const data: signInResponse = response.data;
            setIsLogin(true)
            localStorage.setItem("token", data.token);
            localStorage.setItem("roles", JSON.stringify(data.roles));
            console.log(localStorage)
            setRoles(data.roles.map(a => a.authority))
        }).catch((error) => {
            setIsLogin(false);
            console.error("Login failed:", error);
        });
    };

    useEffect(() => {
        axios.get(API_BASE_URL+"api/auth/session", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }
        ).then((data) => {
            setIsLogin(true)
            console.log(data)
        }
        ).catch(e => console.log(e))
    }, []);
    const [roles, setRoles] = useState<string[]>(JSON.parse(localStorage.getItem("roles") || "[]").map((role: { authority: string }) => role.authority));
    const [searchString, setSearchString] = useState<string>(localStorage.getItem("searchString") || "")
    const onSearch = (data: string) => {
        setSearchString(data)
        localStorage.setItem("searchString", searchString)
    }
    const addGame = async (data: AddGame) => {
        await axios.post(API_BASE_URL+"game/addGame", { name: data.gameName, description: data.gameDesc, imgUrl: data.gameImgUrl, category: data.category }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }
        ).then((data) => {
            console.log(data)
        }).catch((e) => console.log(e))
    }
    const onLogout = () => {
        console.log(localStorage)

        localStorage.removeItem("token")
        console.log(localStorage)

        setIsLogin(false)
    }
    const [isLogin, setIsLogin] = useState(false)
    return (
        <>
            {isLogin ? (
                <Router>
                    <div className="bg-dark vh-100 vw-100 text-white" style={{ overflowY: 'auto' }}>
                        <NavBar onSubmit={onSearch} onLogout={onLogout} />
                        <div className="d-flex">
                            <div className="flex-shrink-0">
                                <LeftNav list={list} />
                                <hr />
                                <>{console.log(roles)}</>
                                {roles.map((e) => e === "ROLE_Admin" && <Footer />)}
                            </div>
                            <div className="flex-grow-1">
                                <div className="tab-content" id="nav-tabContent">
                                    <Routes>
                                        {list.map((item) => (
                                            <Route
                                                key={item}
                                                path={'/' + item + '/*'}
                                                element={<MainPage source={"leftNav"} category={item} testing={() => setSearchString("")} />}
                                            />
                                        ))}
                                        <Route key={searchString}
                                            path={'/searchResult'}
                                            element={<MainPage source={"search"} category={searchString} testing={() => setSearchString("")} />}></Route>

                                        <Route key="footer" path="/addNewGame" element={<AddGame onAddGameSubmit={addGame} list={list} />}></Route>

                                        <Route key="home" path="/home" element={<Home />}></Route>
                                    </Routes>
                                    {/* {searchString.length !== 0 && React.createElement(MainPage, { category: searchString, source: "search", testing: () => console.log("ba") })} */}

                                </div>
                            </div>
                        </div>
                    </div>
                </Router>
            ) : (

                <div className="vh-100 vw-100 text-white">
                    {/* <Routes>
                    <Route key="login" path="/login" element={<Login loginSubmit={loginForm}></Login>
                    }></Route>
                </Routes> */}
                    <Login loginSubmit={loginForm}></Login>
                </div >
            )}
        </>
    );
}

export default GameHubApp; 