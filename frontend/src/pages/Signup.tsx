import { useState, type SubmitEvent } from "react";
import api from "../API.tsx"

export default function Signup() {
  const [status, setStatus] = useState<string>("Creating account");


  // see login form for impl details
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    const formEntries = new FormData(e.currentTarget); 

    const username = formEntries.get("login"); 
    const pwd_1 = formEntries.get("password"); 
    const pwd_2 = formEntries.get("password_2"); 

    if (pwd_1 !== pwd_2) {
      // tell the user something wrong;
      setStatus("Passwords do not match.")
      return;
    }

    try {
      const response = await api.post("/auth/create", {
        'email': username, 
        'pwd': pwd_1
      });

      console.log(response.data);
      setStatus(`User ${response.data.email} created`);
    } catch (error: any) {
      setStatus(`Couldn't create user or user already exists!`);
    }

  };

  return (
    <div className="container">
      <h3>Create Account:</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="email"
          name="login"
          placeholder="Enter email"
          aria-label="Login" // screen reader stuff
          autoComplete="username" // enables browser suggestions
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          aria-label="Password"
          autoComplete="current-password"
          required
        />
        <input
          type="password"
          name="password_2"
          placeholder="Re-Enter password"
          aria-label="Re-Enter Password"
          autoComplete="current-password"
          required
        />
        <p>{status}</p>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  ) 
}