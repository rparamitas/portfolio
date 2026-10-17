import { Heading, Text } from "@react-email/components";
import { BaseEmail, styles } from "./components/BaseEmail";

interface ContactMessageEmailProps {
  name: string;
  email: string;
  title: string;
  body: string;
  brandName?: string;
  brandTagline?: string;
  brandLogoUrl?: string;
}

export default function ContactMessageEmail({
  name,
  email,
  title,
  body,
  brandName,
  brandTagline,
  brandLogoUrl,
}: ContactMessageEmailProps) {
  return (
    <BaseEmail
      previewText={`${name} — ${title}`}
      brandName={brandName}
      brandTagline={brandTagline}
      brandLogoUrl={brandLogoUrl}
    >
      <Heading style={styles.h1}>New intro message</Heading>
      <Text style={styles.text}>
        {name} ({email}) sent you a message through the portfolio:
      </Text>
      <Text
        style={{
          ...styles.text,
          fontWeight: "bold",
          marginBottom: "4px",
        }}
      >
        {title}
      </Text>
      <div
        style={{
          ...styles.code,
          margin: "16px 0 24px",
          whiteSpace: "pre-wrap",
          fontFamily: "inherit",
          width: "100%",
          padding: "16px",
        }}
      >
        {body}
      </div>
      <Text
        style={{
          ...styles.text,
          color: "#ababab",
          marginTop: "0px",
          marginBottom: "16px",
        }}
      >
        Reply directly to this email to get back to {name}.
      </Text>
    </BaseEmail>
  );
}
