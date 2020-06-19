import "./styles.css";
import type { PublishableMessage, XPos, YPos } from "./types";
export default function getToastArea(x?: XPos, y?: YPos): (msg: PublishableMessage) => void;
