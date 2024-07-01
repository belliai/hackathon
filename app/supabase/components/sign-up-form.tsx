"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/utils/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const router = useRouter();

  const supabase = createClient();

  const signupFormSchema = z.object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().min(8),
  });

  type SignUpFormValues = z.infer<typeof signupFormSchema>;

  const signUpForm = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  async function handleLoginWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: window.location.origin + "/supabase",
      },
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
      });
    } else {
      toast({
        title: "Success",
      });
    }
  }

  async function handleSignup(data: SignUpFormValues) {
    const origin = window.location.origin;

    const { data: signUpData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        // Save to auth.users metadata
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
        },
        emailRedirectTo: origin + "/supabase",
      },
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
      });
    } else {
      toast({
        title: "Success",
        description: "Check your email for the confirmation link",
      });
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={signUpForm.handleSubmit(handleSignup)}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  {...signUpForm.register("firstName")}
                />
                {signUpForm.formState.errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {signUpForm.formState.errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  {...signUpForm.register("lastName")}
                />
                {signUpForm.formState.errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {signUpForm.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...signUpForm.register("email")}
              />
              {signUpForm.formState.errors.email && (
                <p className="text-red-500 text-sm">
                  {signUpForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...signUpForm.register("password")}
              />
              {signUpForm.formState.errors.password && (
                <p className="text-red-500 text-sm">
                  {signUpForm.formState.errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={signUpForm.formState.isSubmitting}
            >
              Create an account
            </Button>
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={handleLoginWithGithub}
            >
              Sign up with GitHub
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="#" className="underline">
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
