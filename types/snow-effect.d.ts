declare namespace JSX {
  interface IntrinsicElements {
    "snow-effect": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      flakes?: string | number;
      color?: string;
      speed?: string | number;
    };
  }
}

declare module "@le-pepe/snow-effect" {
  // Main module export - may auto-register the custom element
}

declare module "@le-pepe/snow-effect/loader" {
  export function defineCustomElements(): void;
}
