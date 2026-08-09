"use client";
import React, { useEffect, useRef, useState, FormEvent } from "react";
import { User, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

// Vertex shader source code
const vertexSmokeySource = `
  attribute vec4 a_position;
  void main() {
    gl_Position = a_position;
  }
`;

// Fragment shader source code for the smokey background effect
const fragmentSmokeySource = `
precision mediump float;

uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform vec3 u_color;

void mainImage(out vec4 fragColor, in vec2 fragCoord){
    vec2 uv = fragCoord / iResolution;
    vec2 centeredUV = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);

    float time = iTime * 0.5;

    // Normalize mouse input (0.0 - 1.0) and remap to -1.0 ~ 1.0
    vec2 mouse = iMouse / iResolution;
    vec2 rippleCenter = 2.0 * mouse - 1.0;

    vec2 distortion = centeredUV;
    // Apply distortion for a wavy, smokey effect
    for (float i = 1.0; i < 8.0; i++) {
        distortion.x += 0.5 / i * cos(i * 2.0 * distortion.y + time + rippleCenter.x * 3.1415);
        distortion.y += 0.5 / i * cos(i * 2.0 * distortion.x + time + rippleCenter.y * 3.1415);
    }

    // Create a glowing wave pattern
    float wave = abs(sin(distortion.x + distortion.y + time));
    float glow = smoothstep(0.9, 0.2, wave);

    fragColor = vec4(u_color * glow, 1.0);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

/**
 * Valid blur sizes supported by Tailwind CSS.
 */
type BlurSize = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

/**
 * Props for the SmokeyBackground component.
 */
interface SmokeyBackgroundProps {
  backdropBlurAmount?: string;
  color?: string;
  className?: string;
}

/**
 * A mapping from blur size names to Tailwind CSS classes.
 */
const blurClassMap: Record<BlurSize, string> = {
  none: "backdrop-blur-none",
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
  "2xl": "backdrop-blur-2xl",
  "3xl": "backdrop-blur-3xl",
};

/**
 * A React component that renders a smooth, passive WebGL shader background.
 */
export function SmokeyBackground({
  backdropBlurAmount = "sm",
  color = "#00ffff", // Sarvi AI Cyan Accent
  className = "",
}: SmokeyBackgroundProps): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Helper to convert hex color to RGB (0-1 range)
  const hexToRgb = (hex: string): [number, number, number] => {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
    return [isNaN(r) ? 0 : r, isNaN(g) ? 1 : g, isNaN(b) ? 1 : b];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const compileShader = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSmokeySource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSmokeySource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
    const iTimeLocation = gl.getUniformLocation(program, "iTime");
    const iMouseLocation = gl.getUniformLocation(program, "iMouse");
    const uColorLocation = gl.getUniformLocation(program, "u_color");

    let startTime = Date.now();
    let animationFrameId: number;

    const [r, g, b] = hexToRgb(color);
    gl.uniform3f(uColorLocation, r, g, b);

    const render = () => {
      if (!canvas) return;
      const width = canvas.clientWidth || 300;
      const height = canvas.clientHeight || 300;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);

      const currentTime = (Date.now() - startTime) / 1000;

      gl.uniform2f(iResolutionLocation, width, height);
      gl.uniform1f(iTimeLocation, currentTime);
      gl.uniform2f(iMouseLocation, width / 2, height / 2);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [color]);

  const finalBlurClass = blurClassMap[backdropBlurAmount as BlurSize] || blurClassMap["sm"];

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className={`absolute inset-0 ${finalBlurClass} pointer-events-none`}></div>
    </div>
  );
}

interface LoginFormProps {
  onSuccess?: (user: { name: string; email: string }) => void;
  className?: string;
}

/**
 * A glassmorphism-style login form component with animated floating labels and Google login.
 */
export function LoginForm({ onSuccess, className = "" }: LoginFormProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const isAdminRoute = typeof window !== 'undefined' && window.location.pathname === '/admin';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (isForgotPassword) {
      if (!email) {
        setError("Please enter your email address.");
        return;
      }

      setIsLoading(true);
      try {
        const normalizedEmail = email.toLowerCase().trim();
        const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
          redirectTo: getSupabaseRedirectUrl('/login'),
        });

        if (error) throw error;

        setSuccessMessage("Password reset instructions have been sent to your email. Please check your inbox and spam folder.");
      } catch (err: any) {
        setError(err?.message || "Unable to send reset email.");
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (isSignUp && !name) {
      setError("Please enter your name.");
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();
    const isAdminLogin = normalizedEmail === 'admin@sarvi.ai';
    const adminPassword = 'Admin@123';

    if (isAdminLogin && password !== adminPassword) {
      setError('Invalid admin credentials.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const isAdmin = isAdminLogin && password === adminPassword;
      const user = {
        name: isAdmin ? 'Admin' : (isSignUp ? name : (email.split("@")[0] || "User")),
        email: email,
        role: isAdmin ? 'admin' : 'user' as const,
      };
      if (onSuccess) {
        onSuccess(user);
      }
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setError("Google sign-in is currently unavailable for this project. Please use email and password to continue.");
    setIsLoading(false);
  };

  return (
    <div className={`w-full max-w-sm p-8 space-y-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/15 shadow-[0_0_50px_rgba(0,255,255,0.15)] relative z-10 ${className}`}>
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          {isForgotPassword
            ? "Reset Password"
            : isSignUp
              ? "Create Account"
              : isAdminRoute
                ? "Admin Login"
                : "Welcome Back"}
        </h2>
        <p className="mt-2 text-xs text-gray-300 tracking-wide">
          {isForgotPassword
            ? "Enter your email and we’ll send a secure reset link to your inbox."
            : isSignUp
              ? "Join Sarvi AI for a safe, empathetic space"
              : isAdminRoute
                ? "Use your admin credentials to access the admin control panel."
                : "Sign in to continue to Sarvi AI"}
        </p>
      </div>

      {error && (
        <div className="p-3 text-xs bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="p-3 text-xs bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-lg">
          {successMessage}
        </div>
      )}

      {!isSignUp && (
        <div className="p-3 text-xs bg-white/5 border border-white/10 text-gray-300 rounded-2xl">
          {isAdminRoute
            ? 'Enter admin credentials here to reach the admin panel after login.'
            : 'Admin users can sign in here using the same login form with their admin credentials to access the admin panel.'}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input for Sign Up */}
        {isSignUp && (
          <div className="relative z-0">
            <input
              type="text"
              id="floating_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-[#00ffff] peer"
              placeholder=" "
              required={isSignUp}
            />
            <label
              htmlFor="floating_name"
              className="absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#00ffff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              <User className="inline-block mr-2 -mt-1" size={16} />
              Full Name
            </label>
          </div>
        )}

        {/* Email Input with Animated Label */}
        <div className="relative z-0">
          <input
            type="email"
            id="floating_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-[#00ffff] peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#00ffff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            <User className="inline-block mr-2 -mt-1" size={16} />
            Email Address
          </label>
        </div>

        {!isForgotPassword && (
          <div className="relative z-0">
            <input
              type={showPassword ? "text" : "password"}
              id="floating_password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-[#00ffff] peer pr-8"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_password"
              className="absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#00ffff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              <Lock className="inline-block mr-2 -mt-1" size={16} />
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-3 text-gray-400 hover:text-white transition"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        )}

        {!isForgotPassword && !isSignUp && !isAdminRoute && (
          <div className="flex justify-end -mt-2">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsForgotPassword(true);
                setError("");
                setSuccessMessage("");
              }}
              className="text-xs text-gray-300 hover:text-[#00ffff] transition"
            >
              Forgot Password?
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="group w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-[#00ffff] to-[#0077ff] hover:from-[#00e6e6] hover:to-[#0066ee] rounded-lg text-black font-bold text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#00ffff] transition-all duration-300 cursor-pointer disabled:opacity-50 shadow-[0_0_20px_rgba(0,255,255,0.3)]"
        >
          {isLoading ? (
            <span>{isForgotPassword ? "Sending..." : "Connecting..."}</span>
          ) : (
            <>
              <span>{isForgotPassword ? "Send Reset Link" : isSignUp ? "Sign Up" : "Sign In"}</span>
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        {/* Divider */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-gray-400/30"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-[10px] tracking-wider uppercase">OR CONTINUE WITH</span>
          <div className="flex-grow border-t border-gray-400/30"></div>
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => handleSocialSignIn('google')}
            disabled={isLoading}
            className="w-full flex items-center justify-center py-2.5 px-4 bg-white/90 hover:bg-white rounded-lg text-gray-900 font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#00ffff] transition-all duration-300 cursor-pointer"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 8.841C34.553 4.806 29.613 2.5 24 2.5C11.983 2.5 2.5 11.983 2.5 24s9.483 21.5 21.5 21.5S45.5 36.017 45.5 24c0-1.538-.135-3.022-.389-4.417z"></path>
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12.5 24 12.5c3.059 0 5.842 1.154 7.961 3.039l5.839-5.841C34.553 4.806 29.613 2.5 24 2.5C16.318 2.5 9.642 6.723 6.306 14.691z"></path>
              <path fill="#4CAF50" d="M24 45.5c5.613 0 10.553-2.306 14.802-6.341l-5.839-5.841C30.842 35.846 27.059 38 24 38c-5.039 0-9.345-2.608-11.124-6.481l-6.571 4.819C9.642 41.277 16.318 45.5 24 45.5z"></path>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l5.839 5.841C44.196 35.123 45.5 29.837 45.5 24c0-1.538-.135-3.022-.389-4.417z"></path>
            </svg>
            Continue with Google
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignIn('facebook')}
            disabled={isLoading}
            className="w-full flex items-center justify-center py-2.5 px-4 bg-[#1877F2] hover:bg-[#166FE5] rounded-lg text-white font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#00ffff] transition-all duration-300 cursor-pointer"
          >
            <Facebook className="w-4 h-4 mr-2" />
            Continue with Facebook
          </button>
        </div>
      </form>

      <p className="text-center text-xs text-gray-300">
        {isForgotPassword ? (
          <>
            Remembered your password?{" "}
            <button
              type="button"
              onClick={() => {
                setIsForgotPassword(false);
                setError("");
                setSuccessMessage("");
              }}
              className="font-semibold text-[#00ffff] hover:underline transition cursor-pointer ml-1"
            >
              Back to Sign In
            </button>
          </>
        ) : (
          <>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setIsForgotPassword(false);
                setError("");
                setSuccessMessage("");
              }}
              className="font-semibold text-[#00ffff] hover:underline transition cursor-pointer ml-1"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </>
        )}
      </p>
    </div>
  );
}
