
import React from "react";
import { Mail, MapPin, Phone, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add actual form handling logic
    alert("Form submitted!");
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center bg-light py-5">
      <div className="card shadow-lg w-100">
        <div className="card-body text-center p-4">
          <h1 className="card-title text-primary mb-3">Contact Us</h1>
          <p className="text-secondary">We’d love to hear from you.</p>

          <div className="row mt-4 g-4">
            {/* Contact Info */}
            <div className="col-md-5 text-start text-primary">
              <div className="border p-4 rounded h-100">
                <div className="d-flex align-items-center mb-3">
                  <MapPin className="me-2" />
                  <span>1234 Sunbeam Infotech, Karad, Maharashtra 415110</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <Phone className="me-2" />
                  <span>(123) 456-7890 (Mon–Sat: 9AM – 6PM)</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <Mail className="me-2" />
                  <span>hello@edac.com</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-md-7 text-start text-primary">
              <div className="border p-4 rounded h-100 align-items-left">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 row align-items-center">
                    <label htmlFor="name" className="col-sm-4 col-form-label">
                      Your Name : 
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        required
                        placeholder="Your Name"
                      />
                    </div>
                  </div>

                  <div className="mb-3 row align-items-center">
                    <label htmlFor="email" className="col-sm-4 col-form-label">
                      Your Email : 
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        required
                        placeholder="name@gmail.com"
                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label
                      htmlFor="message"
                      className="col-sm-4 col-form-label"
                    >
                      Your Message : 
                    </label>
                    <div className="col-sm-8">
                      <textarea
                        id="message"
                        className="form-control"
                        rows="4"
                        required
                        placeholder="Tell us how we can help..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ cursor: "pointer" }}
                    >
                      Connect me
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <hr className="my-4" />

          {/* Social Links */}
          <p className="text-secondary mb-2">Follow us</p>
          <div className="d-flex justify-content-center gap-3 text-primary">
            <Link to="#" aria-label="LinkedIn" className="hover-opacity">
              <Linkedin />
            </Link>
          </div>

          <p className="small mt-4 text-secondary">
            Need help fast? DM us on social.
          </p>
        </div>
      </div>

      {/* Optional custom style */}
      <style>{`
        .hover-opacity:hover {
          opacity: 0.7;
          transition: opacity 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
