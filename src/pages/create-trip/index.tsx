import { FormEvent, useState } from "react";
import { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";

import { ConfirmTripModal } from "./confirm-trip-modal";
import { InviteGuestsModal } from "./invite-guests-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";
import { api } from "@/lib/axios";

enum MODAL {
    INVITE_GUESTS,
    CONFIRM_TRIP,
}

export function CreateTripPage() {
    const navigate = useNavigate();

    const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
    const [modal, setModal] = useState<MODAL | null>(null);

    const [destination, setDestination] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [ownerEmail, setOwnerEmail] = useState("");
    const [eventStartAndEndDates, setEventStartAndEndDates] =
        useState<DateRange>();

    const [emailsToInvite, setEmailsToInvite] = useState<string[]>([
        "jair@email.com",
        "messias@email.com",
    ]);

    function handleAddNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const email = data.get("email")?.toString();

        if (!email) {
            return;
        }

        if (emailsToInvite.includes(email)) {
            return;
        }

        setEmailsToInvite((prevState) => [...prevState, email]);

        event.currentTarget.reset();
    }

    function handleRemoveEmailFromInvites(emailToRemove: string) {
        const newEmailList = emailsToInvite.filter(
            (email) => email !== emailToRemove
        );
        setEmailsToInvite(newEmailList);
    }

    async function handleCreateTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        console.log(destination);
        console.log(eventStartAndEndDates);
        console.log(emailsToInvite);
        console.log(ownerName);
        console.log(ownerEmail);

        if (!destination) {
            return;
        }

        if (!eventStartAndEndDates?.from || !eventStartAndEndDates.to) {
            return;
        }

        if (emailsToInvite.length === 0) {
            return;
        }

        if (!ownerName || !ownerEmail) {
            return;
        }

        const response = await api.post<{ tripId: string }>("/trips", {
            destination,
            starts_at: eventStartAndEndDates.from,
            ends_at: eventStartAndEndDates.to,
            emails_to_invite: emailsToInvite,
            owner_name: ownerName,
            owner_email: ownerEmail,
        });

        const { tripId } = response.data;

        navigate(`/trips/${tripId}`);
    }

    return (
        <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
            <div className="max-w-3xl w-full px-6 text-center space-y-10">
                <div className="flex flex-col items-center gap-3">
                    <img src="/logo.svg" alt="plann.er" />
                    <p className="text-zinc-300 text-lg">
                        Convide seus amigos e planeje sua próxima viagem!
                    </p>
                </div>

                <div className="space-y-4">
                    <DestinationAndDateStep
                        closeGuestsInput={() => setIsGuestsInputOpen(false)}
                        openGuestsInput={() => setIsGuestsInputOpen(true)}
                        isGuestsInputOpen={isGuestsInputOpen}
                        eventStartAndEndDates={eventStartAndEndDates}
                        setDestination={setDestination}
                        setEventStartAndEndDates={setEventStartAndEndDates}
                    />

                    {isGuestsInputOpen && (
                        <InviteGuestsStep
                            emailsToInvite={emailsToInvite}
                            openConfirmTripModal={() =>
                                setModal(MODAL.CONFIRM_TRIP)
                            }
                            openGuestsModal={() =>
                                setModal(MODAL.INVITE_GUESTS)
                            }
                        />
                    )}
                </div>

                <p className="text-zinc-500 text-sm">
                    Ao planejar sua viagem pela plann.er você automaticamente
                    concorda <br /> com nossos{" "}
                    <a className="text-zinc-300 underline" href="">
                        termos de uso
                    </a>{" "}
                    e{" "}
                    <a className="text-zinc-300 underline" href="">
                        políticas de privacidade
                    </a>
                    .
                </p>
            </div>

            {modal === MODAL.INVITE_GUESTS && (
                <InviteGuestsModal
                    emailsToInvite={emailsToInvite}
                    onClose={() => setModal(null)}
                    onRemoveEmail={handleRemoveEmailFromInvites}
                    onAddEmail={handleAddNewEmailToInvite}
                />
            )}

            {modal === MODAL.CONFIRM_TRIP && (
                <ConfirmTripModal
                    onClose={() => setModal(null)}
                    onConfirm={handleCreateTrip}
                    setOwnerName={setOwnerName}
                    setOwnerEmail={setOwnerEmail}
                />
            )}
        </div>
    );
}
