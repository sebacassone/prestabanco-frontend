/**
 * Interface for the address object
 * @interface
 * @property {string} street - The street of the address
 * @property {string} number - The number of the address
 * @property {string} commune - The commune of the address
 * @property {string} region - The region of the address
 * @property {string} country - The country of the address
 */
interface address {
    street: string;
    number: string;
    commune: string;
    region: string;
    country: string;
}

export default address;