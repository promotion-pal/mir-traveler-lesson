// import type { MDXComponents } from "mdx/types";
// import Image, { ImageProps } from "next/image";

// const components = {
//   h1: ({ children }) => (
//     <h1 style={{ color: "green", fontSize: "48px" }}>{children}</h1>
//   ),
//   img: (props) => (
//     <Image
//       sizes="100vw"
//       style={{ width: "100%", height: "auto" }}
//       {...(props as ImageProps)}
//     />
//   ),
// } satisfies MDXComponents;

// export function useMDXComponents(): MDXComponents {
//   return components;
// }

// src/app/mdx-components.tsx

import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "#1a202c",
          margin: "2rem 0 1rem 0",
          paddingBottom: "0.5rem",
          borderBottom: "3px solid #3182ce",
          lineHeight: "1.3",
        }}
        {...props}
      >
        {children}
      </h1>
    ),

    h2: ({ children, ...props }) => (
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "600",
          color: "#2d3748",
          margin: "1.5rem 0 1rem 0",
          lineHeight: "1.4",
        }}
        {...props}
      >
        {children}
      </h2>
    ),

    h3: ({ children, ...props }) => (
      <h3
        style={{
          fontSize: "1.5rem",
          fontWeight: "500",
          color: "#4a5568",
          margin: "1.25rem 0 0.75rem 0",
          lineHeight: "1.4",
        }}
        {...props}
      >
        {children}
      </h3>
    ),

    p: ({ children, ...props }) => (
      <p
        style={{
          color: "#4a5568",
          margin: "0 0 1rem 0",
          lineHeight: "1.6",
          fontSize: "1.1rem",
        }}
        {...props}
      >
        {children}
      </p>
    ),

    ul: ({ children, ...props }) => (
      <ul
        style={{
          margin: "0 0 1rem 0",
          paddingLeft: "1.5rem",
          color: "#4a5568",
          lineHeight: "1.6",
        }}
        {...props}
      >
        {children}
      </ul>
    ),

    ol: ({ children, ...props }) => (
      <ol
        style={{
          margin: "0 0 1rem 0",
          paddingLeft: "1.5rem",
          color: "#4a5568",
          lineHeight: "1.6",
        }}
        {...props}
      >
        {children}
      </ol>
    ),

    li: ({ children, ...props }) => (
      <li
        style={{
          margin: "0.25rem 0",
        }}
        {...props}
      >
        {children}
      </li>
    ),

    blockquote: ({ children, ...props }) => (
      <blockquote
        style={{
          borderLeft: "4px solid #4299e1",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          backgroundColor: "#ebf8ff",
          fontStyle: "italic",
          borderRadius: "0 0.5rem 0.5rem 0",
        }}
        {...props}
      >
        {children}
      </blockquote>
    ),

    code: ({ children, ...props }) => (
      <code
        style={{
          backgroundColor: "#f7fafc",
          color: "#e53e3e",
          padding: "0.2rem 0.4rem",
          borderRadius: "0.25rem",
          fontSize: "0.9rem",
          fontFamily: "Monaco, monospace",
          border: "1px solid #e2e8f0",
        }}
        {...props}
      >
        {children}
      </code>
    ),

    pre: ({ children, ...props }) => (
      <pre
        style={{
          backgroundColor: "#2d3748",
          color: "#e2e8f0",
          padding: "1.5rem",
          borderRadius: "0.5rem",
          margin: "1.5rem 0",
          overflow: "auto",
          fontSize: "0.9rem",
          fontFamily: "Monaco, monospace",
          lineHeight: "1.5",
        }}
        {...props}
      >
        {children}
      </pre>
    ),

    img: (props) => (
      <Image
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "0.5rem",
          margin: "1.5rem 0",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        {...(props as ImageProps)}
      />
    ),

    a: ({ children, ...props }) => (
      <a
        style={{
          color: "#3182ce",
          textDecoration: "underline",
          textUnderlineOffset: "0.2rem",
        }}
        {...props}
      >
        {children}
      </a>
    ),

    table: ({ children, ...props }) => (
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          margin: "1.5rem 0",
          fontSize: "0.9rem",
        }}
        {...props}
      >
        {children}
      </table>
    ),

    th: ({ children, ...props }) => (
      <th
        style={{
          backgroundColor: "#f7fafc",
          border: "1px solid #e2e8f0",
          padding: "0.75rem 1rem",
          textAlign: "left",
          fontWeight: "600",
        }}
        {...props}
      >
        {children}
      </th>
    ),

    td: ({ children, ...props }) => (
      <td
        style={{
          border: "1px solid #e2e8f0",
          padding: "0.75rem 1rem",
        }}
        {...props}
      >
        {children}
      </td>
    ),

    // Кастомные компоненты
    Card: ({ children, ...props }) => (
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "0.5rem",
          padding: "1.5rem",
          margin: "1rem 0",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
        {...props}
      >
        {children}
      </div>
    ),

    Note: ({ children, variant = "info", ...props }) => {
      const variantStyles = {
        info: {
          backgroundColor: "#ebf8ff",
          borderColor: "#4299e1",
          color: "#2b6cb0",
        },
        warning: {
          backgroundColor: "#fffbeb",
          borderColor: "#f6ad55",
          color: "#c05621",
        },
        danger: {
          backgroundColor: "#fed7d7",
          borderColor: "#f56565",
          color: "#c53030",
        },
        success: {
          backgroundColor: "#f0fff4",
          borderColor: "#68d391",
          color: "#2f855a",
        },
      };

      const style = variantStyles[variant as keyof typeof variantStyles];

      return (
        <div
          style={{
            borderLeft: "4px solid",
            padding: "1rem 1.5rem",
            margin: "1rem 0",
            borderRadius: "0 0.25rem 0.25rem 0",
            ...style,
          }}
          {...props}
        >
          {children}
        </div>
      );
    },

    // Сохраняем оригинальные компоненты
    ...components,
  };
}
