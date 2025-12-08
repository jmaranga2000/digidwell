// lib/mockSession.ts

export type Session = {
  user: {
    name: string;
    email: string;
  };
  role: "admin" | "customer";
};

// Mock session data
let currentSession: Session | null = {
  user: { name: "John Doe", email: "john@example.com" },
  role: "customer",
};

/**
 * Returns the current mock session
 */
export function getMockSession(): Session | null {
  return currentSession;
}

/**
 * Logs in as a specific role (for testing)
 */
export function loginMock(role: "admin" | "customer") {
  currentSession = {
    user: {
      name: role === "admin" ? "Admin User" : "John Doe",
      email: role === "admin" ? "admin@example.com" : "john@example.com",
    },
    role,
  };
}

/**
 * Logs out the current session
 */
export function logoutMock() {
  currentSession = null;
}
