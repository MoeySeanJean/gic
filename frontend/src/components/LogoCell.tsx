import { getLogo } from "../api/logos";

interface LogoCellProps {
  logoUrl: string;
}

export const LogoCell = ({ logoUrl }: LogoCellProps) => {
  const logoSrc = getLogo(logoUrl);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100%",
        overflow: "hidden",
        paddingLeft: "4px",
      }}
    >
      <img
        alt="Logo"
        src={logoSrc}
        className="logo"
        style={{
          height: "80%",
          width: "auto",
          objectFit: "contain",
          borderRadius: "6px",
        }}
      />
    </div>
  );
}
