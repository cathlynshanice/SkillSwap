// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// import { supabase } from "@/lib/SupabaseClient";

// export default function SignupPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (!email.toLowerCase().endsWith("@binus.ac.id")) {
//       setError("Only @binus.ac.id emails are allowed.");
//       return;
//     }

//     const { error } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     if (error) {
//       setError(error.message);
//     } else {
//       alert("Check your BINUS email for verification link.");
//       router.push("/login");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-white">
//       <div className="flex flex-col justify-center px-10 w-full max-w-md mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">
//           Join SkillSwap 🚀
//         </h1>
//         <p className="text-gray-600 mb-6">
//           Create an account with your verified <strong>@binus.ac.id</strong>{" "}
//           email.
//         </p>

//         <form onSubmit={handleSignup} className="flex flex-col gap-4">
//           <input
//             type="email"
//             placeholder="BINUS Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="password"
//             placeholder="Password (min. 6 chars)"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <button
//             type="submit"
//             className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
//           >
//             Sign Up
//           </button>
//         </form>

//         <p className="text-center text-gray-600 text-sm mt-6">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-600 hover:underline">
//             Log In
//           </a>
//         </p>
//       </div>

//       <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
//         <img
//           src="/auth-illustration.svg"
//           alt="Signup Illustration"
//           className="w-3/4"
//         />
//       </div>
//     </div>
//   );
// }
