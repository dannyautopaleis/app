// svg.d.ts
declare module "*.svg" {
  import * as React from "react";

  export type SvgType = React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const ReactComponent: SvgType;
  export default ReactComponent;
}