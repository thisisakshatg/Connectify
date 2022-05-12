import React from 'react';
import './FeaturedIn.css';
import img1 from '../../../assets/logos/techcrunch.png';
import img2 from '../../../assets/logos/business-insider.png';
import img3 from '../../../assets/logos/the-new-york-times.png';
import img4 from '../../../assets/logos/forbes.png';
import img5 from '../../../assets/logos/usa-today.png';

const FeaturedIn = () => {
  return (
    <section className="section-featured" id="featured">
      <div className="featuredIn">
        <h2 className="heading-secondary heading-featured">As featured in</h2>
        <div className="logos">
          <img src={img1} alt="TechCrunch Logo" />
          <img src={img2} alt="Business Insider Logo" />
          <img src={img3} alt="New York Times Logo" />
          <img src={img4} alt="forbes Logo" />
          <img src={img5} alt="Usa Today Logo" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedIn;
