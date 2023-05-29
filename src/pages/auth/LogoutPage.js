import React from "react";
import LogoutForm from "../../components/auth/LogoutForm";

function LogoutPage() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center">Please, logout here:</h1>
              <LogoutForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutPage;
