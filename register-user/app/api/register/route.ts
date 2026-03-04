import { getUserCreds } from "@/utils/createUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1. Parse the incoming request
    const body = await req.json();
    const { regNo, email } = body;

    if (!regNo) {
      return NextResponse.json(
        { success: false, message: "Registration Number is required" },
        { status: 400 },
      );
    }

    // Backend Regex Validation (Never trust the frontend alone!)
    const regRegex = /^(21|22|23|24|25)[A-Z]{3}[0-9]{4}$/i;
    if (!regRegex.test(regNo)) {
      return NextResponse.json(
        { message: "Invalid Registration Number format" },
        { status: 400 },
      );
    }

    const formattedRegNo = regNo.toUpperCase();
    return NextResponse.json({
      success: true,
      ...(await getUserCreds(email, formattedRegNo)),
    });
  } catch (e) {
    console.error(e);

    return NextResponse.json({
      success: false,
      message: "Some error occurred",
    });
  }
}
