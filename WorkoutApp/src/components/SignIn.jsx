import { useState } from "react"
import { useNavigate } from "react-router-dom";
import './SignIn.css'

function SignIn({UserLogo, PswrdLogo}) {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ErrorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate(); 

    async function handleSignin(e){
        e.preventDefault();
        setErrorMessage("");
        try {
            // Make API call to sign in
            const response = await fetch("http://localhost:5000/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: Email,
                    password: Password
                }),
            });

            if (response.ok) {
                navigate("/home");
            } else {
                const errorData = await response.text();
                setErrorMessage(errorData); // Set the error message
            }
        } catch (error) {
            setErrorMessage("An error occurred during sign-in." + error.ErrorMessage);
        }

        setEmail("");
        setPassword("");
    }
  return (
    <div className="signin-background">
        {/* Juggling Workout Header */}
        <header className="juggling-header">
            <h1 className="juggling-text">| Log your workouts |</h1>
            <h1 className="juggling-text">Track progress...</h1>
            <h1 className="juggling-text">Stay motivated!</h1>
        </header>
        
        {/* Login Form */}
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSignin}>
                <div className="form-control">
                    <input 
                        type="text" 
                        placeholder="Enter your email" 
                        onChange={(e)=>setEmail(e.target.value)}
                        value={Email}>
                    </input>
                    <UserLogo className="icon user"/>
                </div>
                <div className="form-control">
                    <input 
                        type="password" 
                        placeholder="Enter your password" 
                        onChange={(e)=>setPassword(e.target.value)}
                        value={Password}>
                    </input>
                    <PswrdLogo className="icon password" />
                </div>
                <button >Sign In</button>
            </form>
            {ErrorMessage && <p style={{ color: "red" }}>{ErrorMessage}</p>}
            <p className="link-text" onClick={() => navigate("/signup")}>
                Don't have account please signup
            </p>
        </div>
    </div>
  )
}

export default SignIn