
interface Props {
    description: string
    name: string
    imgUrl: string
    onClick: () => void
}
function GameDetails(item: Props) {
    return (
        <div
            className="card bg-dark m-3"
            style={{
                width: "50rem",
                height: "45rem", // Fixed height added
                border: "2px solid grey",
                position: "relative",
                overflow: "hidden", // Ensures content doesn't overflow the card
            }}>
            <img
                src={"https://logowik.com/content/uploads/images/close1437.jpg"}
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    cursor: "pointer",
                }}
                height={"20px"}
                width={"20px"}
                alt={"close"}
                onClick={item.onClick}
            />
            <img src={item.imgUrl} className="card-img-top" alt={item.name} />
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text" style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>
                    {item.description}
                </p>
            </div>
        </div>
    );
}

export default GameDetails;