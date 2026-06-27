import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import PasswordInput from "@/components/ui/PasswordInput";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { isFetchBaseQueryError } from "@/lib/error";

const LogInFormSchema = z.object({
  email: z.email(),
  password: z.string().min(8, { error: "Password is too short" }),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof LogInFormSchema>>({
    resolver: zodResolver(LogInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LogInFormSchema>) => {
    try {
      const res = await login(data).unwrap();

      if (res.success) {
        toast.success("Logged in successfully");
        navigate("/");
      }
    } catch (err: unknown) {
  if (isFetchBaseQueryError(err)) {
    const message = (err.data as { message?: string })?.message;

    switch (message) {
      case "Password does not match":
        toast.error("Invalid credentials");
        break;

      case "User is not verified":
        toast.error("Your account is not verified");
        navigate("/verify", { state: data.email });
        break;

      default:
        toast.error("Something went wrong");
    }
  } else {
    toast.error("Unexpected error");
  }
}
  };
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="m@example.com"
                required
              />
              <FieldDescription className="sr-only">
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <PasswordInput {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button type="submit">Login</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button variant="outline" type="button">
            <GoogleIcon />
            Login with Google
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link to={"/register"} className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
