import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import {jwtDecode} from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ReCAPTCHA from "react-google-recaptcha";

// Define an interface for the JWT payload
interface JwtPayload {
  roles: string[];
  [key: string]: any; // Allow other properties
}

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    if (attempts >= 3) {
      setIsDisabled(true);
      setError("Too many attempts. Please try again after 1 minute.");
      const timer = setTimeout(() => {
        setIsDisabled(false);
        setAttempts(0);
        setError("");
      }, 60000); // 1 minute
      return () => clearTimeout(timer);
    }
  }, [attempts]);

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaValue) {
      setError("Please complete the CAPTCHA");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, captchaValue }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const decodedToken = jwtDecode<JwtPayload>(token);
        login(token); // Call login function from context
        const userRole = decodedToken.roles?.[0];
        if (userRole === "ROLE_ADMIN") {
          navigate("/admin");
        } else if (userRole === "ROLE_USER") {
          navigate("/");
        }
      } else {
        setAttempts((prev) => prev + 1);
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError("An error occurred during login.");
      console.error("Login error:", error);
    }
  };

  return (
    <div
      className="flex h-full w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('https://ustalumniassociation.files.wordpress.com/2020/10/ust-2.jpg?w=1200')",
      }}
    >
      <div className="container mx-auto py-4 px-4 flex items-center justify-center min-h-screen">
        <section className="rounded-xl bg-gray-600 bg-opacity-50 px-10 py-12 shadow-lg backdrop-blur-md max-w-xl w-full">
          <div className="flex flex-col items-center justify-center mx-auto">
            <a href="#" className="flex items-center mb-6 text-3xl font-bold">
              <img
                className="w-8 h-8 mr-2"
                src="https://media.discordapp.net/attachments/1216948674119205025/1231642921552314488/Copy_of_Blue_and_White_Project_Proposal_-_Presentation-removebg-preview.png?ex=664ad19b&is=6649801b&hm=0810b0a962e79b72006f3c266dac9b82309ccff3d65f2c88d6eb1bda280dd10a&=&format=webp&quality=lossless"
                alt="logo"
              />
              Risk Forms Login
            </a>
            <div className="w-full bg-white rounded-lg shadow">
              <div className="p-6 space-y-4 sm:p-8">
                <h1 className="text-l font-bold leading-tight tracking-tight md:text-2xl">
                  Sign in to your account
                </h1>
                {error && <p className="text-red-500">{error}</p>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="user@gmail.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        required
                        disabled={isDisabled}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEye : faEyeSlash}
                          style={{ color: "black" }}
                        />
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-gray-500">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <ReCAPTCHA
                    sitekey="6LdqSOIpAAAAABh9QlokKcKE3OdJLFslH9M5alo2"
                    onChange={handleCaptchaChange}
                  />
                  <button
                    type="submit"
                    className="w-full text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    disabled={isDisabled}
                  >
                    Log in
                  </button>
                  <p className="text-sm font-light text-gray-500">
                    Don’t have an account yet?{" "}
                    <a href="/register" className="font-medium text-primary-600 hover:underline">
                      Sign up
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
