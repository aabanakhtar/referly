import '../App.css'

export default function Home() {
  return (
    <section className="hero">
      <div className="container">
        <hgroup style={{ textAlign: "center" }}>
          <h1>Get good recommendations. Fast.</h1>
          <p>
            Referly is an AI-powered letter of recommendation tool that makes
            LORs stress-free — for you and for whoever's writing yours.
          </p>
        </hgroup>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "2rem" }}>
          <button>Get started</button>
          <button className="secondary">See how it works</button>
        </div>
      </div>
    </section>
  );
}