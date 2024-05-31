import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal"; // Assume you have a Modal component
import yellowalert from "../assets/yellowalert.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.endsWith("@ust.edu.ph")) {
      setError("Please use a ust email");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstname,
          lastname,
          password,
          role: ["user"],
        }),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during registration.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div
      className="flex h-full w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://ustalumniassociation.files.wordpress.com/2020/10/ust-2.jpg?w=1200')",
      }}
    >
      <div className="container mx-auto py-4 px-4 flex items-center justify-center min-h-screen">
        <section className="rounded-xl  px-10 py-12 max-w-xl w-full">
          <div className="flex flex-col items-center justify-center mx-auto">
            <a
              href="#"
              className="flex items-center mb-6 text-3xl font-semibold text-yellow-500 "
            >
              <img className="w-10 h-10 mr-2" src={yellowalert} alt="logo" />
              YellowAlert
            </a>
            <div className="w-full bg-white rounded-lg shadow">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-l font-bold leading-tight tracking-tight md:text-2xl">
                  Create an account
                </h1>
                {error && <p className="text-red-500">{error}</p>}
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      placeholder="First Name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      placeholder="Last Name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        required
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
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirm-password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        required
                      />
                      <span
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      >
                        <FontAwesomeIcon
                          icon={showConfirmPassword ? faEye : faEyeSlash}
                          style={{ color: "black" }}
                        />
                      </span>
                    </div>
                  </div>
                  {error && <div className="text-red-500 text-sm">{error}</div>}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="terms"
                        className="font-light text-gray-500 dark:text-gray-300"
                      >
                        I accept the{" "}
                        <button
                          type="button"
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                          onClick={() => setShowTerms(true)}
                        >
                          Terms and Conditions
                        </button>
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Register
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login here
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      {showTerms && (
        <Modal onClose={() => setShowTerms(false)}>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
            <p className="mb-4">
              Welcome to our application. By using our services, you agree to
              the following terms and conditions:
            </p>
            <h3 className="text-xl font-semibold mb-2">1. User Account</h3>
            <p className="mb-4">
              You are responsible for maintaining the confidentiality of your
              account and password and for restricting access to your computer.
              You agree to accept responsibility for all activities that occur
              under your account or password.
            </p>
            <h3 className="text-xl font-semibold mb-2">2. Privacy</h3>
            <p className="mb-4">
              Your privacy is important to us. We will not share or sell your
              personal information to third parties without your consent. Our
              privacy policy outlines how your information is collected and
              used.
            </p>
            <h3 className="text-xl font-semibold mb-2">3. Use of Service</h3>
            <p className="mb-4">
              You agree not to use the service for any unlawful purpose or in
              any way that might harm, damage, or disparage any other party. You
              must not use the service to transmit any harmful or illegal
              content.
            </p>
            <h3 className="text-xl font-semibold mb-2">4. Termination</h3>
            <p className="mb-4">
              We reserve the right to terminate or suspend your account and
              access to the service at our sole discretion, without prior notice
              or liability, for any reason whatsoever, including but not limited
              to a breach of the terms.
            </p>
            <h3 className="text-xl font-semibold mb-2">5. Changes to Terms</h3>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. Any
              changes will be posted on this page, and your continued use of the
              service after such changes have been made constitutes your
              acceptance of the new terms.
            </p>
            <button
              onClick={() => setShowTerms(false)}
              className="mt-4 w-full text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Register;
