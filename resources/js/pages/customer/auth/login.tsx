import { Coins } from "lucide-react"
import { LoginForm } from "@/features/customer/auth/login-form"
import LoginBackground from "@/assets/svgs/login-background.svg"
import { ThemeProvider } from "@/components/app-theme-provider" 
import AppNotification from "@/components/app-notification"

export default function LoginPage() {
    return (
        <ThemeProvider>
            <AppNotification />
            <div className="grid min-h-svh lg:grid-cols-2">
                <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex justify-center gap-2 md:justify-start">
                        <a href="#" className="flex items-center gap-2 font-semibold">
                            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                                <Coins className="size-5 text-white" />
                            </div>
                            Trackio
                        </a>
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-md">
                            <LoginForm />
                        </div>
                    </div>
                </div>
                <div className="bg-muted relative hidden lg:block">
                    <img
                        src={LoginBackground}
                        alt="Image"
                        className="absolute inset-0 h-full w-full object-cover bg-green-100 dark:bg-[#006239]"
                    />
                </div>
            </div>
        </ThemeProvider>
    )
}
