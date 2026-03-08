import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";

const Auth = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) setError(error.message);
      else navigate("/");
    } else {
      if (!displayName.trim()) {
        setError("Please enter a display name");
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, displayName.trim());
      if (error) setError(error.message);
      else setSignupSuccess(true);
    }
    setLoading(false);
  };

  if (signupSuccess) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-7xl mb-4">📧</motion.div>
        <h2 className="text-2xl font-display text-foreground mb-2 text-center">Check Your Email!</h2>
        <p className="text-muted-foreground text-center mb-6 max-w-sm">
          We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
        </p>
        <Button variant="hero" onClick={() => { setSignupSuccess(false); setIsLogin(true); }}>
          Back to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring" }}
        className="text-7xl mb-4"
      >
        🌟
      </motion.div>
      <h1 className="text-3xl font-display text-primary mb-1">Bahasa Buddy</h1>
      <p className="text-muted-foreground mb-6">
        {isLogin ? "Welcome back!" : "Create your account"}
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3">
        {!isLogin && (
          <Input
            placeholder="Display name (e.g. Ali)"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="rounded-2xl h-12"
          />
        )}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-2xl h-12"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="rounded-2xl h-12"
        />

        {error && (
          <p className="text-destructive text-sm text-center font-bold">{error}</p>
        )}

        <Button variant="hero" size="xl" className="w-full" type="submit" disabled={loading}>
          {loading ? "..." : isLogin ? "Log Masuk 🚀" : "Daftar 🎉"}
        </Button>
      </form>

      <button
        onClick={() => { setIsLogin(!isLogin); setError(""); }}
        className="mt-4 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
      </button>
    </div>
  );
};

export default Auth;
