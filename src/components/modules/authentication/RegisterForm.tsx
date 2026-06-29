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
import GoogleIcon from "@/assets/icons/GoogleIcon";
import { Link, useNavigate } from "react-router";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInputValidator from "@/components/ui/PasswordInputValidator";
import PasswordInput from "@/components/ui/PasswordInput";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

const RegisterFormSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        error: "Name is too short",
      })
      .max(50),
    email: z.email(),
    password: z.string().min(8, { error: "Password is too short" }),
    confirmPassword: z
      .string()
      .min(8, { error: "Confirm Password is too short" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

const [register]=useRegisterMutation()
const navigate = useNavigate()

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterFormSchema>) => {
    console.log(data);
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const result = await register(userInfo).unwrap();
      console.log(result);
      toast.success("User created successfully");
      navigate("/verify", { state: data.email });
    } catch (error) {
      console.error(error);
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
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rg-name">Full Name</FieldLabel>
              <Input
                {...field}
                id="form-rg-name"
                type="text"
                aria-invalid={fieldState.invalid}
                placeholder="John Doe"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rg-email">Email</FieldLabel>
              <Input
                {...field}
                id="form-rg-email"
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
              <FieldLabel htmlFor="form-rg-password">Password</FieldLabel>
              {/* <Input
                {...field}
                id="form-rg-password"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="********"
                required
              /> */}
              <PasswordInputValidator {...field}/>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rg-confirmPassword">
                Confirm Password
              </FieldLabel>
              <PasswordInput {...field}/>
              <FieldDescription>Please confirm your password.</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button type="submit">Create Account</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button variant="outline" type="button">
            <GoogleIcon />
            Sign up with Google
          </Button>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link to={"/login"}>Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
