import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:5000/api/user", ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new HttpResponse(null, {
        status: 401,
        statusText: "Unauthorized",
      });
    }

    const token = authHeader.replace("Bearer ", "");

    if (!token || token === "invalid-token") {
      return new HttpResponse(null, {
        status: 401,
        statusText: "Invalid token",
      });
    }

    return HttpResponse.json({
      id: "user-123",
      email: "test@example.com",
      name: "Test User",
      jwtSecureCode: "test-secure-code-123",
      accessToken: token,
    });
  }),
  http.post("http://localhost:5000/api/simpleSignUp", async ({ request }) => {
    try {
      const body = (await request.json()) as {
        email?: string;
        password?: string;
      };

      if (body?.email === "error@test.com") {
        return HttpResponse.json(
          { message: "An error occurred" },
          { status: 500 }
        );
      }

      if (!body?.email || !body?.password) {
        return HttpResponse.json(
          { message: "Email and password are required" },
          { status: 400 }
        );
      }

      return HttpResponse.json({
        emailSent: true,
        message:
          "Registration successful! Please check your email to verify your account",
      });
    } catch {
      return HttpResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }
  }),
  http.post("http://localhost:5000/api/simpleSignIn", async ({ request }) => {
    try {
      const body = (await request.json()) as {
        email?: string;
        password?: string;
      };

      if (body?.email === "error@test.com") {
        return HttpResponse.json(
          { message: "Invalid credentials" },
          { status: 401 }
        );
      }

      if (!body?.email || !body?.password) {
        return HttpResponse.json(
          { message: "Email and password are required" },
          { status: 400 }
        );
      }

      const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
      const payload = btoa(
        JSON.stringify({
          id: "user-123",
          jwtSecureCode: "test-secure-code-123",
          iat: 1516239022,
        })
      );
      const signature = "fake-signature";
      const mockToken = `${header}.${payload}.${signature}`;

      return HttpResponse.json({
        accessToken: mockToken,
        user: {
          id: "user-123",
          email: body.email,
          name: "Test User",
        },
      });
    } catch {
      return HttpResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }
  }),
];
