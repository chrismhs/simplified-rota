import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  light: {
    text: "41, 41, 52",
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
