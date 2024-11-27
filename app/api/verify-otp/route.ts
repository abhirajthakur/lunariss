import prisma from "@/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // try {
  //   const { email, otp } = await req.json();
  //
  //   const user = await prisma.user.findUnique({
  //     where: { email },
  //     select: {
  //       id: true,
  //       emailVerified: true,
  //       verificationToken: true,
  //       verificationTokenExpiry: true,
  //     },
  //   });
  //
  //   if (!user) {
  //     return NextResponse.json({ error: "User not found" }, { status: 404 });
  //   }
  //
  //   if (user.emailVerified) {
  //     return NextResponse.json(
  //       { error: "Email already verified" },
  //       { status: 400 },
  //     );
  //   }
  //
  //   if (!user.verificationToken || !user.verificationTokenExpiry) {
  //     return NextResponse.json(
  //       { error: "Invalid verification token" },
  //       { status: 400 },
  //     );
  //   }
  //
  //   if (user.verificationToken !== otp) {
  //     return NextResponse.json(
  //       { error: "Invalid verification code" },
  //       { status: 400 },
  //     );
  //   }
  //
  //   if (new Date() > user.verificationTokenExpiry) {
  //     return NextResponse.json(
  //       { error: "Verification code expired" },
  //       { status: 400 },
  //     );
  //   }
  //
  //   await prisma.user.update({
  //     where: { id: user.id },
  //     data: {
  //       emailVerified: new Date(),
  //       verificationToken: null,
  //       verificationTokenExpiry: null,
  //     },
  //   });
  //
  //   return NextResponse.json({ success: true });
  // } catch (error) {
  //   console.error("Error verifying OTP:", error);
  //   return NextResponse.json(
  //     { error: "Failed to verify email" },
  //     { status: 500 },
  //   );
  // }
}
