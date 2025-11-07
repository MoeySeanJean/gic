interface LogoCellProps {
  logoUrl: string;
}

const LogoCell = ({ logoUrl }: LogoCellProps) => {
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
        src={logoUrl}
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

export default LogoCell;