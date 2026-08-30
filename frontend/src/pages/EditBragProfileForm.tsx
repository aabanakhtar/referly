import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../API";

// keyof required for indexing
const FIELDS: { name: keyof BragProfile; question: string; placeholder: string } []= [
  {
    name: "bio",
    question:
      "Give a quick intro — who are you, what do you care about, what should a recommender know about you before anything else?",
    placeholder: "Start wherever feels natural...",
  },
  {
    name: "proudest_achievement",
    question: "What's something you're genuinely proud of?",
    placeholder: "Doesn't have to be a big trophy moment...",
  },
  {
    name: "leadership_example",
    question:
      "Describe a time you led, organized, or took initiative — even informally, even if 'leader' wasn't your title.",
    placeholder: "Think broadly about what counts as leadership...",
  },
  {
    name: "challenge_overcome",
    question:
      "Describe a real challenge you faced and how you worked through it. What did it teach you?",
    placeholder: "What did you learn from it?",
  },
];

interface BragProfile {
  bio: string | null | undefined;
  proudest_achievement: string | null; 
  leadership_example: string | null; 
  challenge_overcome: string | null; 
};

export default function EditBragProfileForm() {
  const navigate = useNavigate();

  const [responses, setResponses] = useState<BragProfile>({
    bio: "",
    proudest_achievement: "",
    leadership_example: "",
    challenge_overcome: "",
  });
  const [error, setError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.put("/profile/", responses);
      navigate("/dash");
    } catch (error) {
      console.error("Failed to save profile:", error);
      setError(true);
    }
  };

  // to preload the textboxes with the user's previous responses, if they exist
  useEffect(() => {
    const retrieveData = async () => {
      try {
        const data = await api.get("/profile/");
        setResponses(data.data);
      } catch (err: any) {
        if (err.response?.status !== 404) {
          setError(true);
        }
      }
    };

    retrieveData();
  }, []);

  // create the form
  const form = error ? (
    <p>Cannot load profile.</p>
  ) : (
    <div>
      <form onSubmit={handleSubmit}>
        {FIELDS.map((field) => (
          <div key={field.name}>
            <label>
              {field.question}
              <textarea
                name={field.name}
                maxLength={500}
                placeholder={field.placeholder}
                rows={4}
                value={responses[field.name] ?? ""}
                // when change update response values
                onChange={(e) =>
                  setResponses((prev) => ({ ...prev, [field.name]: e.target.value }))
                }
              />
            </label>
            <p role="alert" style={{ fontSize: "14px" }}>
              Each response should be under 500 characters.
            </p>
          </div>
        ))}

        <button type="submit">Save profile and Exit</button>
      </form>
    </div>
  );

  return (
    <div className="container">
      <article>
        <button onClick={() => navigate("/dash")}>Return to Dashboard</button>
        <p> </p>
        <h2>Edit common profile</h2>
        <p>
          Every recommender needs to understand what makes you... you. So
          let's get it down on paper: the wins you're proud of, the
          challenges you pushed through, the stuff that's easy to forget when
          you're staring at a blank page.
        </p>
        <p>
          This is your <strong>common profile</strong> — make it count.
        </p>
        {form}
      </article>
    </div>
  );
}