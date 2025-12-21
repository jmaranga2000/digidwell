// lib/mpesa/utils.ts

/**
 * Format a phone number to Mpesa standard (e.g., 2547XXXXXXXX)
 * Accepts local formats like 07XXXXXXXX or international +2547XXXXXXXX
 */
export function formatPhoneNumber(phone: string): string {
  let formatted = phone.trim();

  if (formatted.startsWith("0")) {
    formatted = "254" + formatted.slice(1);
  } else if (formatted.startsWith("+")) {
    formatted = formatted.slice(1);
  }

  // Ensure it starts with 254 and has 12 digits
  if (!/^254\d{9}$/.test(formatted)) {
    throw new Error("Invalid phone number format for Mpesa");
  }

  return formatted;
}

/**
 * Validate amount for Mpesa transaction
 */
export function validateAmount(amount: number) {
  if (amount <= 0) {
    throw new Error("Amount must be greater than zero");
  }
  return amount;
}

/**
 * Parse Mpesa STK Callback metadata for easier consumption
 */
export function parseStkCallbackMetadata(metadata: any) {
  const result: Record<string, any> = {};

  if (!metadata?.Item || !Array.isArray(metadata.Item)) {
    return result;
  }

  metadata.Item.forEach((item: { Name: string; Value: any }) => {
    result[item.Name] = item.Value;
  });

  return result;
}