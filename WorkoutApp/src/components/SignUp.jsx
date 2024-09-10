import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import './SignUp.css'

function SignUp({UserLogo, PswrdLogo}) {
    const [User, setUser] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ErrorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate(); 

    async function handleSignup(e){
        e.preventDefault();
        setErrorMessage("");
        try {
          // Make API call to sign up
          const response = await fetch("http://localhost:5000/api/auth/signup", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                  username: User,
                  email: Email,
                  password: Password
              }),
          });

          if (response.ok) {
              // Redirect to home page after successful signup
              navigate("/home");
              // Reset the form only after successful sign-up
              setUser("");
              setEmail("");
              setPassword("");
          } else {
              const errorData = await response.text();
              setErrorMessage(errorData); // Set the error message
          }
        } catch (error) {
          setErrorMessage("An error occurred during sign-up.");
        }

    }

    return (
      <div className="form-container">
          <h2>SignUp</h2>
          <form onSubmit={handleSignup}>
              <div className="form-control form-control-modified">
                  <input 
                    type="text" 
                    placeholder="Enter your username"
                    onChange={(e)=>setUser(e.target.value)}
                    value={User}>
                </input>
                  <UserLogo className="icon user"/>
              </div>
              <div className="form-control form-control-modified">
                  <input 
                    type="text" 
                    placeholder="Enter your email" 
                    onChange={(e)=>setEmail(e.target.value)}
                    value={Email}>
                </input>
                  <MdEmail className="icon user"/>
              </div>
              <div className="form-control form-control-modified">
                  <input 
                    type="password" 
                    placeholder="Enter your password"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={Password}>
                  </input>
                  <PswrdLogo className="icon password" />
              </div>
              <button>Sign Up</button>
          </form>
          {ErrorMessage && <p style={{ color: "red" }}>{ErrorMessage}</p>}
          <p className="link-text" onClick={() => navigate("/signin")}>
              Already have an account? Please sign in
          </p>
      </div>
    )
  }
  
  export default SignUp