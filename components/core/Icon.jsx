import React from "react";

/**
 * Interliving Rehmann — Icon
 * Thin wrapper over Lucide (the documented brand icon set).
 * Requires the Lucide UMD script on the page:
 *   <script src="https://unpkg.com/lucide@latest"></script>
 * Renders via currentColor so it inherits text color.
 */
export function Icon({ name, size = 20, strokeWidth = 1.9, color = "currentColor", style = {}, ...rest }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide && ref.current) {
      try { window.lucide.createIcons({ nameAttr: "data-lucide", icons: window.lucide.icons }); } catch (e) {}
    }
  }, [name]);
  return (
    <i
      ref={ref}
      data-lucide={name}
      style={{
        display: "inline-flex",
        width: size,
        height: size,
        color,
        verticalAlign: "middle",
        ...style,
      }}
      data-stroke={strokeWidth}
      {...rest}
    />
  );
}
