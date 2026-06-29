import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  // FieldDescription,
  FieldError,
  // FieldGroup,
  // FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { isFetchBaseQueryError } from "@/lib/error";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
// import { Dot } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state);
  const [confirmed, setConfirmed] = useState(false);
  const [sendOtp,{ isLoading: isSendingOtp }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();
  const [timer, setTimer] = useState(120);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleSendOtp = async () => {
    const toastId = toast.loading("Sending OTP");

    try {
      const res = await sendOtp({ email: email }).unwrap();

      if (res.success) {
        toast.success("OTP Sent", { id: toastId });
        setConfirmed(true);
        setTimer(120);
      }
    } catch (err: unknown) {
          if (isFetchBaseQueryError(err)) {
            const message = (err.data as { message?: string })?.message;
           toast.error(message,{ id: toastId });
          } else {
            toast.error("Unexpected error",{ id: toastId });
          }
        }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const toastId = toast.loading("Verifying OTP");
    const userInfo = {
      email,
      otp: data.pin,
    };

    try {
      const res = await verifyOtp(userInfo).unwrap();
      if (res.success) {
        toast.success("OTP Verified", { id: toastId });
        setConfirmed(true);
        navigate("/login")
      }
    } catch (err: unknown) {
          if (isFetchBaseQueryError(err)) {
            const message = (err.data as { message?: string })?.message;
           toast.error(message,{ id: toastId });
          } else {
            toast.error("Unexpected error",{ id: toastId });
          }
        }
  };

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (!email || !confirmed) {
      return;
    }

    const timerId = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      console.log("Tick");
    }, 1000);

    return () => clearInterval(timerId);
  }, [email, confirmed]);
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
  <Card className="w-full max-w-md">
    {!confirmed ? (
      <>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            Verify your email address
          </CardTitle>

          <CardDescription>
            We will send a verification code to
            <br />
            <span className="font-medium text-foreground">{email}</span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button onClick={handleSendOtp} className="w-full" disabled={isSendingOtp}>
            Send OTP
          </Button>
        </CardContent>
      </>
    ) : (
      <>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            Verify your email address
          </CardTitle>

          <CardDescription>
            Enter the 6-digit code sent to
            <br />
            <span className="font-medium text-foreground">{email}</span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="otp-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <Controller
              name="pin"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex justify-center">
                    <InputOTP
                      id="pin"
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>

                      <InputOTPSeparator />

                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <div className="mt-4 text-center">
                    <Button
                      type="button"
                      variant="link"
                      onClick={handleSendOtp}
                     disabled={timer > 0 || isSendingOtp}
                      
                    >
                      Resend OTP
                    </Button>

                    {timer > 0 && (
                      <p className="text-sm text-muted-foreground">
                        Resend available in {timer}s
                      </p>
                    )}
                  </div>

                  {fieldState.invalid && (
                    <div className="mt-2">
                      <FieldError errors={[fieldState.error]} />
                    </div>
                  )}
                </Field>
              )}
            />

            <Button type="submit" className="w-full"  disabled={isVerifyingOtp}>
              Verify OTP
            </Button>
          </form>
        </CardContent>
      </>
    )}
  </Card>
</div>
  );
}
