import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import solutionData from "../../content/solutions.json";

type SolutionCard = { slug: string; eyebrow: string; title: string; intro: string };

const SOLUTIONS = Object.values(solutionData as Record<string, SolutionCard>);

export function SolutionsIndexPage() {
  return (
    <div className="page page-wide feature-doc">
      <header className="page-head">
        <p className="eyebrow">Solutions</p>
        <h1>Freelancer workflows, by the job you need done.</h1>
        <p>
          Five guides to the parts of client work that freelancers and small teams handle every week: proposals,
          client records, contracts, invoices and the wider business around them.
        </p>
      </header>

      <section className="section">
        <div className="module-grid">
          {SOLUTIONS.map((item) => (
            <Link className="module-card" key={item.slug} to={`/solutions/${item.slug}`}>
              <p className="eyebrow">{item.eyebrow}</p>
              <h3>{item.title}</h3>
              <p>{item.intro}</p>
              <span className="inline">
                Read the solution <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section text-center">
        <h2>See the features behind them.</h2>
        <p className="muted">Each solution is built from the features on the features page.</p>
        <div className="hero-ctas" style={{ justifyContent: "center", marginTop: 20 }}>
          <Link to="/features" className="btn btn-primary btn-lg">
            All features
          </Link>
          <Link to="/pricing" className="btn btn-secondary btn-lg">
            See pricing
          </Link>
        </div>
      </section>
    </div>
  );
}
