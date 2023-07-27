import { RGBA } from "lean-qr";

export interface qrCodeInterface {
    id: number;
    name: string;
    url: string;
    color: RGBA;
    backgroundColor: RGBA;
}