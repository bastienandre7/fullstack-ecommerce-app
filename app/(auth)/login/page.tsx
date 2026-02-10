"use client"; // On passe en client pour gérer l'état local

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { signIn } from "next-auth/react"; // Utilisation de la version client
import Image from "next/image";
import { useState } from "react";

export default function SignInPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("resend", {
        email: email,
        redirect: false,
      });

      if (result?.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-6">
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[380px]">
        {/* Header dynamique */}
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-medium tracking-tight text-black">
            {isSubmitted ? "Check your inbox" : "Welcome back"}
          </h1>
          <p className="text-sm text-gray-500">
            {isSubmitted
              ? `We've sent a magic link to ${email}`
              : "Log in to your account to manage orders."}
          </p>
        </div>

        {!isSubmitted ? (
          <div className="grid gap-6">
            {/* Social Auth */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => signIn("google")}
                className="w-full rounded-full border-gray-200 hover:bg-gray-50 font-medium text-xs uppercase tracking-widest py-6 gap-2"
              >
                <Image
                  src="/svg/google-icon.svg"
                  alt="Google"
                  width={16}
                  height={16}
                />
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => signIn("apple")}
                className="w-full rounded-full border-gray-200 hover:bg-gray-50 font-medium text-xs uppercase tracking-widest py-6 gap-2"
              >
                <Image
                  src="/svg/apple-logo.svg"
                  alt="Apple"
                  width={16}
                  height={16}
                />
                Apple
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                <span className="bg-white px-4 text-gray-400">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Magic Link Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email" // Ajouté
                  name="email" // Ajouté
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  disabled={isLoading}
                  autoComplete="email" // LA CLÉ : indique au navigateur de suggérer les emails
                  className="pl-11 h-12 rounded-full border-gray-200 bg-gray-50/50 focus:bg-white transition-all"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-full bg-black text-white hover:bg-black/90 font-bold uppercase tracking-widest text-[11px]"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Send Magic Link"
                )}
              </Button>
            </form>
          </div>
        ) : (
          /* SUCCESS STATE - Évite la page moche de NextAuth */
          <div className="flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-500">
            <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-black" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 text-center">
              Awaiting verification
            </p>
            <Button
              variant="link"
              onClick={() => setIsSubmitted(false)}
              className="text-xs text-gray-400 hover:text-black transition-colors"
            >
              Entered wrong email? Try again
            </Button>
          </div>
        )}

        <p className="px-8 text-center text-[11px] leading-relaxed text-gray-400">
          By continuing, you agree to our{" "}
          <a href="#" className="text-black underline underline-offset-4">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-black underline underline-offset-4">
            Privacy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
