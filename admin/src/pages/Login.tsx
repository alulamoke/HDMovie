import { useNavigate } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import authService from "@/services/auth.service";

import { useAppDispatch } from "@/redux/hooks";
import { setAuth } from "@/redux/features/authSlice";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/auth-schema";

import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { TCustomError } from "@/utils/types";
import localStore from "@/utils/localStore";

const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationKey: ["Login"],
    mutationFn: authService.login,
    onSuccess: (data) => {
      toast.success("Login successful.");
      localStore.authenticateUser(data.token);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      dispatch(setAuth(data.user));
      navigate("/");
    },
    onError: (e: TCustomError) => toast.error(e.response.data.message),
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) =>
    loginMutation.mutate(values);

  return (
    <>
      <SEO title="HDMovie-Login" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4 p-4"
        >
          <header className="my-8 text-center font-semibold">
            Login to HDMovie
          </header>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>* Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>* Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="lg"
            disabled={loginMutation.isPending}
            className="w-full gap-4"
          >
            {loginMutation.isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <span>Login</span>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Login;
