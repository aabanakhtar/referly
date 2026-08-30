import { useEffect, useState } from "react";
import api from "../API";
import { useNavigate } from "react-router-dom"

/* Update Brag Profile card that is first on the page */
function UpdateBragProfileCard() {
  // to update tooltips
  const [profileExists, setProfileExists] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // to check whether the profile needs to be made
    const fetchData = async () => {
      try {
        const profile = await api.get("/profile/");
        // Meaning the profile does exist
        if (profile.status === 200) {
          setProfileExists(true);
        }
      } catch (error) {
        setErrorState(true);
      }
    };

    fetchData();
  }, []);

  // if the server or internet died somehow
  if (errorState) {
    return (
      <p>Couldn't retrieve profile data.</p>
    );
  }


  const navigateToEditProfile = () => {
    navigate("/edit_profile");
  };
  // tool tip for the user
  const hint = !profileExists ? <p>You haven't created a profile yet.</p> : <p>Update your universal recommender data</p>;
  const editButton = profileExists ? <button onClick={navigateToEditProfile}>Edit</button> : <button onClick={navigateToEditProfile}>Create</button>;

  return (
    <article>
      <h3>Edit Your Common Profile</h3>
      {hint}
      {editButton}
    </article>
  )
}

function CreateNewRequest() {
  const navigate = useNavigate();

  return (
    <div>
      <button type="submit" className="outline contrast" style={{height: "10rem"}}
        onClick={() => {navigate("/create_request");}}>
        + Create New
      </button>
    </div>
  );
}

/* Dashboard that the user sees on login */
function Dashboard() {
  let userName: string | null = sessionStorage.getItem("name");
  if (!userName) {
    userName = "User";
  }

  return (
    <div className="container">
      <h1>Welcome, {userName}!</h1>
      <p>Check your past recommendations, update your bio, and more, below.</p>
      <UpdateBragProfileCard />
      <h3>Create New Request</h3>
      <CreateNewRequest />
      <h3>Past Requests</h3>
    </div>
  );
}

export default Dashboard;