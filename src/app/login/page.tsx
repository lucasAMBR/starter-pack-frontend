"use client";

import { ModeToggle } from "@/components/global/ThemeButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { customToaster } from "@/lib/customToaster";
import { ChevronLeft, EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthLoginBody } from "@/api/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { authLoginBody } from "@/api/generated/zod/auth/auth.zod";
import { useAuthLogin } from "@/api/generated/auth/auth";
import { Spinner } from "@/components/ui/spinner";
import CarrouselBanner from "@/components/auth/carrousel-banner";

export const LoginPage = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
        clearErrors,
    } = useForm<AuthLoginBody>({
        resolver: zodResolver(authLoginBody),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { mutate, isPending } = useAuthLogin();

    const [isVisible, setIsVisible] = useState(false);

    const handleLogin: SubmitHandler<AuthLoginBody> = (data) => {
        clearErrors();

        mutate(
            { data },
            {
                onSuccess: (response) => {
                    customToaster.success(response.message);
                },
                onError: (error) => {
                    customToaster.error(
                        error.response?.data.message ??
                        "Something goes wrong on your sing in",
                    );
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
                className="flex w-screen h-screen"
            >
                <section className="flex flex-col items-center justify-center flex-1 gap-8 relative md:m-6 m-4">
                    <div className="absolute text-primary-foreground left-0 top-0 w-10 h-10 bg-primary flex items-center justify-center rounded-md hover:bg-primary/70 cursor-pointer">
                        <ChevronLeft />
                    </div>
                    <Image width={100} height={100} src={"/images/logo.png"} alt="logo" />
                    <h3 className="text-2xl font-bold text-primary">Welcome back!</h3>
                    <form
                        onSubmit={handleSubmit(handleLogin)}
                        className="md:w-[450px] w-full flex flex-col gap-4 text-center"
                    >
                        <div className="flex flex-col gap-2">
                            <Label>E-mail</Label>
                            <Input {...register("email")} placeholder="email@example.com" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="w-full space-y-2">
                                <Label>Password</Label>
                                <div className="relative w-full">
                                    <Input
                                        {...register("password")}
                                        type={isVisible ? "text" : "password"}
                                        placeholder="Password"
                                        className="w-full"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsVisible((prevState) => !prevState)}
                                        className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
                                    >
                                        {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                                        <span className="sr-only">
                                            {isVisible ? "Hide password" : "Show password"}
                                        </span>
                                    </Button>
                                </div>
                            </div>
                            <div className="text-start">
                                <p className="text-xs my-1">
                                    Forgot your password?{" "}
                                    <span className="text-primary hover:underline cursor-pointer">
                                        Click here
                                    </span>
                                </p>
                            </div>
                        </div>
                        <Button type="submit" variant={"default"} className="mt-4">
                            {isPending ? <Spinner /> : "Login"}
                        </Button>
                        <p className="text-xs">
                            Doesn't have an account?{" "}
                            <Link
                                href={"/register"}
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
