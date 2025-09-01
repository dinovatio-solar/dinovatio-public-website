declare module "*.png" {
  const content: import("next/dist/shared/lib/get-img-props").StaticImageData;
  export default content;
}
declare module "*.jpg" {
  const content: import("next/dist/shared/lib/get-img-props").StaticImageData;
  export default content;
}
declare module "*.jpeg" {
  const content: import("next/dist/shared/lib/get-img-props").StaticImageData;
  export default content;
}
declare module "*.webp" {
  const content: import("next/dist/shared/lib/get-img-props").StaticImageData;
  export default content;
}
declare module "*.svg" {
  import * as React from "react";
  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default ReactComponent;
}
