// Mock user context - replace with real auth later
export const mockUser = {
  id: "user_001",
  name: "New User",
  email: "user@skillswap.com",
  role: "seller" as "buyer" | "seller", // Default role
  isVerified: true,
};

// Function to update the role dynamically
export const setUserRole = (role: "buyer" | "seller") => {
  mockUser.role = role;
};

export const getUserRole = () => mockUser.role;

export const isSeller = () => mockUser.role === "seller";

export const isBuyer = () => mockUser.role === "buyer";