import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="new_footer_area bg_color">
        <div className="new_footer_top">
          <div className="container">
            <div className="row">
              <div
                className="col-lg-3 col-md-6"
                style={{ marginLeft: "550px" }}
              >
                <div
                  className="f_widget social-widget pl_70 wow fadeInLeft"
                  data-wow-delay="0.8s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.8s",
                    animationName: "fadeInLeft"
                  }}
                >
                  <div className="f_social_icon">
                    <a href="/" className="fab fa-facebook">
                      <FacebookIcon />
                    </a>
                    <a href="/" className="fab fa-twitter">
                      <InstagramIcon />
                    </a>
                    <a href="/" className="fab fa-linkedin">
                      <TelegramIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer_bg">
            <div className="footer_bg_one" />
            <div className="footer_bg_two" />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
