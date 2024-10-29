import { ChangeEvent } from "react";
import calcularVerificador from "./functions/CalculateVerificator";

const handleRutChange = (
  event: ChangeEvent<HTMLInputElement>,
  setValue: (value: string) => void
) => {
  const rawValue = event.target.value.replace(/[^0-9kK]/g, "").toUpperCase();
  let formattedValue = "";
  let rutBody = rawValue.slice(0, -1);
  const verifier = rawValue.slice(-1);

  if (rutBody.length > 1) {
    rutBody = rutBody.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  formattedValue = `${rutBody}-${verifier}`;

  if (verifier.length === 0 || (verifier !== "K" && isNaN(Number(verifier)))) {
    formattedValue = rutBody;
  }

  setValue(formattedValue);
};

const handleRutBlur = (value: string, setError: (value: string) => void) => {
  const rutParts = value.split("-");
  if (rutParts.length === 2) {
    const [rutBody, verifier] = rutParts;
    if (
      calcularVerificador(rutBody.replace(/\./g, "")) !== verifier ||
      rutParts[0].length < 8
    ) {
      setError("Error: Debes ingresar un RUT válido. ");
    } else {
      console.log(rutBody);
      setError("");
    }
  }
};

export { handleRutChange, handleRutBlur };
