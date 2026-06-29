"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

import { deleteInterview } from "@/lib/actions/deleteInterview";

interface Props {
    interviewId: string;
}

export default function DeleteInterviewButton({
    interviewId,
}: Props) {

    const [isPending, startTransition] =
        useTransition();

    return (

        <button
            onClick={() => {

                if (
                    !confirm(
                        "Delete this interview?"
                    )
                ) {
                    return;
                }

                startTransition(async () => {
                    await deleteInterview(interviewId);
                });

            }}
            className="rounded p-2 text-red-600 hover:bg-red-50"
        >

            <Trash2 size={18} />

            {isPending && (
                <span className="ml-2 text-sm">
                    Deleting...
                </span>
            )}

        </button>

    );

}