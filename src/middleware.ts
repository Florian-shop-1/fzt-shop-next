import { NextRequest, NextResponse } from "next/server";

const PASSWORD = "ditixupgrade";

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get("authorization");

  if (basicAuth) {
    const [, encoded] = basicAuth.split(" ");
    const decoded = Buffer.from(encoded, "base64").toString("utf-8");
    const [, password] = decoded.split(":");

    if (password === PASSWORD) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Zugang geschützt", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="FZT Shop Preview"',
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
