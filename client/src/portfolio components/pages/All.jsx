import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import "../All.css";

const All = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPortfolios = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API_BACKEND_URL}/portfolios/getPortfolios/${process.env.REACT_APP_ADMIN_PASS}`
        );
        const data = await response.json();
        if (data["status"] === 200) {
          setPortfolios(
            data["portfolios"].sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )
          );
        } else {
          setPortfolios([]);
        }
      } catch (e) {
        console.error("Error fetching user data:", e);
      } finally {
        setLoading(false);
      }
    };
    getPortfolios();
  }, []);

  return (
    <div className="all-portfolios">
      <h1>Discover Amazing Portfolios</h1>
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading amazing portfolios...</p>
        </div>
      ) : (
        <>
          <p className="portfolio-count">
            Showing {portfolios.length} portfolios
          </p>
          <div className="portfolio-grid">
            {portfolios.map((portfolio) => (
              <div key={portfolio._id} className="portfolio-card">
                <img
                  src={
                    portfolio.hero_url || "https://via.placeholder.com/300x200"
                  }
                  alt={portfolio.fullName}
                  className="portfolio-image"
                />
                <div className="portfolio-info">
                  <h2>{portfolio.fullName}</h2>
                  <p className="portfolio-about">
                    {portfolio.about.substring(0, 100)}...
                  </p>
                  <div className="tags">
                    {portfolio.tags.slice(0, 5).map((tag, index) => (
                      <span key={index} className="tag">
                        {tag.value}
                      </span>
                    ))}
                  </div>
                  <div className="portfolio-stats">
                    <span>{portfolio.projects.length} Projects</span>
                    <span>{portfolio.techs.length} Technologies</span>
                  </div>
                  <div className="social-links">
                    {portfolio.links.github && (
                      <a
                        href={portfolio.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub />
                      </a>
                    )}
                    {portfolio.links.linkedin && (
                      <a
                        href={portfolio.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin />
                      </a>
                    )}
                    {portfolio.links.instagram && (
                      <a
                        href={portfolio.links.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram />
                      </a>
                    )}
                  </div>
                  <Link
                    to={`/${portfolio.portfolioId}`}
                    className="view-portfolio-btn"
                  >
                    View Portfolio
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default All;
