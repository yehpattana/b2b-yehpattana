"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { apiService } from "../../config/axios/axios-interceptor";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await apiService.post("email/send", {
        to: email,
        subject: "Forgot Password?",
        body: "Hello",
      });
      if (res.status === 200) {
        setMessage("Password reset email sent successfully.");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

        {/* Success/Failure messages */}
        {message && (
          <Alert severity="success" className="mb-4">
            {message}
          </Alert>
        )}
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4"
          >
            Send Reset Link
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
