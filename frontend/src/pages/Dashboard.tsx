import UpdateBragProfile from "./subcomponents/Profile"

function Dashboard() {
    let userName: string = sessionStorage.getItem("name");
    if (!userName) {
        userName = "User";
    }

    return (
        <div className="container">
            <h1>Welcome, {userName}!</h1>
            <p>Check your past recommendations, update your bio, and more, below.</p>
            <UpdateBragProfile />
        </div>
    );
}

export default Dashboard;