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
];
