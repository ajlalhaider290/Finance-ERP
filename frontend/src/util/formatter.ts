type FormatterType =
  | "default"
  | "comma_separated"
  | "two_decimal_places"
  | "percentage"
  | "currency"
  | "phone_number"
  | "url"
  | "truncate"
  | "mask";

interface FormatOptions {
  formatter?: FormatterType;
  // currency options
  currency?: string;       // default: "USD"
  locale?: string;         // default: "en-US"
  // truncate options
  maxLength?: number;      // default: 50
  ellipsis?: string;       // default: "..."
  // mask options
  maskChar?: string;       // default: "*"
  visibleChars?: number;   // default: 4 (visible at end)
  decemalPlaces?: number;  // for two_decimal_places, default: 2
}

export function formatText(rawText: string | number | undefined | null, options: FormatOptions = {}): string {
  if (rawText === undefined || rawText === null) return '-';
  const { formatter = "default", locale = "en-US", currency = "USD", decemalPlaces = 2 } = options;
  const text = typeof rawText === "number" ? rawText.toString() : rawText;

  const num = parseFloat(text);
  const isNumeric = !isNaN(num);

  switch (formatter) {
    case "default":
      return text;

    case "comma_separated":
      return isNumeric
        ? num.toLocaleString(locale)
        : text.replace(/\B(?=(\w{3})+(?!\w))/g, ",");

    case "two_decimal_places":
      return isNumeric ? num.toFixed(decemalPlaces) : text;

    case "percentage":
      return isNumeric ? `${num.toFixed(decemalPlaces)}%` : `${text}%`;

    case "currency":
      return isNumeric
        ? new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: decemalPlaces }).format(num)
        : text;

    case "phone_number": {
      const digits = text.replace(/\D/g, "");
      if (digits.length === 10)
        return digits.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      if (digits.length === 11)
        return digits.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, "+$1 ($2) $3-$4");
      return text;
    }

    case "url": {
      try {
        const url = new URL(text.startsWith("http") ? text : `https://${text}`);
        return url.toString();
      } catch {
        return text;
      }
    }

    case "truncate": {
      const { maxLength = 50, ellipsis = "..." } = options;
      return text.length > maxLength
        ? `${text.slice(0, maxLength - ellipsis.length)}${ellipsis}`
        : text;
    }

    case "mask": {
      const { maskChar = "*", visibleChars = 4 } = options;
      if (text.length <= visibleChars) return text;
      return `${maskChar.repeat(text.length - visibleChars)}${text.slice(-visibleChars)}`;
    }

    default:
      return text;
  }
}