import React from 'react';
import imgChy from '../../../assets/Chy.jpg';
import imgMel from '../../../assets/crop.jpg';
import bgVideo from '../../../assets/Video/bgVideo.mp4';
import './Testemonials.css';

const Testemonials = () => {
  return (
    <section className="section-testemonials" id="stories">
      <div className="bg-video">
        <video className="bg-video__content" autoplay="" muted="" loop="true">
          <source src={bgVideo} type="video/mp4" />
          {/* <source src="img/video.webm" type="video/webm" /> */}
          {/* Your browser is not supported! */}
        </video>
      </div>

      <div className="u-center-text u-margin-bottom-big">
        <h2 className="heading-secondary heading-testemonial--main">
          We make people genuinely happy
        </h2>
      </div>

      <div className="row">
        <div className="story">
          <figure className="story__shape">
            <img src={imgChy} alt="Person on a tour" className="story__img" />
            <figcaption className="story__caption">Chyler Leigh</figcaption>
          </figure>
          <div className="story__text">
            <h3 className="heading-tertiary u-margin-bottom-small">
              Customisable interface! Recommending everyone.
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente
              aspernatur libero repellat quis consequatur ducimus quam nisi exercitationem omnis
              earum qui. Aperiam, ipsum sapiente aspernatur libero repellat quis consequatur ducimus
              quam nisi exercitationem omnis earum qui.
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="story">
          <figure className="story__shape">
            <img src={imgMel} alt="Person on a tour" className="story__img" />
            <figcaption className="story__caption">Melissa Benoist</figcaption>
          </figure>
          <div className="story__text">
            <h3 className="heading-tertiary u-margin-bottom-small">
              No ads blew me away. Don't wait!
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente
              aspernatur libero repellat quis consequatur ducimus quam nisi exercitationem omnis
              earum qui. Aperiam, ipsum sapiente aspernatur libero repellat quis consequatur ducimus
              quam nisi exercitationem omnis earum qui.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testemonials;
