import React from "react";
import RegisterForm from "../../components/auth/RegistrationForm";

function RegistrationPage() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Register</h1>
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
