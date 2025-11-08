import {
  describe,
  expect,
  it,
  beforeEach,
  afterEach,
  jest,
} from "@jest/globals";

describe("oauth_google", () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.resetModules();
  });

  describe("oauth_google configuration", () => {
    it("should have correct structure with all required keys", async () => {
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID = "test-client-id";
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET = "test-client-secret";
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_REDIRECT =
        "http://localhost:3000/auth/callback";

      const { oauth_google } = await import("../../models/oauth_google");

      expect(oauth_google).toHaveProperty("client_id");
      expect(oauth_google).toHaveProperty("client_secret");
      expect(oauth_google).toHaveProperty("endpoint");
      expect(oauth_google).toHaveProperty("redirect_uri");
      expect(oauth_google).toHaveProperty("access_type");
      expect(oauth_google).toHaveProperty("prompt");
      expect(oauth_google).toHaveProperty("scopes");
    });

    it("should use environment variables when provided", async () => {
      const testClientId = "test-client-123";
      const testClientSecret = "test-secret-456";
      const testRedirectUri = "http://localhost:3000/auth/google/callback";

      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID = testClientId;
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET = testClientSecret;
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_REDIRECT = testRedirectUri;

      const { oauth_google } = await import("../../models/oauth_google");

      expect(oauth_google.client_id).toBe(testClientId);
      expect(oauth_google.client_secret).toBe(testClientSecret);
      expect(oauth_google.redirect_uri).toBe(testRedirectUri);
    });

    it("should use empty strings as default when environment variables are not set", async () => {
      delete process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      delete process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;
      delete process.env.NEXT_PUBLIC_GOOGLE_CLIENT_REDIRECT;

      const { oauth_google } = await import("../../models/oauth_google");

      expect(oauth_google.client_id).toBe("");
      expect(oauth_google.client_secret).toBe("");
      expect(oauth_google.redirect_uri).toBe("");
    });

    it("should have correct static values", async () => {
      const { oauth_google } = await import("../../models/oauth_google");

      expect(oauth_google.endpoint).toBe(
        "https://accounts.google.com/o/oauth2/v2/auth"
      );
      expect(oauth_google.access_type).toBe("offline");
      expect(oauth_google.prompt).toBe("consent");
      expect(oauth_google.scopes).toBe(
        "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
      );
    });

    it("should validate endpoint URL format", async () => {
      const { oauth_google } = await import("../../models/oauth_google");

      expect(oauth_google.endpoint).toMatch(/^https:\/\/.+/);
      expect(oauth_google.endpoint).toContain("accounts.google.com");
      expect(oauth_google.endpoint).toContain("oauth2");
    });

    it("should validate scopes format", async () => {
      const { oauth_google } = await import("../../models/oauth_google");

      expect(oauth_google.scopes).toContain("userinfo.email");
      expect(oauth_google.scopes).toContain("userinfo.profile");
      expect(oauth_google.scopes).toContain("googleapis.com");

      // Проверяем, что скопы разделены пробелом
      const scopesArray = oauth_google.scopes.split(" ");
      expect(scopesArray).toHaveLength(2);
      expect(scopesArray[0]).toBe(
        "https://www.googleapis.com/auth/userinfo.email"
      );
      expect(scopesArray[1]).toBe(
        "https://www.googleapis.com/auth/userinfo.profile"
      );
    });

    it("should have valid access_type value", async () => {
      const { oauth_google } = await import("../../models/oauth_google");

      expect(oauth_google.access_type).toBe("offline");
      expect(["online", "offline"]).toContain(oauth_google.access_type);
    });

    it("should have valid prompt value", async () => {
      const { oauth_google } = await import("../../models/oauth_google");

      expect(oauth_google.prompt).toBe("consent");
      expect(["none", "consent", "select_account"]).toContain(
        oauth_google.prompt
      );
    });

    it("should handle undefined environment variables gracefully", async () => {
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID = undefined;
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET = undefined;
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_REDIRECT = undefined;

      const { oauth_google } = await import("../../models/oauth_google");

      expect(oauth_google.client_id).toBe("");
      expect(oauth_google.client_secret).toBe("");
      expect(oauth_google.redirect_uri).toBe("");
    });

    it("should handle empty string environment variables", async () => {
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID = "";
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET = "";
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_REDIRECT = "";

      const { oauth_google } = await import("../../models/oauth_google");

      expect(oauth_google.client_id).toBe("");
      expect(oauth_google.client_secret).toBe("");
      expect(oauth_google.redirect_uri).toBe("");
    });

    it("should validate all properties are strings", async () => {
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID = "test-id";
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET = "test-secret";
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_REDIRECT =
        "http://localhost:3000/callback";

      const { oauth_google } = await import("../../models/oauth_google");

      Object.values(oauth_google).forEach((value) => {
        expect(typeof value).toBe("string");
      });
    });

    it("should have exactly 7 properties", async () => {
      const { oauth_google } = await import("../../models/oauth_google");

      const keys = Object.keys(oauth_google);
      expect(keys).toHaveLength(7);
      expect(keys).toEqual([
        "client_id",
        "client_secret",
        "endpoint",
        "redirect_uri",
        "scopes",
        "access_type",
        "prompt",
      ]);
    });

    it("should validate complete oauth configuration object", async () => {
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID =
        "123456789.apps.googleusercontent.com";
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET = "GOCSPX-test-secret-key";
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_REDIRECT =
        "http://localhost:8000/auth/google/callback";

      const { oauth_google } = await import("../../models/oauth_google");

      expect(oauth_google.client_id).toBeTruthy();
      expect(oauth_google.client_secret).toBeTruthy();
      expect(oauth_google.redirect_uri).toBeTruthy();
      expect(oauth_google.endpoint).toBeTruthy();
      expect(oauth_google.scopes).toBeTruthy();
      expect(oauth_google.access_type).toBeTruthy();
      expect(oauth_google.prompt).toBeTruthy();

      expect(oauth_google.client_id).toContain(".apps.googleusercontent.com");

      expect(oauth_google.client_secret).toMatch(/^GOCSPX-/);

      expect(oauth_google.redirect_uri).toMatch(/^https?:\/\/.+/);
    });

    it("should handle different redirect URI formats", async () => {
      const testUris = [
        "http://localhost:3000/auth/callback",
        "https://example.com/auth/google/callback",
        "https://myapp.vercel.app/api/auth/callback/google",
      ];

      for (const uri of testUris) {
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_REDIRECT = uri;

        jest.resetModules();

        const { oauth_google } = await import("../../models/oauth_google");

        expect(oauth_google.redirect_uri).toBe(uri);
        expect(oauth_google.redirect_uri).toMatch(/^https?:\/\/.+/);
      }
    });

    it("should validate Google OAuth scopes are properly formatted URLs", async () => {
      const { oauth_google } = await import("../../models/oauth_google");

      const scopes = oauth_google.scopes.split(" ");

      scopes.forEach((scope) => {
        expect(scope).toMatch(/^https:\/\/www\.googleapis\.com\/auth\/.+/);
      });
    });
  });
});
