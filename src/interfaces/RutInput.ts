/**
 * Interface for the RUT input component.
 * @interface
 * @property {string} value - The value of the input.
 * @property {(value: string) => void} onValueChange - The function that updates the value of the input.
 * @property {() => void} onBlur - The function that is called when the input loses focus. (optional)
 */
interface RUTInputProps {
  value: string;
  onValueChange: (value: string) => void;
  width?: string;
  onBlur?: () => void;
}

export default RUTInputProps;
