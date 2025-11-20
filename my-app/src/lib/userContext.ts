// Mock user context - replace with real auth later
export const mockUser = {
  id: "user_001",
  name: "New User",
  email: "user@skillswap.com",
  role: "seller" as "buyer" | "seller" | "both", // Default role
  isVerified: true,
};

export const isBothRoles = () => mockUser.role === "both"; // Add this line

// Function to update the role dynamically
export const setUserRole = (role: "buyer" | "seller" | "both") => {
  mockUser.role = role;
  // notify runtime listeners so UI can react without full reload
  try {
    window.dispatchEvent(new CustomEvent("mockUserRoleChanged", { detail: role }));
  } catch (e) {
    /* ignore (server-side test env) */
  }
};

export const getUserRole = () => mockUser.role;

export const isSeller = () => mockUser.role === "seller";

export const isBuyer = () => mockUser.role === "buyer";