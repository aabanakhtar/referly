import React from 'react';


const REQUEST_TYPES = [
  "academic",
  "job",
  "scholarship",
  "general"
];

export default function CreateRecommendationRequest() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="container">
      <article>
        <h1>New request</h1>
        <p>Tell us who this is for, and we'll ask some questions to give them more context.</p>
        <form>
          <label>
            Purpose
            <select>
              <option>Academic</option>
              <option>Job</option>
              <option>Scholarship</option>
              <option>General</option>
            </select>
          </label>

          <div style={{ display: "flex", gap: "12px" }}>
            <label style={{ flex: 1 }}>
              Recommender name
              <input type="text" placeholder="Ms. Chen" />
            </label>
            <label style={{ flex: 1 }}>
              Recommender email
              <input type="email" placeholder="chen@school.edu" />
            </label>
          </div>

          <hr />

          <p><strong>Contextual questions</strong></p>
          <p>These questions will help your recommender write a more personalized letter. Try your best to make these as personalized as possible.</p>
          <hr />
          <label>
            Describe a specific assignment, project, or research experience where you did your best work.
            <textarea rows={3} placeholder="Type your answer..." />
          </label>

          <label>
            Describe a time you went beyond what was required in a class.
            <textarea rows={3} placeholder="Type your answer..." />
          </label>

          <label>
            Describe an academic challenge you faced and how you worked through it.
            <textarea rows={3} placeholder="Type your answer..." />
          </label>

          <button type="submit">Send request</button>
        </form>
      </article>
    </div>
  );
}
