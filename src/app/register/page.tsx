"use client";

import { ModeToggle } from "@/components/global/ThemeButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputPassword from "@/components/ui/password-input";
import { customToaster } from "@/lib/customToaster";
import { ChevronLeft, EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { AnimatePresence, motion } from "motion/react";
import {
    AuthRegisterMutationBody,
    useAuthLogin,
    useAuthRegister,
} from "@/api/generated/auth/auth";
import { AuthLoginBody, AuthRegisterBody } from "@/api/schemas";
import { authRegisterBody } from "@/api/generated/zod/auth/auth.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorAdviseContainer } from "@/components/global/ErrorAdviseContainer";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { ApiErrorNavigator } from "@/components/global/ApiErrorContainer";
import CarrouselBanner from "@/components/auth/carrousel-banner";

export const LoginPage = () => {
    const [apiErrors, setApiErrors] = useState<Record<string, string[]> | null>(
        null,
    );

    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
        clearErrors,
        control,
    } = useForm<AuthRegisterBody>({
        resolver: zodResolver(authRegisterBody),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role_id: "019b0fd2-cbae-7077-9f73-0797140c6df3",
        },
    });

    const { mutate, isPending } = useAuthRegister();

    const handleRegister: SubmitHandler<AuthRegisterBody> = (data) => {
        clearErrors();
        setApiErrors(null);

        mutate(
            { data },
            {
                onSuccess: (response) => {
                    customToaster.success(response.message);
                },
                onError: (apiError) => {
                    const responseData = apiError.response?.data;
                    if (responseData?.data) {
                        setApiErrors(responseData.data);
                    }
                    else if (responseData?.message) {
                        customToaster.error(responseData.message);
                    }
                },
            },
        );
    };

    return (
        <AnimatePresence>
            <motion.main
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                    transition: { duration: 1 },
                }}
                exit={{
                    opacity: 0,
                }}
                className="flex w-screen h-screen"
            >
                <section className="flex flex-col items-center justify-center flex-1 gap-8 relative md:m-6 m-4">
                    <div className="absolute text-primary-foreground left-0 top-0 w-10 h-10 bg-primary flex items-center justify-center rounded-md hover:bg-primary/70 cursor-pointer">
                        <ChevronLeft />
                    </div>
                    <Image width={100} height={100} src={"/images/logo.png"} alt="logo" />
                    <h3 className="text-2xl font-bold text-primary">Welcome!</h3>
                    <form
                        onSubmit={handleSubmit(handleRegister)}
                        className="md:w-[450px] w-full flex flex-col gap-4 text-center"
                    >
                        <ApiErrorNavigator errors={apiErrors} />
                        <ErrorAdviseContainer
                            errors={errors}
                            excludeFields={["password"]}
                        />
                        <div className="flex flex-col gap-2">
                            <Label>Name</Label>
                            <Input {...register("name")} placeholder="John Smith" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>E-mail</Label>
                            <Input {...register("email")} placeholder="email@example.com" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Password</Label>
                            <Controller
                                control={control}
                                name="password"
                                render={({ field }) => (
                                    <InputPassword
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>
                        <Button type="submit" variant={"default"} className="mt-4">
                            {isPending ? <Spinner /> : "Register"}
                        </Button>
                        <p className="text-xs">
                            Already have an account?{" "}
                            <Link
                                href={"/login"}
                                className="text-primary hover:underline cursor-pointer"
                            >
                                Register now
                            </Link>
                        </p>
                    </form>
                </section>
                <aside className="flex-1 hidden md:flex items-center justify-center m-4">
                    <CarrouselBanner />
                </aside>
            </motion.main>
        </AnimatePresence>
    );
};

export default LoginPage;
