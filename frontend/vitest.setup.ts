import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./tests/mocks/node";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
