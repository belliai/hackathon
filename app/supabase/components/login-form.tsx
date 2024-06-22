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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

export function LoginForm() {
  const [loginMode, setLoginMode] = useState<"password" | "magic-link">(
    "password"
  );

  const router = useRouter();

  const supabase = createClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().optional(),
  });

  type LoginFormValues = z.infer<typeof loginFormSchema>;

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLoginPassword(data: LoginFormValues) {
    if (!data.password || data.password.length <= 6) {
      loginForm.setError("password", {
        type: "manual",
        message: "Password is required with at least 6 characters.",
      });

      return;
    }

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password!,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
      });
    } else {
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
    }

    router.refresh();
  }

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
      console.log("data", data);

      toast({
        title: "Success",
      });
    }
  }

  async function handleLoginMagicLink(data: LoginFormValues) {
    const origin = window.location.origin;

    const { data: authData, error } = await supabase.auth.signInWithOtp({
      email: data.email,
      options: {
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
        description: "Magic link sent to " + data.email,
      });
    }

    router.refresh();
  }

  async function handleSubmitLogin(data: LoginFormValues) {
    if (loginMode === "magic-link") {
      await handleLoginMagicLink(data);
    } else {
      await handleLoginPassword(data);
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="password"
          className="mb-4 w-full"
          value={loginMode}
          onValueChange={(value) =>
            setLoginMode(value as "password" | "magic-link")
          }
        >
          <TabsList className="w-full">
            <TabsTrigger value="password" className="w-full">
              With Password
            </TabsTrigger>
            <TabsTrigger value="magic-link" className="w-full">
              Magic Link
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <form onSubmit={loginForm.handleSubmit(handleSubmitLogin)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...loginForm.register("email")}
                id="email"
                type="email"
                placeholder="m@example.com"
              />
              {loginForm.formState.errors.email && (
                <p className="text-red-500 text-sm">
                  {loginForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              {loginMode === "password" && (
                <>
                  <Input
                    id="password"
                    type="password"
                    {...loginForm.register("password")}
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-red-500 text-sm">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loginForm.formState.isSubmitting}
            >
              Login
            </Button>
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={handleLoginWithGithub}
            >
              Login with Github
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
