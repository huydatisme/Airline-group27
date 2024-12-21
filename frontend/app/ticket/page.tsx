"use client"
import { useRecoilValue } from "recoil";
import { ViewTicket } from "../components/ViewTicket";
import { userAtom } from "@/app/atoms";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function () {
  const {toast} = useToast();
  const userEmail = useRecoilValue(userAtom);
  const router = useRouter();
    return (
        <div>
            <ViewTicket/>
        </div>
    )
}