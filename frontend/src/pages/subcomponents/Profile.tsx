import { useEffect, useState } from "react";
import api from "../../API";
import axios from "axios";

export default function UpdateBragProfile() {
    const [profileExists, setProfileExists] = useState(false);
    const [errorState, setErrorState] = useState(false); 

    useEffect(() => {
        // to check whether the profile needs to be made
        const fetchData = async () => {
            try {
                const profile = await api.get("/profile/");
                // Meaning the profile does exist
                if (profile.status == 200) {
                    setProfileExists(true);
                }
            } catch (error) {
                setErrorState(true);                
            }
        };

        fetchData();
    }, []);

    if (errorState) {
        return (
            <p>Couldn't retrieve profile data.</p>
        );
    }

    // tool tip for the user
    const hint = !profileExists ? <p>You haven't created a profile yet.</p> : <p>Update your universal recommender data</p>;
    const editButton = profileExists ? <button>Edit</button> : <button>Create</button>;
    return (
        <article>
            <h3>Edit Your Common Profile</h3>
            {hint}
            {editButton}
        </article>
    )
}