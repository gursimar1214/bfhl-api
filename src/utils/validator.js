exports.validateInput = (body) => {
  // Body must exist
  if (!body || typeof body !== "object") {
    return { valid: false, message: "Invalid request body" };
  }

  const keys = Object.keys(body);

  // Exactly one key required
  if (keys.length !== 1) {
    return { valid: false, message: "Exactly one key required" };
  }

  const key = keys[0];
  const value = body[key];

  const allowedKeys = ["fibonacci", "prime", "lcm", "hcf", "AI"];

  if (!allowedKeys.includes(key)) {
    return { valid: false, message: "Invalid key" };
  }

  if (key === "fibonacci") {
    if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
      return { valid: false, message: "Fibonacci requires a non-negative integer" };
    }
    // Limit to 90 to avoid unsafe integer overflow in JavaScript Number
    if (value > 90) {
      return { valid: false, message: "Fibonacci size too large (max 90)" };
    }
  }

  if (["prime", "lcm", "hcf"].includes(key)) {
    if (!Array.isArray(value) || value.length === 0) {
      return { valid: false, message: "Non-empty array required" };
    }
    if (value.length > 1000) {
      return { valid: false, message: "Array too large (max 1000 elements)" };
    }
    if (!value.every((v) => typeof v === "number" && Number.isFinite(v) && Number.isInteger(v))) {
      return { valid: false, message: "Array must contain only integers" };
    }
    // limit absolute value to avoid pathological cases
    if (!value.every((v) => Math.abs(v) <= 1e9)) {
      return { valid: false, message: "Array numbers exceed allowable range" };
    }
  }

  if (key === "AI") {
    if (typeof value !== "string" || value.trim().length === 0) {
      return { valid: false, message: "AI requires a valid question string" };
    }
  }

  return { valid: true, key, value };
};
