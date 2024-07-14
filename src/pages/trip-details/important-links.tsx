import { Button } from "@/components/button";
import { Link2, Plus } from "lucide-react";

export function ImportantLinks() {
    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links importantes</h2>

            <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">
                            Reserva do AirBnB
                        </span>
                        <a
                            href="#"
                            className="block font-medium text-xs text-zinc-400 truncate hover:text-zinc-200"
                        >
                            https://rpbcompany.com.br?q=asikodaiojpoiasjvpoasj98jmd-98jaxs98fjxa89fjqwopifhajpcowhjpca98wfjca890pwf
                        </a>
                    </div>
                    <Link2 className="size-5 text-zinc-400 shrink-0" />
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">
                            Reserva do AirBnB
                        </span>
                        <a
                            href="#"
                            className="block font-medium text-xs text-zinc-400 truncate hover:text-zinc-200"
                        >
                            https://rpbcompany.com.br?q=asikodaiojpoiasjvpoasj98jmd-98jaxs98fjxa89fjqwopifhajpcowhjpca98wfjca890pwf
                        </a>
                    </div>
                    <Link2 className="size-5 text-zinc-400 shrink-0" />
                </div>
            </div>

            <Button variant="secondary" size="full">
                <Plus className="size-5" />
                Cadastrar novo link
            </Button>
        </div>
    );
}
