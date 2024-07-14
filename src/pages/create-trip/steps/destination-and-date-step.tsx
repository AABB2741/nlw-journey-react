import { Button } from "@/components/button";
import { format } from "date-fns";
import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface DestinationAndDateStep {
    isGuestsInputOpen: boolean;
    eventStartAndEndDates?: DateRange;
    closeGuestsInput: () => void;
    openGuestsInput: () => void;
    setDestination: (destination: string) => void;
    setEventStartAndEndDates: (dates?: DateRange) => void;
}

export function DestinationAndDateStep({
    isGuestsInputOpen,
    eventStartAndEndDates,
    closeGuestsInput,
    openGuestsInput,
    setDestination,
    setEventStartAndEndDates,
}: DestinationAndDateStep) {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const displayDate =
        eventStartAndEndDates &&
        eventStartAndEndDates.from &&
        eventStartAndEndDates.to &&
        `${format(eventStartAndEndDates.from, "d' de 'LLL")} até ${format(
            eventStartAndEndDates.to,
            "d' de 'LLL"
        )}`;

    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
                <MapPin className="size-5 text-zinc-400" />
                <input
                    type="text"
                    placeholder="Para onde você vai?"
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                    disabled={isGuestsInputOpen}
                    onChange={(e) => setDestination(e.target.value)}
                />
            </div>

            <button
                onClick={() => setIsDatePickerOpen(true)}
                className="flex items-center gap-2 text-left w-60"
                disabled={isGuestsInputOpen}
            >
                <Calendar className="size-5 text-zinc-400" />
                <span className="text-lg text-zinc-400 w-40 text-left flex-1">
                    {displayDate ?? "Quando?"}
                </span>
            </button>

            {isDatePickerOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">
                                    Selecione a data
                                </h2>
                                <button
                                    onClick={() => setIsDatePickerOpen(false)}
                                >
                                    <X className="size-5 text-zinc-400" />
                                </button>
                            </div>
                        </div>

                        <DayPicker
                            mode="range"
                            selected={eventStartAndEndDates}
                            onSelect={setEventStartAndEndDates}
                            classNames={{
                                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                                month: "space-y-4",
                                caption:
                                    "flex justify-center pt-1 relative items-center",
                                caption_label: "text-sm font-medium",
                                nav: "space-x-1 flex items-center",
                                nav_button:
                                    "h-7 w-7 hover:opacity-100 shadow-sm hover:bg-accent hover:text-accent-foreground flex justify-center items-center rounded-md",

                                nav_button_previous: "absolute left-1",
                                nav_button_next: "absolute right-1",

                                head_row: "flex",
                                head_cell: "w-8 font-normal text-[0.8rem]",
                                row: "flex w-full mt-2",

                                cell: "p-0",

                                day: "h-8 w-8 p-0 ease-in-out hover:rounded-md aria-selected:bg-lime-300 aria-selected:text-lime-950 aria-selected:hover:rounded-none",

                                day_range_start:
                                    "day-range-start rounded-l-md aria-selected:hover:rounded-l-md aria-selected:hover:bg-lime-500",
                                day_range_end:
                                    "day-range-end rounded-r-md aria-selected:hover:rounded-r-md aria-selected:hover:bg-lime-500",

                                day_today:
                                    "text-accent-foreground bg-zinc-950/95 rounded-md aria-selected:rounded-r-none",

                                day_outside:
                                    "day-outside text-muted-foreground opacity-50 aria-selected:opacity-100 aria-selected:bg-lime-300 aria-selected:text-lime-950",
                                day_disabled:
                                    "text-muted-foreground opacity-50",

                                day_range_middle:
                                    "aria-selected:bg-lime-300/90 rounded-none aria-selected:hover:bg-lime-500",
                            }}
                        />
                    </div>
                </div>
            )}

            <div className="w-px h-6 bg-zinc-800" />

            {isGuestsInputOpen ? (
                <Button onClick={closeGuestsInput} variant="secondary">
                    Alterar local/data
                    <Settings2 className="size-5" />
                </Button>
            ) : (
                <Button onClick={openGuestsInput} variant="primary">
                    Continuar
                    <ArrowRight className="size-5" />
                </Button>
            )}
        </div>
    );
}
